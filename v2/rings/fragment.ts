import { type JsxChildren } from '../component.js'
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
  canAttachChildren,
} from '../ring.js'
import { collectChildBinds } from './children.js'

function addChildren(
  container: Element | DocumentFragment,
  document: Document,
  children: JsxChildren,
) {
  for (const child of children) {
    if (typeof child === 'string') {
      container.appendChild(document.createTextNode(child))
      continue
    }
    if (child[ringType] !== 'buildable') {
      console.warn('Fragment child is not buildable, skipping', child)
      continue
    }
    child[addChild](container, document)
  }
}

/**
 * Attach a fragment to the DOM tree
 *
 * @param props Fragment properties
 * @returns Fragment node
 */
export function Fragment(
  _: object,
  mat: jsx.Mat,
  ...children: JsxChildren
): Ring {
  switch (mat[matType]) {
    case 'tester':
      return {
        [ringType]: 'describable',
        [describe]: () => ({
          type: 'fragment',
          children: children.map((child) =>
            typeof child === 'string'
              ? child
              : child[ringType] === 'describable'
              ? child[describe]()
              : '<non-describable child>',
          ),
        }),
      }
    case 'builder':
      return {
        [ringType]: 'buildable',
        [toBinds]: () => collectChildBinds(children),
        [addChild]: (container, document) =>
          addChildren(container, document, children),
        [toElement]: (document) => {
          const fragmentEle = document.createElement('bf-fragment')
          addChildren(fragmentEle, document, children)
          return fragmentEle
        },
      }
    case 'runner':
      return {
        [ringType]: 'runnable',
        [toBinds]: () => collectChildBinds(children),
      }
    default:
      return inertRing
  }
}
const provider = Fragment as unknown as RingProvider
provider[canProvideRing] = true
provider[canAttachChildren] = true
