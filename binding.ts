import {
  Observable,
  Subscription,
  animationFrameScheduler,
  combineLatest,
  debounceTime,
  filter,
  map,
} from 'rxjs'
import { ElementDescription } from './component.js'

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

export function schedule(
  key: string | number | symbol,
  observable: Observable<unknown>,
  immediate: boolean,
  suspense?: Observable<boolean>,
) {
  // value usually means user-interaction surfaces such as HTML input elements, so don't schedule it
  if (immediate || key === 'value') {
    return observable
  }
  if (suspense) {
    observable = combineLatest([suspense, observable]).pipe(
      filter(([suspend]) => !suspend),
      map(([, value]) => value),
    )
  }
  return observable.pipe(debounceTime(0, animationFrameScheduler))
}

export function bindElement(
  element: HTMLElement,
  description: ElementDescription,
  { complete, error, suspense, subscription }: BindingContext,
) {
  for (const [key, observable] of Object.entries(description.bind)) {
    const scheduled = schedule(key, observable, false, suspense)
    subscription.add(bindObjectKey(element, key, scheduled, error, complete))
  }

  for (const [key, observable] of Object.entries(description.immediateBind)) {
    const scheduled = schedule(key, observable, true, suspense)
    subscription.add(bindObjectKey(element, key, scheduled, error, complete))
  }

  // TODO: Children bind

  return subscription
}
