import { JSDOM } from 'jsdom'
import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { firstValueFrom } from 'rxjs'
import { SimpleComponent } from './component.js'
import { jsx } from './jsx.js'
import { WiringContext } from './wiring-context.js'
import { wire } from './wiring.js'

describe('wiring', () => {
  it('wires a simple static component', async () => {
    const { window } = new JSDOM()
    const { document } = window

    const example: SimpleComponent = () => <h1>Hello World</h1>
    const context: WiringContext = {
      isStaticComponent: true,
      isStaticTree: true,
    }
    const obs = wire(example, context, document)
    const element = (await firstValueFrom(obs)) as HTMLElement
    equal(context.isStaticComponent, true)
    equal(context.isStaticTree, true)
    equal(element.tagName, 'H1')
  })
})
