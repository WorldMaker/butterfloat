import { filter, map, Observable } from 'rxjs'
import { Component } from './component'

/**
 * A route that can be used to bind a component's children to an observable input.
 * If the when function returns false, the next route will be tried.
 *
 * @param when Function to determine if the route should be used based on the input
 * @param component Component to render when the route is matched
 * @param jsonProps Optional JSON serializable "canonical" props for the component stamp variant
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Route<Inputs = any, Props = any> = [
  when: (inputs: Inputs) => Props | false,
  component: Component<Props>,
  jsonProps?: Props,
]

/**
 * Routes
 *
 * A set of routes that can be used to bind a component's children to an observable input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Routes<Inputs = any> {
  /**
   * Observable that produces inputs to route to child components
   */
  input: Observable<Inputs>
  /**
   * The mode to bind the child components to the parent component's children.
   */
  mode: 'append' | 'prepend' | 'replace'
  /**
   * The routes for handling the inputs.
   */
  routes: Route<Inputs>[]
}

/**
 * Suspend Route
 *
 * Map a suspension state to a component that can handle it. If the map function returns false,
 * the next route will be tried.
 *
 * @param map Function to map a suspension state to a component's props
 * @param component Component to render when a suspension state occurs
 * @param jsonProps Optional JSON serializable "canonical" props for the component stamp variant
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SuspendRoute<Props = any> = [
  map: (suspended: boolean) => Props | false,
  component: Component<Props>,
  jsonProps?: Props,
]

/**
 * Suspend Routes
 *
 * A set of routes that can be used to bind a component's children to a suspension boundary.
 */
export interface SuspendRoutes {
  /**
   * Observable that determines if the suspension boundary is active
   */
  suspend: Observable<boolean>
  /**
   * The mode to bind the suspension component to the parent component's children.
   */
  mode: 'append' | 'prepend' | 'replace'
  /**
   * The routes for handling suspension states.
   */
  routes: SuspendRoute[]
}

/**
 * Error Route
 *
 * Map an error to a component that can handle it. If the map function returns false,
 * the next route will be tried.
 *
 * @param map Function to map an error to a component's props
 * @param component Component to render when an error occurs
 * @param jsonProps Optional JSON serializable "canonical" props for the component stamp variant
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorRoute<Props = any> = [
  map: (error: unknown) => Props | false,
  component: Component<Props>,
  jsonProps?: Props,
]

/**
 * Error Routes
 *
 * A set of routes that can be used to bind a component's children to an error boundary.
 */
export interface ErrorRoutes {
  /**
   * The mode to bind the error component to the parent component's children.
   */
  mode: 'append' | 'prepend' | 'replace'
  /**
   * The routes for handling errors.
   */
  routes: ErrorRoute[]
}

/**
 * Complete Routes
 *
 * A component that can be used to bind a component's children to a completion boundary.
 */
export interface CompleteRoutes {
  /**
   * The mode to bind the completion component to the parent component's children.
   */
  mode: 'append' | 'prepend' | 'replace'
  /**
   * The component to render when the completion boundary is reached.
   */
  component: Component
}

/**
 * Child Routes
 *
 * A collection of routes that can be used to bind child components to a parent component.
 */
export interface ChildRoutes {
  /**
   * Routes for an observable input
   */
  routes?: Routes
  /**
   * Routes for a suspension boundary
   */
  suspend?: SuspendRoutes
  /**
   * Routes for an error boundary
   */
  error?: ErrorRoutes
  /**
   * Routes for a completion boundary
   */
  complete?: CompleteRoutes
}

/**
 * Fluid builder for child routes
 */
export class ChildRouteBuilder<Inputs = unknown> {
  #input?: Observable<Inputs>
  #mode?: 'append' | 'prepend' | 'replace'
  readonly #routes: Route<Inputs>[] = []
  #suspend?: Observable<boolean>
  #suspendMode?: 'append' | 'prepend' | 'replace'
  readonly #suspendRoutes: SuspendRoute[] = []
  #errorMode?: 'append' | 'prepend' | 'replace'
  #errorRoutes: ErrorRoute[] = []
  #completeMode?: 'append' | 'prepend' | 'replace'
  #completeComponent?: Component

  constructor(
    input?: Observable<Inputs>,
    mode?: 'append' | 'prepend' | 'replace',
  ) {
    this.#input = input
    this.#mode = mode
  }

  /**
   * Set the input observable for the routes
   *
   * It's preferable to set the input observable in the constructor, but this method can be used to set it
   * after construction. Overrides any previously set input observable.
   * @param input Observable to route to child components
   * @returns this but type adjusted to the new input type
   */
  withInput<T extends Inputs>(input: Observable<T>): ChildRouteBuilder<T> {
    this.#input = input
    return this as unknown as ChildRouteBuilder<T>
  }

  /**
   * Set the child binding mode for the routes
   *
   * If not set, the default is 'append'. Last call wins if multiple calls are made.
   * @param mode Child binding mode for the routes
   * @returns this
   */
  withMode(mode: 'append' | 'prepend' | 'replace'): ChildRouteBuilder<Inputs> {
    this.#mode = mode
    return this
  }

