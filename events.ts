import { Observable } from 'rxjs'

const ButterfloatEvent = Symbol('Butterfloat Event')

export type Event<T> = Observable<T> & { [ButterfloatEvent]: unknown }

export type DefaultEvents = Record<string, Event<unknown>>
