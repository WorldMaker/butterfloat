import { Component, ContextComponent } from './component.js'

// Want to be forgiving in what we accept
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropertiesApply<Props = any> = (properties: Props) => boolean
export type StampAlternatives = Array<[PropertiesApply, HTMLTemplateElement]>

/**
 * A collection of Stamps that include the static DOM elements of Butterfloat components
 */
export class StampCollection {
  private map = new WeakMap<Component, StampAlternatives>()

  /**
   * Get a Stamp for a component, given applicable properties
   * @param c Component
   * @param properties Properties that apply to the component
   * @returns A stamp
   */
  getStamp(c: Component, properties: unknown): HTMLTemplateElement | undefined {
    const alternatives = this.map.get(c)
    if (alternatives) {
      for (const [applies, stamp] of alternatives) {
        if (applies(properties)) {
          return stamp
        }
      }
    }
  }

  /**
   * Register one Stamp for all possible properties for the given Component
   * @param c Component
   * @param stamp Stamp to register
   * @returns this (for chaining)
   */
  registerOnlyStamp(c: Component, stamp: HTMLTemplateElement): StampCollection {
    this.map.set(c, [[(_) => true, stamp]])
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
    when: PropertiesApply<Props>,
    stamp: HTMLTemplateElement,
  ): StampCollection {
    const alternatives = this.map.get(c) ?? []
    alternatives.push([when, stamp])
    this.map.set(c, alternatives)
    return this
  }
}
