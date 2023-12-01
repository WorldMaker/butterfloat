/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import { Observable } from 'rxjs'
import {
  ButterfloatAttributes,
  ButterfloatIntrinsicAttributes,
  JsxChildren,
  ChildrenBindable,
  Component,
  ComponentContext,
  NodeDescription,
  DefaultBind,
  DefaultStyleBind,
} from './component'
import { ButterfloatEvents, DefaultEvents, ObservableEvent } from './events'

namespace JSXInternal {
  export type Element = NodeDescription

  /*
        RANT: There aren't any easily reusable types for HTML elements and their attributes to reuse here.

        @types/react uses a hand-maintained many thousands of lines file that mixes and matches React-specific
        concerns like `dangerouslySetInnerHtml`.

        Typescript's own "lib.dom" types are really cool and auto-generated from MDN metadata among other
        sources. But the focus is on JS runtime types and don't yet have directly reusable types that can be
        reflected in and used as base types for JSX.IntrinsicElements. But we can meta-type our way from
        HTMLElementTagNameMap to something resembling what we want.

        IfEquals/WritableKeys: https://stackoverflow.com/questions/52443276/how-to-exclude-getter-only-properties-from-type-in-typescript/52473108#52473108
    */

  export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

  export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >
  }[keyof T]

  export type HtmlElementAttributes<T> = {
    [Property in WritableKeys<T> as T[Property] extends string | number
      ? Property
      : never]?: T[Property]
  }

  export type HtmlElementAttributesBind<T> = {
    [Property in WritableKeys<T> as T[Property] extends string | number
      ? Property
      : never]?: Observable<T[Property]>
  }

  export type HtmlEvents<EventMap = HTMLElementEventMap> = {
    [Property in keyof EventMap]?: ObservableEvent<EventMap[Property]>
  }

  export type ButterfloatElementBind<T> = HtmlElementAttributesBind<T> &
    DefaultBind

  export type ButterfloatElementEvents = HtmlEvents &
    ButterfloatEvents &
    DefaultEvents

  export type HtmlElementStyleBind<T extends HTMLElement> = {
    [Property in keyof T['style']]?: Observable<T['style'][Property]>
  }

  export type ButterfloatElementStyleBind<T extends HTMLElement> =
    HtmlElementStyleBind<T> & DefaultStyleBind

  export type ButterfloatElementAttributes<T extends HTMLElement> =
    HtmlElementAttributes<T> &
      ButterfloatIntrinsicAttributes<
        ButterfloatElementBind<T>,
        ButterfloatElementEvents,
        ButterfloatElementStyleBind<T>
      >

  export type HtmlElements = {
    [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes<
      HTMLElementTagNameMap[Property]
    >
  }

  export interface IntrinsicElements extends HtmlElements {
    [ele: string]: ButterfloatIntrinsicAttributes
  }

  export type IntrinsicAttributes = ChildrenBindable
}

export interface ChildrenProperties {
  /**
   * Context for the component to bind the children from, for deep binding.
   *
   * This allows for binding children deeper into the tree, such as passing
   * your component's children into a "render function" of a deeper component
   * in the tree.
   */
  context?: ComponentContext<unknown>
}

/**
 * Bind the children of a component.
 *
 * @param props Children properties
 * @returns Children node
 */
export function Children({ context }: ChildrenProperties): NodeDescription {
  return {
    type: 'children',
    context,
  }
}

/**
 * Create a fragment of other nodes
 *
 * @param attributes Attributes
 * @param children Children
 * @returns Fragment node
 */
export function Fragment(
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
): NodeDescription {
  const { childrenBind, childrenBindMode, ...otherAttributes } =
    attributes ?? {}
  return {
    type: 'fragment',
    attributes: otherAttributes,
    children,
    childrenBind,
    childrenBindMode,
  }
}

/**
 * Describe a node. Builder for JSX and TSX tranformation.
 * @param element An element to build
 * @param attributes Attributes
 * @param children Children
 * @returns Node description
 */
export function jsx(
  element: string | Component,
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
): NodeDescription {
  if (typeof element === 'string') {
    const {
      bind,
      immediateBind,
      childrenBind,
      childrenBindMode,
      events,
      styleBind,
      immediateStyleBind,
      classBind,
      immediateClassBind,
      ...otherAttributes
    } = (attributes as ButterfloatIntrinsicAttributes) ?? {}
    return {
      type: 'element',
      element,
      attributes: otherAttributes,
      bind: bind ?? {},
      immediateBind: immediateBind ?? {},
      children,
      childrenBind,
      childrenBindMode,
      events: events ?? {},
      styleBind: styleBind ?? {},
      immediateStyleBind: immediateStyleBind ?? {},
      classBind: classBind ?? {},
      immediateClassBind: immediateClassBind ?? {},
    }
  }
  if (typeof element === 'function') {
    const { childrenBind, childrenBindMode, ...otherAttributes } =
      attributes ?? {}

    // immediately flatten fragments or children
    if (element === Fragment) {
      return {
        type: 'fragment',
        attributes: otherAttributes,
        children,
        childrenBind,
        childrenBindMode,
      }
    } else if (element === Children) {
      const { context } = otherAttributes
      return {
        type: 'children',
        context: context as ComponentContext<unknown>,
      }
    }

    return {
      type: 'component',
      component: element,
      properties: otherAttributes,
      children,
      childrenBind,
      childrenBindMode,
    }
  }
  throw new Error(`Unsupported jsx in ${element}`)
}

export namespace jsx {
  export import JSX = JSXInternal
}
