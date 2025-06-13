---
layout: page.vto
title: Web Components with Butterfloat
order: 1
tags: ['stable']
---

# Web Components with Butterfloat

Butterfloat works great powering Web Components. The basic pattern starts
as just:

```ts
import { run } from 'butterfloat'
import type { Subscription } from 'rxjs'
import SomeComponent from './some-component.ts'

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
export default SomeWebComponent
```

From there you can easily expand it to use the Shadow DOM (but you don't
have to, remember the Shadow DOM is optional), connect your view model to
`attributeChangedCallback`, and other fun things like adding [Stamps].

[Stamps]: ../stamps.md
