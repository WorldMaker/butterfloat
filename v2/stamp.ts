import { type Component } from './component'
import { type jsx, type JsxFunction } from './mat'
import { Ring } from './ring'

/**
 * Creates a simple, stable component.
 * @param component Simple component
 * @returns Component
 */
export function stamp<Props = unknown>(
  component: (jsx: JsxFunction, props: Props) => Ring,
): Component<Props, unknown> {
  return (props, mat) => {
    mat.stamp()
    return component(mat.jsx, props)
  }
}

/**
 * Creates a simple, stable component when a condition is met.
 * @param component Simple props component with condition for stamp reuse
 * @returns Component
 */
export function stampWhen<Props>(
  component: (
    jsx: JsxFunction,
    props: Props,
  ) => { condition: (props: Props) => boolean; ring: Ring },
): Component<Props, unknown> {
  return (props, mat: jsx.Mat) => {
    const { condition, ring } = component(mat.jsx, props)
    mat.stampWhen(condition)
    return ring
  }
}
