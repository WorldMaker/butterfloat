import { Observable } from 'rxjs'

interface BindMeta {
  fixed: boolean
  immediate: boolean
}

const bfMeta = Symbol('bfMeta')

/**
 * A MetaObservable represents an Observable with binding metadata
 */
export type MetaObservable<T> = Observable<T> & {
  /**
   * @internal
   */
  [bfMeta]: BindMeta
}

/**
 * An Observable that may or may not be fixed
 */
export type BindObservable<T> = MetaObservable<T> | Observable<T>

/**
 * Is the observable fixed?
 * @param observable Binding observable
 * @returns Observable is fixed
 */
export function isFixed<T>(
  observable: BindObservable<T>,
): observable is MetaObservable<T> {
  return (
    bfMeta in observable &&
    (observable as MetaObservable<T>)[bfMeta].fixed === true
  )
}

/**
 * Mark an observable as fixed
 * @param observable Binding observable
 * @returns Fixed observable
 */
export function fixed<T>(observable: Observable<T>): MetaObservable<T> {
  const fixedobs = observable as MetaObservable<T>
  fixedobs[bfMeta] = { fixed: true, immediate: false }
  return fixedobs
}

/**
 * Is the observable immediate?
 * @param observable Binding observable
 * @returns Observable is immediate
 */
export function isImmediate<T>(
  observable: BindObservable<T>,
): observable is MetaObservable<T> {
  return (
    bfMeta in observable &&
    (observable as MetaObservable<T>)[bfMeta].immediate === true
  )
}

/**
 * Mark an observable as immediate
 * @param observable Binding observable
 * @returns Immediate observable
 */
export function immediate<T>(observable: Observable<T>): MetaObservable<T> {
  const immobs = observable as MetaObservable<T>
  immobs[bfMeta] = { fixed: false, immediate: true }
  return immobs
}

/**
 * Mark an observable as fixed and immediate
 * @param observable Binding observable
 * @returns Fixed and immediate observable
 */
export function immediateFixed<T>(
  observable: Observable<T>,
): MetaObservable<T> {
  const fixedimmobs = observable as MetaObservable<T>
  fixedimmobs[bfMeta] = { fixed: true, immediate: true }
  return fixedimmobs
}

/**
 * Is the observable delayed scheduled (default)?
 * @param observable Binding observable
 * @returns Observable is delayed
 */
export function isDelayed<T>(
  observable: BindObservable<T>,
): observable is MetaObservable<T> {
  return (
    bfMeta in observable &&
    (observable as MetaObservable<T>)[bfMeta].fixed === false &&
    (observable as MetaObservable<T>)[bfMeta].immediate === false
  )
}

/**
 * Mark an observable as delayed scheduled (default)
 * @param observable Binding observable
 * @returns Default scheduled observable
 */
export function delayed<T>(observable: Observable<T>): MetaObservable<T> {
  const defobs = observable as MetaObservable<T>
  defobs[bfMeta] = { fixed: false, immediate: false }
  return defobs
}
