---
layout: page.vto
title: Class and Style Binding
order: 3
tags: ['top']
---

# Class and Style Binding

Previously in the [Getting Started][started] tour was an introduction
to [state management][state]. With basic state management comes great
power, and one of those useful powers is binding complex changes to
CSS classes and styles for our elements.

## Class Binding

A very common need in any HTML application is to dynamically change
CSS classes to represent changes in state. `classBind` binds an
`Observable<boolean>` toggling whether that class is applied
based on the value observed. (It binds `classList.add` and
`classList.remove`.) One very simple example would be a button that
toggles a "highlight" effect by toggling a `.highlight` CSS class:

```tsx
import {
  type ComponentContext,
  type ObservableEvent,
  butterfly,
  jsx,
} from 'butterfloat'

interface HighlightProps {}

interface HighlightEvents {
  toggleHighlight: ObservableEvent<MouseEvent>
}

function Highlight(
  props: HighlightProps,
  { bindEffect, events }: ComponentContext<HighlightEvents>,
) {
  const { toggleHighlight } = events

  const [highlight, setHighlighted] = butterfly(false)

  bindEffect(toggleHighlight, () =>
    setHighlighted((highlighted) => !highlighted),
  )

  return (
    <div classBind={{ highlight }}>
      Click the button to toggle the highlight on this{' '}
      <button type="button" events={{ click: toggleHighlight }}>
        Toggle Highlight
      </button>
    </div>
  )
}
```

## Style Binding

Sometimes even when you try your best to follow good CSS practices
and reflect all of your dynamic changes as CSS classes to toggle you
still find a need for dynamically adjusting individual "inline"
styles. `styleBind` lets you bind observables to individual style
properties on the element.

An example using a terrible random traffic light (maybe it is
representing a child playing "Red Light, Green Light"):

```tsx
import { jsx } from 'butterfloat'
import { interval, map, shareReplay } from 'rxjs'

const colors = ['red', 'yellow', 'green']

function TrafficLight() {
  const color = interval(5_000 /* ms */).pipe(
    map(() => colors[Math.round(colors.length * Math.random())]),
    shareReplay(1),
  )

  const lightName = color.pipe(map((color) => `${color} light`))

  return (
    <div
      styleBind={{ backgroundColor: color }}
      bind={{ innerText: lightName }}
    />
  )
}
```

## Next Steps

As components grow more complicated they may need to handle
[Component Children and Dynamic Children Binding][children].

[started]: ./getting-started.md
[state]: ./state.md
[children]: ./children.md
