import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { JSDOM } from 'jsdom'
import type { Subscription } from 'rxjs'
import { jsx } from '../../jsx.js'
import { run } from '../../runtime.js'

describe('web-components guide', () => {
  it('should be able to create a web component', () => {
    const { window } = new JSDOM()
    const { customElements, HTMLElement } = window

    const SomeComponent = () => <p>Hello Web Component!</p>

    class SomeWebComponent extends HTMLElement {
      #subscription: Subscription | null = null

      connectedCalllback() {
        this.#subscription = run(this, SomeComponent)
      }

      disconnectedCallback() {
        this.#subscription?.unsubscribe()
      }
    }

    customElements.define('some-web-component', SomeWebComponent)

    ok(SomeWebComponent)
    ok(customElements.get('some-web-component'))
  })
})
