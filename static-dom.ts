import { ElementDescription } from './component'

export function buildElement(
  description: ElementDescription,
  document = globalThis.document,
) {
  const element = document.createElement(description.element)
  if (description.attributes) {
    for (const [key, value] of Object.entries(description.attributes)) {
        ;(element as any)[key] = value
    }
  }
  return element
}
