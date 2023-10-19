import { Observable } from "rxjs"

export interface ComponentContext {
    props: any
    events: any
    bindEffect: any
}

export type ContextComponent = (context: ComponentContext) => NodeDescription

export type SimpleComponent = () => NodeDescription

export type Component = ContextComponent | SimpleComponent

export type Children = Array<NodeDescription | string>

export type Attributes = Record<string, unknown> | null

export type HtmlAttributes = Record<string, unknown>

export interface ButterfloatAttributes extends HtmlAttributes {
    /**
     * Bind an observable to an DOM property.
     * 
     * May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.
     */
    bind?: Bind
    /**
     * Immediately bind an observable to a DOM property
     */
    immediateBind?: Bind
}

export type Bind = Record<string, Observable<unknown>>

export interface ElementDescription {
    type: 'element'
    element: string
    attributes: Attributes
    bind: Bind
    immediateBind: Bind
    children: Children
}

export interface ComponentDescription {
    type: 'component'
    component: Component
    properties: Attributes
    children: Children
}

export interface FragmentDescription {
    type: 'fragment'
    attributes: Attributes
    children: Children
}

export type NodeDescription = ElementDescription | ComponentDescription | FragmentDescription
