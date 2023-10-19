import { Component, NodeDescription } from "./component"

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

export function Fragment(attrs: any, ...children: any[]): NodeDescription {
    return {
        type: 'fragment',
        attrs,
        children
    }
}

export function jsx(element: string | Component, attrs: any, ...children: any[]): NodeDescription {
    if (typeof element === 'string') {
        return {
            type: 'element',
            element,
            attrs,
            children
        }
    }
    if (typeof element === 'function') {
        if (element === Fragment) {
            return {
                type: 'fragment',
                attrs,
                children
            }
        }
        return {
            type: 'component',
            component: element,
            props: attrs,
            children
        }
    }
    throw new Error(`Unsupported jsx in ${element}`)
}

export namespace jsx {
    export import JSX = JSXInternal;
}
