import { Component, ComponentContext, ElementDescription } from './component.js'
import { StampCollection } from './stamp-collection.js'
import { collectBindings } from './stamp-collector.js'
import { buildTree } from './static-dom.js'
import { DomStrategy, ElementBinds, NodeBinds } from './wiring-context.js'

const qs = (container: DocumentFragment, selector: string) => {
  const node = container.querySelector(selector)
  if (node) {
    return node
  }
  throw new Error('Stamp does not match component')
}

const stampOrBuildStrategy: (stamps: StampCollection) => DomStrategy =
  (stamps: StampCollection) =>
  (component: Component, properties: unknown, context: ComponentContext) => {
    const stamp = stamps.getStamp(component, properties)
    if (stamp) {
      const container = stamp.content.cloneNode(true) as DocumentFragment
      const tree = component(properties, context)
      const {
        elementBinds: elementBindSelectors,
        nodeBinds: nodeBindSelectors,
      } = collectBindings(tree)
      const elementBinds: ElementBinds = elementBindSelectors.map(
        ([selector, desc]) => [
          qs(container, selector),
          desc as ElementDescription,
        ],
      )
      const nodeBinds: NodeBinds = nodeBindSelectors.map(([selector, desc]) => [
        qs(container, selector),
        desc,
      ])
      return { container, elementBinds, nodeBinds }
    }
    const tree = component(properties, context)
    return buildTree(tree, undefined, undefined, undefined, undefined, document)
  }

export default stampOrBuildStrategy
