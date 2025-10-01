import type { Observable } from 'rxjs'
import type { DefaultEvents } from '../events.js'
import { JsxChildren } from './component.js'
import { jsx } from './jsx/inert.js'

export const matType = Symbol('matType')
export const componentChildren = Symbol('componentChildren')

/**
 * Handles an effect
 */
export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void | Promise<void>,
) => void

export type MatType = 'runner' | 'builder' | 'tester'

export type JsxFunction = typeof jsx

export interface Mat<Events = DefaultEvents> {
  [matType]: MatType
  [componentChildren]?: JsxChildren
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
  jsx: JsxFunction
}
