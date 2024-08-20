import { NodeDescription } from './component.js'
import { nodeNamePrefix } from './stamp-collector.js'
import { buildTree } from './static-dom.js'

export function buildStamp(
  description: NodeDescription,
  document = globalThis.document,
) {
  const template = document.createElement('template')
  const { elementBinds, nodeBinds } = buildTree(
    description,
    template,
    undefined,
    undefined,
    undefined,
    document,
  )
  let i = 0
  for (const [element] of elementBinds) {
    element.setAttribute('data-bf-bind', i.toString(36))
    i++
  }
  i = 0
  for (const [element, desc] of nodeBinds) {
    const slot = document.createElement('slot')
    slot.name = `${nodeNamePrefix(desc)}${i.toString(36)}`
    element.replaceWith(slot)
    slot.appendChild(element)
    i++
  }
  return template
}
