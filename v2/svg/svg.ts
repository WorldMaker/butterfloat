/* eslint-disable @typescript-eslint/no-namespace */ // Reasoning: JSX types are weird and "need" namespaces to operate correctly.
import type { JsxFunction, Mat } from '../mat.js'
import * as JsxInternal from '../jsx/svg.js'
import type { Ring } from '../ring.js'
import type { Component } from '../component.js'

/**
 * Options for simple SVG components.
 */
export interface SvgOptions {
  /**
   * The SVG does not qualify for stamp reuse
   */
  notStamp?: boolean
}

/**
 * Creates a simple SVG component.
 *
 * Preregisters the SVG and XLink namespaces for the component and sets
 * the SVG namespace as default.
 * @param component Simple component
 * @param options Options for the SVG component
 * @returns Component
 */
export function svg<Props = unknown>(
  component: (jsx: JsxFunction, props: Props) => Ring,
  options?: SvgOptions,
): Component<Props, unknown> {
  return (props, mat) => {
    mat.mapXmlns(
      {
        svg: 'http://www.w3.org/2000/svg',
        xlink: 'http://www.w3.org/1999/xlink',
      },
      'http://www.w3.org/2000/svg',
    )
    if (!options?.notStamp) {
      mat.stamp()
    }
    return component(mat.jsx, props)
  }
}

/**
 * Builder for JSX and TSX transformation.
 */
export declare namespace jsx {
  export { Mat }

  /**
   * JSX typing internals
   */
  export import JSX = JsxInternal
}
