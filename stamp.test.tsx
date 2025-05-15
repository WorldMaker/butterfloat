import { JSDOM } from 'jsdom'
import { deepEqual, equal, match, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER, of } from 'rxjs'
import { Children, Fragment, jsx } from './jsx.js'
import { buildTree } from './static-dom.js'
import { buildStamp } from './stamp-builder.js'
import {
  type BindSelectors,
  collectBindings,
  selectBindings,
} from './stamp-collector.js'
import type { ElementBinds, NodeBinds } from './wiring-context.js'

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
    const { nodeSelectors, elementSelectors } = collectBindings(tree)

    ok(stamp.innerHTML.length > 0, 'produces html')

    bindsEqual(
      stamp,
      container,
      elementSelectors,
      elementBinds,
      nodeSelectors,
      nodeBinds,
    )
  })

  it('stamps an id selector', () => {
    const tree = (
      <div>
        <div>
          <div>
            <h1 id="example" styleBind={{ color: of('red') }}>
              Example
            </h1>
          </div>
        </div>
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
    const { nodeSelectors, elementSelectors } = collectBindings(tree)

    ok(stamp.innerHTML.length > 0, 'produces html')

    bindsEqual(
      stamp,
      container,
      elementSelectors,
      elementBinds,
      nodeSelectors,
      nodeBinds,
    )

    match(elementSelectors[0][0], /^h1#example/)
  })

  it('selects bindings for a top-level element', () => {
    const template = document.createElement('template')
    template.innerHTML = `
    <div data-bf-bind="0">
      <h1 id="example" data-bf-bind="1">
        Example
      </h1>
    </div>
  `

    const tree = (
      <div classBind={{ test: of(true) }}>
        <h1 id="example" styleBind={{ color: of('red') }}>
          Example
        </h1>
      </div>
    )

    const stamped = template.content.cloneNode(true) as DocumentFragment
    const { nodeBinds: expectedNodeBinds, elementBinds: expectedElementBinds } =
      selectBindings(stamped, tree)

    const stamped2 = (
      template.content.cloneNode(true) as DocumentFragment
    ).querySelector('div') as HTMLElement
    const { nodeBinds, elementBinds } = selectBindings(stamped2, tree)

    equal(nodeBinds.length, expectedNodeBinds.length)
    equal(elementBinds.length, expectedElementBinds.length)

    for (let i = 0; i < expectedNodeBinds.length; i++) {
      const [nodeBind, bindDesc] = nodeBinds[i]
      const [expectedNodeBind, expectedBindDesc] = expectedNodeBinds[i]
      deepEqual(nodeBind, expectedNodeBind)
      equal(bindDesc, expectedBindDesc)
    }

    for (let i = 0; i < expectedElementBinds.length; i++) {
      const [elementBind, bindDesc] = elementBinds[i]
      const [expectedElementBind, expectedBindDesc] = expectedElementBinds[i]
      deepEqual(elementBind, expectedElementBind)
      equal(bindDesc, expectedBindDesc)
    }
  })
})

function bindsEqual(
  stamp: HTMLTemplateElement,
  container: HTMLDivElement,
  elementSelectors: BindSelectors,
  elementBinds: ElementBinds,
  nodeSelectors: BindSelectors,
  nodeBinds: NodeBinds,
) {
  equal(stamp.content.childNodes.length, container.childNodes.length)
  equal(elementSelectors.length, elementBinds.length)
  equal(nodeSelectors.length, nodeBinds.length)

  for (let i = 0; i < elementSelectors.length; i++) {
    const [selector, selDesc] = elementSelectors[i]
    const [element, bindDesc] = elementBinds[i]
    const selElement = stamp.content.querySelector(selector)
    deepEqual(selElement, element)
    equal(selDesc, bindDesc)
  }

  for (let i = 0; i < nodeSelectors.length; i++) {
    const [selector, selDesc] = nodeSelectors[i]
    const [comment, bindDesc] = nodeBinds[i]
    const selElement = stamp.content.querySelector(selector)
    const selElementComment = selElement?.childNodes[0] as CharacterData
    equal(selElementComment.data, (comment as CharacterData).data)
    equal(selDesc, bindDesc)
  }
}
