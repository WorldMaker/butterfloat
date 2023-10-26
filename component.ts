import { Observable } from 'rxjs'
import { DefaultEvents } from './events'

export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void,
) => void

export interface ComponentContext<Events = DefaultEvents> {
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
}

export type ContextComponent = (
  // Want to be forgiving in what we accept as a "component"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: ComponentContext<any>,
) => NodeDescription

export type SimpleComponent = () => NodeDescription

export type Component = ContextComponent | SimpleComponent

export type JsxChildren = Array<NodeDescription | string>

export type Attributes = Record<string, unknown>

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

export type DefaultBind = Record<string, Observable<unknown>>

export interface ButterfloatIntrinsicAttributes<
  Bind = DefaultBind,
  Events = DefaultEvents,
> extends ButterfloatAttributes {
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
  events?: Events
}

/*
    Discussion: the "Description" types look a lot more verbose than a "standard" VNode
    interface in a Virtual DOM. In this case, this is because this isn't intended for
    virtual DOM usage. These should last only long enough to build a static DOM and bind
    it, then tossed. There's no intention to have a diff/patch between trees of these.

    On the other hand, these objects are still useful for DOM-less unit testing of
    components.

    So it makes sense to use full words. Users may work with these in their tests.
*/

export interface ElementDescription<Bind = DefaultBind> {
  type: 'element'
  element: string
  attributes: Attributes
  bind: Bind
  immediateBind: Bind
  children: JsxChildren
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
  events: DefaultEvents
}

export interface ComponentDescription {
  type: 'component'
  component: Component
  properties: Attributes
  children: JsxChildren
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
}

export interface FragmentDescription {
  type: 'fragment'
  attributes: Attributes
  children: JsxChildren
  childrenBind?: ChildrenBind
  childrenPrepend?: boolean
}

export interface ChildrenDescription {
  type: 'children'
  context?: ComponentContext<unknown>
}

export type NodeDescription =
  | ElementDescription
  | ComponentDescription
  | FragmentDescription
  | ChildrenDescription

export function makeTestComponentContext<Events = DefaultEvents>(
  events: Events,
) {
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effects: Array<[Observable<unknown>, (item: any) => void]> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const immediateEffects: Array<[Observable<unknown>, (item: any) => void]> = []
  const context: ComponentContext<Events> = {
    events,
    bindEffect: (observable, effect) => effects.push([observable, effect]),
    bindImmediateEffect: (observable, effect) =>
      immediateEffects.push([observable, effect]),
  }
  return { context, effects, immediateEffects }
}
