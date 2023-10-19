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

export interface ElementDescription {
    type: 'element'
    element: string
    attributes: Attributes
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
