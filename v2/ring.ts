import type {
  ChildrenBindDescription,
  ClassBind,
  DefaultBind,
  DefaultStyleBind,
  NodeDescription,
} from '../component.js'
import type { DefaultEvents } from '../events.js'

export const ringType = Symbol('ringType')
export const toBinds = Symbol('toBinds')
export const toElement = Symbol('toElement')
export const addChild = Symbol('addChild')
export const describe = Symbol('describe')
export const canProvideRing = Symbol('canProvideRing')

export interface ElementBindDescription<Bind = DefaultBind>
  extends ChildrenBindDescription {
  bind: Bind
  immediateBind: Bind
  events: DefaultEvents
  styleBind: DefaultStyleBind
  immediateStyleBind: DefaultStyleBind
  classBind: ClassBind
  immediateClassBind: ClassBind
}

/**
 * Component output state
 */
export type Ring = InertRing | RunnableRing | BuildableRing | DescribableRing

export interface InertRing {
  [ringType]: 'inert'
}

export interface RunnableRing {
  [ringType]: 'runnable'
  [toBinds](): ElementBindDescription | null
}

export interface BuildableRing {
  [ringType]: 'buildable'
  [toBinds](): ElementBindDescription | null
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
}

export function isRingProvider(value: unknown): value is RingProvider {
  return (
    (typeof value === 'function' || typeof value === 'object') &&
    value !== null &&
    canProvideRing in value &&
    Boolean(value[canProvideRing])
  )
}
