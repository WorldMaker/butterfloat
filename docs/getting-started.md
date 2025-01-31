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
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "node",
    // …
    "jsx": "react",
    "jsxFactory": "jsx",
    "jsxFragmentFactory": "Fragment"
  }
}
```

<details>
<summary>Explanation and Alternatives</summary>

## Typescript Compiler Options

Per [caniuse](https://caniuse.com), `ES${CurrentYear - 2}` is often
a strong 95%+ target in browsers today, so good choices for both
Typescript's `"target"` and `"module"` compiler options. We use
`"moduleResolution": "node"` for npm-installed packages.

Typescript has several "modes" for handling TSX files.
`"jsx": "react"` is the most generic, despite the name of the option
and tells Typescript not to try to auto-import anything and use the
cleanest compilation to just basic function calls.

`"jsxFactory": "jsx"` tells Typescript that our TSX function that
it compiles to call is named `jsx`. You will see this reflected
as a common import `import { jsx } from 'butterfloat'`, in all of the
examples to follow.

`"jsxFragmentFactory": "Fragment"` tells Typescript that our
"component" to use when it encounters a TSX fragment `<>…</>`. In
this case Butterfloat's is named just `Fragment` and will be imported
anywhere fragments are used. `import { Fragment, jsx } from 'butterfloat'`

## TSX Alternatives

The developer experience is best tuned for using Typescript to
compile TSX files to JSX. Especially in application testing you
may only need Typescript compilation and can directly use
`<script type="module">` and an `importmap` for `node_modules`
imports in 2024's browsers.

Other alternatives to compiling TSX with Typescript:

- babel: If you are still using Babel in 2024, it has similar
  settings to the three above. (You probably don't need Babel
  and it is not recommended.)
- esbuild: esbuild uses the exact same settings as Typescript and
  will pick them up from your `tsconfig.json` file. (esbuild is the
  current recommended bundler. You may not need a bundler, but if
  you do, esbuild is handy.)
- "no build": the `jsx` function of Butterfloat may be used like an
  `h` function directly in JS.

</details>

## Setup a Lightweight Dev Environment

We can take advantage of an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)
to do very lightweight dev testing.

Currently RxJS doesn't use file extensions in its imports, so we will
need to spot bundle RxJS for use with an import map. An easy way to
do this is this simple command:

```sh
npx esbuild --bundle ./node_modules/rxjs/dist/esm/index.js --outfile=./vendor/rxjs.js --format=esm
```

You probably want to install Typescript as a development dependency:

```sh
npm install --save-dev typescript
```

Once installed, to develop your application you can use a Typescript
watch such as:

```sh
tsc -p ./tsconfig.json --watch
```

You may then want to start a test server such as:

```sh
npx http-server
```

`http-server` might be a good choice for a dev dependency as well,
and you might want to add both as scripts to your package.json, for
ease of development:

```json
{
  // ...
  "type": "module",
  // ...
  "scripts": {
    "build": "tsc -p ./tsconfig.json",
    "watch": "tsc -p ./tsconfig.json --watch",
    "prestart": "npm run build",
    "start": "http-server"
  }
}
```

`"type": "module"` is useful to let us use the `.js` file extension
for all of our code, which we are focusing on ES Modules only.

<details>
<summary>Production Bundling</summary>

### Production Bundling

Today you may not need to do any production bundling. HTTP versions
2 and 3 no longer penalize lots of small files as harshly as HTTP
version 1 did. You can observe your application's behavior in your
browser's developer tools, test it with different latency/throttling
tools, and make an informed decision.

That said, if you are using the vendored `rxjs.js` from above you
can certainly win smaller bundles with more tree-shaking if you need
to shrink download size as much as possible.

[esbuild](https://esbuild.github.io) is a handy bundler (already
seen in action above), which supports your Typescript files directly
as inputs and auto-configures TSX support based on your same
`tsconfig.json` file.

</details>

## An Example Hello World App

Start with a basic `index.html` with an import map:

```html
<!doctype html>
<html>
  <head>
    <title>Butterfloat Tour Example</title>
    <script type="importmap">
      {
        "imports": {
          "butterfloat": "./node_modules/butterfloat/index.js",
          "rxjs": "./vendor/rxjs.js"
        }
      }
    </script>
    <script type="module" src="main.js"></script>
  </head>

  <body>
    <div id="container" class="container">
      <h1>Butterfloat Tour Example</h1>
    </div>
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
Observables). To add some dynamic changes to our example we'll need to
_bind_ an Observable.

```tsx
import { jsx, run } from 'butterfloat'
import { type Observable, concat, interval, of, map } from 'rxjs'

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
      map(() => greetable[Math.floor(Math.random() * greetable.length)]),
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
  type ComponentContext,
  type ObservableEvent,
  jsx,
  run,
} from 'butterfloat'
import {
  type Observable,
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
      map(() => greetable[Math.floor(Math.random() * greetable.length)]),
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
import { makeTestEvent, makeTestComponentContext } from 'butterfloat'
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

This example is using NodeJS's built-in test harness which you can
run with `node --test`. (If you are following along, you may need
to put this in a `hello.test.ts` and refactor the `Hello` component
into its own `hello.tsx` to avoid the `document` usage in
`main.tsx`.)

This is using [JSDOM][jsdom] as a Node capable implementation of
`MouseEvent` for testing, which is likely a bit of overkill for this
specific test. The `ElementDescription` and "JSX Description
Language" of Butterfloat don't have any other DOM specifics at this
level of component testing.

## Next Steps

At some point your components may need [State Management][state]
of one sort or another.

[jsdom]: https://github.com/jsdom/jsdom
[state]: ./state.md
