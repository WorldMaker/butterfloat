import { type Observable, Subject, Subscription, fromEvent } from 'rxjs'

const ButterfloatEvent = Symbol('Butterfloat Event')

/**
 * An Observable intended for binding to a DOM event
 */
export type ObservableEvent<T> = Observable<T> & { [ButterfloatEvent]: unknown }

/**
 * DOM events unique to Butterfloat
 */
export interface ButterfloatEvents {
  /**
   * Observe the raw HTMLElement. Useful as a last resort or for working on
   * boundaries to vanilla JS components.
   */
  bfDomAttach?: ObservableEvent<HTMLElement>
}

/**
 * Default collection of Butterfloat bindings to DOM events
 */
export type DefaultEvents = Record<string, ObservableEvent<unknown>>

/**
 * Mock an event for testing purposes only
 * @param observable Observable of events that occur
 * @returns ObservableEvent
 */
export function makeTestEvent<T>(
  observable: Observable<T>,
): ObservableEvent<T> {
  const event = observable as ObservableEvent<T>
  event[ButterfloatEvent] = '⚠ Test Event'
  return event
}

export interface EventBinder {
  applyEvent(
    event: ObservableEvent<unknown>,
    element: Element,
    eventName: string,
  ): Subscription
}

class EventProxyHandler {
  readonly #subjects = new WeakMap<ObservableEvent<unknown>, Subject<unknown>>()
  readonly #componentName: string

  get componentName() {
    return this.#componentName
  }

  constructor(componentName: string) {
    this.#componentName = componentName
  }

  get(target: DefaultEvents, prop: string) {
    if (prop in target) {
      return target[prop]
    }
    const subject = new Subject()
    const observable = subject.asObservable() as ObservableEvent<unknown>
    observable[ButterfloatEvent] = `${this.componentName} ${prop}`
    this.#subjects.set(observable, subject)
    target[prop] = observable
    return target[prop]
  }

  applyEvent(
    event: ObservableEvent<unknown>,
    element: Element,
    eventName: string,
  ) {
    const subject = this.#subjects.get(event)
    if (!subject) {
      throw new Error(`Unhandled event subject: ${event[ButterfloatEvent]}`)
    }

    if (eventName === 'bfDomAttach') {
      subject.next(element)
      return new Subscription()
    }

    const observable = fromEvent(element, eventName)
    return observable.subscribe(subject)
  }
}

export function makeEventProxy(
  componentName: string,
  baseEvents: DefaultEvents = {},
) {
  const events = { ...baseEvents }
  const handler = new EventProxyHandler(componentName)
  const proxy = new Proxy(events, handler)
  return { events: proxy, handler }
}
