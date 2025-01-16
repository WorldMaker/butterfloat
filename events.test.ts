import { JSDOM } from 'jsdom'
import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { firstValueFrom } from 'rxjs'
import { type ObservableEvent, makeEventProxy } from './events.js'

describe('event proxy', () => {
  const { window } = new JSDOM()
  const { document } = window

  it('expands to simple events', async () => {
    const { events, handler } = makeEventProxy('TestComponent')
    const element = document.createElement('button')
    const click = events.click
    const sub = handler.applyEvent(click, element, 'click')
    const clickPromise = firstValueFrom(
      events.click as ObservableEvent<MouseEvent>,
    )
    element.click()
    const mouseev = await clickPromise
    equal(mouseev.type, 'click')

    sub.unsubscribe()
    element.remove()
  })
})
