import {
  combineLatest,
  filter,
  isObservable,
  map,
  materialize,
  Observable,
  Subject,
} from 'rxjs'
import {
  ButterfloatIntrinsicAttributes,
  ChildrenBindMode,
  Component,
  JsxChildren,
} from '../component.js'
import { getNextElementBindId, Mat, registerPossibleStamp } from '../mat.js'
import {
  addChild,
  BuildableRing,
  elementBindId,
  ringType,
  RunnableRing,
  toBinds,
  toElement,
} from '../ring.js'
import { collectChildBinds } from './children.js'
import { mapErrorRoutes, mapRoutes, mapSuspendRoutes } from '../route.js'

/**
 * Does an element description have any binds?
 *
 * @param description Element description
 * @returns True if any dynamic binds
 */
export function hasAnyBinds(
  attributes: ButterfloatIntrinsicAttributes,
): boolean {
  return (
    Boolean(attributes.childrenBind) ||
    Object.keys(attributes.bind ?? {}).length > 0 ||
    Object.keys(attributes.immediateBind ?? {}).length > 0 ||
    Object.keys(attributes.events ?? {}).length > 0 ||
    Object.keys(attributes.styleBind ?? {}).length > 0 ||
    Object.keys(attributes.immediateStyleBind ?? {}).length > 0 ||
    Object.keys(attributes.classBind ?? {}).length > 0 ||
    Object.keys(attributes.immediateClassBind ?? {}).length > 0
  )
}

export function elementRunner(
  mat: Mat,
  element: string,
  attributes: ButterfloatIntrinsicAttributes | null,
  ...children: JsxChildren
): RunnableRing {
  const bindings = collectChildBinds(children)
  let bindId: string | undefined = undefined

  if (attributes && hasAnyBinds(attributes)) {
    bindId = `${element}[data-bf-bind=${mat[getNextElementBindId]()}]`

    let childrenBind: Observable<Component> | undefined = undefined
    let childrenBindMode: ChildrenBindMode | undefined = undefined
    let onError: ((error: unknown) => void) | undefined = undefined
    let errorBind: Observable<Component> | undefined = undefined
    let errorBindMode: ChildrenBindMode | undefined = undefined
    let onComplete: (() => void) | undefined = undefined
    let completeBind: Observable<Component> | undefined = undefined
    let completeBindMode: ChildrenBindMode | undefined = undefined
    let suspend: Observable<boolean> | undefined = undefined
    let suspendBind: Observable<Component> | undefined = undefined
    let suspendBindMode: ChildrenBindMode | undefined = undefined
    if (attributes.childrenBind) {
      if (isObservable(attributes.childrenBind)) {
        childrenBind = attributes.childrenBind
        childrenBindMode = attributes.childrenBindMode ?? 'append'
      } else {
        const routeMap = attributes.childrenBind
        let boundarySubject: Subject<void> | undefined = undefined
        if (routeMap.routes) {
          childrenBind = mapRoutes(routeMap.routes)
          childrenBindMode = routeMap.routes.mode ?? 'append'
          for (const route of Object.values(routeMap.routes.routes)) {
            const [, component, jsonProps] = route
            mat[registerPossibleStamp](component, jsonProps)
          }
        }
        if (routeMap.error) {
          boundarySubject ??= new Subject<void>()
          onError = boundarySubject.error.bind(boundarySubject)
          errorBind = mapErrorRoutes(
            boundarySubject.asObservable().pipe(
              materialize(),
              filter((notification) => notification.kind === 'E'),
              map((notification) => notification.error),
            ),
            routeMap.error,
          )
          errorBindMode = routeMap.error.mode ?? 'append'
          for (const route of Object.values(routeMap.error.routes)) {
            const [, component, jsonProps] = route
            mat[registerPossibleStamp](component, jsonProps)
          }
        }
        if (routeMap.complete) {
          boundarySubject ??= new Subject<void>()
          const component = routeMap.complete.component
          mat[registerPossibleStamp](component)
          onComplete = boundarySubject.complete.bind(boundarySubject)
          completeBind = boundarySubject.asObservable().pipe(
            materialize(),
            filter((notification) => notification.kind === 'C'),
            map(() => component),
          )
          completeBindMode = routeMap.complete.mode ?? 'append'
        }
        if (routeMap.suspend) {
          suspend = routeMap.suspend.suspend
          suspendBind = mapSuspendRoutes(routeMap.suspend)
          suspendBindMode = routeMap.suspend.mode ?? 'append'
          for (const route of Object.values(routeMap.suspend.routes)) {
            const [, component, jsonProps] = route
            mat[registerPossibleStamp](component, jsonProps)
          }
        }
      }
    }

    if (onError || onComplete || suspend) {
      for (const binding of Object.values(bindings)) {
        if (onError && !binding.onError) {
          binding.onError = onError
        }
        if (onComplete && !binding.onComplete) {
          binding.onComplete = onComplete
        }
        if (suspend) {
          if (binding.suspend) {
            binding.suspend = combineLatest([binding.suspend, suspend]).pipe(
              map(([a, b]) => a || b),
            )
          } else {
            binding.suspend = suspend
          }
        }
      }
    }

    bindings[bindId] = {
      bind: attributes.bind ?? {},
      immediateBind: attributes.immediateBind ?? {},
      events: attributes.events ?? {},
      styleBind: attributes.styleBind ?? {},
      immediateStyleBind: attributes.immediateStyleBind ?? {},
      classBind: attributes.classBind ?? {},
      immediateClassBind: attributes.immediateClassBind ?? {},
      onError,
      onComplete,
      suspend,
      suspendBind,
      suspendBindMode,
      childrenBind,
      childrenBindMode,
      errorBind,
      errorBindMode,
      completeBind,
      completeBindMode,
    }
  }

  return {
    [ringType]: 'runnable',
    [elementBindId]: bindId,
    [toBinds]: () => (Object.keys(bindings).length > 0 ? bindings : null),
  }
}

