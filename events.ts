import { Observable } from 'rxjs'

const ButterfloatEvent = Symbol('Butterfloat Event')

export type ObservableEvent<T> = Observable<T> & { [ButterfloatEvent]: unknown }

export type DefaultEvents = Record<string, ObservableEvent<unknown>>

export function makeTestEvent<T>(observable: Observable<T>) {
  const event = observable as ObservableEvent<T>
  event[ButterfloatEvent] = '⚠ Test Event'
  return event
}
