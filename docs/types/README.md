butterfloat / [Exports](modules.md)

# Butterfloat

[Butterfloat](https://worldmaker.net/butterfloat/) is a Knockout-inspired
view engine using modern ESM via Typescript and pure RxJS observables.

- [Knockout-inspired]
- [TSX, but not a Virtual DOM][tsx]
- [Pure RxJS observables][observables]
- Runtime dependency light: just [RxJS](https://rxjs.dev)
- Compile-time dependency light: Typescript encouraged

> "The greatest view engine the web has ever seen."

[Getting Started][started] starts a gentle tour of Butterfloat features.

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

## Other Examples

Fresh projects built with Butterfloat:

- [jocobookclub](https://github.com/WorldMaker/jocobookclub) (progressive
  enhancement via Web Components)

Example projects migrated from Knockout:

- [compradprog](https://github.com/WorldMaker/compradprog)
- [macrotx](https://github.com/WorldMaker/macrotx)

[Knockout-inspired]: ./docs/motivation/knockout.md
[tsx]: ./docs/motivation/tsx.md
[observables]: ./docs/motivation/pure-observables.md
[started]: ./docs/getting-started.md
[state]: ./docs/state.md
