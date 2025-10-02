/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import { JsxInternal } from './internal.js'
import {
  ButterfloatAttributes,
  ButterfloatIntrinsicAttributes,
  Component,
  JsxChildren,
} from '../component.js'
import {
  describe,
  isRingProvider,
  isRingProviderWithChildren,
  Ring,
  ringType,
} from '../ring.js'
import {
  ComponentDescription,
  ElementDescription,
} from '../testing/description.js'
import { Mat } from '../mat.js'

/**
 * Builder for JSX and TSX transformation.
 * @param element An element to build
 * @param attributes Attributes
 * @param children Children
 * @returns Ring
 */
export function jsx(
  this: Mat<unknown>,
  element: string | Component,
  attributes: ButterfloatAttributes | null,
  ...children: JsxChildren
): Ring {
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
      const ring = element(attributes ?? {}, this, ...children)
      return ring
    } else if (isRingProvider(element)) {
      const ring = element(attributes ?? {}, this)
      return ring
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
