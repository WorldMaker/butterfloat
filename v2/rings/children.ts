import { DefaultBind, JsxChildren } from '../component.js'
import { componentChildren, matType, type jsx } from '../mat.js'
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
  ElementBindDescription,
} from '../ring.js'

/**
 * Properties supported by the `<Children>` pseudo-component
 */
export interface ChildrenProperties {
  /**
   * Context for the component to bind the children from, for deep binding.
   *
   * This allows for binding children deeper into the tree, such as passing
   * your component's children into a "render function" of a deeper component
   * in the tree.
   */
  context: jsx.Mat<unknown>
}

export function collectChildBinds(
  children: JsxChildren | undefined,
): Record<string, ElementBindDescription<DefaultBind>> {
  let binds: Record<string, ElementBindDescription<DefaultBind>> = {}
  if (!children) {
    console.warn('No children found to bind')
    return binds
  }
  for (const child of children) {
    if (typeof child === 'string') {
      continue
    }
    if (child[ringType] !== 'runnable') {
      console.warn('Child is not runnable', child)
      continue
    }
    const childBinds = child[toBinds]()
    binds = Object.assign(binds, childBinds)
  }
  return binds
}

/**
 * Attach a component's children to the DOM tree
 *
 * @param props Children properties
 * @returns Children node
 */
export function Children({ context }: ChildrenProperties, mat: jsx.Mat): Ring {
  switch (mat[matType]) {
    case 'tester':
      return {
        [ringType]: 'describable',
        [describe]: () => ({
          type: 'children',
          context,
        }),
      }
    case 'builder':
      return {
        [ringType]: 'buildable',
        [toBinds]: () => collectChildBinds((context ?? mat)[componentChildren]),
        [addChild]: (container, document) => {
          const children = (context ?? mat)[componentChildren]
          if (!children) {
            console.warn('No children found to attach')
            return
          }
          for (const child of children) {
            if (typeof child === 'string') {
              container.appendChild(document.createTextNode(child))
              continue
            }
            if (child[ringType] !== 'buildable') {
              console.warn('Child is not buildable', child)
              continue
            }
            child[addChild](container, document)
          }
        },
        [toElement]: (document) => {
          const childrenEle = document.createElement('bf-children')
          const children = (context ?? mat)[componentChildren]
          if (!children) {
            console.warn('No children found to attach')
            return childrenEle
          }
          for (const child of children) {
            if (typeof child === 'string') {
              childrenEle.appendChild(document.createTextNode(child))
              continue
            }
            if (child[ringType] !== 'buildable') {
              console.warn('Child is not buildable', child)
              continue
            }
            child[addChild](childrenEle, document)
          }
          return childrenEle
        },
      }
    case 'runner':
      return {
        [ringType]: 'runnable',
        [toBinds]: () => collectChildBinds((context ?? mat)[componentChildren]),
      }
    default:
      return inertRing
  }
}
;(Children as unknown as RingProvider)[canProvideRing] = true
