import {
  Observable,
  SchedulerLike,
  Subscription,
  animationFrameScheduler,
  debounceTime,
} from 'rxjs'
import { ElementDescription } from './component.js'

export function bindImmediate(
  // intentional metaprogramming
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any,
  key: string | number | symbol,
  observable: Observable<unknown>,
  error: (error: unknown) => void,
  complete: () => void,
  subscription: Subscription,
) {
  subscription.add(
    observable.subscribe({
      next: (value) => {
        item[key] = value
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
  error: (error: unknown) => void,
  complete: () => void,
  subscription: Subscription,
  defaultScheduler: SchedulerLike = animationFrameScheduler,
) {
  subscription.add(
    observable.pipe(debounceTime(0, defaultScheduler)).subscribe({
      next: (value) => {
        item[key] = value
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
  subscription?: Subscription,
  defaultScheduler: SchedulerLike = animationFrameScheduler,
) {
  if (!subscription) {
    subscription = new Subscription()
  }

  // TODO: deeper error/completion infrastructure
  const error = (error: unknown) => console.error(error)
  const complete = () => {}

  for (const [key, observable] of Object.entries(description.immediateBind)) {
    bindImmediate(element, key, observable, error, complete, subscription)
  }

  for (const [key, observable] of Object.entries(description.bind)) {
    // value usually means user-interaction surfaces such as HTML input elements, so always immediately bind it
    if (key === 'value') {
      bindImmediate(element, key, observable, error, complete, subscription)
    } else {
      bindScheduled(
        element,
        key,
        observable,
        error,
        complete,
        subscription,
        defaultScheduler,
      )
    }
  }

  // TODO: Children bind

  return subscription
}
