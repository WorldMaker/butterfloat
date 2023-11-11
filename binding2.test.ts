import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { TestScheduler } from 'rxjs/testing'
import { bufferEntries } from './binding.js'

describe('binding 2', () => {
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
        e: { example1: 1 },
        h: { example1: 3, example2: true },
      }

      const observed = bufferEntries(example, suspense)

      expectObservable(observed).toBe(expected, expectedValues)
    })
  })
})
