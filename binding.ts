import {
  Observable,
  Subscription,
  animationFrameScheduler,
  bufferTime,
  combineLatest,
  filter,
  map,
  merge,
  scan,
} from 'rxjs'
import {
  ComponentRunner,
  ElementDescription,
  FragmentDescription,
  WiringContext,
} from './component.js'
import { EventBinder } from './events.js'

type ObservableEntry = [string | number | symbol, Observable<unknown>]
type Entry = [string | number | symbol, unknown]
type Entries = Entry[]

export interface BindingContext extends WiringContext {
  error: (error: unknown) => void
  complete: () => void
  eventBinder: EventBinder
  componentRunner: ComponentRunner
  subscription: Subscription
}

export function bindObjectKey(
  // intentional metaprogramming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  key: string | number | symbol,
  observable: Observable<unknown>,
  error: (error: unknown) => void,
  complete: () => void,
) {
  return observable.subscribe({
    next: (value) => {
      item[key] = value
    },
    error,
    complete,
  })
}

export function bindObjectChanges(
  item: object,
  observable: Observable<object>,
  error: (error: unknown) => void,
  complete: () => void,
) {
  return observable.subscribe({
    next: (changes) => {
      Object.assign(item, changes)
    },
    error,
    complete,
  })
}

export function bufferEntries(
  observable: Observable<Entry>,
  suspense?: Observable<boolean>,
) {
  if (suspense) {
    return combineLatest([suspense, observable]).pipe(
      bufferTime(0, animationFrameScheduler),
      map((states) =>
        states.reduce(
          (acc, [suspend, entry]) => ({
            suspend,
            entries: [...acc.entries, entry],
          }),
          { suspend: false, entries: [] as Entries },
        ),
      ),
      scan(
        (acc, cur) => ({
          changes:
            acc.suspend && cur.suspend
              ? Object.assign(acc.changes, Object.fromEntries(cur.entries))
              : Object.fromEntries(cur.entries),
          suspend: cur.suspend,
        }),
        { suspend: false, changes: {} as object },
      ),
      filter(({ suspend }) => !suspend),
      map(({ changes }) => changes),
    )
  }
  return observable.pipe(
    bufferTime(0, animationFrameScheduler),
    map((entries) => Object.fromEntries(entries)),
  )
}

export function schedulable(key: string | number | symbol, immediate: boolean) {
  // value usually means user-interaction surfaces such as HTML input elements, so don't schedule it
  return !(immediate || key === 'value')
}

export function makeEntries(
  key: string | number | symbol,
  observable: Observable<unknown>,
) {
  return observable.pipe(map((value) => [key, value] as Entry))
}

export function bindElement(
  element: HTMLElement,
  description: ElementDescription,
  context: BindingContext,
  document = globalThis.document,
) {
  const {
    complete,
    componentRunner,
    error,
    eventBinder,
    suspense,
    subscription,
  } = context
  const schedulables: ObservableEntry[] = []

  const binds = [
    ...Object.entries(description.bind).map(
      ([key, observable]) => [key, observable, false] as const,
    ),
    ...Object.entries(description.immediateBind).map(
      ([key, observable]) => [key, observable, true] as const,
    ),
  ]

  for (const [key, observable, immediate] of binds) {
    if (schedulable(key, immediate)) {
      schedulables.push([key, observable] as ObservableEntry)
    } else {
      subscription.add(bindObjectKey(element, key, observable, error, complete))
    }
  }

  const scheduled = schedulables.map(([key, observable]) =>
    makeEntries(key, observable),
  )
  subscription.add(
    bindObjectChanges(
      element,
      bufferEntries(merge(...scheduled), suspense),
      error,
      complete,
    ),
  )

  for (const [key, event] of Object.entries(description.events)) {
    subscription.add(eventBinder.applyEvent(event, element, key))
  }

  if (description.childrenBind) {
    subscription.add(
      description.childrenBind.subscribe({
        next(child) {
          const placeholder = document.createComment(`${child.name} component`)
          if (description.childrenPrepend) {
            element.prepend(placeholder)
          } else {
            element.append(placeholder)
          }
          subscription.add(
            componentRunner(
              element,
              {
                type: 'component',
                component: child,
                properties: {},
                children: [],
              },
              context,
              placeholder,
            ),
          )
        },
        error,
        complete,
      }),
    )
  }

  return subscription
}

export function bindFragmentChildren(
  nodeDescription: FragmentDescription,
  node: Node,
  subscription: Subscription,
  context: BindingContext,
) {
  const { complete, error, componentRunner } = context
  if (nodeDescription.childrenBind) {
    subscription.add(
      nodeDescription.childrenBind.subscribe({
        next(child) {
          const parent = node.parentElement
          if (!parent) {
            throw new Error(
              'Attempted to bind children to an unattached fragment',
            )
          }
          const placeholder = document.createComment(`${child.name} component`)
          if (nodeDescription.childrenPrepend) {
            parent.insertBefore(node, placeholder)
          } else {
            const next = node.nextSibling
            if (next) {
              parent.insertBefore(next, placeholder)
            } else {
              parent.append(placeholder)
            }
          }
          subscription.add(
            componentRunner(
              parent,
              {
                type: 'component',
                component: child,
                properties: {},
                children: [],
              },
              context,
              placeholder,
            ),
          )
        },
        error,
        complete,
      }),
    )
  }
}
