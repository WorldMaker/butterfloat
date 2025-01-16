import { type Observable, Subject, map } from 'rxjs'
import type {
  ComponentDescription,
  ContextComponent,
  FragmentDescription,
  SimpleComponent,
} from './component.js'
import type { WiringContext } from './wiring-context.js'
import { wire } from './wiring.js'

/**
 * Properties passed to an Error View
 */
export interface ErrorViewProps {
  /**
   * Error that occurred.
   */
  error: unknown
}

/**
 * Properties supported by the `<ErrorBoundary>` pseudo-component
 */
export interface ErrorBoundaryProps {
  /**
   * Component to view when an error occurs below this boundary.
   */
  errorView: ContextComponent<ErrorViewProps> | SimpleComponent
  // errorViewBindMode is not just ChildrenBindMode, because we are using a double layer of fragments 'replace' is unlikely to work well
  /**
   * Bind mode for error views. Defaults to 'prepend'.
   */
  errorViewBindMode?: 'append' | 'prepend'
  /**
   * Preserve DOM contents of the errored tree.
   *
   * This is primarily a Debug tool. Components will still be unbound
   * as a part of completion so it leaves "dead" components around,
   * which are useful for debugging. Your error view may be enough
   * to warn users that the surrounding components have died, in which
   * case you may be able to make this useful in production builds as
   * well (as opposed to setting this in a raw `RuntimeOptions`).
   */
  preserveOnComplete?: boolean
}

/**
 * Present an error view when errors occur below this in the tree.
 *
 * @param _props Error Boundary Props
 */
export const ErrorBoundary: ContextComponent<ErrorBoundaryProps> = () => {
  throw new Error('ErrorBoundary is a custom-wired component')
}

export function wireErrorBoundary(
  description: ComponentDescription,
  context: WiringContext,
  document = globalThis.document,
): Observable<Element> {
  context.isStaticComponent = false
  context.isStaticTree = false
  const { errorView, errorViewBindMode, preserveOnComplete } =
    description.properties as unknown as ErrorBoundaryProps
  const errorOccurred = new Subject()
  const treeError = errorOccurred.next.bind(errorOccurred)
  const errorViewChildren = errorOccurred.pipe(
    map((error) => () => {
      const childComponent: ComponentDescription = {
        type: 'component',
        component: errorView,
        children: [],
        properties: { error },
      }
      return childComponent
    }),
  )
  const mainComponentFragment: FragmentDescription = {
    type: 'fragment',
    attributes: {},
    children: description.children,
    childrenBind: description.childrenBind,
    childrenBindMode: description.childrenBindMode,
  }
  // TODO: Is there a cleaner way than double nested fragments?
  const errorViewComponentFragment: FragmentDescription = {
    type: 'fragment',
    attributes: {},
    children: [mainComponentFragment],
    childrenBind: errorViewChildren,
    childrenBindMode: errorViewBindMode ?? 'prepend',
  }
  const mainComponent = () => errorViewComponentFragment
  const mainContext = { ...context, treeError, preserveOnComplete }
  const main = wire(mainComponent, mainContext, undefined, document)
  return main
}
