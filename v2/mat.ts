import type { Observable } from 'rxjs'
import type { DefaultEvents } from '../events.js'

export const matType = Symbol('matType')

/**
 * Handles an effect
 */
export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void | Promise<void>,
) => void

export type MatType = 'runner' | 'builder' | 'tester'

type JsxFunction = unknown

export interface Mat<Events = DefaultEvents> {
  [matType]: MatType
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
  jsx: JsxFunction
}
