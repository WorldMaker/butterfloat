import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
import { schedule } from './binding.js'

describe('binding', () => {
  it('schedules a simple immediate', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ cold, expectObservable }) => {
      const example = cold('a--bc--d---')
      const expected = '    a--bc--d---'

      const observed = schedule('example', example, true)

      expectObservable(observed).toBe(expected)
    })
  })

  it('schedules a "value" immediately', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ cold, expectObservable }) => {
      const example = cold('a--bc--d---')
      const expected = '    a--bc--d---'

      const observed = schedule('value', example, false)

      expectObservable(observed).toBe(expected)
    })
  })

  it('schedules a simple scheduled', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ animate, cold, expectObservable }) => {
      animate('             --x--x--x--')
      const example = cold('a--bc--d---')
      const expected = '    --a--c--d--'

      const observed = schedule('example', example, false)

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

      const observed = schedule('example', example, false, suspense)

      expectObservable(observed).toBe(expected)
    })
  })
})
