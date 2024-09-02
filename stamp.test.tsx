import { JSDOM } from 'jsdom'
import { deepEqual, equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER, of } from 'rxjs'
import { Children, Fragment, jsx } from './jsx.js'
import { buildTree } from './static-dom.js'
import { buildStamp } from './stamp-builder.js'
import { BindSelectors, collectBindings } from './stamp-collector.js'

describe('stamp', () => {
  const { window } = new JSDOM()
  const { document } = window

  it('stamps a basic rebindable dynamic tree', () => {
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
    const stamp = buildStamp(tree, document)
    const container = document.createElement('div')
    const { elementBinds, nodeBinds } = buildTree(
      tree,
      container,
      undefined,
      undefined,
      undefined,
      document,
    )
    const elementSelectors: BindSelectors = []
    const nodeSelectors: BindSelectors = []
    collectBindings(tree, elementSelectors, nodeSelectors)

    equal(stamp.children.length, container.children.length)
    equal(elementSelectors.length, elementBinds.length)
    equal(nodeSelectors.length, nodeBinds.length)

    for (let i = 0; i < elementSelectors.length; i++) {
      const [selector, selDesc] = elementSelectors[i]
      const [element, bindDesc] = elementBinds[i]
      const selElement = stamp.querySelector(selector)
      deepEqual(selElement, element)
      equal(selDesc, bindDesc)
    }

    for (let i = 0; i < nodeSelectors.length; i++) {
      const [selector, selDesc] = nodeSelectors[i]
      const [comment, bindDesc] = nodeBinds[i]
      const selElement = stamp.querySelector(selector)
      const selElementComment = selElement?.childNodes[0] as CharacterData
      equal(selElementComment.data, (comment as CharacterData).data)
      equal(selDesc, bindDesc)
    }
  })
})
