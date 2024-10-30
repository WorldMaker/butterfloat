import { Component, ComponentContext } from './component.js'
import { StampCollection } from './stamp-collection.js'
import { selectBindings } from './stamp-collector.js'
import { DomStrategy } from './wiring-context.js'

const stampOnlyStrategy: (stamps: StampCollection) => DomStrategy =
  (stamps: StampCollection) =>
  (
    component: Component,
    properties: unknown,
    context: ComponentContext,
    _document: Document,
    container?: Element | DocumentFragment,
  ) => {
    if (container && stamps.isPrestamp(component, properties, container)) {
      return selectBindings(container, component(properties, context))
    }
    const stamp = stamps.getStamp(component, properties)
    if (stamp) {
      const container = stamp.content.cloneNode(true) as DocumentFragment
      return selectBindings(container, component(properties, context))
    }
    throw new Error('Stamp not found')
  }

export default stampOnlyStrategy
