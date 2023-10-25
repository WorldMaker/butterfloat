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
} from './component'
import { DefaultEvents, Event } from './events'

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

  type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

  type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >
  }[keyof T]

  type HtmlElementAttributes<T> = {
    [Property in WritableKeys<T> as T[Property] extends string | number
      ? Property
      : never]?: T[Property]
  }

  type HtmlElementAttributesBind<T> = {
    [Property in WritableKeys<T> as T[Property] extends string | number
      ? Property
      : never]?: Observable<T[Property]>
  }

  type HtmlEvents<EventMap = HTMLElementEventMap> = {
    [Property in keyof EventMap]?: Event<EventMap[Property]>
  }

  type HtmlElements = {
    [Property in keyof HTMLElementTagNameMap]: HtmlElementAttributes<
      HTMLElementTagNameMap[Property]
    > &
      ButterfloatIntrinsicAttributes<
        HtmlElementAttributesBind<HTMLElementTagNameMap[Property]> &
          DefaultBind,
        HtmlEvents & DefaultEvents
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

export function Children({ context }: ChildrenProperties): NodeDescription {
  return {
    type: 'children',
    context,
  }
}

export function Fragment(
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
): NodeDescription {
  const { childrenBind, childrenPrepend, ...otherAttributes } = attributes ?? {}
  return {
    type: 'fragment',
    attributes: otherAttributes,
    children,
    childrenBind,
    childrenPrepend,
  }
}

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
      childrenPrepend,
      events,
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
      childrenPrepend,
      events: events ?? {},
    }
  }
  if (typeof element === 'function') {
    const { childrenBind, childrenPrepend, ...otherAttributes } =
      attributes ?? {}

    // immediately flatten fragments or children
    if (element === Fragment) {
      return {
        type: 'fragment',
        attributes: otherAttributes,
        children,
        childrenBind,
        childrenPrepend,
      }
    } else if (element === Children) {
      const { context } = otherAttributes
      return {
        type: 'children',
        context: context as any,
      }
    }

    return {
      type: 'component',
      component: element,
      properties: otherAttributes,
      children,
      childrenBind,
      childrenPrepend,
    }
  }
  throw new Error(`Unsupported jsx in ${element}`)
}

export namespace jsx {
  export import JSX = JSXInternal
}
