import { JSDOM } from 'jsdom'
import { deepEqual, equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  Observable,
  combineLatest,
  concat,
  interval,
  map,
  of,
  scan,
} from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import {
  ComponentContext,
  ElementDescription,
  ObservableEvent,
  jsx,
  makeTestComponentContext,
  makeTestEvent,
  run,
} from '../index.js'

describe('getting started documentation', () => {
  // These are mostly skips because we want to test compilation
  // more than behavior

  it.skip('supports the static example', () => {
    interface HelloProps {
      to: string
    }

    function Hello({ to }: HelloProps) {
      return <p className="hello">Hello {to}</p>
    }

    function Main() {
      return <Hello to="World" />
    }

    const container = document.getElementById('container')!
    run(container, Main)
  })

  it.skip('supports the dynamic example', () => {
    interface HelloProps {
      to: Observable<string>
    }

    function Hello({ to }: HelloProps) {
      const innerText = to.pipe(map((to) => `Hello ${to}`))
      return <p className="hello" bind={{ innerText }} />
    }

    function Main() {
      const greetable = ['World', 'Butterfloat', 'User']

      // starting with "World" show a random greeting every 15 seconds
      const helloTo = concat(
        of('World'),
        interval(15_000 /* ms */).pipe(
          map(() => greetable[Math.round(Math.random() * greetable.length)]),
        ),
      )

      return <Hello to={helloTo} />
    }

    const container = document.getElementById('container')!
    run(container, Main)
  })

  it.skip('supports the interactable example', () => {
    interface HelloProps {
      to: Observable<string>
    }

    interface HelloEvents {
      toggleGreeting: ObservableEvent<MouseEvent>
    }

    function Hello(
      { to }: HelloProps,
      { events }: ComponentContext<HelloEvents>,
    ) {
      const { toggleGreeting } = events

      // starting with "Hello", alternate "Hello" and "Good Night"
      const greeting = concat(
        of('Hello'),
        toggleGreeting.pipe(
          scan(
            (greet) => (greet === 'Hello' ? 'Good Night' : 'Hello'),
            'Hello',
          ),
        ),
      )

      const innerText = combineLatest([greeting, to]).pipe(
        map(([greeting, to]) => `${greeting} ${to}`),
      )
      return (
        <div>
          <p className="hello" bind={{ innerText }} />
          <button type="button" events={{ click: toggleGreeting }}>
            Change Mood
          </button>
        </div>
      )
    }

    function Main() {
      const greetable = ['World', 'Butterfloat', 'User']

      // starting with "World" show a random greeting every 15 seconds
      const helloTo = concat(
        of('World'),
        interval(15_000 /* ms */).pipe(
          map(() => greetable[Math.round(Math.random() * greetable.length)]),
        ),
      )

      return <Hello to={helloTo} />
    }

    const container = document.getElementById('container')!
    run(container, Main)
  })

  it('runs the togglesGreeting test', () => {
    const { window } = new JSDOM()
    const { MouseEvent } = window

    interface HelloProps {
      to: Observable<string>
    }

    interface HelloEvents {
      toggleGreeting: ObservableEvent<MouseEvent>
    }

    function Hello(
      { to }: HelloProps,
      { events }: ComponentContext<HelloEvents>,
    ) {
      const { toggleGreeting } = events

      // starting with "Hello", alternate "Hello" and "Good Night"
      const greeting = concat(
        of('Hello'),
        toggleGreeting.pipe(
          scan(
            (greet) => (greet === 'Hello' ? 'Good Night' : 'Hello'),
            'Hello',
          ),
        ),
      )

      const innerText = combineLatest([greeting, to]).pipe(
        map(([greeting, to]) => `${greeting} ${to}`),
      )
      return (
        <div>
          <p className="hello" bind={{ innerText }} />
          <button type="button" events={{ click: toggleGreeting }}>
            Change Mood
          </button>
        </div>
      )
    }

    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )
    testScheduler.run(({ cold, expectObservable }) => {
      const eventValues = {
        a: new MouseEvent('click'),
        b: new MouseEvent('click'),
      }
      const events = cold('--a--b', eventValues)
      const expected = '   x-y--x'
      const expectedValues = {
        x: 'Hello World',
        y: 'Good Night World',
      }
      const toggleGreeting = makeTestEvent(events)
      const { context } = makeTestComponentContext({ toggleGreeting })

      const div = Hello({ to: of('World') }, context)
      equal(div.type, 'element')
      const p = div.children[0]
      ok(typeof p === 'object')
      equal(p.type, 'element')
      expectObservable(p.bind.innerText).toBe(expected, expectedValues)
    })
  })
})
