import {
  Observable,
  Subscriber,
  Subscription,
  animationFrameScheduler,
  delay,
} from 'rxjs'
import { ComponentContext, ComponentDescription } from './component.js'
import { makeEventProxy } from './events.js'
import { buildTree } from './static-dom.js'
import { BindingContext, bindElement } from './binding.js'

export interface WiringContext {
  suspense?: Observable<boolean>
  isStaticComponent: boolean
  isStaticTree: boolean
  preserveOnComplete?: boolean
}

export function wireInternal(
  description: ComponentDescription,
  subscriber: Subscriber<Node>,
  context: WiringContext,
) {
  const subscription = new Subscription()

  const error = (error: unknown) => {
    console.error(`Error in component ${description.component.name}`, error)
  }
  const complete = () => subscriber.complete()

  const { events, handler } = makeEventProxy(description.component.name)

  const componentContext: ComponentContext = {
    bindEffect(observable, effect) {
      context.isStaticComponent = false
      subscription.add(
        observable.pipe(delay(0, animationFrameScheduler)).subscribe({
          next: effect,
          error,
          complete,
        }),
      )
    },
    bindImmediateEffect(observable, effect) {
      context.isStaticComponent = false
      subscription.add(
        observable.subscribe({
          next: effect,
          error,
          complete,
        }),
      )
    },
    events,
  }

  const tree = description.component(description.properties, componentContext)
  const { elementBinds, nodeBinds, container } = buildTree(tree)
  context.isStaticComponent &&=
    elementBinds.length === 0 && nodeBinds.length === 0
  context.isStaticTree &&= context.isStaticComponent
  subscriber.next(container)

  const bindContext: BindingContext = {
    ...context,
    complete,
    error,
    eventBinder: handler,
    subscription,
  }

  for (const [element, bindDescription] of elementBinds) {
    bindElement(element, bindDescription, bindContext)
  }

  return () => {
    subscription.unsubscribe()
  }
}

export function wire(
  description: ComponentDescription,
  context: WiringContext,
) {
  return new Observable((subscriber: Subscriber<Node>) =>
    wireInternal(description, subscriber, context),
  )
}

export function run(
  container: Node,
  description: ComponentDescription,
  context?: WiringContext,
  placeholder?: Node,
) {
  const observable = wire(
    description,
    context ?? { isStaticComponent: true, isStaticTree: true },
  )
  let previousNode: Node | null = null
  return observable.subscribe({
    next(node) {
      if (previousNode) {
        container.replaceChild(previousNode, node)
      } else if (placeholder) {
        container.replaceChild(placeholder, node)
      } else {
        container.appendChild(node)
      }
      previousNode = node
    },
    error(error) {
      console.error(`Error in component ${description.component.name}`, error)
    },
    complete() {
      if (!context?.preserveOnComplete && previousNode) {
        container.removeChild(previousNode)
      }
    },
  })
}
