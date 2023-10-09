import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { jsx } from './jsx.js'

describe('jsx', () => {
    it('builds', () => {
        const test = <h1>Hello</h1>
        const expected = undefined
        deepEqual(test, expected)
    })
})
