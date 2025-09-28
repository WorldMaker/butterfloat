import { Observable } from 'rxjs'
import { DefaultEvents } from '../../events'
import { Mat, matType } from '../mat'

/**
 * A Component Context for Testing purposes
 */
export interface TestComponentContext<Events = DefaultEvents> {
  context: Mat<Events>
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effects: Array<[Observable<unknown>, (item: any) => void]>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  immediateEffects: Array<[Observable<unknown>, (item: any) => void]>
}

/**
 * Make a test context for testing context components.
 * @param events Mocked events for testing
 * @returns A test context for testing context component
 */
export function makeTestComponentContext<Events = DefaultEvents>(
  events: Events,
): TestComponentContext<Events> {
  // Types here are just for examing test results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effects: Array<[Observable<unknown>, (item: any) => void]> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const immediateEffects: Array<[Observable<unknown>, (item: any) => void]> = []
  const context: Mat<Events> = {
    [matType]: 'tester',
    events,
    bindEffect: (observable, effect) => effects.push([observable, effect]),
    bindImmediateEffect: (observable, effect) =>
      immediateEffects.push([observable, effect]),
    jsx: null, // TODO: tester JSX function
  }
  return { context, effects, immediateEffects }
}
