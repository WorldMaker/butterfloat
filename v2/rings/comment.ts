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
 * Properties supported by the `<Comment>` pseudo-component
 */
export interface CommentProperties {
  /**
   * A comment to attach to the DOM tree.
   */
  comment: string
}

/**
 * Attach a comment to the DOM tree
 *
 * @param props Comment properties
 * @returns Comment node
 */
export function Comment({ comment }: CommentProperties, mat: jsx.Mat): Ring {
  switch (mat[matType]) {
    case 'tester':
      return {
        [ringType]: 'describable',
        [describe]: () => ({
          type: 'comment',
          comment,
        }),
      }
    case 'builder':
      return {
        [ringType]: 'buildable',
        [toBinds]: () => null,
        [addChild]: (container, document) => {
          container.appendChild(document.createComment(comment))
        },
        [toElement]: (document) => {
          const commentEle = document.createElement('bf-comment')
          commentEle.appendChild(document.createComment(comment))
          return commentEle
        },
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
;(Comment as unknown as RingProvider)[canProvideRing] = true
