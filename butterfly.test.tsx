import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { type Observable, map, scan } from 'rxjs'
import { type StateSetter, butterfly } from './butterfly.js'
import type { Component } from './component.js'
import { jsx } from './jsx.js'

describe('butterfly', () => {
  it('is useful in functional components', () => {
    const example: Component = (_props, { bindEffect, events }) => {
      const click = events.click
      const [toggle, setToggle] = butterfly(false)
      bindEffect(click.pipe(scan((acc) => !acc, false)), (toggled: boolean) =>
        setToggle(toggled),
      )
      const highlightClass = toggle.pipe(
        map((toggled) => (toggled ? 'highlight' : '')),
      )
      return (
        <button events={{ click }} bind={{ className: highlightClass }}>
          Toggle Me
        </button>
      )
    }
    ok(example)
  })

  it('is useful in vm classes', () => {
    class Example {
      readonly #progress: Observable<number>
      get progress() {
        return this.#progress
      }
      readonly #setProgress: (progress: StateSetter<number>) => void

      constructor() {
        ;[this.#progress, this.#setProgress] = butterfly(0)
      }

      shake() {
        this.#setProgress(Math.random())
      }

      increment() {
        this.#setProgress((current) => current + 0.01)
      }
    }
    ok(Example)
  })
})
