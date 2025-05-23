import type { Component, ComponentContext } from './component.js'
import type { StampCollection } from './stamp-collection.js'
import { selectBindings } from './stamp-collector.js'
import { buildTree } from './static-dom.js'
import type { DomStrategy } from './wiring-context.js'

const stampOrBuildStrategy: (stamps: StampCollection) => DomStrategy =
  (stamps: StampCollection) =>
  (
    component: Component,
    properties: unknown,
    context: ComponentContext,
    container: Element | DocumentFragment | undefined,
    document: Document,
  ) => {
    if (container && stamps.isPrestamp(component, properties, container)) {
      return {
        ...selectBindings(container, component(properties, context)),
        isSameContainer: true,
      }
    }
    const stamp = stamps.getStamp(component, properties)
    if (stamp) {
      let container = stamp.content.cloneNode(true) as
        | Element
        | DocumentFragment
      if (
        container.nodeType === container.DOCUMENT_FRAGMENT_NODE &&
        container.children.length === 1
      ) {
        const child = container.firstElementChild
        if (child) {
          container = child
        }
      }
      return {
        ...selectBindings(container, component(properties, context)),
        isSameContainer: false,
      }
    }
    const tree = component(properties, context)
    return {
      ...buildTree(tree, undefined, undefined, undefined, undefined, document),
      isSameContainer: false,
    }
  }

export default stampOrBuildStrategy
