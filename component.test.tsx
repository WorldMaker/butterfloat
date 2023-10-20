import { deepEqual } from "node:assert/strict"
import { describe, it } from "node:test"
import { Observable, of } from "rxjs"
import { ComponentContext, NodeDescription, makeTestComponentContext } from "./component.js"
import { Event, makeTestEvent } from './events.js'
import { jsx } from './jsx.js'

describe('component', () => {
  it('supports custom component contexts at the jsx level', () => {
    interface CustomEvents {
        click: Event<string>
    }
    const clickHandler = () => console.log('clicked')
    const TestComponent = (props: { hello: Observable<string> }, { events, bindEffect }: ComponentContext<CustomEvents>) => {
      const { click } = events
      bindEffect(click, clickHandler)
      return <h1 bind={{ innerText: props.hello }} events={{ click }} />
    }

    const hello = of('Hello')
    const click = makeTestEvent(of('Test click'))
    const { context, effects } = makeTestComponentContext<CustomEvents>({ click })

    const testComponent = <TestComponent hello={ hello } />
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

    const expectedEffects = [
        [click, clickHandler]
    ]

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
})