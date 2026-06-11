import {
  ButterfloatAttributes,
  ButterfloatIntrinsicAttributes,
  Component,
  JsxChildren,
} from '../../component.js'
import {
  DescribableRing,
  describe,
  isRingProvider,
  isRingProviderWithChildren,
  Ring,
  ringType,
} from '../../ring.js'
import { ComponentDescription, ElementDescription } from '../description.js'
import { TesterMat } from '../mat.js'

export function ringDescriber<Events, Props>(
  mat: TesterMat<Events, Props>,
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
      const ring = element(attributes ?? {}, mat, ...children)
      return ring as DescribableRing
    } else if (isRingProvider(element)) {
      const ring = element(attributes ?? {}, mat)
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
