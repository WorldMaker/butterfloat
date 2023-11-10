import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
import { schedulable, schedule } from './binding.js'

describe('binding', () => {
  it("doesn't schedule immediates", () => {
    const actual = schedulable('example', true)
    const expected = false
    deepEqual(actual, expected)
  })

  it("doesn't schedule 'value'", () => {
    const actual = schedulable('value', false)
    const expected = false
    deepEqual(actual, expected)
  })

  it('considers other keys schedulable', () => {
    const actual = schedulable('example', false)
    const expected = true
    deepEqual(actual, expected)
  })

  it('schedules a simple example', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ animate, cold, expectObservable }) => {
      animate('             --x--x--x--')
      const example = cold('a--bc--d---')
      const expected = '    --a--c--d--'

      const observed = schedule(example)

      expectObservable(observed).toBe(expected)
    })
  })

  it('schedules with suspense', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ animate, cold, expectObservable }) => {
      animate('              --x--x--x--')
      const example = cold(' a--bc--d---')
      const suspense = cold('f---t--f---', { t: true, f: false })
      const expected = '     --a--b--d--'

      const observed = schedule(example, suspense)

      expectObservable(observed).toBe(expected)
    })
  })
})
