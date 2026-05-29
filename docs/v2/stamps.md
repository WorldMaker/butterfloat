---
title: Stamps
order: 4
---

# Stamps

If you've been following along from the [Getting Started][started] path,
you have seen several styles of bindings such as
[Class and Style Binding][style].

It is useful for server-side rendering and progressive enhancement
scenarios to consider not just what dynamic parts get bound, but which
parts are truly stable and under what conditions.

Butterfloat supports reusable templates known Stamps. We can opt
components into direct reuse of their templates (stamping them instead
or rebuilding them) by marking them as a stamp.

## Marking a Simple Component as a Stamp

Given the most basic sort of component:

```tsx
import { type jsx } from 'butterfloat'

export function Hello(_: unknown, { jsx }: jsx.Mat) {
  return <p>Hello World</p>
}
```

We know from [Getting Started][started] that components that look like
they return static HTML actually return static HTML. We can take more
advantage of this and tell Butterfloat that every time it encounters
this `<Hello />` component that it can reuse the same template HTML.

We do this by marking this as a stamp with component's Mat:

```tsx
import { type jsx } from 'butterfloat'

export function Hello(_: unknown, { jsx, stamp }: jsx.Mat) {
  stamp() // mark this component as a Stamp
  return <p>Hello World</p>
}
```

This states that the HTML is stable no matter what props are passed to
the component. There's no if condition or switch or ternary
(such as `something ? <p>A</p> : <p>B</p>`) that produces different
HTML. That's why it is an opt-in mark, it's up to you to make sure that
the component's HTML is actually stable, otherwise you will get caching
problems when the wrong HTML is cached and attempted to be reused.

When marked as a stamp, the first time `<Hello />` is encountered a
template is built, and then that template is reused for any additional
usages without needing to build it again.

### Shortcut for Truly Simple Components

This most basic form of component that only needs a `jsx.Mat` to mark
a component as a stamp and get access to the `jsx` function is
relatively common for small, stable components. To help make these
faster to write, Butterfloat offers a `stamp` helper function:

```tsx
import { type jsx, stamp } from 'butterfloat'

// stamp() creates a component with no props that is marked as a stamp
export const Hello = stamp((jsx) => <p>Hello World</p>)
```

## Marking a Component With Bindings as a Stamp

Bindings such as we've seen in previous pages count as stable so far as
the HTML output of a component is concerned. You can mark components
with any number of bindings as stable. This makes sense as a stamp:

```tsx
import { type jsx } from 'butterfloat'
import { type Observable } from 'rxjs'

export interface HelloProps {
  message: Observable<string>
}

export function Hello({ message }: HelloProps, { jsx, stamp }: jsx.Mat) {
  stamp() // mark this component as a Stamp
  return <p bind={{ innerText: message }} />
}
```

The HTML is still stable even with `bind`. The output HTML is always
something like `<p data-bf-bind="a1g3"></p>` where Butterfloat manages
an opaque "bind ID" system to connect the bindings to the appropriate
DOM elements when it is time to do so.

## Marking a Stamp with Multiple Alternatives

A Component may vary its static DOM parts based upon static properties.
This sort of Component may still qualify as a Stamp, where the templates
get reused only if the static properties match.

There is a variable stamp marker called `stampWhen(condition)`.

For a simple example:

```tsx
import { type jsx } from 'butterfloat'
import { type Observable, map } from 'rxjs'

export interface RollResultProps {
  faces: number
  roll: Observable<number>
}

function dieType(faces: number) {
  switch (faces) {
    case 6:
      return 'd6'
    case 20:
      return 'd20'
    default:
      return 'generic-roll'
  }
}

export function RollResult(
  { faces, roll }: RollResultProps,
  { jsx, stampWhen }: jsx.Mat<unknown, RollResultProps>,
) {
  // this HTML is stable when given the same faces value
  // (the static `class` attribute is different for each faces value)
  stampWhen((props) => props.faces === faces)
  const dtype = dieType(faces)
  const rollValue = roll.pipe(map((value: number) => value.toString()))
  return (
    <span class={`roll-result ${dtype}`} bind={{ innerText: rollValue }}></span>
  )
}
```

Each time Butterfloat encounters a new `faces` value, it will generate
a new stamp. But if it encounters a `faces` value it has already stamped
it will reuse the appropriate stamp.

```tsx
import { type jsx, stamp } from 'butterfloat'

export interface ThreeRolesProps {
  roll1: Observable<number>
  roll2: Observable<number>
  roll3: Observable<number>
}

/* Assuming this is the only uses of RollResult in the current run, the
   comments below are the stamping behavior. */

export const ThreeRoles = stamp(
  (jsx, { roll1, roll2, roll3 }: ThreeRolesProps) => (
    <div>
      <RollResult faces={20} roll={roll1} />
      {/* creates faces === 20 stamp */}
      <RollResult faces={6} roll={roll2} />
      {/* creates faces === 6 stamp */}
      <RollResult faces={20} roll={roll3} />
      {/* reuses stamp where faces === 20 */}
    </div>
  ),
)
```

### Shortcut for Simple Stamps with Alternates

Butterfloat also provides a top-level `stampWhen()` helper for common,
simple cases. For example:

```tsx
import { type jsx } from 'butterfloat'
import { type Observable, map } from 'rxjs'

export interface RollResultProps {
  faces: number
  roll: Observable<number>
}

function dieType(faces: number) {
  switch (faces) {
    case 6:
      return 'd6'
    case 20:
      return 'd20'
    default:
      return 'generic-roll'
  }
}

export const RollResult = stampWhen(
  (jsx, { faces, roll }: RollResultProps) => ({
    condition: (props) => props.faces === faces,
    ring: (
      <span
        class={`roll-result ${dieType(faces)}`}
        bind={{
          innerText: roll.pipe(map((value: number) => value.toString())),
        }}
      ></span>
    ),
  }),
)
```

## TODO: Building stamps (OUTDATED)

we just need to run the component
once to get its Node Descriptions and pass that to `buildStamp` to
build a Stamp:

```ts
import { buildStamp } from 'butterfloat'
import { Hello } from './hello-component.js'

const hello = Hello()
export const helloStamp = buildStamp(hello)
```

> [!TIP]
> If you are using a DOM library with its own `document` object, you
> can pass it as the second argument to `buildStamp`.

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
const helloStamp =
  appContainer.querySelector<HTMLTemplateElement>('hello-component')!

const stamps = new StampCollection()
// This component only has one Stamp
stamps.registerOnlyStamp(Hello, helloStamp)

runStamps(appContainer, Hello, stamps)
```

## TODO: Build a Stamp with Multiple Alternatives (OUTDATED)

A Component may vary its static DOM parts based upon static properties.

For a simple example:

```ts
import { jsx } from 'butterfloat'
import { type Observable, map } from 'rxjs'

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

const d6stamp =
  appContainer.querySelector<HTMLTemplateElement>('roll-result-d6')!
const d20stamp =
  appContainer.querySelector<HTMLTemplateElement>('roll-result-d20')!
const genericRollStamp = appContainer.querySelector<HTMLTemplateElement>(
  'roll-result-generic',
)!

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

## TODO: Build a Stamp with a Test Context (OUTDATED)

To build a Stamp from a component that needs a Context, use the same
`makeTestContext` and `makeTestEvent` you would for unit testing that
same component.

```ts
import { type ComponentContext, type ObservableEvent, buildStamp, jsx, makeTestEvent, makeTestComponent } from 'butterfloat'
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

## TODO: Build a Prestamp (OUTDATED)

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
[style]: ./style.md
