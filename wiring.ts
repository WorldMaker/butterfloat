import {
  Observable,
  Subscriber,
  Subscription,
  animationFrameScheduler,
  delay,
} from 'rxjs'
import {
  ChildrenDescription,
  Component,
  ComponentContext,
  ComponentDescription,
  SimpleComponent,
  WiringContext,
} from './component.js'
import { makeEventProxy } from './events.js'
import { buildTree } from './static-dom.js'
import { BindingContext, bindElement, bindFragmentChildren } from './binding.js'
import { Suspense, wireSuspense } from './suspense.js'
import { Container, ContainerProps } from './container.js'

const contextChildrenDescriptions = new WeakMap<
  ComponentContext<unknown>,
  ComponentDescription
>()

export function wireInternal(
  description: ComponentDescription,
  subscriber: Subscriber<Node>,
  context: WiringContext,
  document = globalThis.document,
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
  const { elementBinds, nodeBinds, container } = buildTree(
    tree,
    undefined,
    undefined,
    undefined,
    document,
  )
  context.isStaticComponent &&= elementBinds.length === 0
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
    subscription.add(
      bindElement(element, bindDescription, bindContext, document),
    )
  }

  for (const [node, nodeDescription] of nodeBinds) {
    switch (nodeDescription.type) {
      case 'component': {
        const nestedContext = {
          ...context,
          isStaticComponent: true,
          isStaticTree: true,
        }
        subscription.add(run(container, nodeDescription, nestedContext, node))
        context.isStaticTree &&= nestedContext.isStaticTree
        break
      }
      case 'children': {
        const nestedContext = {
          ...context,
          isStaticComponent: true,
          isStaticTree: true,
        }
        subscription.add(
          wireChildrenComponent(
            nodeDescription,
            componentContext,
            description,
            container,
            nestedContext,
            node,
          ),
        )
        context.isStaticTree &&= nestedContext.isStaticTree
        break
      }
      case 'fragment':
        context.isStaticComponent = false
        context.isStaticTree = false
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
  component: ComponentDescription | Component,
  context: WiringContext,
  document = globalThis.document,
): Observable<Node> {
  let description: ComponentDescription
  if ('type' in component) {
    description = component
  } else {
    description = {
      type: 'component',
      component,
      children: [],
      properties: {},
    }
  }

  if (description.component === Suspense) {
    return wireSuspense(description, context, document)
  }

  return new Observable((subscriber: Subscriber<Node>) =>
    wireInternal(description, subscriber, context, document),
  )
}

export function run(
  container: Node,
  component: ComponentDescription | Component,
  context?: WiringContext,
  placeholder?: Node,
  document = globalThis.document,
) {
  // Because Container requires the attach property, this only makes sense if passed a description
  if ('type' in component && component.component === Container) {
    const props = component.properties as unknown as ContainerProps
    return props.attach(container).subscribe({
      next(_value) {},
      error(err) {
        console.error('Error in container attachment', err)
      },
      complete() {
        console.warn('Container attachment completed')
      },
    })
  }

  const observable = wire(
    component,
    context ?? { isStaticComponent: true, isStaticTree: true },
    document,
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
      if ('type' in component) {
        console.error(`Error in component ${component.component.name}`, error)
      } else {
        console.error(`Error in component ${component.name}`, error)
      }
    },
    complete() {
      if (!context?.preserveOnComplete && previousNode) {
        container.removeChild(previousNode)
      }
    },
  })
}
