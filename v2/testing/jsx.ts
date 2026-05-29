/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import * as JsxInternal from '../jsx/internal.js'
import {
  ButterfloatAttributes,
  ButterfloatIntrinsicAttributes,
  Component,
  JsxChildren,
} from '../component.js'
import {
  DescribableRing,
  describe,
  isRingProvider,
  isRingProviderWithChildren,
  Ring,
  ringType,
} from '../ring.js'
import { ComponentDescription, ElementDescription } from './description.js'
import { TesterMat } from './mat.js'

/**
 * Builder for JSX and TSX transformation.
 * @param element An element to build
 * @param attributes Attributes
 * @param children Children
 * @returns Ring
 */
export function jsx(
  // it doesn't matter what sort of events or props we have on the context
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: TesterMat<any, any>,
  element: string | Component,
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
): DescribableRing {
  const childrenDescriptions = children
    .flat()
    .map((child: string | Ring | number) => {
      if (typeof child === 'number') {
        return child.toLocaleString()
      } else if (typeof child === 'string') {
        return child
      }
      return child[ringType] === 'describable'
        ? child[describe]()
        : '<non-describable child>'
    })

  if (typeof element === 'string') {
    const {
      bind,
      immediateBind,
      childrenBind,
      childrenBindMode,
      events,
      styleBind,
      immediateStyleBind,
      classBind,
      immediateClassBind,
      ...otherAttributes
    } = (attributes as ButterfloatIntrinsicAttributes) ?? {}
    const elementDescription: ElementDescription = {
      type: 'element',
      element,
      attributes: otherAttributes,
      bind: bind ?? {},
      immediateBind: immediateBind ?? {},
      children: childrenDescriptions,
      childrenBind,
      childrenBindMode,
      events: events ?? {},
      styleBind: styleBind ?? {},
      immediateStyleBind: immediateStyleBind ?? {},
      classBind: classBind ?? {},
      immediateClassBind: immediateClassBind ?? {},
    }
    return {
      [ringType]: 'describable',
      [describe]: () => elementDescription,
    }
  }
  if (typeof element === 'function') {
    // immediately flatten fragments or children or statics
    if (isRingProviderWithChildren(element)) {
      const ring = element(
        attributes ?? {},
        this ?? new TesterMat({}),
        ...children,
      )
      return ring as DescribableRing
    } else if (isRingProvider(element)) {
      const ring = element(attributes ?? {}, this ?? new TesterMat({}))
      return ring as DescribableRing
    }

    const { childrenBind, childrenBindMode, ...otherAttributes } =
      attributes ?? {}

    const componentDescription: ComponentDescription = {
      type: 'component',
      component: element,
      properties: otherAttributes,
      children: childrenDescriptions,
      childrenBind,
      childrenBindMode,
    }
    return {
      [ringType]: 'describable',
      [describe]: () => componentDescription,
    }
  }
  throw new Error(`Unsupported jsx in ${element}`)
}

/**
 * Builder for JSX and TSX transformation.
 */
export declare namespace jsx {
  /**
   * JSX typing internals
   */
  export import JSX = JsxInternal
}