export function elementBuilder(
  mat: Mat,
  elementName: string,
  attributes: ButterfloatIntrinsicAttributes | null,
  ...children: JsxChildren
): BuildableRing {
  const runner = elementRunner(mat, elementName, attributes, ...children)
  const bindId = runner[elementBindId]

  if (attributes?.xmlns) {
    if (attributes.xmlns !== mat.defaultXmlns) {
      console.error(
        `Default namespace mismatch between component and element: ${mat.defaultXmlns} !== ${attributes.xmlns}`,
      )
      throw new Error(
        'Default namespace mismatch between component and element',
      )
    }
  }

  let element: Element
  if (elementName.includes(':')) {
    const [nsAbbrev, localElementName] = elementName.split(':') as [
      string,
      string,
    ]
    const ns = mat.xmlns[nsAbbrev]
    if (!ns) {
      console.error(
        `Unregistered namespace abbreviation '${nsAbbrev}' for element '${elementName}'`,
      )
      throw new Error(
        `Unregistered namespace abbreviation '${nsAbbrev}' for element '${elementName}'`,
      )
    }
    element = document.createElementNS(ns, localElementName)
  } else if (mat.defaultXmlns) {
    element = document.createElementNS(mat.defaultXmlns, elementName)
  } else {
    element = document.createElement(elementName)
  }

  for (const [key, value] of Object.entries(attributes ?? {})) {
    if (key.startsWith('xmlns:')) {
      const nsAbbrev = key.split(':')[1]
      if (nsAbbrev && mat.xmlns[nsAbbrev] !== value) {
        console.error(
          `Namespace abbreviation '${nsAbbrev}' is registered differently: ${mat.xmlns[nsAbbrev]} !== ${value}`,
        )
      }
    } else if (key.includes(':')) {
      const [nsAbbrev, attributeName] = key.split(':') as [string, string]
      const ns = mat.xmlns[nsAbbrev]
      if (!ns) {
        throw new Error(`Unknown namespace for '${key}' attribute`)
      }
      element.setAttributeNS(ns, attributeName, (value ?? '').toString())
    } else if (key.includes('-')) {
      // for example: aria- and data-
      element.setAttribute(key, (value ?? '').toString())
    } else if (key === 'class') {
      element.className = (value ?? '').toString()
    } else if (key === 'for') {
      ;(element as HTMLLabelElement).htmlFor = (value ?? '').toString()
    } else {
      // This is intentional metaprogramming
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(element as any)[key] = value
    }
  }

  if (bindId) {
    element.setAttribute('data-bf-bind', bindId)
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child))
    } else if (child[ringType] === 'buildable') {
      child[addChild](element, document)
    }
  }

  return {
    [ringType]: 'buildable',
    [toBinds]: runner[toBinds],
    [addChild]: (container) => {
      container.appendChild(element)
    },
    [toElement]: () => element,
  }
}
