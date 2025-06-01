import { matType, type Mat } from '../mat.js'
import {
  addChild,
  canProvideRing,
  describe,
  type RingProvider,
  ringType,
  toElement,
  type Ring,
  toBinds,
} from '../ring.js'

/**
 * Properties supported by the `<Static>` pseudo-component
 */
export interface StaticProperties {
  /**
   * A static element to attach to the DOM tree.
   */
  element: Element
}

/**
 * Attach a static DOM element
 *
 * @param props Static properties
 * @returns Static node
 */
export function Static({ element }: StaticProperties, mat: Mat): Ring {
  switch (mat[matType]) {
    case 'tester':
      return {
        [ringType]: 'describable',
        [describe]: () => ({
          type: 'static',
          element,
        }),
      }
    case 'builder':
      return {
        [ringType]: 'buildable',
        [toBinds]: () => null,
        [addChild]: (container, _document) => {
          container.appendChild(element)
        },
        [toElement]: (_document) => element,
      }
    case 'runner':
      return {
        [ringType]: 'runnable',
        [toBinds]: () => null,
      }
    default:
      return {
        [ringType]: 'inert',
      }
  }
}
;(Static as unknown as RingProvider)[canProvideRing] = true
