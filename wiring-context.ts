import { Observable, Subscription } from 'rxjs'
import { Component, ComponentDescription } from './component.js'

export interface WiringContext {
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
