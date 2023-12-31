# Getting Started with Butterfloat (and a Brief Tour of Butterfloat)

First of all, install Butterfloat into your project:

```
npm install butterfloat
```

For better Typescript inference you may also want to install `rxjs`
as a direct dependency.

In your `tsconfig.json` file you will want to configure the JSX
properties so that it compiles TSX for Butterfloat:

```json
{
  "compilerOptions": {
    // …
    "jsx": "react",
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

## An Example Hello World App

Start with a basic `index.html`:

```html
<!doctype html>
<html>
  <head>
    <title>Butterfloat Tour Example</title>
  </head>

  <body>
    <div id="container" class="container">
      <h1>Butterfloat Tour Example</h1>
    </div>

    <script type="module" src="main.js"></script>
  </body>
</html>
```

We can create a simple Hello World `Hello` and `Main` component in
`main.tsx`:

```tsx
import { jsx, run } from 'butterfloat'

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
```

Other than the imports, this may look a lot like a React functional
component going way back.

While Butterfloat and React share TSX and have a lot of surface
similarities including accepting props, the behaviors of components
in the two are very different. In Butterfloat, components functions
are run once and only once per instance. There's no re-render
process.

In this example the Hello component is entirely _static_. It outputs
static HTML. It does have a parameter, but it cannot change (because
the function is only called once). Similarly, the Main component here
is also effectively static. It offers one hardcoded prop to the Hello
component and has no way to change it in the future.

## Let's Add Some Dynamism to the Hello World App

In Butterfloat, static HTML looks _static_ and the only things that
can dynamically change things are RxJS Observables and other
Butterfloat components (which, if you are curious, are wired into
Observables). To add some dynamic changes to our we'll need to
_bind_ an Observable.

```tsx
import { jsx, run } from 'butterfloat'
import { Observable, concat, interval, of, map } from 'rxjs'

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
```

In this Hello component example the dynamic bind looks quite a bit
different from the static version. The easiest way to change the text
inside of this element is to bind to the DOM property `innerText` and
we'd lose any JSX text already there, so we move the "Hello" text up
into our innerText Observable.

Quick TSX reminder: `bind={{ innertext }}` is not a new syntax, but
a object constructor inside of a TSX attribute using some additional
shorthand. It's equivalent to `bind={{ innnerText: innerText }}` if
that helps you better visualize what is happening in the example
above.

## Let's Make it Interactable

An application isn't all that exciting if you can't interact with it,
so let's add a simple button to press to change it's mood:

```tsx
import {
  ComponentContext,
  ObservableEvent,
  butterfly,
  jsx,
  run,
} from 'butterfloat'
import {
  Observable,
  combineLatest,
  concat,
  interval,
  of,
  map,
  scan,
} from 'rxjs'

interface HelloProps {
  to: Observable<string>
}

interface HelloEvents {
  toggleGreeting: ObservableEvent<MouseEvent>
}

export function Hello(
  { to }: HelloProps,
  { events }: ComponentContext<HelloEvents>,
) {
  const { toggleGreeting } = events

  // starting with "Hello", alternate "Hello" and "Good Night"
  const greeting = concat(
    of('Hello'),
    toggleGreeting.pipe(
      scan((greet) => (greet === 'Hello' ? 'Good Night' : 'Hello'), 'Hello'),
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
```

This is where we start to see things diverge from React function
components as we know them. The second parameter to Butterfloat
component is a fancy type called the `ComponentContext`. One of the
things this Component Context is useful for is dependency injecting
our events observables.

In this case, we want to know when our "Change Mood" button is
clicked and we're calling that our `toggleGreeting` event, which
we bind to the button's click event.

A benefit to this dependency injection of events is that we can test
them with the full power of RxJS "marble testing". For instance:

```ts
import { deepEqual, equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  ElementDescription,
  makeTestEvent,
  makeTestComponentContext,
} from 'butterfloat'
import { JSDOM } from 'jsdom'
import { of } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { Hello } from './main.js'

describe('hello component', () => {
  it('toggles greetings', () => {
    const { window } = new JSDOM()
    const { MouseEvent } = window

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
```

This is using [JSDOM][jsdom] as a Node capable implementation of
`MouseEvent` for testing, which is likely a bit of overkill for this
sort of testing. The `ElementDescription` and "JSX Description
Language" of Butterfloat don't have any other DOM specifics at this
level of component testing.

## Next Steps

At some point your components may need [State Management][state]
of one sort or another.

[jsdom]: https://github.com/jsdom/jsdom
[state]: ./state.md
