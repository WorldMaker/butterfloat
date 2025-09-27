import { Observable } from 'rxjs'
import type {
  ChildrenBindDescription,
  ClassBind,
  DefaultBind,
  DefaultStyleBind,
  NodeDescription,
} from './component.js'
import type { DefaultEvents } from '../events.js'

export const ringType = Symbol('ringType')
export const toBinds = Symbol('toBinds')
export const toElement = Symbol('toElement')
export const addChild = Symbol('addChild')
export const describe = Symbol('describe')
export const canProvideRing = Symbol('canProvideRing')
export const canAttachChildren = Symbol('canAttachChildren')

export interface ElementBindDescription<Bind = DefaultBind>
  extends ChildrenBindDescription {
  bind: Bind
  immediateBind: Bind
  events: DefaultEvents
  styleBind: DefaultStyleBind
  immediateStyleBind: DefaultStyleBind
  classBind: ClassBind
  immediateClassBind: ClassBind

  onError: ((error: unknown) => void) | null
  onComplete: (() => void) | null
  suspend: Observable<boolean> | null
}

/**
 * Component output state
 */
export type Ring = InertRing | RunnableRing | BuildableRing | DescribableRing

export interface InertRing {
  [ringType]: 'inert'
}

export const inertRing: InertRing = Object.freeze({
  [ringType]: 'inert' as const,
})

export interface RunnableRing {
  [ringType]: 'runnable'
  [toBinds](): Record<string, ElementBindDescription> | null
}

export interface BuildableRing {
  [ringType]: 'buildable'
  [toBinds](): Record<string, ElementBindDescription> | null
  [toElement](document: Document): Element
  [addChild](container: Element | DocumentFragment, document: Document): void
}

export interface DescribableRing {
  [ringType]: 'describable'
  [describe](): NodeDescription
}

export type RingType = Ring[typeof ringType]

export interface RingProvider {
  [canProvideRing]: boolean
  [canAttachChildren]?: boolean
}

export function isRingProvider(value: unknown): value is RingProvider {
  return (
    (typeof value === 'function' || typeof value === 'object') &&
    value !== null &&
    canProvideRing in value &&
    Boolean(value[canProvideRing])
  )
}
