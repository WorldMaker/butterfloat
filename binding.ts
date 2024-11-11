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
  switchMap,
} from 'rxjs'
import { ElementDescription, FragmentDescription } from './component.js'
import { EventBinder } from './events.js'
import {
  ComponentRunner,
  ComponentWirer,
  ObservableComponent,
  WiringContext,
} from './wiring-context.js'

type ObservableEntry = [string | number | symbol, Observable<unknown>]
type Entry = [string | number | symbol, unknown]
type Entries = Entry[]

export interface BindingContext extends WiringContext {
  error: (error: unknown) => void
  complete: () => void
  eventBinder: EventBinder
  componentRunner: ComponentRunner
  componentWirer: ComponentWirer
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
    complete: () => {
      console.debug(`${key.toString()} binding completed`, item)
      complete()
    },
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
    complete: () => {
      console.debug(`Change binding completed`, item)
      complete()
    },
  })
}

export function bindClassListKey(
  item: Element,
  key: string,
  observable: Observable<boolean>,
  error: (error: unknown) => void,
  complete: () => void,
) {
  return observable.subscribe({
    next: (value) => {
      if (value) {
        item.classList.add(key)
      } else {
        item.classList.remove(key)
      }
    },
    error,
    complete: () => {
      console.debug(`${key.toString()} classList binding completed`, item)
      complete()
    },
  })
}

export function bindClassListChanges(
  item: Element,
  observable: Observable<Record<string, boolean>>,
  error: (error: unknown) => void,
  complete: () => void,
) {
  return observable.subscribe({
    next: (changes) => {
      const adds: string[] = []
      const removes: string[] = []
      for (const [key, add] of Object.entries(changes)) {
        if (add) {
          adds.push(key)
        } else {
          removes.push(key)
        }
      }
      if (adds.length > 0) {
        item.classList.add(...adds)
      }
      if (removes.length > 0) {
        item.classList.remove(...removes)
      }
    },
    error,
    complete: () => {
      console.debug(`classList changes binding completed`, item)
      complete()
    },
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

export function scheduledKey(key: string | number | symbol) {
  if (key === 'bfDelayValue') {
    return 'value'
  }
  return key
}

export function makeEntries(
  key: string | number | symbol,
  observable: Observable<unknown>,
) {
  return observable.pipe(map((value) => [key, value] as Entry))
}

function bindElementBinds(
  element: Element,
  description: ElementDescription,
  { complete, error, suspense, subscription }: BindingContext,
) {
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
      schedulables.push([scheduledKey(key), observable] as ObservableEntry)
    } else {
      subscription.add(bindObjectKey(element, key, observable, error, complete))
    }
  }

  if (schedulables.length) {
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
  }
}

function bindElementEvents(
  element: Element,
  description: ElementDescription,
  { eventBinder, subscription }: BindingContext,
) {
  for (const [key, event] of Object.entries(description.events)) {
    subscription.add(eventBinder.applyEvent(event, element, key))
  }
}

function bindElementChildren(
  element: Element,
  description: ElementDescription,
  context: BindingContext,
  document = globalThis.document,
) {
  const { complete, componentRunner, componentWirer, error, subscription } =
    context
  if (description.childrenBind) {
    if (description.childrenBindMode === 'replace') {
      const placeholder = document.createComment(`replaceable child component`)
      element.append(placeholder)
      const activeChild = description.childrenBind.pipe(
        switchMap((child) =>
          componentWirer(child, context, undefined, document),
        ),
      )
      const childComponent = activeChild as ObservableComponent
      childComponent.name = `${element.nodeName} replaceable child`
      subscription.add(
        componentRunner(
          element,
          childComponent,
          context,
          placeholder,
          document,
        ),
      )
    } else {
      subscription.add(
        description.childrenBind.subscribe({
          next(child) {
            const placeholder = document.createComment(
              `${child.name} component`,
            )
            if (description.childrenBindMode === 'prepend') {
              element.prepend(placeholder)
            } else {
              element.append(placeholder)
            }
            subscription.add(
              componentRunner(element, child, context, placeholder, document),
            )
          },
          error,
          complete: () => {
            console.debug(`Children binding completed`, element)
            complete()
          },
        }),
      )
    }
  }
}

function bindElementClasses(
  element: Element,
  description: ElementDescription,
  { complete, error, subscription, suspense }: BindingContext,
) {
  if (Object.keys(description.classBind).length > 0) {
    const entries: Observable<Entry>[] = []
    for (const [key, observable] of Object.entries(description.classBind)) {
      entries.push(makeEntries(key, observable))
    }
    subscription.add(
      bindClassListChanges(
        element,
        bufferEntries(merge(...entries), suspense) as Observable<
          Record<string, boolean>
        >,
        error,
        complete,
      ),
    )
  }

  for (const [key, observable] of Object.entries(
    description.immediateClassBind,
  )) {
    subscription.add(
      bindClassListKey(element, key, observable, error, complete),
    )
  }
}

function bindElementStyles(
  element: HTMLElement,
  description: ElementDescription,
  { complete, error, subscription, suspense }: BindingContext,
) {
  if (Object.keys(description.styleBind).length > 0) {
    const entries: Observable<Entry>[] = []
    for (const [key, observable] of Object.entries(description.styleBind)) {
      entries.push(makeEntries(key, observable))
    }
    subscription.add(
      bindObjectChanges(
        element.style,
        bufferEntries(merge(...entries), suspense),
        error,
        complete,
      ),
    )
  }

  for (const [key, observable] of Object.entries(
    description.immediateStyleBind,
  )) {
    subscription.add(
      bindObjectKey(element.style, key, observable, error, complete),
    )
  }
}

export function bindElement(
  element: Element,
  description: ElementDescription,
  context: BindingContext,
  document = globalThis.document,
) {
  const { subscription } = context

  bindElementBinds(element, description, context)
  bindElementEvents(element, description, context)
  bindElementChildren(element, description, context, document)
  bindElementClasses(element, description, context)
  // TODO: Should we test this assumption somehow that style bindings only apply to HTMLElement and not Element in general?
  bindElementStyles(element as HTMLElement, description, context)

  return subscription
}

export function bindFragmentChildren(
  nodeDescription: FragmentDescription,
  node: Element | CharacterData,
  subscription: Subscription,
  context: BindingContext,
  document = globalThis.document,
) {
  const { complete, error, componentRunner, componentWirer } = context
  if (nodeDescription.childrenBind) {
    const parent = node.parentElement
    if (!parent) {
      throw new Error('Attempted to bind children to an unattached fragment')
    }

    if (nodeDescription.childrenBindMode === 'replace') {
      const activeChild = nodeDescription.childrenBind.pipe(
        switchMap((child) =>
          componentWirer(child, context, undefined, document),
        ),
      )
      const childComponent = activeChild as ObservableComponent
      childComponent.name = `${node.nodeName} replaceable child`
      subscription.add(
        componentRunner(
          node.parentElement,
          childComponent,
          context,
          node,
          document,
        ),
      )
    } else {
      subscription.add(
        nodeDescription.childrenBind.subscribe({
          next(child) {
            const placeholder = document.createComment(
              `${child.name} component`,
            )
            if (nodeDescription.childrenBindMode === 'prepend') {
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
}
