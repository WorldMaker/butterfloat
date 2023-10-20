import { Observable } from 'rxjs'
import { DefaultEvents } from './events'

export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void,
) => void

export interface ComponentContext<
  Events extends DefaultEvents = DefaultEvents,
> {
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
}

export type ContextComponent = (
  props: any,
  context: ComponentContext<any>,
) => NodeDescription

export type SimpleComponent = () => NodeDescription

export type Component = ContextComponent | SimpleComponent

export type Children = Array<NodeDescription | string>

export type Attributes = Record<string, unknown> | null

export type HtmlAttributes = Record<string, unknown>

export type ChildrenBind = Observable<NodeDescription>

export interface ChildrenBindable {
  /**
   * Bind children as they are observed.
   */
  childrenBind?: ChildrenBind
  /**
   * When binding children, prepend them rather than the default append.
   */
  childrenPrepend?: boolean
}

export type ButterfloatAttributes = HtmlAttributes & ChildrenBindable

export interface ButterfloatIntrinsicAttributes extends ButterfloatAttributes {
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
  /**
   * Bind an event observable to a DOM event.
   */
  events?: DefaultEvents
}

export type Bind = Record<string, Observable<unknown>>

export interface ElementDescription {
  type: 'element'
  element: string
  attributes: Attributes
  bind: Bind
  immediateBind: Bind
  children: Children
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
  events: DefaultEvents
}

export interface ComponentDescription {
  type: 'component'
  component: Component
  properties: Attributes
  children: Children
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
}

export interface FragmentDescription {
  type: 'fragment'
  attributes: Attributes
  children: Children
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
}

export type NodeDescription =
  | ElementDescription
  | ComponentDescription
  | FragmentDescription
