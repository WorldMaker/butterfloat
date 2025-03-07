import { type Observable, combineLatest, distinctUntilChanged, map } from 'rxjs'
import type {
  Component,
  ComponentDescription,
  ContextComponent,
  FragmentDescription,
} from './component.js'
import type { WiringContext } from './wiring-context.js'
import { wire } from './wiring.js'

/**
 * Properties supported by the `<Suspense>` pseudo-component
 */
export interface SuspenseProps {
  /**
   * Suspend children bindings when true.
   */
  when: Observable<boolean>
  /**
   * Show an optional component instead when suspended.
   */
  suspenseView?: Component
}

/**
 * Suspend the bindings in children when a observable flag has been raised.
 *
 * @param _props Suspense Props
 */
export const Suspense: ContextComponent<SuspenseProps> = () => {
  throw new Error('Suspense is a custom-wired component')
}

export function wireSuspense(
  description: ComponentDescription,
  context: WiringContext,
  document = globalThis.document,
): Observable<Element> {
  context.isStaticComponent = false
  context.isStaticTree = false
  const props = description.properties as unknown as SuspenseProps
  const suspense = context.suspense
    ? combineLatest([props.when, context.suspense]).pipe(
        map(([a, b]) => a || b),
      )
    : props.when
  const mainComponentFragment: FragmentDescription = {
    type: 'fragment',
    attributes: {},
    children: description.children,
    childrenBind: description.childrenBind,
    childrenBindMode: description.childrenBindMode,
  }
  const mainComponent = () => mainComponentFragment
  const mainContext = { ...context, suspense }
  const main = wire(mainComponent, mainContext, undefined, document)
  if (props.suspenseView) {
    const suspenseView = wire(
      props.suspenseView,
      { ...context },
      undefined,
      document,
    )
    return combineLatest([props.when, main, suspenseView]).pipe(
      map(([suspend, main, suspenseView]) => (suspend ? suspenseView : main)),
      distinctUntilChanged(),
    )
  } else {
    return main
  }
}
