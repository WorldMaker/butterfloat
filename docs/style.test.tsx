import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { ComponentContext, ObservableEvent, butterfly, jsx } from '../index.js'
import { interval, map, shareReplay } from 'rxjs'

describe('class and style bind documentation', () => {
  it('shows a class binding example', () => {
    interface HighlightProps {}

    interface HighlightEvents {
      toggleHighlight: ObservableEvent<MouseEvent>
    }

    function Highlight(
      _props: HighlightProps,
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

    ok(Highlight)
  })

  it('shows a style binding example', () => {
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

    ok(TrafficLight)
  })
})
