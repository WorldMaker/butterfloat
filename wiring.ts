import {
  Observable,
  Subscriber,
  Subscription,
  animationFrameScheduler,
  delay,
} from 'rxjs'
import {
  ChildrenDescription,
  ComponentContext,
  ComponentDescription,
  SimpleComponent,
  WiringContext,
} from './component.js'
import { makeEventProxy } from './events.js'
import { buildTree } from './static-dom.js'
import { BindingContext, bindElement, bindFragmentChildren } from './binding.js'

const contextChildrenDescriptions = new WeakMap<
  ComponentContext<unknown>,
  ComponentDescription
>()

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

  contextChildrenDescriptions.set(componentContext, description)

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
    componentRunner: run,
    eventBinder: handler,
    subscription,
  }

  for (const [element, bindDescription] of elementBinds) {
    subscription.add(bindElement(element, bindDescription, bindContext))
  }

  for (const [node, nodeDescription] of nodeBinds) {
    switch (nodeDescription.type) {
      case 'component':
        subscription.add(run(container, nodeDescription, context, node))
        break
      case 'children':
        subscription.add(
          wireChildrenComponent(
            nodeDescription,
            componentContext,
            description,
            container,
            context,
            node,
          ),
        )
        break
      case 'fragment':
        bindFragmentChildren(nodeDescription, node, subscription, bindContext)
        break
    }
  }

  return () => {
    subscription.unsubscribe()
  }
}

function wireChildrenComponent(
  nodeDescription: ChildrenDescription,
  componentContext: ComponentContext<unknown>,
  description: ComponentDescription,
  container: Node,
  context: WiringContext,
  node: Node,
) {
  const parentDescription = contextChildrenDescriptions.get(
    nodeDescription.context ?? componentContext,
  )
  if (!parentDescription) {
    throw new Error(
      `Unable to bind children for Children request in ${description.component.name}`,
    )
  }
  // Rehost the appropriate parent's children as a simple semi-anonymous mini-component that just returns a fragment of the appropriate binds
  const childrenComponent: SimpleComponent = () => ({
    type: 'fragment',
    attributes: {},
    children: [...parentDescription.children],
    childrenBind: parentDescription.childrenBind,
    childrenPrepend: parentDescription.childrenPrepend,
  })
  return run(
    container,
    {
      type: 'component',
      component: childrenComponent,
      properties: {},
      children: [],
    },
    context,
    node,
  )
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
