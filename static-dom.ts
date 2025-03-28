import {
  type ElementDescription,
  type NodeDescription,
  hasAnyBinds,
} from './component.js'
import type { ElementBinds, NodeBinds } from './wiring-context.js'

export interface BuildContext {
  skipEmpty?: boolean
  defaultNamespace: string | null
  namespaceMap: Record<string, string>
}

export function buildElement(
  description: ElementDescription,
  context?: BuildContext,
  document = globalThis.document,
) {
  if (description.attributes.xmlns) {
    context = {
      defaultNamespace: description.attributes.xmlns as string,
      namespaceMap: { ...context?.namespaceMap },
    }
  }
  let element: Element
  if (description.element.includes(':')) {
    const [nsAbbrev, elementName] = description.element.split(':')
    let ns = context?.namespaceMap[nsAbbrev]
    if (!ns) {
      for (const [key, value] of Object.entries(description.attributes)) {
        if (key.startsWith('xmlns:')) {
          const nsAbbrev = key.replace('xmlns:', '')
          context = {
            ...context,
            defaultNamespace: context?.defaultNamespace ?? null,
            namespaceMap: {
              ...context?.namespaceMap,
              [nsAbbrev]: value as string,
            },
          }
        }
      }
      ns = context?.namespaceMap[nsAbbrev]
      if (!ns) {
        throw new Error(`Unknown namespace for '${description.element}'`)
      }
    }
    element = document.createElementNS(ns, elementName)
  } else if (context?.defaultNamespace) {
    element = document.createElementNS(
      context.defaultNamespace,
      description.element,
    )
  } else {
    element = document.createElement(description.element)
  }
  for (const [key, value] of Object.entries(description.attributes)) {
    if (key.startsWith('xmlns:')) {
      const nsAbbrev = key.replace('xmlns:', '')
      context = {
        ...context,
        defaultNamespace: context?.defaultNamespace ?? null,
        namespaceMap: {
          ...context?.namespaceMap,
          [nsAbbrev]: value as string,
        },
      }
    } else if (key.includes(':')) {
      const [nsAbbrev, attributeName] = key.split(':')
      const ns = context?.namespaceMap?.[nsAbbrev]
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
  return { element, context }
}

export function buildNode(
  description: NodeDescription,
  container: Element | DocumentFragment,
  elementBinds: ElementBinds,
  nodeBinds: NodeBinds,
  context?: BuildContext,
  document = globalThis.document,
) {
  switch (description.type) {
    case 'element': {
      const { element, context: newContext } = buildElement(
        description,
        context,
        document,
      )
      if (hasAnyBinds(description)) {
        elementBinds.push([element, description])
      }
      container.appendChild(element)
      return { container: element, context: newContext }
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
        buildTree(child, container, elementBinds, nodeBinds, context, document)
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

      return { container, context }
    case 'static':
      container.appendChild(description.element)
      return { container, context }
    case 'empty':
      if (!context?.skipEmpty) {
        const emptyComment = document.createComment('empty')
        container.appendChild(emptyComment)
      }
      return { container, context }
    case 'comment': {
      const comment = document.createComment(description.comment)
      container.appendChild(comment)
      return { container, context }
    }
  }
}

export function buildTree(
  description: NodeDescription,
  container: Element | DocumentFragment | null = null,
  elementBinds: ElementBinds = [],
  nodeBinds: NodeBinds = [],
  context?: BuildContext,
  document = globalThis.document,
) {
  if (!container && description.type === 'element') {
    const { element, context: newContext } = buildElement(
      description,
      context,
      document,
    )
    context = newContext
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
  } else if (
    !container &&
    description.type === 'empty' &&
    !context?.skipEmpty
  ) {
    const emptyComment = document.createComment('empty')
    return {
      elementBinds,
      nodeBinds,
      container: emptyComment,
    }
  } else if (!container) {
    container = document.createDocumentFragment()
    buildNode(
      description,
      container,
      elementBinds,
      nodeBinds,
      context,
      document,
    )
  } else {
    const nextNode = buildNode(
      description,
      container,
      elementBinds,
      nodeBinds,
      context,
      document,
    )
    if (nextNode !== null) {
      const { container: newContainer, context: newContext } = nextNode
      container = newContainer
      context = newContext
    }
  }

  if (
    description.type !== 'children' /* don't allow children */ &&
    description.type !== 'fragment' /* already flattened */ &&
    description.type !== 'static' /* don't allow children */ &&
    description.type !== 'comment' /* don't allow children */ &&
    description.type !== 'empty' /* don't allow children */
  ) {
    for (const child of description.children) {
      if (typeof child === 'string') {
        container.appendChild(document.createTextNode(child))
        continue
      }
      buildTree(child, container, elementBinds, nodeBinds, context, document)
    }
  }

  return {
    elementBinds,
    nodeBinds,
    container,
  }
}
