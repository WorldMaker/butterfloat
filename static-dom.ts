import {
  ElementDescription,
  NodeDescription,
  hasAnyBinds,
} from './component.js'

export type ElementBinds = Array<[HTMLElement, ElementDescription]>
export type NodeBinds = Array<[Node, NodeDescription]>

export function buildElement(
  description: ElementDescription,
  document = globalThis.document,
) {
  const element = document.createElement(description.element)
  for (const [key, value] of Object.entries(description.attributes)) {
    // This is intentional metaprogramming
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(element as any)[key] = value
  }
  return element
}

export function buildNode(
  description: NodeDescription,
  container: Node,
  elementBinds: ElementBinds,
  nodeBinds: NodeBinds,
  document = globalThis.document,
) {
  switch (description.type) {
    case 'element': {
      const element = buildElement(description, document)
      if (hasAnyBinds(description)) {
        elementBinds.push([element, description])
      }
      container.appendChild(element)
      return element
    }
    case 'children': {
      const childrenComment = document.createComment('Children component')
      container.appendChild(childrenComment)
      nodeBinds.push([childrenComment, description])
      return null
    }
    case 'component': {
      const componentComment = document.createComment(
        `${description.component.name} component`,
      )
      container.appendChild(componentComment)
      nodeBinds.push([componentComment, description])
      return null
    }
    case 'fragment':
      if (description.childrenBind && description.childrenPrepend) {
        const fragmentComment = document.createComment(
          'fragment children binding',
        )

        container.appendChild(fragmentComment)
        nodeBinds.push([fragmentComment, description])
      }

      for (const child of description.children) {
        if (typeof child === 'string') {
          container.appendChild(document.createTextNode(child))
          continue
        }
        buildTree(child, container, elementBinds, nodeBinds, document)
      }

      if (description.childrenBind && !description.childrenPrepend) {
        const fragmentComment = document.createComment(
          'fragment children binding',
        )

        container.appendChild(fragmentComment)
        nodeBinds.push([fragmentComment, description])
      }

      return container
  }
}

export function buildTree(
  description: NodeDescription,
  container: Node | null = null,
  elementBinds: ElementBinds = [],
  nodeBinds: NodeBinds = [],
  document = globalThis.document,
) {
  if (!container && description.type === 'element') {
    const element = buildElement(description, document)
    container = element
    if (hasAnyBinds(description)) {
      elementBinds.push([element, description])
    }
  } else if (!container) {
    container = document.createDocumentFragment()
    buildNode(description, container, elementBinds, nodeBinds, document)
  } else {
    const nextNode = buildNode(
      description,
      container,
      elementBinds,
      nodeBinds,
      document,
    )
    if (nextNode !== null) {
      container = nextNode
    }
  }

  if (
    description.type !== 'children' /* don't allow children */ &&
    description.type !== 'fragment' /* already flattened */
  ) {
    for (const child of description.children) {
      if (typeof child === 'string') {
        container.appendChild(document.createTextNode(child))
        continue
      }
      buildTree(child, container, elementBinds, nodeBinds, document)
    }
  }

  return {
    elementBinds,
    nodeBinds,
    container,
  }
}
