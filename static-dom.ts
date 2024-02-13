import {
  ElementDescription,
  NodeDescription,
  hasAnyBinds,
} from './component.js'

export type ElementBinds = Array<[Element, ElementDescription]>
export type NodeBinds = Array<[CharacterData, NodeDescription]>

export interface NamespaceContext {
  defaultNamespace: string | null
  namespaceMap: Record<string, string>
}

export function buildElement(
  description: ElementDescription,
  nsContext?: NamespaceContext,
  document = globalThis.document,
) {
  if (description.attributes.xmlns) {
    nsContext = {
      defaultNamespace: description.attributes.xmlns as string,
      namespaceMap: { ...nsContext?.namespaceMap },
    }
  }
  let element: Element
  if (description.element.includes(':')) {
    const [nsAbbrev, elementName] = description.element.split(':')
    let ns = nsContext?.namespaceMap[nsAbbrev]
    if (!ns) {
      for (const [key, value] of Object.entries(description.attributes)) {
        if (key.startsWith('xmlns:')) {
          const nsAbbrev = key.replace('xmlns:', '')
          nsContext = {
            defaultNamespace: nsContext?.defaultNamespace ?? null,
            namespaceMap: {
              ...nsContext?.namespaceMap,
              [nsAbbrev]: value as string,
            },
          }
        }
      }
      ns = nsContext?.namespaceMap[nsAbbrev]
      if (!ns) {
        throw new Error(`Unknown namespace for '${description.element}'`)
      }
    }
    element = document.createElementNS(ns, elementName)
  } else if (nsContext?.defaultNamespace) {
    element = document.createElementNS(
      nsContext.defaultNamespace,
      description.element,
    )
  } else {
    element = document.createElement(description.element)
  }
  for (const [key, value] of Object.entries(description.attributes)) {
    if (key.startsWith('xmlns:')) {
      const nsAbbrev = key.replace('xmlns:', '')
      nsContext = {
        defaultNamespace: nsContext?.defaultNamespace ?? null,
        namespaceMap: {
          ...nsContext?.namespaceMap,
          [nsAbbrev]: value as string,
        },
      }
    } else if (key.includes(':')) {
      const [nsAbbrev, attributeName] = key.split(':')
      const ns = nsContext?.namespaceMap?.[nsAbbrev]
      if (!ns) {
        throw new Error(`Unknown namespace for '${key}' attribute`)
      }
      element.setAttributeNS(ns, attributeName, (value ?? '').toString())
    } else if (key.includes('-')) {
      // for example: aria- and data-
      element.setAttribute(key, (value ?? '').toString())
    } else if (key === 'class') {
      element.className = value as string
    } else if (key === 'for') {
      ;(element as HTMLLabelElement).htmlFor = value as string
    } else {
      // This is intentional metaprogramming
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(element as any)[key] = value
    }
  }
  return { element, nsContext }
}

export function buildNode(
  description: NodeDescription,
  container: Element | DocumentFragment,
  elementBinds: ElementBinds,
  nodeBinds: NodeBinds,
  nsContext?: NamespaceContext,
  document = globalThis.document,
) {
  switch (description.type) {
    case 'element': {
      const { element, nsContext: newContext } = buildElement(
        description,
        nsContext,
        document,
      )
      if (hasAnyBinds(description)) {
        elementBinds.push([element, description])
      }
      container.appendChild(element)
      return { container: element, nsContext: newContext }
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
      if (
        description.childrenBind &&
        description.childrenBindMode === 'prepend'
      ) {
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
        buildTree(
          child,
          container,
          elementBinds,
          nodeBinds,
          nsContext,
          document,
        )
      }

      if (
        description.childrenBind &&
        description.childrenBindMode !== 'prepend'
      ) {
        const fragmentComment = document.createComment(
          'fragment children binding',
        )

        container.appendChild(fragmentComment)
        nodeBinds.push([fragmentComment, description])
      }

      return { container, nsContext }
    case 'static':
      container.appendChild(description.element)
      return { container, nsContext }
  }
}

export function buildTree(
  description: NodeDescription,
  container: Element | DocumentFragment | null = null,
  elementBinds: ElementBinds = [],
  nodeBinds: NodeBinds = [],
  nsContext?: NamespaceContext,
  document = globalThis.document,
) {
  if (!container && description.type === 'element') {
    const { element, nsContext: newContext } = buildElement(
      description,
      nsContext,
      document,
    )
    nsContext = newContext
    container = element
    if (hasAnyBinds(description)) {
      elementBinds.push([element, description])
    }
  } else if (!container && description.type === 'static') {
    return {
      elementBinds,
      nodeBinds,
      container: description.element,
    }
  } else if (!container) {
    container = document.createDocumentFragment()
    buildNode(
      description,
      container,
      elementBinds,
      nodeBinds,
      nsContext,
      document,
    )
  } else {
    const nextNode = buildNode(
      description,
      container,
      elementBinds,
      nodeBinds,
      nsContext,
      document,
    )
    if (nextNode !== null) {
      const { container: newContainer, nsContext: newContext } = nextNode
      container = newContainer
      nsContext = newContext
    }
  }

  if (
    description.type !== 'children' /* don't allow children */ &&
    description.type !== 'fragment' /* already flattened */ &&
    description.type !== 'static' /* don't allow children */
  ) {
    for (const child of description.children) {
      if (typeof child === 'string') {
        container.appendChild(document.createTextNode(child))
        continue
      }
      buildTree(child, container, elementBinds, nodeBinds, nsContext, document)
    }
  }

  return {
    elementBinds,
    nodeBinds,
    container,
  }
}
