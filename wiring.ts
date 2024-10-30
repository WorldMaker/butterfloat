import {
  Observable,
  Subscriber,
  Subscription,
  animationFrameScheduler,
  isObservable,
  observeOn,
} from 'rxjs'
import { BindingContext, bindElement, bindFragmentChildren } from './binding.js'
import {
  ChildrenDescription,
  Component,
  ComponentContext,
  ComponentDescription,
  SimpleComponent,
} from './component.js'
import { makeEventProxy } from './events.js'
import { Suspense, wireSuspense } from './suspense.js'
import { ObservableComponent, WiringContext } from './wiring-context.js'
import { ErrorBoundary, wireErrorBoundary } from './error-boundary.js'

const contextChildrenDescriptions = new WeakMap<
  ComponentContext<unknown>,
  ComponentDescription
>()

export function wireInternal(
  description: ComponentDescription,
  subscriber: Subscriber<Node>,
  context: WiringContext,
  outerContainer?: Element | DocumentFragment,
  document = globalThis.document,
) {
  const { treeError } = context
  const subscription = new Subscription()

  const componentName = description.component.name

  const error = treeError
    ? (error: unknown) => {
        console.error(`Error in component ${componentName}`, error)
        treeError(error)
      }
    : (error: unknown) => {
        console.error(`Error in component ${componentName}`, error)
      }

  const { events, handler } = makeEventProxy(componentName)

  const componentContext: ComponentContext = {
    bindEffect(observable, effect) {
      context.isStaticComponent = false
      subscription.add(
        observable.pipe(observeOn(animationFrameScheduler)).subscribe({
          next(value) {
            const promise = effect(value)
            if (promise && 'catch' in promise) {
              promise.catch(error)
            }
          },
          error,
          complete: () => {
            console.debug(`Effect in component ${componentName} completed`)
            subscriber.complete()
          },
        }),
      )
    },
    bindImmediateEffect(observable, effect) {
      context.isStaticComponent = false
      subscription.add(
        observable.subscribe({
          next(value) {
            const promise = effect(value)
            if (promise && 'catch' in promise) {
              promise.catch(error)
            }
          },
          error,
          complete: () => {
            console.debug(
              `Immediate effect in component ${componentName} completed`,
            )
            subscriber.complete()
          },
        }),
      )
    },
    events,
  }

  contextChildrenDescriptions.set(componentContext, description)

  try {
    const { elementBinds, nodeBinds, container, isSameContainer } =
      context.domStrategy(
        description.component,
        description.properties,
        componentContext,
        outerContainer,
        document,
      )
    context.isStaticComponent &&= elementBinds.length === 0
    context.isStaticTree &&= context.isStaticComponent
    if (!isSameContainer) {
      subscriber.next(container)
    } else {
      subscriber.next(document.createComment('prestamp bound'))
    }

    const bindContext: BindingContext = {
      ...context,
      complete: () => {
        console.debug(`Binding in component ${componentName} completed`)
        subscriber.complete()
      },
      error,
      componentRunner: runInternal,
      componentWirer: wire,
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
          subscription.add(
            runInternal(container, nodeDescription, nestedContext, node),
          )
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
  } catch (err) {
    subscriber.error(err)
  }

  return () => {
    subscription.unsubscribe()
  }
}

function wireChildrenComponent(
  nodeDescription: ChildrenDescription,
  componentContext: ComponentContext<unknown>,
  description: ComponentDescription,
  container: Element | DocumentFragment,
  context: WiringContext,
  node: Element | CharacterData,
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
    childrenBindMode: parentDescription.childrenBindMode,
  })
  return runInternal(
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
  component: ComponentDescription | Component | ObservableComponent,
  context: WiringContext,
  outerContainer?: Element | DocumentFragment,
  document = globalThis.document,
): Observable<Element> {
  if (isObservable(component)) {
    return component
  }

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

  if (description.component === ErrorBoundary) {
    return wireErrorBoundary(description, context, document)
  }

  if (description.component === Suspense) {
    return wireSuspense(description, context, document)
  }

  return new Observable((subscriber: Subscriber<Element>) =>
    wireInternal(description, subscriber, context, outerContainer, document),
  )
}

/**
 * Run a Butterfloat component
 *
 * @param container Container the component will be a child in
 * @param component Component or description of component to run
 * @param context Optional context for wiring concerns
 * @param placeholder Optional placeholder child of the container to replace
 * @param document Document to use for creating new nodes
 * @returns Subscription
 */
export function runInternal(
  container: Element | DocumentFragment,
  component: ComponentDescription | Component | ObservableComponent,
  context: WiringContext,
  placeholder?: Element | CharacterData,
  document = globalThis.document,
) {
  const observable = isObservable(component)
    ? component
    : wire(component, context, container, document)
  let previousNode: Element | null = null
  const componentName =
    'type' in component ? component.component.name : component.name
  return observable.subscribe({
    next(node) {
      if (previousNode) {
        try {
          previousNode.replaceWith(node)
        } catch (error) {
          console.warn(
            'Cannot exactly replace previous node, replacing all children in container',
            previousNode,
          )
          container.replaceChildren(node)
        }
      } else if (placeholder) {
        placeholder.replaceWith(node)
      } else {
        container.appendChild(node)
      }
      previousNode = node
    },
    error(error) {
      console.error(`Error in component ${componentName}`, error)
    },
    complete() {
      if (!context?.preserveOnComplete && previousNode) {
        container.removeChild(previousNode)
      }
    },
  })
}
