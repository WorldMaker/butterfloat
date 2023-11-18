import { Observable, Subscription } from 'rxjs'
import { ComponentDescription } from './component.js'

export interface WiringContext {
  suspense?: Observable<boolean>
  isStaticComponent: boolean
  isStaticTree: boolean
  preserveOnComplete?: boolean
}

export type ComponentRunner = (
  container: Node,
  description: ComponentDescription,
  context: WiringContext,
  placeholder: Node,
) => Subscription
