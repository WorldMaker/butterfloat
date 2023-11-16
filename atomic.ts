import { BehaviorSubject, Observable } from 'rxjs'

export type StateSetter<T> = T | ((currentValue: T) => T)

/**
 * Create an atomic.
 *
 * This is just a simple BehaviorSubject constructor/wrapper that is made to resemble React's
 * useState with idea of making it less likely to leak the subject as a whole across API
 * boundaries by thinking of it as a tuple of two to four things, three of which should be
 * "private".
 * @param startingValue Starting value for atomic
 * @returns [observable, next, error, complete]
 */
export function atomic<T>(
  startingValue: T,
): [
  observable: Observable<T>,
  next: (value: StateSetter<T>) => void,
  error: (error: unknown) => void,
  complete: () => void,
] {
  const subject = new BehaviorSubject(startingValue)
  function setState(value: StateSetter<T>) {
    if (typeof value === 'function') {
      const setter = value as (currentValue: T) => T
      subject.next(setter(subject.getValue()))
    } else {
      subject.next(value)
    }
  }
  return [
    subject.asObservable(),
    setState,
    subject.error.bind(subject),
    subject.complete.bind(subject),
  ]
}
