import {
  Observable,
  Subscription,
  animationFrameScheduler,
  bufferTime,
  combineLatest,
  debounceTime,
  filter,
  map,
  merge,
  scan,
} from 'rxjs'
import { ElementDescription } from './component.js'

type ObservableEntry = [string | number | symbol, Observable<unknown>]
type Entry = [string | number | symbol, unknown]
type Entries = Entry[]

export interface BindingContext {
  error: (error: unknown) => void
  complete: () => void
  suspense?: Observable<boolean>
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

export function schedule(observable: Observable<unknown>) {
  return observable.pipe(debounceTime(0, animationFrameScheduler))
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
      schedulables.push([key, observable] as ObservableEntry)
    } else {
      subscription.add(bindObjectKey(element, key, observable, error, complete))
    }
  }

  const scheduled = schedulables.map(([key, observable]) =>
    makeEntries(key, schedule(observable)),
  )
  subscription.add(
    bindObjectChanges(
      element,
      bufferEntries(merge(...scheduled), suspense),
      error,
      complete,
    ),
  )

  // TODO: Children bind

  return subscription
}
