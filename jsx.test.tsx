import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { jsx } from './jsx.js'

describe('jsx', () => {
    it('describes a simple static element', () => {
        const test = <h1>Hello</h1>
        const expected = {
            type: 'element',
            element: 'h1',
            attrs: null,
            children: ['Hello']
        }
        deepEqual(test, expected)
    })

    it('describes a single dynamic component', () => {
        const TestComponent = () => <h1>Hello</h1>
        const test = <TestComponent />
        const expected = {
            type: 'component',
            component: TestComponent,
            props: null,
            children: []
        }
        deepEqual(test, expected)
    })
})
