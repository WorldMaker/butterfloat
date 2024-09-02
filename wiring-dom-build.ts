import { Component, ComponentContext } from './component.js'
import { buildTree } from './static-dom.js'
import { DomStrategy } from './wiring-context.js'

const buildDomStrategy: DomStrategy = (
  component: Component,
  properties: unknown,
  context: ComponentContext,
) => {
  const tree = component(properties, context)
  return buildTree(tree, undefined, undefined, undefined, undefined, document)
}

export default buildDomStrategy
