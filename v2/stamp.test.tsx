import { equal, ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { describeRing } from './testing/index.js'
import { type jsx } from './mat.js'
import { stamp, stampWhen } from './stamp.js'
import { type Observable, NEVER } from 'rxjs'

describe('stamp helpers', () => {
  it('shortcuts a simple stamp', () => {
    const Stamp = stamp((jsx) => <h1>Stamp</h1>)
    const desc = describeRing({}, Stamp)
    ok(desc)
    equal(desc.isStamp, true)
    equal(desc.stampCondition, null)
  })

  it('shortcuts a stamp with props', () => {
    const Stamp = stamp((jsx, props: { name: Observable<string> }) => (
      <h1 bind={{ innerText: props.name }}>Stamp</h1>
    ))
    const desc = describeRing({ name: NEVER }, Stamp)
    ok(desc)
    equal(desc.isStamp, true)
    equal(desc.stampCondition, null)
  })

  it('shortcuts a stamp with condition', () => {
    const Stamp = stampWhen((jsx, { name }: { name: string }) => ({
      condition: (props) => props.name === name,
      ring: <h1>{name}</h1>,
    }))
    const desc = describeRing({ name: 'Test' }, Stamp)
    ok(desc)
    equal(desc.isStamp, true)
    ok(desc.stampCondition)
    equal(desc.stampCondition({ name: 'Test' }), true)
    equal(desc.stampCondition({ name: 'Other' }), false)
  })
})
