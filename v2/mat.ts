/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { Observable } from 'rxjs'
import type { DefaultEvents } from '../events.js'
import { ButterfloatAttributes, Component, JsxChildren } from './component.js'
import { Ring } from './ring.js'

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

export type JsxFunction = (
  element: string | Component,
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
) => Ring

export interface Mat<Events = DefaultEvents> {
  [matType]: MatType
  [componentChildren]?: JsxChildren
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
  jsx: JsxFunction
}
