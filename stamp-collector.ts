import {
  type ElementDescription,
  hasAnyBinds,
  type NodeDescription,
} from './component.js'
import type { ElementBinds, NodeBinds } from './wiring-context.js'

export type BindSelectors = Array<[string, NodeDescription]>

export function nodeNamePrefix(desc: NodeDescription): string {
  switch (desc.type) {
    case 'children':
      return 'bf-c'
    case 'component':
      return 'bf-x'
    case 'fragment':
      return 'bf-f'
    default:
      return 'bf-u'
  }
}

export function collectBindings(
  description: NodeDescription,
  elementSelectors?: BindSelectors,
  nodeSelectors?: BindSelectors,
) {
  elementSelectors ??= []
  nodeSelectors ??= []
  // for this to work we need to collectBindings in exact same traversal as `buildTree`
  // `buildStamp` always provides a top-level container (the `<template>`) so we can start
  // by inlining `buildNode` equivalent here
  switch (description.type) {
    case 'element':
      if (hasAnyBinds(description)) {
        const idSelector = description.attributes.id
          ? `#${description.attributes.id}`
          : ''
        elementSelectors.push([
          `${
            description.element
          }${idSelector}[data-bf-bind="${elementSelectors.length.toString(
            36,
          )}"]`,
          description,
        ])
      }
      for (const child of description.children) {
        if (typeof child !== 'string') {
          collectBindings(child, elementSelectors, nodeSelectors)
        }
      }
      break
    case 'children':
    case 'component':
      nodeSelectors.push([
        `slot[name="${nodeNamePrefix(
          description,
        )}${nodeSelectors.length.toString(36)}"]`,
        description,
      ])
      break
    case 'fragment':
      if (
        description.childrenBind &&
        description.childrenBindMode === 'prepend'
      ) {
        nodeSelectors.push([
          `slot[name="${nodeNamePrefix(
            description,
          )}${nodeSelectors.length.toString(36)}"]`,
          description,
        ])
      }

      for (const child of description.children) {
        if (typeof child !== 'string') {
          collectBindings(child, elementSelectors, nodeSelectors)
        }
      }

      if (
        description.childrenBind &&
        description.childrenBindMode !== 'prepend'
      ) {
        nodeSelectors.push([
          `slot[name="${nodeNamePrefix(
            description,
          )}${nodeSelectors.length.toString(36)}"]`,
          description,
        ])
      }
      break
  }

  return { elementSelectors, nodeSelectors }
}

const qs = (container: Element | DocumentFragment, selector: string) => {
  const node = container.querySelector(selector)
  if (node) {
    return node
  }
  throw new Error('Stamp does not match component')
}

export function selectBindings(
  container: Element | DocumentFragment,
  description: NodeDescription,
) {
  const { elementSelectors, nodeSelectors } = collectBindings(description)
  const elementBinds: ElementBinds = elementSelectors.map(
    ([selector, desc]) => [qs(container, selector), desc as ElementDescription],
  )
  const nodeBinds: NodeBinds = nodeSelectors.map(([selector, desc]) => [
    qs(container, selector),
    desc,
  ])
  return { container, nodeBinds, elementBinds }
}
