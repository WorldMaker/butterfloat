import { DefaultEvents } from '../../events'
import {
  Attributes,
  ChildrenBind,
  ChildrenBindMode,
  ClassBind,
  Component,
  DefaultBind,
  DefaultStyleBind,
} from '../component'
import { type jsx } from '../mat'

/**
 * Possible descriptions of the children of a Component or Element
 */
export type JsxChildrenDescription = Array<NodeDescription | string>

/**
 * A Description that supports binding Children
 */
export interface ChildrenBindDescription {
  /**
   * The static children
   */
  children: JsxChildrenDescription
  /**
   * Children bindings
   */
  childrenBind?: ChildrenBind
  /**
   * The mode to bind children
   */
  childrenBindMode?: ChildrenBindMode
}

/**
 * Description of a DOM element and its bindings
 */
export interface ElementDescription<Bind = DefaultBind>
  extends ChildrenBindDescription {
  /**
   * The type of the description
   */
  type: 'element'
  /**
   * The element name/type
   */
  element: string
  /**
   * The attributes of the element
   */
  attributes: Attributes
  /**
   * Bindings
   */
  bind: Bind
  /**
   * Immediate bindings
   */
  immediateBind: Bind
  /**
   * Events
   */
  events: DefaultEvents
  /**
   * Style bindings
   */
  styleBind: DefaultStyleBind
  /**
   * Immediate style bindings
   */
  immediateStyleBind: DefaultStyleBind
  /**
   * Class bindings
   */
  classBind: ClassBind
  /**
   * Immediate class bindings
   */
  immediateClassBind: ClassBind
}

/**
 * Description of a Component binding
 */
export interface ComponentDescription {
  /**
   * The type of the description
   */
  type: 'component'
  /**
   * The Component
   */
  component: Component
  /**
   * The properties of the component
   */
  properties: Attributes
  /**
   * The children of the component
   */
  children: JsxChildrenDescription
}

/**
 * Description of a Fragment (the `<Fragment>` pseudo-component which powers `<></>` fragment notation)
 */
export interface FragmentDescription {
  /**
   * The type of the description
   */
  type: 'fragment'
  /**
   * The children of the fragment
   */
  children: JsxChildrenDescription
}

/**
 * Description of the `<Children>` pseudo-component
 */
export interface ChildrenDescription {
  /**
   * The type of the description
   */
  type: 'children'
  /**
   * The context for the children
   */
  context?: jsx.Mat<unknown>
}

/**
 * Description of the `<Static>` pseudo-component
 */
export interface StaticDescription {
  /**
   * The type of the description
   */
  type: 'static'
  /**
   * The static element
   */
  element: Element
}

/**
 * Description of the `<Empty>` pseudo-component
 */
export interface EmptyDescription {
  /**
   * The type of the description
   */
  type: 'empty'
}

/**
 * Description of the `<Comment>` pseudo-component
 */
export interface CommentDescription {
  /**
   * The type of the description
   */
  type: 'comment'
  /**
   * The comment
   */
  comment: string
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
  | EmptyDescription
  | CommentDescription
