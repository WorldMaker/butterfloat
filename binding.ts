import {
  Observable,
  SchedulerLike,
  Subscription,
  combineLatest,
  debounceTime,
  filter,
  map,
} from 'rxjs'
import { ElementDescription } from './component.js'

export interface BindingContext {
  defaultScheduler: SchedulerLike
  error: (error: unknown) => void
  complete: () => void
  heartbeat?: (item: unknown) => void
  suspense?: Observable<boolean>
  subscription: Subscription
}

export function bindImmediate(
  // intentional metaprogramming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  key: string | number | symbol,
  observable: Observable<unknown>,
  { error, complete, heartbeat, subscription }: BindingContext,
) {
  subscription.add(
    observable.subscribe({
      next: (value) => {
        item[key] = value
        if (heartbeat) {
          heartbeat(value)
        }
      },
      error,
      complete,
    }),
  )

  return subscription
}

export function bindScheduled(
  // intentional metaprogramming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  key: string | number | symbol,
  observable: Observable<unknown>,
  {
    defaultScheduler,
    error,
    complete,
    heartbeat,
    suspense,
    subscription,
  }: BindingContext,
) {
  if (suspense) {
    observable = combineLatest([suspense, observable]).pipe(
      filter(([suspend]) => !suspend),
      map(([, value]) => value),
    )
  }
  subscription.add(
    observable.pipe(debounceTime(0, defaultScheduler)).subscribe({
      next: (value) => {
        item[key] = value
        if (heartbeat) {
          heartbeat(value)
        }
      },
      error,
      complete,
    }),
  )

  return subscription
}

export function bindElement(
  element: HTMLElement,
  description: ElementDescription,
  context: BindingContext,
) {
  for (const [key, observable] of Object.entries(description.immediateBind)) {
    bindImmediate(element, key, observable, context)
  }

  for (const [key, observable] of Object.entries(description.bind)) {
    // value usually means user-interaction surfaces such as HTML input elements, so always immediately bind it
    if (key === 'value') {
      bindImmediate(element, key, observable, context)
    } else {
      bindScheduled(element, key, observable, context)
    }
  }

  // TODO: Children bind

  return context.subscription
}
