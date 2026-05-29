import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { type ObservableEvent, butterfly, type jsx } from '../../v2/index.js'
import { interval, map, shareReplay } from 'rxjs'

describe('v2 class and style bind documentation', () => {
  it('shows a class binding example', () => {
    interface HighlightEvents {
      toggleHighlight: ObservableEvent<MouseEvent>
    }

    function Highlight(
      _props: unknown,
      { bindEffect, events, jsx }: jsx.Mat<HighlightEvents>,
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

    function TrafficLight(_: unknown, { jsx }: jsx.Mat) {
      const color = interval(5_000 /* ms */).pipe(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        map(() => colors[Math.round(colors.length * Math.random())]!),
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
