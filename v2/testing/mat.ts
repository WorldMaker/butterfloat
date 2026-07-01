import { Observable } from 'rxjs'
import { JsxFunction, type jsx, matType } from '../mat.js'
import { ButterfloatAttributes, Component, JsxChildren } from '../component.js'
import { Ring, describe as ringDescribe, ringType } from '../ring.js'
import { NodeDescription } from './description.js'
import { ringDescriber } from './rings/describe.js'

export class TesterMat<Events, Props> implements jsx.Mat<Events> {
  [matType] = 'tester' as const

  constructor(public readonly events: Events) {}

  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #effects: Array<[Observable<unknown>, (item: any) => void]> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #immediateEffects: Array<[Observable<unknown>, (item: any) => void]> = []
  #removal: Observable<unknown> | null = null
  #isStamp = false
  #stampCondition: ((props: Props) => boolean) | null = null
  #stampJsonProps: Props | null = null
  #defaultXmlns: string | null = null
  #xmlns: Record<string, string> = {}

  get effects() {
    return this.#effects
  }
  get immediateEffects() {
    return this.#immediateEffects
  }
  get removal() {
    return this.#removal
  }
  get isStamp() {
    return this.#isStamp
  }
  get stampCondition() {
    return this.#stampCondition
  }
  get stampJsonProps() {
    return this.#stampJsonProps
  }
  get defaultXmlns() {
    return this.#defaultXmlns
  }
  get xmlns() {
    return this.#xmlns
  }

  jsx: JsxFunction = (
    element: string | Component,
    attributes: ButterfloatAttributes | null,
    ...children: JsxChildren
  ) => ringDescriber(this, element, attributes, ...children)

  bindEffect = <T>(observable: Observable<T>, effect: (item: T) => void) => {
    this.#effects.push([observable, effect])
  }

  bindImmediateEffect = <T>(
    observable: Observable<T>,
    effect: (item: T) => void,
  ) => {
    this.#immediateEffects.push([observable, effect])
  }

  bindRemoval = (observable: Observable<unknown>) => {
    if (this.#removal) {
      throw new Error('Cannot bind removal more than once')
    }
    this.#removal = observable
  }

  mapXmlns = (xmlns: Record<string, string>, defaultXmlns?: string) => {
    this.#xmlns = Object.assign({}, this.#xmlns, xmlns)
    this.#defaultXmlns = defaultXmlns ?? null
  }

  stamp: () => void = () => {
    if (this.#isStamp) {
      throw new Error('Cannot mark stamp more than once')
    }
    this.#isStamp = true
    this.#stampCondition = null
    this.#stampJsonProps = null
  }

  stampWhen: <StampProps = Props>(
    condition: (props: StampProps) => boolean,
    jsonProps?: StampProps,
  ) => void = (condition, jsonProps) => {
    if (this.#isStamp) {
      throw new Error('Cannot mark stamp more than once')
    }
    this.#isStamp = true
    this.#stampCondition = condition as unknown as (props: Props) => boolean
    this.#stampJsonProps = (jsonProps as Props | undefined) ?? null
  }
}

/**
 * Describe a Component's Ring output or a simple function that returns a Ring
 */
export type DescribeRingArgs<Props = unknown, Events = unknown> =
  | [component: (jsx: JsxFunction) => Ring]
  | [props: Props, component: Component<Props, Events>]
  | [props: Props, events: Events, component: Component<Props, Events>]

/**
 * A Component Context for Testing purposes
 */
export interface RingDescription<Props = unknown> {
  /**
   * The description of the Ring output of the Component
   */
  description: NodeDescription | string
  /**
   * The effects that were bound during the Component's execution
   */
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: Array<[Observable<unknown>, (item: any) => void]>
  /**
   * The immediate effects that were bound during the Component's execution
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immediateEffects: Array<[Observable<unknown>, (item: any) => void]>
  /**
   * The removal effect that was bound during the Component's execution
   */
  removal: Observable<unknown> | null
  /**
   * Whether the Component was marked as a stamp
   */
  isStamp: boolean
  /**
   * The condition used to determine if the Component should be stamped
   */
  stampCondition: ((props: Props) => boolean) | null
  /**
   * The JSON serializable "canonical" props provided for the stamp
   */
  stampJsonProps: Props | null
  /**
   * The default XML namespace registered for the Component
   */
  defaultXmlns: string | null
  /**
   * The XML namespaces registered for the Component
   */
  xmlns: Record<string, string>
}

/**
 * Describe a Component's output given props and events.
 * @param args Component to test with given events and props
 * @returns A description of the Component's output
 */
export function describeRing<Props, Events>(
  ...args: DescribeRingArgs<Props, Events>
): RingDescription<Props> {
  let ring: Ring | undefined
  let mat: TesterMat<Events, Props> | undefined
  switch (args.length) {
    case 1:
      {
        const [component] = args
        mat = new TesterMat<Events, Props>({} as Events)
        ring = component(mat.jsx)
      }
      break
    case 2:
      {
        const [props, component] = args
        mat = new TesterMat<Events, Props>({} as Events)
        ring = component(props, mat)
      }
      break
    case 3:
      {
        const [props, events, component] = args
        mat = new TesterMat<Events, Props>(events)
        ring = component(props, mat)
      }
      break
  }
  if (!ring) {
    throw new Error('Invalid arguments to describeRing')
  }
  return {
    description:
      ring[ringType] === 'describable'
        ? ring[ringDescribe]()
        : '<non-describable component>',
    effects: mat.effects,
    immediateEffects: mat.immediateEffects,
    removal: mat.removal,
    isStamp: mat.isStamp,
    stampCondition: mat.stampCondition,
    stampJsonProps: mat.stampJsonProps,
    defaultXmlns: mat.defaultXmlns,
    xmlns: mat.xmlns,
  }
}
