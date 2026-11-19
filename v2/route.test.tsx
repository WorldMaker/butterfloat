import { equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Empty } from './rings/empty.js'
import { type jsx } from './mat.js'
import { boundary, route, suspend } from './route.js'
import { NEVER } from 'rxjs'

describe('route', () => {
  it('can build a completion route', () => {
    const routes = boundary().onComplete(Empty, 'replace').build()
    equal(routes.complete?.component, Empty)
    equal(routes.complete?.mode, 'replace')
  })

  it('can build a suspend route', () => {
    const routes = suspend(NEVER, 'replace')
      .whenSuspended((_suspended) => ({}), Empty)
      .build()
    equal(routes.suspend?.suspend, NEVER)
    equal(routes.suspend?.mode, 'replace')
    ok(routes.suspend.routes)
    equal(routes.suspend.routes.length, 1)
    ok(routes.suspend.routes[0])
    equal(routes.suspend.routes[0][1], Empty)
  })

  it('can build a suspend route with swap mode', () => {
    const routes = suspend(NEVER, 'swap')
      .whenSuspended((_suspended) => ({}), Empty)
      .build()
    equal(routes.suspend?.suspend, NEVER)
    equal(routes.suspend?.mode, 'swap')
    ok(routes.suspend.routes)
    equal(routes.suspend.routes.length, 1)
    ok(routes.suspend.routes[0])
    equal(routes.suspend.routes[0][1], Empty)
  })

  it('can build an error route', () => {
    const routes = boundary()
      .withErrorMode('prepend')
      .onError((error) => ({ message: String(error) }), Empty)
      .build()
    equal(routes.error?.mode, 'prepend')
    ok(routes.error?.routes)
    equal(routes.error?.routes.length, 1)
    ok(routes.error?.routes[0])
    equal(routes.error?.routes[0][1], Empty)
  })

  it('can build a child route', () => {
    const routes = route(NEVER)
      .when((_input) => ({}), Empty)
      .build()
    ok(routes.routes)
    equal(routes.routes.input, NEVER)
    equal(routes.routes.routes.length, 1)
    ok(routes.routes.routes[0])
    equal(routes.routes.routes[0][1], Empty)
  })

  it('can build a child route with a suspend route', () => {
    const routes = route(NEVER)
      .when((_input) => ({}), Empty)
      .suspend(NEVER, 'replace')
      .whenSuspended((_suspended) => ({}), Empty)
      .build()
    ok(routes.suspend?.suspend)
    equal(routes.suspend?.suspend, NEVER)
    equal(routes.suspend?.mode, 'replace')
    ok(routes.suspend.routes)
    equal(routes.suspend.routes.length, 1)
    ok(routes.suspend.routes[0])
    equal(routes.suspend.routes[0][1], Empty)
  })

  it('can build a fixed child route', () => {
    const routes = route(NEVER)
      .fixedWhen((_input) => ({}), Empty)
      .build()
    ok(routes.routes)
    equal(routes.routes.fixed, true)
    equal(routes.routes.input, NEVER)
    equal(routes.routes.routes.length, 1)
    ok(routes.routes.routes[0])
    equal(routes.routes.routes[0][1], Empty)
    equal(routes.routes.routes[0][3]?.fixed, true)
  })
})
