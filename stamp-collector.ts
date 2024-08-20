import { hasAnyBinds, NodeDescription } from './component.js'

export type BindSelectors = Array<[string, NodeDescription]>

export function nodeNamePrefix(desc: NodeDescription): string {
  switch (desc.type) {
    case 'children':
      return 'c'
    case 'component':
      return 'x'
    case 'fragment':
      return 'f'
    default:
      return 'u'
  }
}

export function collectBindings(
  description: NodeDescription,
  elementBinds?: BindSelectors,
  nodeBinds?: BindSelectors,
) {
  elementBinds ??= []
  nodeBinds ??= []
  // for this to work we need to collectBindings in exact same traversal as `buildTree`
  // `buildStamp` always provides a top-level container (the `<template>`) so we can start
  // by inlining `buildNode` equivalent here
  switch (description.type) {
    case 'element':
      if (hasAnyBinds(description)) {
        const idSelector = description.attributes.id
          ? `#${description.attributes.id}`
          : ''
        elementBinds.push([
          `${
            description.element
          }${idSelector}[data-bf-bind="${elementBinds.length.toString(36)}"]`,
          description,
        ])
      }
      for (const child of description.children) {
        if (typeof child !== 'string') {
          collectBindings(child, elementBinds, nodeBinds)
        }
      }
      break
    case 'children':
    case 'component':
      nodeBinds.push([
        `slot[name="${nodeNamePrefix(description)}${nodeBinds.length.toString(
          36,
        )}"]`,
        description,
      ])
      break
    case 'fragment':
      if (
        description.childrenBind &&
        description.childrenBindMode === 'prepend'
      ) {
        nodeBinds.push([
          `slot[name="${nodeNamePrefix(description)}${nodeBinds.length.toString(
            36,
          )}"]`,
          description,
        ])
      }

      for (const child of description.children) {
        if (typeof child !== 'string') {
          collectBindings(child, elementBinds, nodeBinds)
        }
      }

      if (
        description.childrenBind &&
        description.childrenBindMode !== 'prepend'
      ) {
        nodeBinds.push([
          `slot[name="${nodeNamePrefix(description)}${nodeBinds.length.toString(
            36,
          )}"]`,
          description,
        ])
      }
      break
  }
}
