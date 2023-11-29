import { Component, ComponentDescription } from './component.js'
import { runInternal } from './wiring.js'

/**
 * Options for how Butterfloat should run
 */
export interface RuntimeOptions {
  /**
   * Primarily a tool for debugging: Don't remove unbound DOM nodes when components complete.
   */
  preserveOnComplete?: boolean
}

/**
 * Run a Butterfloat component
 *
 * @param container Container the component will be a child in
 * @param component Component or description of component to run
 * @param context Optional context for wiring concerns
 * @param placeholder Optional placeholder child of the container to replace
 * @param document Document to use for creating new nodes
 * @returns Subscription
 */
export function run(
  container: Node,
  component: ComponentDescription | Component,
  options?: RuntimeOptions,
  placeholder?: Element | CharacterData,
  document = globalThis.document,
) {
  const { preserveOnComplete } = options ?? {}
  return runInternal(
    container,
    component,
    { isStaticComponent: true, isStaticTree: true, preserveOnComplete },
    placeholder,
    document,
  )
}
