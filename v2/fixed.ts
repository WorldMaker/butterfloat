import { Observable } from 'rxjs'

const bfFixed = Symbol('bfFixed')

/**
 * A FixedObservable represents an Observable that may complete intentionally
 */
export type FixedObservable<T> = Observable<T> & { [bfFixed]: true }

/**
 * An Observable that may or may not be fixed
 */
export type BindObservable<T> = FixedObservable<T> | Observable<T>

/**
 * Is the observable fixed?
 * @param observable Binding observable
 * @returns Observable is fixed
 */
export function isFixed<T>(
  observable: BindObservable<T>,
): observable is FixedObservable<T> {
  return (
    bfFixed in observable &&
    (observable as FixedObservable<T>)[bfFixed] === true
  )
}

/**
 * Mark an observable as fixed
 * @param observable Binding observable
 * @returns Fixed observable
 */
export function fixed<T>(observable: Observable<T>): FixedObservable<T> {
  const fixedobs = observable as FixedObservable<T>
  fixedobs[bfFixed] = true
  return fixedobs
}
