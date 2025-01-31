/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { Observable } from 'rxjs'
import type {
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
import type {
  ButterfloatEvents,
  DefaultEvents,
  ObservableEvent,
} from './events'

/**
 * Overloads to Typescript's JSX typing
 */
declare namespace JSXInternal {
  /**
   * JSX Element type
   */
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

  /**
   * If types are equal. Meta-type for complex conditional types.
   */
  export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

  /**
   * Collect the writable keys of a type.
   */
  export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<
      { [Q in P]: T[P] },
      { -readonly [Q in P]: T[P] },
      P
    >
  }[keyof T]

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
  export type IntrinsicAttributes = ChildrenBindable
}

/**
 * Properties supported by the `<Children>` pseudo-component
 */
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
  attributes: ButterfloatAttributes,
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
 * Properties supported by the `<Static>` pseudo-component
 */
export interface StaticProperties {
  /**
   * A static element to attach to the DOM tree.
   */
  element: Element
}

/**
 * Attach a static DOM element
 *
 * @param props Static properties
 * @returns Static node
 */
export function Static({ element }: StaticProperties): NodeDescription {
  return {
    type: 'static',
    element,
  }
}

/**
 * Describe a node. Builder for JSX and TSX transformation.
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
  children = children.flat().map((child: string | NodeDescription | number) => {
    if (typeof child === 'number') {
      return child.toLocaleString()
    }
    return child
  })

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
    // immediately flatten fragments or children or statics
    if (element === Fragment || element === Children || element === Static) {
      const func = element as (
        attributes: unknown,
        ...children: JsxChildren
      ) => NodeDescription
      return func(attributes ?? {}, ...children)
    }

    const { childrenBind, childrenBindMode, ...otherAttributes } =
      attributes ?? {}

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

/**
 * Describe a node. Builder for JSX and TSX transformation.
 */
export declare namespace jsx {
  /**
   * JSX typing internals
   */
  export import JSX = JSXInternal
}
