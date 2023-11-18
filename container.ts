import { Observable } from 'rxjs'
import { ContextComponent } from './component.js'

export interface ContainerProps {
  /**
   * Attach an observable handler to the parent DOM node.
   *
   * @param element Element getting attached
   * @returns An observable of the side-effect
   */
  attach: (container: Node) => Observable<unknown>
}

/**
 * Container is a *last resort* way to bind an observable effect to
 * the parent DOM node.
 *
 * @param _props Container props
 */
export const Container: ContextComponent<ContainerProps> = () => {
  throw new Error('Container is a custom-run component')
}
