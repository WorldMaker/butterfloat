---
title: SVG and XML Namespaces
order: 7
---

# SVG and XML Namespaces

Last time in the [Getting Started][started] tour, we discussed
[Suspense and Advanced Binding][suspense]. We'll take a break from the
heavier topics for a quick "boring" web topic: XML Namespaces, including
but especially SVG.

## XML Namespaces

XML Namespaces need to be pre-registered with `jsx.Mat` using the
`mapXmlns()` function.

```tsx
import { type jsx } from 'butterfloat'

export function ExampleXmlNamespaceComponent(
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
```

`xmlns` attributes are not necessary and are simply validated that they
match when encountered.

> [!WARNING]
> There can only be one default namespace in a component with `mapXmlns`.

To handle default namespace changes now it is easiest to do it as
separate components. The [SVG wrapper helper](#svg-helper) can be a
particularly useful tool for this in the most common web usage of XML
namespaces.

## SVG Types

When importing `jsx` from `butterfloat/svg` instead of `butterfloat`
Butterfloat gives additional type hints for SVG tags in a same way the
primary import gives rich type hints on HTML tags.

```tsx
import { type jsx } from 'butterfloat/svg'
```

## SVG Helper

The `svg()` wrapper tool under `butterfloat/svg` is just like the `stamp()`
helper and defaults to also marking the component as a stamp, but more
importantly it maps the most common SVG namespaces and sets the default
namespace to SVG's.

```tsx
import { type jsx, svg } from 'butterfloat/svg'

export const ExampleSvg = svg((jsx) => <svg>/* … */</svg>)
```

### Disable Stamps with the SVG Helper

The `svg()` wrapper takes a `notStamp` option to disable marking the
component as a stamp.

```tsx
import { type jsx, svg } from 'butterfloat/svg'

export const ExampleSvg = svg((jsx) => <svg>/* … */</svg>, { notStamp: true })
```
