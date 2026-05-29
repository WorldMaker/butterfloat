import { JSDOM } from 'jsdom'
import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER, type Observable, of } from 'rxjs'
import type { NodeDescription } from './description.js'
import { type ObservableEvent, makeTestEvent } from '../../events.js'
import { Fragment } from '../rings/fragment.js'
import { type jsx } from '../mat.js'
import { Static } from '../rings/static.js'
import { Empty } from '../rings/empty.js'
import { Comment } from '../rings/comment.js'
import { makeTestComponentContext } from './mat.js'

describe('description', () => {
  it('describes a simple static element', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1>Hello</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a static attribute', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1 className="header">Hello</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: { className: 'header' },
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a bind', () => {
    const className = of('header')
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1 bind={{ className }}>Hello</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: { className },
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a delayed value bind', () => {
    const percent = of(0.35)
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <progress bind={{ bfDelayValue: percent }} />
    ))
    const expected: NodeDescription = {
      type: 'element',
      element: 'progress',
      attributes: {},
      bind: { bfDelayValue: percent },
      immediateBind: {},
      children: [],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a class bind', () => {
    const header = of(true)
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1 classBind={{ header }}>Hello</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: { header },
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a style bind', () => {
    const red = of('red')
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <h1 styleBind={{ backgroundColor: red }}>Hello</h1>
    ))
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: { backgroundColor: red },
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with a children bind', () => {
    const TestComponent = (_props: unknown, { jsx }: jsx.Mat) => <h1>Hello</h1>
    const childrenBind = of(TestComponent)
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <h1 childrenBind={childrenBind} childrenBindMode="replace">
        Hello
      </h1>
    ))
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind,
      childrenBindMode: 'replace',
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a simple static element with an event bind', () => {
    const click = makeTestEvent(NEVER as Observable<PointerEvent>)
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1 events={{ click }}>Hello</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: { click },
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes a single dynamic component', () => {
    const TestComponent = (_props: unknown, { jsx }: jsx.Mat) => <h1>Hello</h1>
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <TestComponent />)
    const expected: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: {},
      children: [],
      childrenBind: undefined,
      childrenBindMode: undefined,
    }
    deepEqual(test, expected)
  })

  it('describes a single dynamic component with children bind', () => {
    const TestComponent = (_props: unknown, { events, jsx }: jsx.Mat) => {
      const click = events.click as ObservableEvent<PointerEvent>
      return <h1 events={{ click }}>Hello</h1>
    }
    const childrenBind = of(TestComponent)
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <TestComponent childrenBind={childrenBind} childrenBindMode="prepend" />
    ))
    const expected: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: {},
      children: [],
      childrenBind,
      childrenBindMode: 'prepend',
    }
    deepEqual(test, expected)
  })

  it('describes a single dynamic context component with custom prop', () => {
    const TestComponent = (
      props: { hello: Observable<string> },
      { jsx }: jsx.Mat,
    ) => <h1 bind={{ innerText: props.hello }} />
    const hello = of('Hello')
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <TestComponent hello={hello} />)
    const expected: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: { hello },
      children: [],
      childrenBind: undefined,
      childrenBindMode: undefined,
    }
    deepEqual(test, expected)
  })

  it('describes a single dynamic context component with custom prop and events', () => {
    const TestComponent = (
      props: { hello: Observable<string> },
      { events, jsx }: jsx.Mat,
    ) => (
      <h1
        bind={{ innerText: props.hello }}
        events={{ click: events.click as ObservableEvent<PointerEvent> }}
      />
    )
    const hello = of('Hello')
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <TestComponent hello={hello} />)
    const expected: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: { hello },
      children: [],
      childrenBind: undefined,
      childrenBindMode: undefined,
    }
    deepEqual(test, expected)
  })

  it('describes a fragment', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <>
        <h1>Hello</h1>
      </>
    ))
    const expected: NodeDescription = {
      type: 'fragment',
      children: [
        {
          type: 'element',
          element: 'h1',
          attributes: {},
          bind: {},
          immediateBind: {},
          children: ['Hello'],
          childrenBind: undefined,
          childrenBindMode: undefined,
          events: {},
          styleBind: {},
          immediateStyleBind: {},
          classBind: {},
          immediateClassBind: {},
        },
      ],
    }
    deepEqual(test, expected)
  })

  it('describes a static', () => {
    const { window } = new JSDOM()
    const { document } = window
    const staticElement = document.createElement('div')
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <Static element={staticElement} />)
    const expected: NodeDescription = {
      type: 'static',
      element: staticElement,
    }
    deepEqual(test, expected)
  })

  it('describes an empty component', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <Empty />)
    const expected: NodeDescription = {
      type: 'empty',
    }
    deepEqual(test, expected)
  })

  it('describes a comment', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <Comment comment="Hello" />)
    const expected: NodeDescription = {
      type: 'comment',
      comment: 'Hello',
    }
    deepEqual(test, expected)
  })

  it('describes gracefully a numeric child', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => <h1>{42}</h1>)
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['42'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })

  it('describes gracefully an array child', () => {
    const { describeRing } = makeTestComponentContext({})
    const test = describeRing((jsx) => (
      <h1>
        {['Hello', ' ', 'world']}
        {['!']}
      </h1>
    ))
    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: {},
      immediateBind: {},
      children: ['Hello', ' ', 'world', '!'],
      childrenBind: undefined,
      childrenBindMode: undefined,
      events: {},
      styleBind: {},
      immediateStyleBind: {},
      classBind: {},
      immediateClassBind: {},
    }
    deepEqual(test, expected)
  })
})
