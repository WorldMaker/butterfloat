import { ElementDescription } from './component'

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
