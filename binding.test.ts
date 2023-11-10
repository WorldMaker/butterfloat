import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
import { bufferEntries, makeEntries, schedulable, schedule } from './binding.js'

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

  it('makes entry observables', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ cold, expectObservable }) => {
      const example = cold(' a--bc--d---', { a: 1, b: 2, c: 3, d: 4 })
      const expected = '     e--fg--h---'
      const expectedValues = {
        e: ['example', 1],
        f: ['example', 2],
        g: ['example', 3],
        h: ['example', 4],
      }

      const observed = makeEntries('example', example)

      expectObservable(observed).toBe(expected, expectedValues)
    })
  })

  it('buffers entries', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ animate, cold, expectObservable }) => {
      animate('             --x--x--x--')
      const example = cold('a--bc--d---', {
        a: ['example1', 1] as [string, unknown],
        b: ['example1', 2] as [string, unknown],
        c: ['example2', true] as [string, unknown],
        d: ['example1', 3] as [string, unknown],
      })
      const expected = '    --e--f--g--'
      const expectedValues = {
        e: [['example1', 1]],
        f: [
          ['example1', 2],
          ['example2', true],
        ],
        g: [['example1', 3]],
      }

      const observed = bufferEntries(example)

      expectObservable(observed).toBe(expected, expectedValues)
    })
  })

  it('buffers entries with suspense', () => {
    const testScheduler = new TestScheduler((actual, expected) =>
      deepEqual(actual, expected),
    )

    testScheduler.run(({ animate, cold, expectObservable }) => {
      animate('              --x--x--x--')
      const example = cold(' a--bc--d---', {
        a: ['example1', 1] as [string, unknown],
        b: ['example1', 2] as [string, unknown],
        c: ['example2', true] as [string, unknown],
        d: ['example1', 3] as [string, unknown],
      })
      const suspense = cold('f---t--f---', { t: true, f: false })
      const expected = '     --e-----h--'
      const expectedValues = {
        e: [['example1', 1]],
        h: [['example1', 3]],
      }

      const observed = bufferEntries(example, suspense)

      expectObservable(observed).toBe(expected, expectedValues)
    })
  })
})
