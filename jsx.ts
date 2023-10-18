import { Component, NodeDescription } from "./component"

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
