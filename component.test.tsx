import { JSDOM } from 'jsdom'
import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Observable, of } from 'rxjs'
import {
  ComponentContext,
  NodeDescription,
  makeTestComponentContext,
} from './component.js'
import { Event, makeTestEvent } from './events.js'
import { Children, jsx } from './jsx.js'

describe('component', () => {
  const { window } = new JSDOM()
  const { MouseEvent } = window

  it('supports custom component contexts at the jsx level', () => {
    interface CustomEvents {
      click: Event<MouseEvent>
    }
    const clickHandler = () => console.log('clicked')
    const TestComponent = (
      props: { hello: Observable<string> },
      { events, bindEffect }: ComponentContext<CustomEvents>,
    ) => {
      const { click } = events
      bindEffect(click, clickHandler)
      return <h1 bind={{ innerText: props.hello }} events={{ click }} />
    }

    const hello = of('Hello')
    const click = makeTestEvent(of(new MouseEvent('click')))
    const { context, effects } = makeTestComponentContext<CustomEvents>({
      click,
    })

    const testComponent = <TestComponent hello={hello} />
    const expectedTestComponent: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: { hello },
      children: [],
      childrenBind: undefined,
      childrenPrepend: undefined,
    }

    deepEqual(testComponent, expectedTestComponent)

    const test = TestComponent({ hello }, context)

    const expectedEffects = [[click, clickHandler]]

    deepEqual(effects, expectedEffects)

    const expected: NodeDescription = {
      type: 'element',
      element: 'h1',
      attributes: {},
      bind: { innerText: hello },
      immediateBind: {},
      events: { click },
      children: [],
      childrenBind: undefined,
      childrenPrepend: undefined,
    }
    deepEqual(test, expected)
  })

  it('supports binding children', () => {
    interface CustomEvents {
      click: Event<MouseEvent>
    }

    const hello = of('Hello')
    const click = makeTestEvent(of(new MouseEvent('click')))
    const { context } = makeTestComponentContext<CustomEvents>({
      click,
    })
    const TestComponent = (
      props: { hello: Observable<string> },
      ctx: ComponentContext<CustomEvents>,
    ) => (
      <div>
        <h1
          bind={{ innerText: props.hello }}
          events={{ click: ctx.events.click }}
        />
        <Children context={ctx} />
      </div>
    )

    const test = (
      <TestComponent hello={hello}>
        <p>Some example children</p>
      </TestComponent>
    )
    const expected: NodeDescription = {
      type: 'component',
      component: TestComponent,
      properties: { hello },
      children: [
        {
          type: 'element',
          element: 'p',
          children: ['Some example children'],
          attributes: {},
          bind: {},
          immediateBind: {},
          events: {},
          childrenBind: undefined,
          childrenPrepend: undefined,
        },
      ],
      childrenBind: undefined,
      childrenPrepend: undefined,
    }
    deepEqual(test, expected)

    const testComponent = TestComponent({ hello }, context)

    const expectedComponent: NodeDescription = {
      type: 'element',
      element: 'div',
      attributes: {},
      bind: {},
      immediateBind: {},
      childrenBind: undefined,
      childrenPrepend: undefined,
      events: {},
      children: [
        {
          type: 'element',
          element: 'h1',
          attributes: {},
          bind: { innerText: hello },
          immediateBind: {},
          events: { click },
          children: [],
          childrenBind: undefined,
          childrenPrepend: undefined,
        },
        {
          type: 'children',
          context,
        },
      ],
    }
    deepEqual(testComponent, expectedComponent)
  })
})
