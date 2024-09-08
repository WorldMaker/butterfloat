# Butterfloat

Butterfloat is a Knockout-inspired view engine using modern ESM via Typescript and pure RxJS observables.

- [Knockout-inspired](#knockout-inspired)
- [TSX, but not a Virtual DOM](#tsx-but-not-a-virtual-dom)
- [Pure RxJS observables](#pure-rxjs-observables)
- Runtime dependency light: just [RxJS](https://rxjs.dev)
- Compile-time dependency light: Typescript encouraged

> "The greatest view engine the web has ever seen."

Further documentation: [Getting Started][started] starts a gentle
tour of Butterfloat features.

## Knockout-inspired

[Knockout](https://knockoutjs.com/) left a lasting legacy in web
development.

Like Knockout, Butterfloat is focused on providing a way to bind
dynamic changes in a web view. It comes from a perspective that
static DOM elements are more common and the "default" and that
dynamic changes should be bound from Observables.

Butterfloat benefits from advances in Typescript, modern ESM, and
RxJS since Knockout's best years.

## TSX, but not a Virtual DOM

TSX in Typescript is a powerful compile-time type checked template
language for HTML and similar trees. With TSX Butterfloat can provide
a best-in-class development experience at a fraction of the budget of
some other web views.

Butterfloat does not take a "Virtual DOM" approach, but it
does try to preserve some "Virtual DOM"-like benefits such as easier
component testing without a live DOM implementation/fill-in. Instead,
Butterfloat takes a "static-by-default" approach to DOM building and
only runs its components once (and only once) per component instance.

Butterfloat relies entirely on pure observables to signal changes to
be made, and the power of Butterfloat is how it schedules those
changes by default for you. It has no Virtual DOM diff/patch
routines, it binds changes directly to DOM instances.

The only parts of a Butterfloat component that may change are
Observables and Components, everything else is setup once and only
once.

If you are interested in seeing pure observables used in a Virtual
DOM, consider trying [Cycle.js](https://cycle.js.org).

## Pure, RxJS Observables

From an RxJS perspective, Knockout's Observables were more accurately
Subjects. It was sometimes too easy to leak private state-changing
APIs across API boundaries. There's nothing wrong with using Subjects
to store tiny bits of "atomic" state, in an Observable world, but
Butterfloat wants to help you better encapsulate public versus
private views of that state. (This includes a handy utility wrapper
around `BehaviorSubject<T>` named `butterfly`.)

Also, we all remember the magic of `ko.computed`, but with RxJS so
much of the power is appropriate use of RxJS operators in smart
pipelines. Butterfloat believes in doing the right things with RxJS
operators and avoiding "magic" Observable state and change
detection strategies like `ko.computed` was.

It's easy to see the legacy of Knockout in the way that its
"Observables" (Subjects) continued to influence "Signals" and related
ideas in later languages, and all sorts of "automated" and magic
change detection and signal detection logic. Butterfloat tries to
follow the other fork in the road of Knockout's legacy if it had
lived up to the name Observable that it chose to use and tried for
greater purity and more powerful usages of Observable scheduling
and operators.

## Next Steps

[Getting Started][started] can lead you through a gentle tour of
Butterfloat features.

## A Usage Example

A complex component with embedded state may look something like this:

```tsx
import { ComponentContext, ObservableEvent, butterfly, jsx } from 'butterfloat'
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
    <div class="garden">
      <div class="stat-label">Money</div>
      <progress
        title="Money"
        bind={{ value: money, innerText: moneyPercent }}
      />
      <div class="stat-label">Labor</div>
      <progress
        title="Labor"
        bind={{ value: labor, innerText: laborPercent }}
      />
      <div class="section-label">Activities</div>
      <button type="button" events={{ click: events.rake }}>
        Rake
      </button>
    </div>
  )
}
```

This may look like React at first glance, especially the intentional
surface level resemblance of `butterfly` to `useState` and `bindEffect`
to `useEffect`. This exact example is refactored in ways that a React
component can't be (moving the `butterfly` state to its own "view model")
in the [State Management][state] documentation, but it is suggested you
take the scenic route and start with [Getting Started][started].

[started]: ./docs/getting-started.md
[state]: ./docs/state.md
