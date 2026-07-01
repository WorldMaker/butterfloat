/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { Observable } from 'rxjs'
import { ButterfloatAttributes, Component, JsxChildren } from './component.js'
import * as JsxInternal from './jsx/internal.js'
import { Ring } from './ring.js'

export const matType = Symbol('matType')
export const componentChildren = Symbol('componentChildren')
export const getNextElementBindId = Symbol('getNextElementBindId')
export const registerPossibleStamp = Symbol('registerPossibleStamp')

/**
 * Handles an effect
 */
export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void | Promise<void>,
) => void

/**
 * Mat type
 * @internal
 */
export type MatType = 'runner' | 'builder' | 'tester'

/**
 * JSX function for a Butterfloat Component
 */
export type JsxFunction = (
  element: string | Component,
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
) => Ring

/**
 * Context provider for a Butterfloat Component
 */
export interface Mat<Events = unknown> {
  /**
   * @internal
   */
  [matType]: MatType
  /**
   * @internal
   */
  [componentChildren]?: JsxChildren
  /**
   * @internal
   * Get the next element bind ID.
   * @returns Element bind ID
   */
  [getNextElementBindId]: () => string
  /**
   * @internal
   * Register a possible stamp for a child component.
   * @param component Component to register
   * @param jsonProps Optional JSON serializable "canonical" representation of relevant props to this stamp.
   * @returns nothing
   */
  [registerPossibleStamp]: (component: Component, jsonProps?: unknown) => void
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
   * Bind a removal effect.
   *
   * The component is removed when the observable completes.
   */
  bindRemoval: (observable: Observable<unknown>) => void
  /**
   * JSX function to build appropriate Rings for this Mat
   */
  jsx: JsxFunction
  /**
   * Register a map of XML namespaces for the component.
   * @param xmlns Map of namespaces for the component
   * @param defaultXmlns Default namespace for the component
   * @returns nothing
   */
  mapXmlns: (xmlns: Record<string, string>, defaultXmlns?: string) => void
  /**
   * Registered default namespace for the component.
   */
  readonly defaultXmlns: string | null
  /**
   * Registered XML namespaces for the component.
   */
  readonly xmlns: Record<string, string>
  /**
   * Mark the component as stable output regardless of props.
   * @returns nothing
   */
  stamp: () => void
  /**
   * Mark the component as stable output when a condition is met.
   * @param condition A function that receives the component props and returns whether the stamp matches.
   * @param jsonProps Optional JSON serializable "canonical" representation of relevant props to this stamp.
   * @returns nothing
   */
  stampWhen: <Props = unknown>(
    condition: (props: Props) => boolean,
    jsonProps?: Props,
  ) => void
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
