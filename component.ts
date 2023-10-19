export interface ComponentContext {
    props: any
    events: any
    bindEffect: any
}

export type ContextComponent = (context: ComponentContext) => NodeDescription

export type SimpleComponent = () => NodeDescription

export type Component = ContextComponent | SimpleComponent

export interface ElementDescription {
    type: 'element'
    element: string
    attrs: any
    children: any[]
}

export interface ComponentDescription {
    type: 'component'
    component: Component
    props: any
    children: any[]
}

export interface FragmentDescription {
    type: 'fragment'
    attrs: any
    children: any[]
}

export type NodeDescription = ElementDescription | ComponentDescription | FragmentDescription
