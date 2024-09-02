import { Observable, Subscription } from 'rxjs'
import {
  Component,
  ComponentContext,
  ComponentDescription,
  ElementDescription,
  NodeDescription,
} from './component.js'

export type ElementBinds = Array<[Element, ElementDescription]>
export type NodeBinds = Array<[CharacterData | Element, NodeDescription]>

export type DomStrategy = (
  component: Component,
  properties: unknown,
  componentContext: ComponentContext,
  document: Document,
) => {
  container: Element | DocumentFragment
  elementBinds: ElementBinds
  nodeBinds: NodeBinds
}

export interface WiringContext {
  domStrategy: DomStrategy
  suspense?: Observable<boolean>
  treeError?: (error: unknown) => void
  isStaticComponent: boolean
  isStaticTree: boolean
  preserveOnComplete?: boolean
}

export type ObservableComponent = Observable<Element> & { name: string }

export type ComponentRunner = (
  container: Element,
  description: ComponentDescription | Component | ObservableComponent,
  context: WiringContext,
  placeholder: Element | CharacterData,
  document?: Document,
) => Subscription

export type ComponentWirer = (
  component: ComponentDescription | Component | ObservableComponent,
  context: WiringContext,
  document?: Document,
) => Observable<Element>
