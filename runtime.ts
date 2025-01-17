import type { Subscription } from 'rxjs'
import type { Component, ComponentDescription } from './component.js'
import type { RuntimeOptions } from './runtime-model.js'
import buildDomStrategy from './wiring-dom-build.js'
import { runInternal } from './wiring.js'

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
  container: Element,
  component: ComponentDescription | Component,
  options?: RuntimeOptions,
  placeholder?: Element | CharacterData,
  document = globalThis.document,
): Subscription {
  const { preserveOnComplete } = options ?? {}
  return runInternal(
    container,
    component,
    {
      domStrategy: buildDomStrategy,
      isStaticComponent: true,
      isStaticTree: true,
      preserveOnComplete,
    },
    placeholder,
    document,
  )
}
