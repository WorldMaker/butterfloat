/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import { JsxInternal } from './index.js'
import { ButterfloatAttributes, Component, JsxChildren } from '../component.js'
import { inertRing, Ring } from '../ring.js'

/**
 * Builder for JSX and TSX transformation.
 * @param element An element to build
 * @param attributes Attributes
 * @param children Children
 * @returns Ring
 */
export function jsx(
  _element: string | Component,
  _attributes: ButterfloatAttributes | null,
  ..._children: JsxChildren
): Ring {
  return inertRing
}

/**
 * Builder for JSX and TSX transformation.
 */
export declare namespace jsx {
  /**
   * JSX typing internals
   */
  export import JSX = JsxInternal
}
