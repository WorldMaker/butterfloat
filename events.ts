import { Observable } from 'rxjs'

const ButterfloatEvent = Symbol('Butterfloat Event')

export type Event<T> = Observable<T> & { [ButterfloatEvent]: unknown }

export type DefaultEvents = Record<string, Event<unknown>>

export function makeTestEvent<T>(observable: Observable<T>) {
    const event = observable as Event<T>
    event[ButterfloatEvent] = '⚠ Test Event'
    return event
}