  /**
   * Add a child route
   * @param when Function to map inputs to a set of props for the child component
   * @param component Component to render when the route matches
   * @param jsonProps Optional JSON serializable props for the child component's stamp variant
   * @returns this
   */
  when<Props>(
    when: (inputs: Inputs) => Props | false,
    component: Component<Props>,
    jsonProps?: Props,
  ): ChildRouteBuilder<Inputs> {
    this.#routes.push([when, component, jsonProps])
    return this
  }

  /**
   * Create a suspension boundary
   * @param suspend Observable that determines if the suspension boundary is active
   * @param mode Child binding mode for the suspension boundary
   * @returns this
   */
  suspend(
    suspend: Observable<boolean>,
    mode: 'append' | 'prepend' | 'replace' = 'append',
  ): ChildRouteBuilder<Inputs> {
    this.#suspend = suspend
    this.#suspendMode = mode
    return this
  }

  /**
   * Add a suspension boundary route
   * @param map Map a suspension state to a set of props for a suspension component
   * @param component Component to render when suspended
   * @param jsonProps Optional JSON serializable props for the suspension component's stamp variant
   * @returns this
   */
  whenSuspended<Props>(
    map: (suspended: boolean) => Props | false,
    component: Component<Props>,
    jsonProps?: Props,
  ): ChildRouteBuilder<Inputs> {
    this.#suspendRoutes.push([map, component, jsonProps])
    return this
  }

  /**
   * Set the child binding mode for the error boundary
   *
   * If not set, the default is 'append'. Last call wins if multiple calls are made.
   * @param mode Child binding mode for the error boundary
   * @returns this
   */
  withErrorMode(
    mode: 'append' | 'prepend' | 'replace',
  ): ChildRouteBuilder<Inputs> {
    this.#errorMode = mode
    return this
  }

  /**
   * Add an error boundary route
   * @param map Map an error to a set of props for an error component
   * @param component Component to render when an error occurs
   * @param jsonProps Optional JSON serializable props for the error component's stamp variant
   * @returns this
   */
  onError<Props>(
    map: (error: unknown) => Props | false,
    component: Component<Props>,
    jsonProps?: Props,
  ): ChildRouteBuilder<Inputs> {
    this.#errorRoutes.push([map, component, jsonProps])
    return this
  }

  /**
   * Add a completion boundary component
   *
   * There may be only one completion boundary component. If multiple are added, the last one will be used.
   * @param component Component to render when a completion occurs
   * @param mode Child binding mode for the completion boundary component
   * @returns this
   */
  onComplete(
    component: Component,
    mode: 'append' | 'prepend' | 'replace' = 'append',
  ): ChildRouteBuilder<Inputs> {
    this.#completeComponent = component
    this.#completeMode = mode
    return this
  }

  /**
   * Build the child routes
   * @returns Child routes for childrenBind
   */
  build(): ChildRoutes {
    return {
      routes:
        this.#routes.length > 0 && this.#input
          ? {
              input: this.#input,
              mode: this.#mode ?? 'append',
              routes: this.#routes,
            }
          : undefined,
      suspend:
        this.#suspendRoutes.length > 0 && this.#suspend
          ? {
              suspend: this.#suspend,
              mode: this.#suspendMode ?? 'append',
              routes: this.#suspendRoutes,
            }
          : undefined,
      error:
        this.#errorRoutes.length > 0
          ? {
              mode: this.#errorMode ?? 'append',
              routes: this.#errorRoutes,
            }
          : undefined,
      complete: this.#completeComponent
        ? {
            mode: this.#completeMode ?? 'append',
            component: this.#completeComponent,
          }
        : undefined,
    }
  }
}

/**
 * Route an Observable to child components
 *
 * This creates a child binding route map that can be used for building
 * stamp-aware component trees.
 * @param input Observable to route to child components
 * @param mode Children binding mode
 * @returns Route builder
 */
export function route<Inputs = unknown>(
  input?: Observable<Inputs>,
  mode?: 'append' | 'prepend' | 'replace',
): ChildRouteBuilder<Inputs> {
  return new ChildRouteBuilder(input, mode)
}

export function mapRoutes(routes: Routes) {
  return routes.input.pipe(
    map((inputs) => {
      for (const [when, component] of routes.routes) {
        const props = when(inputs)
        if (props !== false) {
          return component
        }
      }
      return null
    }),
    filter((component) => component !== null),
  )
}

export function mapSuspendRoutes(routes: SuspendRoutes) {
  return routes.suspend.pipe(
    map((suspended) => {
      for (const [map, component] of routes.routes) {
        const props = map(suspended)
        if (props !== false) {
          return component
        }
      }
      return null
    }),
    filter((component) => component !== null),
  )
}

export function mapErrorRoutes(
  error: Observable<unknown>,
  routes: ErrorRoutes,
) {
  return error.pipe(
    map((error) => {
      for (const [map, component] of routes.routes) {
        const props = map(error)
        if (props !== false) {
          return component
        }
      }
      return null
    }),
    filter((component) => component !== null),
  )
}
