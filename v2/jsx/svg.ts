/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.

import { Observable } from 'rxjs'
import { WritableKeys } from '../meta-types'
import { Ring } from '../ring'
import { ButterfloatEvents, DefaultEvents, ObservableEvent } from '../../events'
import {
  ButterfloatIntrinsicAttributes,
  DefaultBind,
  DefaultStyleBind,
} from '../component'

/**
 * Overloads to Typescript's JSX typing: SVG Edition
 */

/**
 * JSX Element type
 */
export type Element = Ring

/*
      RANT: There aren't any easily reusable types for SVG elements and their attributes to reuse here.

      @types/react uses a hand-maintained many thousands of lines file that mixes and matches React-specific
      concerns like `dangerouslySetInnerHtml`.

      Typescript's own "lib.dom" types are really cool and auto-generated from MDN metadata among other
      sources. But the focus is on JS runtime types and don't yet have directly reusable types that can be
      reflected in and used as base types for JSX.IntrinsicElements. But we can meta-type our way from
      SVGElementTagNameMap to something resembling what we want.
*/

/**
 * Attributes of an SVG Element
 */
export type SvgElementAttributes<T> = {
  [Property in WritableKeys<T> as T[Property] extends
    | string
    | number
    | null
    | undefined
    ? Property
    : never]?: T[Property]
}

/**
 * Observable bindable attributes of an SVG Element
 */
export type SvgElementAttributesBind<T> = {
  [Property in WritableKeys<T> as T[Property] extends
    | string
    | number
    | null
    | undefined
    ? Property
    : never]?: Observable<T[Property]>
}

/**
 * Bindable DOM events
 */
export type SvgEvents<EventMap = SVGElementEventMap> = {
  [Property in keyof EventMap]?: ObservableEvent<EventMap[Property]>
}

/**
 * All Butterfloat bindable attributes of an element
 */
export type ButterfloatElementBind<T> = SvgElementAttributesBind<T> &
  DefaultBind

/**
 * All Butterfloat bindable events of an element
 */
export type ButterfloatElementEvents = SvgEvents &
  ButterfloatEvents &
  DefaultEvents

/**
 * All bindable CSS styles of an SVG element
 */
export type SvgElementStyleBind = {
  [Property in keyof CSSStyleDeclaration]?: Observable<
    CSSStyleDeclaration[Property]
  >
}

/**
 * All Butterfloat bindable CSS styles
 */
export type ButterfloatElementStyleBind = SvgElementStyleBind & DefaultStyleBind

/**
 * Attributes available in Butterfloat from an SVG element
 */
export type ButterfloatElementAttributes<T> = SvgElementAttributes<T> &
  ButterfloatIntrinsicAttributes<
    ButterfloatElementBind<T>,
    ButterfloatElementEvents,
    ButterfloatElementStyleBind
  >

/**
 * Available SVG Elements
 */
export type SvgElements = {
  [Property in keyof SVGElementTagNameMap]: ButterfloatElementAttributes<
    SVGElementTagNameMap[Property]
  >
}

/**
 * JSX "intrinsic" elements (HTML elements for DOM binding)
 */
export interface IntrinsicElements extends SvgElements {
  [ele: string]: ButterfloatIntrinsicAttributes
}

/**
 * JSX "intrinsic" attributes (additional attributes on JSX "intrinsics")
 */
export type IntrinsicAttributes = object // ChildrenBindable
