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
import { Mat } from '../mat'

export type JsxChildrenDescription = Array<NodeDescription | string>

/**
 * A Description that supports binding Children
 */
export interface ChildrenBindDescription {
  children: JsxChildrenDescription
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
export interface FragmentDescription {
  type: 'fragment'
  children: JsxChildrenDescription
}

/**
 * Description of the `<Children>` pseudo-component
 */
export interface ChildrenDescription {
  type: 'children'
  context?: Mat<unknown>
}

/**
 * Description of the `<Static>` pseudo-component
 */
export interface StaticDescription {
  type: 'static'
  element: Element
}

/**
 * Description of the `<Empty>` pseudo-component
 */
export interface EmptyDescription {
  type: 'empty'
}

/**
 * Description of the `<Comment>` pseudo-component
 */
export interface CommentDescription {
  type: 'comment'
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
