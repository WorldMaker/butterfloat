import { JSDOM } from 'jsdom'
import { equal, notStrictEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { jsx, Fragment, Children } from './jsx.js'
import { buildElement, buildTree } from './static-dom.js'
import { NEVER, of } from 'rxjs'

describe('static-dom', () => {
  const { window } = new JSDOM()
  const { document } = window

  it('builds a single element', () => {
    const desc = <hr className="cute" />
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'HR')
    equal(test.className, 'cute')

    test.remove()
  })

  it('builds a single element with class shortcut', () => {
    const desc = <div class="cool" />
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'DIV')
    equal(test.className, 'cool')

    test.remove()
  })

  it('builds a single element with dataset data- attributes', () => {
    const desc = <div data-test="something" data-funky-thing="music" />
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'DIV')
    equal(test.dataset.test, 'something')
    equal(test.dataset.funkyThing, 'music')

    test.remove()
  })

  it('builds a single element with aria- attributes', () => {
    const desc = (
      <div role="navigation" aria-label="something" aria-expanded="true" />
    )
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'DIV')
    equal(test.role, 'navigation')
    equal(test.getAttribute('aria-label'), 'something')
    equal(test.getAttribute('aria-expanded'), 'true')

    test.remove()
  })

  it('builds a single label with dataset for attribute', () => {
    const desc = <label for="example" />
    equal(desc.type, 'element')
    const test = buildElement(desc, document)
    equal(test.tagName, 'LABEL')
    equal((test as HTMLLabelElement).htmlFor, 'example')

    test.remove()
  })

  it('builds a basic static tree', () => {
    const tree = (
      <div className="test">
        <p>Hello World</p>
      </div>
    )
    const { container, elementBinds, nodeBinds } = buildTree(
      tree,
      null,
      [],
      [],
      document,
    )
    equal(elementBinds.length, 0)
    equal(nodeBinds.length, 0)
    const div = container as HTMLDivElement
    notStrictEqual(div, null)
    equal(div.tagName, 'DIV')
    equal(div.className, 'test')
    equal(div.hasChildNodes(), true)
    const p = div.firstElementChild as HTMLParagraphElement
    notStrictEqual(p, null)
    equal(p.hasChildNodes(), true)
    const text = p.firstChild as Text
    notStrictEqual(text, null)
    equal(text.data, 'Hello World')

    div.remove()
  })

  it('builds a basic dynamic tree', () => {
    const TestComponent = () => (
      <p>
        Hello <Children />
      </p>
    )
    const tree = (
      <div bind={{ className: of('test') }}>
        <Fragment childrenBind={NEVER}>
          <TestComponent>World</TestComponent>
          <TestComponent>Friends</TestComponent>
        </Fragment>
        <Children />
      </div>
    )
    const { container, elementBinds, nodeBinds } = buildTree(
      tree,
      null,
      [],
      [],
      document,
    )
    // div element bind
    equal(elementBinds.length, 1)
    // fragment childrenBind, two component binds, children bind
    equal(nodeBinds.length, 4)
    const div = container as HTMLDivElement
    notStrictEqual(div, null)
    equal(div.tagName, 'DIV')
    equal(elementBinds[0][0], div)
    equal(div.hasChildNodes(), true)

    div.remove()
  })
})
