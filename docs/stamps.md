# Stamps

If you've been following along from the [Getting Started][started] path,
we would have most recently explored
[advanced binding tools such as Suspense][suspense]. Stamps are a similarly
advanced tool, but may be easier to pick up and explore.

## Optimizing for Server-Side Rendering and/or Progressive Enhancement

Butterfloat is reasonably well-optimized for a good default DOM rendering
experience. In the lifetime of a component, the static parts of the DOM
are built once and only once.

However, sometimes doing things even just once may need to be optimized.
If your website or app is producing lots of the same component, it can
help to memoize the DOM tree creation. If you are worried about time to
meaningful content paint and hoping to serve the under-privileged with
any combination of slow network access, slow browsers, and limited memory,
you might want to bake as much of the static DOM parts as you can into HTML
for the browser's highly optimized HTML parser. There are plenty more
reasons besides those to seek further "server-side rendering" or
"progressive enhancement" tools.

Butterfloat's building blocks for optimizing these scenarios are called
Stamps. Any Butterfloat Component that is designed to be easily unit
tested should be capable of being built into a stamp. If the static DOM
is predictable given the static properties passed into it, you can build
a stamp of every static property variation that makes sense to optimize.
With any DOM library such as JSDOM you should be able to build these
stamps easily in Node or Deno (or even in a browser), either locally
ahead of time or automated in a server-side render.

Stamps have markers for the interactive bindings of a Component and once
a stamp has been associated with that Component with the applicable
properties, the stamp can be used to instantiate a fully interactive
component. Other than making sure that the Component is unit testable
and the static DOM output is deterministic (given applied properties)
and stable there are no other changes to the way that a Component is
written. There's no concept of "server component" or "client component"
to be concerned with. There's no need to mark "islands". Butterfloat
already understands your bindings and will progressively enhance the
stamps you give it into a working, interactive components at runtime.

## Build a Stamp from a Simple Component

Given the most basic sort of component:

```ts
import { jsx } from 'butterfloat'

export function Hello() {
  return <p>Hello World</p>
}
```

we just need to run the component
once to get its Node Descriptions and pass that to `buildStamp` to
build a Stamp:

```ts
import { buildStamp } from 'butterfloat'
import { Hello } from './hello-component.js'

const hello = Hello()
export const helloStamp = buildStamp(hello)
```

?> If you are using a DOM library with its own `document` object, you
can pass it as the second argument to `buildStamp`.

The Stamp output will be a `<template>` tag (`HTMLTemplateElement`) that
you can serialize (such as with `outerHTML`) or `append` to some other
DOM container. For instance, if you were working with an HTML template
builder in JSDOM in Node, you could append it naturally:

```js
import { JSDOM } from 'jsdom'
import { writeFile } from 'node:fs/promises'
import { helloStamp } from './hello-stamp.js'

const dom = new JSDOM(`
    <!doctype html>
    <html>
        <head>
            <title>Example Template</title>
        </head>
        <body id="app">
        </body>
    </html>
`)
const { window } = dom
const { document } = window
const appContainer = document.getElementById('app')!

// Set an id so that we can query for it
helloStamp.id = 'hello-component'
appContainer.append(helloStamp)

await writeFile('index.html', dom.serialize())
```

To use a Stamp you register it with a `StampCollection` and pass that
Stamp collection to `runStamps`, a drop-in replacement for the normal
Butterfloat `run` which uses a Stamp collection to reuse registered
Stamps.

```ts
import { StampCollection, runStamps } from 'butterfloat'
import { Hello } from './hello-component.js'

const appContainer = document.getElementById('app')!
const helloStamp = appContainer.querySelector(
  'hello-component',
) as HTMLTemplateElement

const stamps = new StampCollection()
// This component only has one Stamp
stamps.registerOnlyStamp(Hello, helloStamp)

runStamps(appContainer, Hello, stamps)
```

## Build a Stamp with Multiple Alternatives

A Component may vary its static DOM parts based upon static properties.

For a simple example:

```ts
import { jsx } from 'butterfloat'
import { Observable, map } from 'rxjs'

export interface RollResultProps {
    faces: number
    roll: Observable<number>
}

function dieType(faces: number) {
    switch (faces) {
        case 6: return 'd6'
        case 20: return 'd20'
        default: return 'generic-roll'
    }
}

export function RollResult({ faces, roll }: RollResultProps) {
    const dtype = dieType(faces)
    const rollValue = roll.pipe(map((value: number) => value.toString()))
    return (
    <span class={`roll-result ${dtype}`} bind={{ innerText: rollValue }}></span>
    )
}
```

