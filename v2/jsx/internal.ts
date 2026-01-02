/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { Observable } from 'rxjs'
import type {
  ButterfloatIntrinsicAttributes,
  DefaultBind,
  DefaultStyleBind,
} from '../component.js'
import type {
  ButterfloatEvents,
  DefaultEvents,
  ObservableEvent,
} from '../../events.js'
import type { Ring } from '../ring.js'
import { WritableKeys } from '../meta-types.js'

/**
 * JSX Element type
 */
export type Element = Ring

/*
      RANT: There aren't any easily reusable types for HTML elements and their attributes to reuse here.

      @types/react uses a hand-maintained many thousands of lines file that mixes and matches React-specific
      concerns like `dangerouslySetInnerHtml`.

      Typescript's own "lib.dom" types are really cool and auto-generated from MDN metadata among other
      sources. But the focus is on JS runtime types and don't yet have directly reusable types that can be
      reflected in and used as base types for JSX.IntrinsicElements. But we can meta-type our way from
      HTMLElementTagNameMap to something resembling what we want.
*/

/**
 * Attributes of an HTML Element
 */
export type HtmlElementAttributes<T> = {
  [Property in WritableKeys<T> as T[Property] extends
    | string
    | number
    | null
    | undefined
    ? Property
    : never]?: T[Property]
}

/**
 * Observable bindable attributes of an HTML Element
 */
export type HtmlElementAttributesBind<T> = {
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
export type HtmlEvents<EventMap = HTMLElementEventMap> = {
  [Property in keyof EventMap]?: ObservableEvent<EventMap[Property]>
}

/**
 * All Butterfloat bindable attributes of an element
 */
export type ButterfloatElementBind<T> = HtmlElementAttributesBind<T> &
  DefaultBind

/**
 * All Butterfloat bindable events of an element
 */
export type ButterfloatElementEvents = HtmlEvents &
  ButterfloatEvents &
  DefaultEvents

/**
 * All bindable CSS styles of an HTML element
 */
export type HtmlElementStyleBind = {
  [Property in keyof CSSStyleDeclaration]?: Observable<
    CSSStyleDeclaration[Property]
  >
}

/**
 * All Butterfloat bindable CSS styles
 */
export type ButterfloatElementStyleBind = HtmlElementStyleBind &
  DefaultStyleBind

/**
 * Attributes available in Butterfloat from an HTML element
 */
export type ButterfloatElementAttributes<T> = HtmlElementAttributes<T> &
  ButterfloatIntrinsicAttributes<
    ButterfloatElementBind<T>,
    ButterfloatElementEvents,
    ButterfloatElementStyleBind
  >

/**
 * Available HTML Elements
 */
export type HtmlElements = {
  [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes<
    HTMLElementTagNameMap[Property]
  >
}

/**
 * JSX "intrinsic" elements (HTML elements for DOM binding)
 */
export interface IntrinsicElements extends HtmlElements {
  [ele: string]: ButterfloatIntrinsicAttributes
}

/**
 * JSX "intrinsic" attributes (additional attributes on JSX "intrinsics")
 */
export type IntrinsicAttributes = object // ChildrenBindable
