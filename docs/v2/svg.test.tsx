import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { type jsx, svg } from '../../v2/svg/index.js'

describe('svg documentation', () => {
  it('shows an example of the svg helper', () => {
    const ExampleSvg = svg((jsx) => <svg>/* … */</svg>)
    ok(ExampleSvg)
  })

  it('shows an example of the svg helper when it is not a stamp', () => {
    const ExampleSvg = svg((jsx) => <svg>/* … */</svg>, { notStamp: true })
    ok(ExampleSvg)
  })

  it('shows an example of mapping xml namespaces', () => {
    function ExampleXmlNamespaceComponent(
      _: unknown,
      { jsx, mapXmlns }: jsx.Mat,
    ) {
      mapXmlns(
        {
          example: 'http://www.example.com/ns/example',
          ex: 'http://www.example.com/ns/example/ex',
        },
        'http://www.example.com/ns/example/default',
      )

      return (
        <example:element
          xmlns="http://www.example.com/ns/example/default"
          xmlns:ex="http://www.example.com/ns/example/ex"
          xmlns:example="http://www.example.com/ns/example"
        >
          <ex:thing />
          <thing2 />
        </example:element>
      )
    }

    ok(ExampleXmlNamespaceComponent)
  })
})
