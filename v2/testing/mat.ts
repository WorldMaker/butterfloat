import { Observable } from 'rxjs'
import { JsxFunction, type jsx, matType } from '../mat.js'
import { ButterfloatAttributes, Component, JsxChildren } from '../component.js'
import { Ring, describe as ringDescribe, ringType } from '../ring.js'
import { NodeDescription } from './description.js'
import { ringDescriber } from './rings/describe.js'

export class TesterMat<Events, Props> implements jsx.Mat<Events, Props> {
  [matType] = 'tester' as const

  constructor(public readonly events: Events) {}

  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #effects: Array<[Observable<unknown>, (item: any) => void]> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #immediateEffects: Array<[Observable<unknown>, (item: any) => void]> = []
  #isStamp = false
  #stampCondition: ((props: Props) => boolean) | null = null
  #stampJsonProps: Props | null = null

  get effects() {
    return this.#effects
  }
  get immediateEffects() {
    return this.#immediateEffects
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

  stamp: () => void = () => {
    if (this.#isStamp) {
      throw new Error('Cannot mark stamp more than once')
    }
    this.#isStamp = true
    this.#stampCondition = null
    this.#stampJsonProps = null
  }

  stampWhen: (condition: (props: Props) => boolean, jsonProps?: Props) => void =
    (condition, jsonProps) => {
      if (this.#isStamp) {
        throw new Error('Cannot mark stamp more than once')
      }
      this.#isStamp = true
      this.#stampCondition = condition
      this.#stampJsonProps = jsonProps ?? null
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
  description: NodeDescription | string
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: Array<[Observable<unknown>, (item: any) => void]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immediateEffects: Array<[Observable<unknown>, (item: any) => void]>
  isStamp: boolean
  stampCondition: ((props: Props) => boolean) | null
  stampJsonProps: Props | null
}

/**
 * Describe a Component's output given props and events.
 * @param args Component to test with given events and props
 * @returns A description of the Component's output
 */
export function describeRing<Props, Events>(
  ...args: DescribeRingArgs<Props, Events>
): RingDescription<Props> {
  switch (args.length) {
    case 1: {
      const [component] = args
      const mat = new TesterMat<Events, Props>({} as Events)
      const ring = component(mat.jsx)
      return {
        description:
          ring[ringType] === 'describable'
            ? ring[ringDescribe]()
            : '<non-describable component>',
        effects: mat.effects,
        immediateEffects: mat.immediateEffects,
        isStamp: mat.isStamp,
        stampCondition: mat.stampCondition,
        stampJsonProps: mat.stampJsonProps,
      }
    }
    case 2: {
      const [props, component] = args
      const mat = new TesterMat<Events, Props>({} as Events)
      const ring = component(props, mat)
      return {
        description:
          ring[ringType] === 'describable'
            ? ring[ringDescribe]()
            : '<non-describable component>',
        effects: mat.effects,
        immediateEffects: mat.immediateEffects,
        isStamp: mat.isStamp,
        stampCondition: mat.stampCondition,
        stampJsonProps: mat.stampJsonProps,
      }
    }
    case 3: {
      const [props, events, component] = args
      const mat = new TesterMat<Events, Props>(events)
      const ring = component(props, mat)
      return {
        description:
          ring[ringType] === 'describable'
            ? ring[ringDescribe]()
            : '<non-describable component>',
        effects: mat.effects,
        immediateEffects: mat.immediateEffects,
        isStamp: mat.isStamp,
        stampCondition: mat.stampCondition,
        stampJsonProps: mat.stampJsonProps,
      }
    }
  }
}
