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
 * Simple, stable component with attached condition for stamp reuse.
 */
export interface StampWhenComponent<Props = unknown> {
  /**
   * Condition to determine if the stamp matches for this component.
   * @param props Props of the component to determine if the stamp matches.
   * @returns True if the stamp matches, false otherwise.
   */
  condition: (props: Props) => boolean
  /**
   * Ring output of the component.
   */
  ring: Ring
  /**
   * JSON serialziable "canonical" representation of the applicable props to this stamp.
   */
  jsonProps?: Props
}

/**
 * Creates a simple, stable component when a condition is met.
 * @param component Simple props component with condition for stamp reuse
 * @returns Component
 */
export function stampWhen<Props>(
  component: (jsx: JsxFunction, props: Props) => StampWhenComponent<Props>,
): Component<Props, unknown> {
  return (props, mat: jsx.Mat) => {
    const { condition, ring, jsonProps } = component(mat.jsx, props)
    mat.stampWhen(condition, jsonProps)
    return ring
  }
}
