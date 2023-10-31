import { Observable, Subject, fromEvent } from 'rxjs'

const ButterfloatEvent = Symbol('Butterfloat Event')

export type ObservableEvent<T> = Observable<T> & { [ButterfloatEvent]: unknown }

export type DefaultEvents = Record<string, ObservableEvent<unknown>>

export function makeTestEvent<T>(observable: Observable<T>) {
  const event = observable as ObservableEvent<T>
  event[ButterfloatEvent] = '⚠ Test Event'
  return event
}

class EventProxyHandler {
  #subjects = new WeakMap<ObservableEvent<unknown>, Subject<unknown>>()

  get(target: DefaultEvents, prop: string, reciever: EventProxyHandler) {
    if (prop in target) {
      return target[prop]
    }
    const subject = new Subject()
    const observable = subject.asObservable() as ObservableEvent<unknown>
    observable[ButterfloatEvent] = true
    reciever.#subjects.set(observable, subject)
    target[prop] = observable
  }

  applyEvent(
    event: ObservableEvent<unknown>,
    element: HTMLElement,
    eventName: string,
  ) {
    const subject = this.#subjects.get(event)
    if (!subject) {
      throw new Error('Unhandled event subject')
    }

    const observable = fromEvent(element, eventName)
    return observable.subscribe(subject)
  }
}

export function makeEventProxy(baseEvents: DefaultEvents = {}) {
  const events = { ...baseEvents }
  const handler = new EventProxyHandler()
  const proxy = new Proxy(events, handler)
  return { events: proxy, handler }
}
