import { Component, NodeDescription } from "./component"

namespace JSXInternal {
    export type Element = NodeDescription
    export interface IntrinsicElements {
        [ele: string]: any
    }
}


export function jsx(element: string | Component, attrs: any, children: any): NodeDescription {
    if (typeof element === 'string') {
        return {
            type: 'element',
            element,
            attrs,
            children
        }
    }
    if (typeof element === 'function') {
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
