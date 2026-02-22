import { matType, type jsx } from '../mat.js'
import {
  addChild,
  canProvideRing,
  describe,
  type RingProvider,
  ringType,
  toElement,
  type Ring,
  toBinds,
  inertRing,
} from '../ring.js'

/**
 * Empty node
 *
 * @returns Empty node
 */
export function Empty(_: object, mat: jsx.Mat): Ring {
  switch (mat[matType]) {
    case 'tester':
      return {
        [ringType]: 'describable',
        [describe]: () => ({
          type: 'empty',
        }),
      }
    case 'builder':
      return {
        [ringType]: 'buildable',
        [toBinds]: () => null,
        [addChild]: (_container, _document) => {},
        [toElement]: (document) => document.createElement('bf-empty'),
      }
    case 'runner':
      return {
        [ringType]: 'runnable',
        [toBinds]: () => null,
      }
    default:
      return inertRing
  }
}
;(Empty as unknown as RingProvider)[canProvideRing] = true
