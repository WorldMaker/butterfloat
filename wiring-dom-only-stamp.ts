import type { Component, ComponentContext } from './component.js'
import type { StampCollection } from './stamp-collection.js'
import { selectBindings } from './stamp-collector.js'
import type { DomStrategy } from './wiring-context.js'

const stampOnlyStrategy: (stamps: StampCollection) => DomStrategy =
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
      let container = document.importNode(stamp.content, true) as
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
    throw new Error(`Stamp "${component.name}" not found`)
  }

export default stampOnlyStrategy
