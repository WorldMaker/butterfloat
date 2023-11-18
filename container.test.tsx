import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER } from 'rxjs'
import { Container } from './container.js'
import { jsx } from './jsx.js'

describe('container', () => {
  it('exists', () => {
    const example = (
      <div>
        <Container attach={(_element) => NEVER} />
      </div>
    )
    ok(example)
  })
})
