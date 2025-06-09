---
layout: page.vto
title: 'State Management: Butterflies and View Models'
order: 2
tags: ['top']
---

# State Management: Butterflies and View Models

Previously in the [Getting Started][started] tour we covered
a basic Butterfloat application and a couple of sample components
including adding basic dynamic binds to them and then basic
interactivity. Let's push onto an example with a bit more
internal state to juggle.

## Our Contrived Example

We've got a number of tasks to do in a garden and we are sending them
off to the lowest bidder (a neighborhood kid) to get them done. Each
task costs some money out of gardening budget and costs some time
from our worker's available labor budget (they want to get home to
watch cartoons by a reasonable hour).

## Modeling State inside a Garden Component

For a first pass, we might want to model some or all of this possible
state directly in our component. The Butterfloat utility for state
management here is imaginatively called `butterfly`.

Let's add a few butterflies to represent our resources, with very
simple HTML status bars.

```tsx
import { butterfly, jsx } from 'butterfloat'
import { map } from 'rxjs'

export function Garden() {
  const [money, setMoney] = butterfly(1)
  const [labor, setLabor] = butterfly(0)

  const moneyPercent = money.pipe(
    map((money) => money.toLocaleString(undefined, { style: 'percent ' })),
  )

  const laborPercent = labor.pipe(
    map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
  )

  return (
    <div className="garden">
      <div className="stat-label">Money</div>
      <progress
        title="Money"
        bind={{ value: money, innerText: moneyPercent }}
      />
      <div className="stat-label">Labor</div>
      <progress
        title="Labor"
        bind={{ value: labor, innerText: laborPercent }}
      />
    </div>
  )
}
```

Since these resources are abstract anyway, we're just representing
them as floating point percentages (between 0 and 1). We could scale
them to fake dollars or hours later.

At this point, you might think that `butterfly` looks a lot like
React's `useState`, because it does. However, `butterfly` is much
simpler than `useState`. It doesn't know anything about the component
model or do anything to signal updates, it just returns an ordinary
Observable to do ordinary Observable things (such as map us to fancy
localized percentage output in the above example). `butterfly` can
be used anywhere you want, not just inside components. (Spoilers:
it's just a funny way to spell `new BehaviorSubject()`.)

## Add Garden Activity

Let's add our first garden activity. We'll call it "Rake" and have
it take 15% of our money budget and use 30% of our labor resources.

```tsx
import {
  type ComponentContext,
  type ObservableEvent,
  butterfly,
  jsx,
} from 'butterfloat'
import { map } from 'rxjs'

interface GardenProps {}

interface GardenEvents {
  rake: ObservableEvent<MouseEvent>
}

function Garden(
  props: GardenProps,
  { bindEffect, events }: ComponentContext<GardenEvents>,
) {
  const [money, setMoney] = butterfly(1)
  const [labor, setLabor] = butterfly(0)

  const moneyPercent = money.pipe(
    map((money) => money.toLocaleString(undefined, { style: 'percent ' })),
  )

  const laborPercent = labor.pipe(
    map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
  )

  bindEffect(events.rake, () => {
    setMoney((money) => money - 0.15)
    setLabor((labor) => labor + 0.3)
  })

  return (
    <div className="garden">
      <div className="stat-label">Money</div>
      <progress
        title="Money"
        bind={{ value: money, innerText: moneyPercent }}
      />
      <div className="stat-label">Labor</div>
      <progress
        title="Labor"
        bind={{ value: labor, innerText: laborPercent }}
      />
      <div className="section-label">Activities</div>
      <button type="button" events={{ click: events.rake }}>
        Rake
      </button>
    </div>
  )
}
```

At this point you might see `bindEffect` from `ComponentContext` for
the first time and think that it looks a lot like React's
`useEffect`, except it takes an Observable as first parameter.

As with `butterfly`, `bindEffect` is again much simpler than its
React counterpart. In this case it is mostly a fun way to spell
`subscribe` to an Observable, but it does a few scheduling things
and manages the Subscription lifetime (cleaning up on Component
shutdown, for instance) for you.

## Refactoring to a View Model

At this point it is probably clear that maybe we've got too much
business logic (or at least Garden logic) inside our Component.
It's likely only to get more complicated from here: we're going to
want more activities and we're probably going to want things like
bounds checking (we don't want to get into too much debt gardening,
and our friendly neighborhood laborer probably will get upset if
you over-schedule them, so we should avoid that).

We can pull this state management out into its own "view model"
class. Doing so can simplify some testing if we break this Garden
logic into its own class or classes. (As [Getting Started][started]
showed, it is still easy enough to navigate the JSX produced
"Descriptions" of a component to test Observables, but that still
ties you to the layout of your produced HTML.)

Using shared view models may also make it easier to refactor to
more, smaller controls using a shared view model class.

Let's pull the logic as it currently is into its own view model
class so that we can test it on its own:

```tsx
import { type StateSetter, butterfly } from 'butterfloat'
import type { Observable } from 'rxjs'

export class GardenState {
  // *** Resources ***

  readonly #money: Observable<number>
  readonly #setMoney: (money: StateSetter<number>) => void
  get money() {
    return this.#money
  }

  readonly #labor: Observable<number>
  readonly #setLabor: (labor: StateSetter<number>) => void
  get labor() {
    return this.#labor
  }

  // *** Views of our resources ***

  readonly #moneyPercent: Observable<string>
  get moneyPercent() {
    return this.#moneyPercent
  }

  readonly #laborPercent: Observable<string>
  get laborPercent() {
    return this.#laborPercent
  }

  constructor() {
    ;[this.#money, this.#setMoney] = butterfly(1)
    ;[this.#labor, this.#setLabor] = butterfly(0)

    this.#moneyPercent = this.money.pipe(
      map((money) => money.toLocaleString(undefined, { style: 'percent ' })),
    )

    this.#laborPercent = this.labor.pipe(
      map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
    )
  }

  // *** Activities ***

  rake() {
    this.#setMoney((money) => money - 0.15)
    this.#setLabor((labor) => labor + 0.3)
  }
}
```

We want to encapsulate our private API (the raw set states) from
our public APIs (our Observables and Activities), so there's a bunch
of "boilerplate" for Typescript types to setup our private,
`readonly` backing fields and our get-only properties.

The constructor itself is mostly just a cut-and-paste: as hinted at,
`butterfly` doesn't know anything about components and isn't
restricted to them, so is just as comfortable here powering
observable state inside a View Model class as it was inside our
components.

It's just as simple to update our Garden component to use this VM
instead of directly embedding its state:

```tsx
import {
  type ComponentContext,
  type ObservableEvent,
  butterfly,
  jsx,
} from 'butterfloat'
import { map } from 'rxjs'

interface GardenProps {}

interface GardenEvents {
  rake: ObservableEvent<MouseEvent>
}

function Garden(
  props: GardenProps,
  { bindEffect, events }: ComponentContext<GardenEvents>,
) {
  const vm = new GardenState()

  bindEffect(events.rake, () => vm.rake())

  return (
    <div className="garden">
      <div className="stat-label">Money</div>
      <progress
        title="Money"
        bind={{ value: vm.money, innerText: vm.moneyPercent }}
      />
      <div className="stat-label">Labor</div>
      <progress
        title="Labor"
        bind={{ value: vm.labor, innerText: vm.laborPercent }}
      />
      <div className="section-label">Activities</div>
      <button type="button" events={{ click: events.rake }}>
        Rake
      </button>
    </div>
  )
}
```

## Next Steps

With the basics of State Management down, we can more easily discuss
[Class and Style Binding][style].

[started]: ./getting-started.md
[style]: ./style.md