You can build a stamp for each of the variations:

```ts
import { buildStamp } from 'butterfloat'
import { JSDOM } from 'jsdom'
import { writeFile } from 'node:fs/promises'
import { NEVER } from 'rxjs'
import { RollResult } from './roll-result-component.ts'

const dom = new JSDOM(`
    <!doctype html>
    <html>
        <head>
            <title>Example Template</title>
        </head>
        <body id="app">
        </body>
    </html>
`)
const { window } = dom
const { document } = window
const appContainer = document.getElementById('app')!

const d6stamp = buildStamp(RollResult({ faces: 6, roll: NEVER }), document)
d6stamp.id = 'roll-result-d6'
appContainer.append(d6stamp)

const d20stamp = buildStamp(RollResult({ faces: 20, roll: NEVER }), document)
d20stamp.id = 'roll-result-d20'
appContainer.append(d20stamp)

const genericRollStamp = buildStamp(
  RollResult({ faces: 99, roll: NEVER }),
  document,
)
genericRollStamp.id = 'roll-result-generic'
appContainer.append(genericRollStamp)

await writeFile('index.html', dom.serialize())
```

To use these Stamps you register them with a Stamp collection and include
a function to describe when the stamp applies based on the component's
properties:

```ts
import { StampCollection, runStamps } from 'butterfloat'
import { Main } from './main.js'
import { RollResult } from './roll-result-component.js'

const appContainer = document.getElementById('app')!

const d6stamp = appContainer.querySelector(
  'roll-result-d6',
) as HTMLTemplateElement
const d20stamp = appContainer.querySelector(
  'roll-result-d20',
) as HTMLTemplateElement
const genericRollStamp = appContainer.querySelector(
  'roll-result-generic',
) as HTMLTemplateElement

const stamps = new StampCollection()
stamps
  .registerStampAlternative(RollResult, ({ faces }) => faces === 6, d6stamp)
  .registerStampAlternative(RollResult, ({ faces }) => faces === 20, d20stamp)
  .registerStampAlternative(
    RollResult,
    ({ faces }) => faces !== 6 && faces !== 20,
    genericRollStamp,
  )

runStamps(appContainer, Main, stamps)
```

## Build a Stamp with a Test Context

To build a Stamp from a component that needs a Context, use the same
`makeTestContext` and `makeTestEvent` you would for unit testing that
same component.

```ts
import { ComponentContext, ObservableEvent, buildStamp, jsx, makeTestEvent, makeTestComponent } from 'butterfloat'
import { NEVER } from 'rxjs'

export interface WinButtonProps {}

export interface WinButtonEvents {
    click: ObservableEvent<MouseEvent>
}

export function WinButton(_props: WinButtonProps, { events }: ComponentContext<WinButtonEvents>) {
    return <button class='btn win-button' bindEvent={{ click: events.click }}>Click to Win!</button>
}

const { context: winContext } = makeTestComponentContext({
    click: makeTestEvent<MouseEvent>(NEVER)
})
export const winButtonStamp = buildStamp(WinButton({}, winContext))
```

## Build a Prestamp

The general experience of Stamps is `<template>` tags that do not render
anything until cloned while activating a Component. For "progressive
enhancement" scenarios and other reasons you may want to stamp a template
ahead of time to fill a rendered container. In `StampCollection` terms
this is a "prestamp".

Example:

```ts
import { JSDOM } from 'jsdom'
import { writeFile } from 'node:fs/promises'
import { Main } from './main.js'

const dom = new JSDOM(`
    <!doctype html>
    <html>
        <head>
            <title>Example Template</title>
        </head>
        <body id="app">
        </body>
    </html>
`)
const { window } = dom
const { document } = window
const appContainer = document.getElementById('app')!

const mainStamp = buildStamp(Main(), document)
// Fill the container with the content of the template
appContainer.append(mainStamp.content)

await writeFile('index.html', dom.serialize())
```

You register a Prestamp in a similar way, including optional static
property matcher, as any other Stamp:

```ts
import { StampCollection, runStamps } from 'butterfloat'
import { Main } from './main.js'

const appContainer = document.getElementById('app')!

const stamps = new StampCollection()
stamps.registerPrestamp(Main, appContainer)

runStamps(appContainer, Main, stamps)
```

[started]: ./getting-started.md
[suspense]: ./suspense.md
