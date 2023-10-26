import { JSDOM } from 'jsdom'
import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { jsx } from './jsx.js'
import { buildElement } from './static-dom.js'

describe('static-dom', () => {
  const { window } = new JSDOM()
  const { document } = window

  it('builds a simple example', () => {
    const desc = <hr className="cute" />
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'HR')
    equal(test.className, 'cute')
  })
})
