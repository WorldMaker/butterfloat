import { Component } from './component.js'

export type PropertiesApply = (properties: unknown) => boolean
export type StampAlternatives = Array<[PropertiesApply, HTMLTemplateElement]>

export class StampCollection {
  private map = new WeakMap<Component, StampAlternatives>()

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

  registerOnlyStamp(c: Component, stamp: HTMLTemplateElement) {
    this.map.set(c, [[(_) => true, stamp]])
  }

  registerStampAlternative(
    c: Component,
    when: PropertiesApply,
    stamp: HTMLTemplateElement,
  ) {
    const alternatives = this.map.get(c) ?? []
    alternatives.push([when, stamp])
    this.map.set(c, alternatives)
  }
}
