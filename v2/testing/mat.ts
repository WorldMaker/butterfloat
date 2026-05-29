import { Observable } from 'rxjs'
import { DefaultEvents } from '../../events.js'
import { jsx as testerJsx } from './jsx.js'
import { JsxFunction, type jsx, matType } from '../mat.js'
import { Component } from '../component.js'
import { Ring, describe as ringDescribe, ringType } from '../ring.js'
import { NodeDescription } from './description.js'

export class TesterMat<Events> implements jsx.Mat<Events> {
  [matType] = 'tester' as const

  constructor(public readonly events: Events) {}

  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #effects: Array<[Observable<unknown>, (item: any) => void]> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #immediateEffects: Array<[Observable<unknown>, (item: any) => void]> = []

  get effects() {
    return this.#effects
  }
  get immediateEffects() {
    return this.#immediateEffects
  }

  jsx: JsxFunction = testerJsx.bind(this)

  bindEffect = <T>(observable: Observable<T>, effect: (item: T) => void) => {
    this.#effects.push([observable, effect])
  }

  bindImmediateEffect = <T>(
    observable: Observable<T>,
    effect: (item: T) => void,
  ) => {
    this.#immediateEffects.push([observable, effect])
  }
}

/**
 * Describe a Component's Ring output or a simple function that returns a Ring
 */
export type DescribeRingArgs<Props = unknown, Events = DefaultEvents> =
  | [component: (jsx: JsxFunction) => Ring]
  | [props: Props, component: Component<Props, Events>]

/**
 * A Component Context for Testing purposes
 */
export interface TestComponentContext<Events = DefaultEvents> {
  describeRing: <Props = unknown>(
    ...args: DescribeRingArgs<Props, Events>
  ) => string | NodeDescription
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
  const mat = new TesterMat<Events>(events)
  return {
    describeRing: <Props = unknown>(
      ...args: DescribeRingArgs<Props, Events>
    ) => {
      switch (args.length) {
        case 1: {
          const [component] = args
          const ring = component(mat.jsx)
          return ring[ringType] === 'describable'
            ? ring[ringDescribe]()
            : '<non-describable component>'
        }
        case 2: {
          const [props, component] = args
          const ring = component(props, mat)
          return ring[ringType] === 'describable'
            ? ring[ringDescribe]()
            : '<non-describable component>'
        }
      }
    },
    effects: mat.effects,
    immediateEffects: mat.immediateEffects,
  }
}
