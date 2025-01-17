import type { Component, ComponentContext } from './component.js'
import { buildTree } from './static-dom.js'
import type { DomStrategy } from './wiring-context.js'

const buildDomStrategy: DomStrategy = (
  component: Component,
  properties: unknown,
  context: ComponentContext,
  container: Element | DocumentFragment | undefined,
  document: Document,
) => {
  const tree = component(properties, context)
  return {
    ...buildTree(tree, undefined, undefined, undefined, undefined, document),
    isSameContainer: false,
  }
}

export default buildDomStrategy
