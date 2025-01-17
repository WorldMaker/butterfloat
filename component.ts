import type { Observable } from 'rxjs'
import type { ButterfloatEvents, DefaultEvents } from './events.js'

/**
 * Handles an effect
 */
export type EffectHandler = <T>(
  observable: Observable<T>,
  effect: (item: T) => void | Promise<void>,
) => void

/**
 * Context for a component. Dependency injection mechanism for
 * effect binders and events proxies.
 */
export interface ComponentContext<Events = DefaultEvents> {
  events: Events
  bindEffect: EffectHandler
  bindImmediateEffect: EffectHandler
}

/**
 * A Butterfloat Component provided properties and additional context-sensitive tools
 */
// Want to be forgiving in what we accept as a "component"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContextComponent<Props = any, Events = any> = (
  props: Props,
  context: ComponentContext<Events>,
) => NodeDescription

/**
 * The simplest form of Butterfloat Component
 */
export type SimpleComponent = () => NodeDescription

/**
 * A Butterfloat Component
 */
export type Component = ContextComponent | SimpleComponent

/**
 * Possible children to a JSX node
 */
export type JsxChildren = Array<NodeDescription | string>

/**
 * Attributes of a Node Description
 */
export type Attributes = Record<string, unknown>

/**
 * HTML Attributes
 */
export type HtmlAttributes = Record<string, unknown>

/**
 * An Observable that produces child Components
 */
export type ChildrenBind = Observable<Component>

/**
 * The mode to bind new children to a container
 */
export type ChildrenBindMode = 'append' | 'prepend' | 'replace'

/**
 * A JSX node that may produce child Components
 */
export interface ChildrenBindable {
  /**
   * Bind children as they are observed.
   */
  childrenBind?: ChildrenBind
  /**
   * Mode in which to bind children. Defaults to 'append'.
   */
  childrenBindMode?: ChildrenBindMode
}

/**
 * Butterfloat Attributes
 */
export type ButterfloatAttributes = HtmlAttributes & ChildrenBindable

/**
 * Default bind attribute accepted binds
 */
export type DefaultBind = Record<string, Observable<unknown>>

/**
 * Support for delay binding special properties
 */
export interface DelayBind {
  /**
   * Delay scheduled binding for the "value" property.
   *
   * Value is bound immediately by default to avoid user interaction
   * problems. This provides an opt-in for tested interaction patterns
   * and rare elements that use "value" for things aren't user
   * interaction such as <progress />.
   */
  bfDelayValue?: Observable<unknown>
}

/**
 * Default styleBind attribute accepted binds
 */
export type DefaultStyleBind = Record<string, Observable<unknown>>

/**
 * Bind for classBind
 */
export type ClassBind = Record<string, Observable<boolean>>

/**
 * JSX attributes for "intrinics" (elements) supported by Butterfloat
 */
export interface ButterfloatIntrinsicAttributes<
  Bind = DefaultBind,
  Events = DefaultEvents & ButterfloatEvents,
  Style = DefaultStyleBind,
> extends ButterfloatAttributes {
  /**
   * Bind an observable to an DOM property.
   *
   * May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.
   */
  bind?: Bind & DelayBind
  /**
   * Immediately bind an observable to a DOM property
   */
  immediateBind?: Bind
  /**
   * Bind an event observable to a DOM event.
   */
  events?: Events
  /**
   * Bind an observable to a style property.
   */
  styleBind?: Style
  /**
   * Immediately bind an observable to a style property.
   */
  immediateStyleBind?: Style
  /**
   * Bind a boolean observable to the appearance of a class in classList.
   */
  classBind?: ClassBind
  /**
   * Immediately bind a boolean observable to the appearance of a class in classList.
   */
  immediateClassBind?: ClassBind
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

/**
 * A Description that supports binding Children
 */
export interface ChildrenBindDescription {
  children: JsxChildren
  childrenBind?: ChildrenBind
  childrenBindMode?: ChildrenBindMode
}

/**
 * Description of a DOM element and its bindings
 */
export interface ElementDescription<Bind = DefaultBind>
  extends ChildrenBindDescription {
  type: 'element'
  element: string
  attributes: Attributes
  bind: Bind
  immediateBind: Bind
  events: DefaultEvents
  styleBind: DefaultStyleBind
  immediateStyleBind: DefaultStyleBind
  classBind: ClassBind
  immediateClassBind: ClassBind
}

/**
 * Description of a Component binding
 */
export interface ComponentDescription extends ChildrenBindDescription {
  type: 'component'
  component: Component
  properties: Attributes
}

/**
 * Description of a Fragment (the `<Fragment>` pseudo-component which powers `<></>` fragment notation)
 */
export interface FragmentDescription extends ChildrenBindDescription {
  type: 'fragment'
  attributes: Attributes
}

/**
 * Description of the `<Children>` pseudo-component
 */
export interface ChildrenDescription {
  type: 'children'
  context?: ComponentContext<unknown>
}

/**
 * Description of the `<Static>` pseudo-component
 */
export interface StaticDescription {
  type: 'static'
  element: Element
}

/**
 * A description of a node in a Butterfloat DOM tree
 */
export type NodeDescription =
  | ElementDescription
  | ComponentDescription
  | FragmentDescription
  | ChildrenDescription
  | StaticDescription

/**
 * A Component Context for Testing purposes
 */
export interface TestComponentContext<Events = DefaultEvents> {
  context: ComponentContext<Events>
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: Array<[Observable<unknown>, (item: any) => void]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immediateEffects: Array<[Observable<unknown>, (item: any) => void]>
}

/**
 * Make a test context for testing context components.
 * @param events Mocked events for testing
 * @returns A test context for testing context component
 */
export function makeTestComponentContext<Events = DefaultEvents>(
  events: Events,
): TestComponentContext<Events> {
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

/**
 * Does an element description have any binds?
 *
 * @param description Element description
 * @returns True if any dynamic binds
 */
export function hasAnyBinds(description: ElementDescription): boolean {
  return (
    Boolean(description.childrenBind) ||
    Object.keys(description.bind).length > 0 ||
    Object.keys(description.immediateBind).length > 0 ||
    Object.keys(description.events).length > 0 ||
    Object.keys(description.styleBind).length > 0 ||
    Object.keys(description.immediateStyleBind).length > 0 ||
    Object.keys(description.classBind).length > 0 ||
    Object.keys(description.immediateClassBind).length > 0
  )
}
