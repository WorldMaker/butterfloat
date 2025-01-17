import { JSDOM } from 'jsdom'
import { deepEqual, equal, fail } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Subscription, firstValueFrom } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import {
  bindElement,
  bufferEntries,
  makeEntries,
  schedulable,
  scheduledKey,
} from './binding.js'
import type { ElementDescription } from './component.js'
import { jsx } from './jsx.js'
import { type ObservableEvent, makeEventProxy } from './events.js'
import buildDomStrategy from './wiring-dom-build.js'

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

  it('schedules bfDelayValue as value', () => {
    const key = 'bfDelayValue'
    const actual = schedulable(key, false)
    const expected = true
    deepEqual(actual, expected)
    const actualKey = scheduledKey(key)
    const expectedKey = 'value'
    deepEqual(actualKey, expectedKey)
  })

  it('considers other keys schedulable', () => {
    const key = 'example'
    const actual = schedulable(key, false)
    const expected = true
    deepEqual(actual, expected)
    const actualKey = scheduledKey(key)
    deepEqual(actualKey, key)
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
        e: { example1: 1 },
        f: {
          example1: 2,
          example2: true,
        },
        g: { example1: 3 },
      }

      const observed = bufferEntries(example)

      expectObservable(observed).toBe(expected, expectedValues)
    })
  })

  it('binds a no-bind element', () => {
    const { window } = new JSDOM()
    const { document } = window
    const element = document.createElement('div')
    const error = (error: unknown) => fail(error as Error | string)
    const complete = () => {}
    const subscription = new Subscription()
    bindElement(element, (<div />) as ElementDescription, {
      domStrategy: buildDomStrategy,
      error,
      complete,
      componentRunner(_container, description, _context, _placeholder) {
        throw new Error(
          `attempted to run component ${
            'name' in description
              ? description.name
              : description.component.name
          }`,
        )
      },
      componentWirer(description, _context) {
        throw new Error(
          `attempted to wire component ${
            'name' in description
              ? description.name
              : description.component.name
          }`,
        )
      },
      eventBinder: {
        applyEvent(_event, _element, eventName) {
          throw new Error(
            `not setup for event binding testing; attempted to bind ${eventName}`,
          )
        },
      },
      subscription,
      isStaticComponent: true,
      isStaticTree: true,
    })
    subscription.unsubscribe()
  })

  it('binds a dom attachment', async () => {
    const { window } = new JSDOM()
    const { document } = window
    const element = document.createElement('div')
    const error = (error: unknown) => fail(error as Error | string)
    const complete = () => {}
    const subscription = new Subscription()
    const { events, handler } = makeEventProxy('test component')
    const bfDomAttach = events.attach as ObservableEvent<HTMLElement>
    const elementPromise = firstValueFrom(bfDomAttach)
    bindElement(
      element,
      (<div events={{ bfDomAttach }} />) as ElementDescription,
      {
        domStrategy: buildDomStrategy,
        error,
        complete,
        componentRunner(_container, description, _context, _placeholder) {
          throw new Error(
            `attempted to run component ${
              'name' in description
                ? description.name
                : description.component.name
            }`,
          )
        },
        componentWirer(description, _context) {
          throw new Error(
            `attempted to wire component ${
              'name' in description
                ? description.name
                : description.component.name
            }`,
          )
        },
        eventBinder: handler,
        subscription,
        isStaticComponent: true,
        isStaticTree: true,
      },
    )
    const actual = await elementPromise
    equal(actual, element)
    subscription.unsubscribe()
  })
})
