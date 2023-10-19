import { Attributes, Children, Component, NodeDescription } from "./component"

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
        [ele: string]: any
    }
}

export function Fragment(attributes: Attributes, ...children: Children): NodeDescription {
    return {
        type: 'fragment',
        attributes,
        children
    }
}

export function jsx(element: string | Component, attributes: Attributes, ...children: Children): NodeDescription {
    if (typeof element === 'string') {
        return {
            type: 'element',
            element,
            attributes,
            children
        }
    }
    if (typeof element === 'function') {
        if (element === Fragment) {
            return {
                type: 'fragment',
                attributes,
                children
            }
        }
        return {
            type: 'component',
            component: element,
            properties: attributes,
            children
        }
    }
    throw new Error(`Unsupported jsx in ${element}`)
}

export namespace jsx {
    export import JSX = JSXInternal;
}
