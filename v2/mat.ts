/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { Observable } from 'rxjs'
import { ButterfloatAttributes, Component, JsxChildren } from './component.js'
import * as JsxInternal from './jsx/internal.js'
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

interface Mat<Events = unknown, Props = unknown> {
  /**
   * @internal
   */
  [matType]: MatType
  /**
   * @internal
   */
  [componentChildren]?: JsxChildren
  /**
   * Events that the component expects to bind.
   */
  events: Events
  /**
   * Bind an effect.
   */
  bindEffect: EffectHandler
  /**
   * Bind an effect that should run without scheduled delays.
   */
  bindImmediateEffect: EffectHandler
  /**
   * JSX function to build appropriate Rings for this Mat
   */
  jsx: JsxFunction
  /**
   * Mark the component as stable output regardless of props.
   * @returns nothing
   */
  stamp: () => void
  /**
   * Mark the component as stable output when a condition is met.
   * @param condition A function that receives the component props and returns whether the stamp matches.
   * @returns nothing
   */
  stampWhen: (condition: (props: Props) => boolean) => void
}

/**
 * Builder for JSX and TSX transformation.
 */
export declare namespace jsx {
  export { Mat }

  /**
   * JSX typing internals
   */
  export import JSX = JsxInternal
}
