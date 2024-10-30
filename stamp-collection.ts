import { Component, ContextComponent } from './component.js'

/**
 * Property filter function for a Stamp alternative
 */
// Want to be forgiving in what we accept
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StampPropertiesApply<Props = any> = (properties: Props) => boolean
export type StampAlternatives = Array<
  [StampPropertiesApply, HTMLTemplateElement]
>
export type PrestampApplies = [Component, StampPropertiesApply]

/**
 * A collection of Stamps that include the static DOM elements of Butterfloat components
 */
export class StampCollection {
  readonly #map = new WeakMap<Component, StampAlternatives>()
  readonly #prestampMap = new WeakMap<
    Element | DocumentFragment,
    PrestampApplies
  >()

  /**
   * Get a Stamp for a component, given applicable properties
   * @param c Component
   * @param properties Properties that apply to the component
   * @returns A stamp
   */
  getStamp(c: Component, properties: unknown): HTMLTemplateElement | undefined {
    const alternatives = this.#map.get(c)
    if (alternatives) {
      for (const [applies, stamp] of alternatives) {
        if (applies(properties)) {
          return stamp
        }
      }
    }
  }

  /**
   * Check if a container was registered as a prestamp for this component with given properties
   * @param c Component
   * @param properties Properties that apply to the component
   * @param container Container to test for prestamp
   * @returns Is registered as a valid prestamp
   */
  isPrestamp(
    c: Component,
    properties: unknown,
    container: Element | DocumentFragment,
  ): boolean {
    const stampApplies = this.#prestampMap.get(container)
    if (stampApplies) {
      return stampApplies[0] === c && stampApplies[1](properties)
    }
    return false
  }

  /**
   * Register one Stamp for all possible properties for the given Component
   * @param c Component
   * @param stamp Stamp to register
   * @returns this (for chaining)
   */
  registerOnlyStamp(c: Component, stamp: HTMLTemplateElement): StampCollection {
    this.#map.set(c, [[(_) => true, stamp]])
    return this
  }

  /**
   * Register a possible Stamp for subset of possible properties for the given Component
   * @param c Component
   * @param when Property filter for when the Stamp applies
   * @param stamp Stamp to register
   * @returns this (for chaining)
   */
  registerStampAlternative<Props>(
    c: ContextComponent<Props>,
    when: StampPropertiesApply<Props>,
    stamp: HTMLTemplateElement,
  ): StampCollection {
    const alternatives = this.#map.get(c) ?? []
    alternatives.push([when, stamp])
    this.#map.set(c, alternatives)
    return this
  }

  /**
   * Register a container that was pre-stamped
   * @param c Component
   * @param container Prestamped container
   * @param when Property filter for when the prestamp applies
   * @returns this (for chaining)
   */
  registerPrestamp<Props>(
    c: Component,
    container: Element | DocumentFragment,
    when?: StampPropertiesApply<Props>,
  ): StampCollection {
    this.#prestampMap.set(container, [c, when ?? (() => true)])
    return this
  }
}
