import { Subscription } from 'rxjs'
import { Component, ComponentDescription } from './component.js'
import { RuntimeOptions } from './runtime-model.js'
import { StampCollection } from './stamp-collection.js'
import stampStrategy from './wiring-dom-only-stamp.js'
import { runInternal } from './wiring.js'

/**
 * @experimental Preview only functionality because Butterfloat internally uses anonymous components
 *
 * Run a Butterfloat component with only Stamps
 *
 * @param container Container the component will be a child in
 * @param component Component or description of component to run
 * @param context Optional context for wiring concerns
 * @param placeholder Optional placeholder child of the container to replace
 * @param document Document to use for creating new nodes
 * @returns Subscription
 */
export function runOnlyStamps(
  container: Element,
  component: ComponentDescription | Component,
  stamps: StampCollection,
  options?: RuntimeOptions,
  placeholder?: Element | CharacterData,
  document = globalThis.document,
): Subscription {
  const { preserveOnComplete } = options ?? {}
  return runInternal(
    container,
    component,
    {
      domStrategy: stampStrategy(stamps),
      isStaticComponent: true,
      isStaticTree: true,
      preserveOnComplete,
    },
    placeholder,
    document,
  )
}
