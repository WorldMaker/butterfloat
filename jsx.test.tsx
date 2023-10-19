import { deepEqual } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { jsx, Fragment } from './jsx.js'
import { NodeDescription } from './component.js'
import { of } from 'rxjs'

describe('jsx', () => {
    it('describes a simple static element', () => {
        const test = <h1>Hello</h1>
        const expected: NodeDescription = {
            type: 'element',
            element: 'h1',
            attributes: {},
            bind: {},
            immediateBind: {},
            children: ['Hello']
        }
        deepEqual(test, expected)
    })

    it('describes a simple static element with a static attribute', () => {
        const test = <h1 className='header'>Hello</h1>
        const expected: NodeDescription = {
            type: 'element',
            element: 'h1',
            attributes: { className: 'header' },
            bind: {},
            immediateBind: {},
            children: ['Hello']
        }
        deepEqual(test, expected)
    })

    it('describes a simple static element with a bind', () => {
        const className = of('header')
        const test = <h1 bind={{ className }}>Hello</h1>
        const expected: NodeDescription = {
            type: 'element',
            element: 'h1',
            attributes: {},
            bind: { className },
            immediateBind: {},
            children: ['Hello']
        }
        deepEqual(test, expected)
    })

    it('describes a single dynamic component', () => {
        const TestComponent = () => <h1>Hello</h1>
        const test = <TestComponent />
        const expected: NodeDescription = {
            type: 'component',
            component: TestComponent,
            properties: null,
            children: []
        }
        deepEqual(test, expected)
    })

    it('describes a fragment', () => {
        const test = <>
            <h1>Hello</h1>
        </>
        const expected: NodeDescription = {
            type: 'fragment',
            attributes: null,
            children: [{
                type: 'element',
                element: 'h1',
                attributes: {},
                bind: {},
                immediateBind: {},
                children: ['Hello']
            }]
        }
        deepEqual(test, expected)
    })
})
