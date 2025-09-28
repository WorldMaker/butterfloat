import type { Observable } from 'rxjs'
import type { ButterfloatEvents, DefaultEvents } from '../events.js'
import { Ring } from './ring.js'
import { Mat } from './mat.js'

/**
 * A Butterfloat Component provided properties and additional context-sensitive tools
 */
// Want to be forgiving in what we accept as a "component"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Component<Props = any, Events = any> = (
  props: Props,
  context: Mat<Events>,
) => Ring

/**
 * Possible children to a JSX node
 */
export type JsxChildren = Array<Ring | string>

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
