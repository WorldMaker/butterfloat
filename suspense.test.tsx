import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { of } from 'rxjs'
import { jsx } from './jsx.js'
import { Suspense } from './suspense.js'

describe('suspense', () => {
  it('takes a suspense observable', () => {
    const example = <Suspense when={of(false)} />
    ok(example)
  })

  it('takes an optional suspense view', () => {
    const example = (
      <Suspense when={of(false)} suspenseView={() => <p>Loading…</p>} />
    )
    ok(example)
  })
})
