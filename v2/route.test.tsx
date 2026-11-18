import { equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Empty } from './rings/empty.js'
import { type jsx } from './mat.js'
import { route } from './route.js'
import { NEVER } from 'rxjs'

describe('route', () => {
  it('can have a completion component', () => {
    const routes = route().onComplete(Empty, 'replace').build()
    equal(routes.complete?.component, Empty)
    equal(routes.complete?.mode, 'replace')
  })

  it('can have a suspend', () => {
    const routes = route()
      .suspend(NEVER, 'replace')
      .whenSuspended((_suspended) => ({}), Empty)
      .build()
    equal(routes.suspend?.suspend, NEVER)
    equal(routes.suspend?.mode, 'replace')
    ok(routes.suspend.routes)
    equal(routes.suspend.routes.length, 1)
    ok(routes.suspend.routes[0])
    equal(routes.suspend.routes[0][1], Empty)
  })
})
