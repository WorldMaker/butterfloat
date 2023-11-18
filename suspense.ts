import { Observable, combineLatest, distinctUntilChanged, map } from 'rxjs'
import {
  Component,
  ComponentDescription,
  ContextComponent,
  FragmentDescription,
  WiringContext,
} from './component.js'
import { wire } from './wiring.js'

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
): Observable<Node> {
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
    childrenPrepend: description.childrenPrepend,
  }
  const mainComponent = () => mainComponentFragment
  const mainContext = { ...context, suspense }
  const main = wire(mainComponent, mainContext, document)
  if (props.suspenseView) {
    const suspenseView = wire(props.suspenseView, { ...context }, document)
    return combineLatest([props.when, main, suspenseView]).pipe(
      map(([suspend, main, suspenseView]) => (suspend ? suspenseView : main)),
      distinctUntilChanged(),
    )
  } else {
    return main
  }
}
