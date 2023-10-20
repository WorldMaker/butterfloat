import {
  ButterfloatAttributes,
  ButterfloatIntrinsicAttributes,
  Children,
  ChildrenBindable,
  Component,
  NodeDescription,
} from './component'

namespace JSXInternal {
  export type Element = NodeDescription

  /*
        RANT: There aren't any easily reusable types for HTML elements and their attributes to reuse here.

        @types/react uses a hand-maintained many thousands of lines file that mixes and matches React-specific
        concerns like `dangerouslySetInnerHtml`.

        Typescript's own "lib.dom" types are really cool and auto-generated from MDN metadata among other
        sources. But the focus is on JS runtime types and don't yet have reusable types that can be reflected
        in and used as base types for JSX.IntrinsicElements.
    */

  export interface IntrinsicElements {
    [ele: string]: ButterfloatIntrinsicAttributes
  }

  export type IntrinsicAttributes = ChildrenBindable
}

export function Fragment(
  attributes: ButterfloatAttributes | null,
  ...children: Children
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
  ...children: Children
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

    // immediately flatten fragments
    if (element === Fragment) {
      return {
        type: 'fragment',
        attributes: otherAttributes,
        children,
        childrenBind,
        childrenPrepend,
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
