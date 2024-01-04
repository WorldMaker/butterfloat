import { JSDOM } from 'jsdom'
import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Observable, of } from 'rxjs'
import { ComponentContext, NodeDescription } from './component.js'
import { ObservableEvent, makeTestEvent } from './events.js'
import { Fragment, jsx } from './jsx.js'

describe('jsx', () => {
  const { window } = new JSDOM()
  const { MouseEvent } = window

  it('describes a simple static element', () => {
    const test = <h1>Hello</h1>
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
    const test = <h1 className="header">Hello</h1>
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
    const test = <h1 bind={{ className }}>Hello</h1>
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
    const test = <progress bind={{ bfDelayValue: percent }} />
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
    const test = <h1 classBind={{ header }}>Hello</h1>
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
    const test = <h1 styleBind={{ backgroundColor: red }}>Hello</h1>
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
    const TestComponent = () => <h1>Hello</h1>
    const childrenBind = of(TestComponent)
    const test = (
      <h1 childrenBind={childrenBind} childrenBindMode="replace">
        Hello
      </h1>
    )
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
    const click = makeTestEvent(of(new MouseEvent('click')))
    const test = <h1 events={{ click }}>Hello</h1>
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
    const TestComponent = () => <h1>Hello</h1>
    const test = <TestComponent />
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
    const TestComponent = (_props: unknown, { events }: ComponentContext) => {
      const click = events.click as ObservableEvent<MouseEvent>
      return <h1 events={{ click }}>Hello</h1>
    }
    const childrenBind = of(TestComponent)
    const test = (
      <TestComponent childrenBind={childrenBind} childrenBindMode="prepend" />
    )
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
    const TestComponent = (props: { hello: Observable<string> }) => (
      <h1 bind={{ innerText: props.hello }} />
    )
    const hello = of('Hello')
    const test = <TestComponent hello={hello} />
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
      { events }: ComponentContext,
    ) => (
      <h1
        bind={{ innerText: props.hello }}
        events={{ click: events.click as ObservableEvent<MouseEvent> }}
      />
    )
    const hello = of('Hello')
    const test = <TestComponent hello={hello} />
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
    const test = (
      <>
        <h1>Hello</h1>
      </>
    )
    const expected: NodeDescription = {
      type: 'fragment',
      attributes: {},
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
      childrenBind: undefined,
      childrenBindMode: undefined,
    }
    deepEqual(test, expected)
  })

  it('describes a fragment with a children bind', () => {
    const TestComponent = () => <h1>Hello</h1>
    const childrenBind = of(() => <TestComponent />)
    const test = (
      <Fragment childrenBind={childrenBind}>
        <h1>Hello</h1>
      </Fragment>
    )
    const expected: NodeDescription = {
      type: 'fragment',
      attributes: {},
      childrenBind,
      childrenBindMode: undefined,
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
})
