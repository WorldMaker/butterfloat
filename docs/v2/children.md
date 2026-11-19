---
title: Component Children and Dynamic Children
order: 5
---

# Component Children and Dynamic Children

Previously in the [Getting Started][started] tour was an introduction
to [Class and Style Binding][style]. Components sit in a nested tree
and at some point either need to include children that have been
passed to them or dynamically add children elements somewhere in the
tree.

## Component Children

To include the children of a component we use the `Children`
system-defined component. This looks like a component to help remind
us that children may be dynamically bound and could change in the
component's lifetime.

A simple example of a fancy list wrapper:

```tsx
import { Children, type jsx } from 'butterfloat'

interface CoolListProps {}

function CoolList(props: CoolListProps, mat: jsx.Mat) {
  const { jsx } = mat
  return (
    <div className="cool-list-wrapper">
      <ul className="cool-list">
        <Children context={mat} />
      </ul>
    </div>
  )
}

function ListPage(_: unknown, { jsx }: jsx.Mat) {
  return (
    <div className="list-page">
      <CoolList>
        <li>This</li>
        <li>Is</li>
        <li>Wrapped</li>
        <li>In</li>
        <li>A</li>
        <li>Cool</li>
        <li>List</li>
      </CoolList>
    </div>
  )
}
```

To facilitate deeper nesting of component children, the `Children`
component takes the `jsx.Mat` of the component it should bind the children
of. (This is the same `jsx.Mat` that provides the current `jsx` and tools
such as `events` and `bindEffect`.)

It tries to default to the children of the current component and in
this case the context could be omitted because it is embedded
entirely inside static HTML, but it is probably a best practice to
provide the mat in case it does move to somewhere else in the
tree with another component in the way.

## Children Routing

You may need to dynamically change children over time in your
components. For stamp awareness you want to use child routing. This
helps build metadata useful for deep building stamps.

An example dynamic list:

```tsx
import { route, stampWhen, type jsx } from 'butterfloat'
import { NEVER, concat, delayWhen, from, interval, map } from 'rxjs'

const ListItem = stampWhen((jsx, { text }: { text: string }) => ({
  ring: <li>{text}</li>,
  condition: (props) => props.text === text,
  jsonProps: { text },
}))

function DynamicList(_props: unknown, { jsx }: jsx.Mat) {
  const listSource = concat(
    from(['This', 'is', 'a', 'dynamic', 'list']).pipe(
      delayWhen((_v, i) => interval(i * 500)),
    ),
    NEVER,
  )

  const listRoute = route(listSource)
    .when((text) => ({ text }), ListItem, [{ text: 'This' }, { text: 'list' }])
    .build()

  return <li childrenBind={listRoute} />
}
```

This will append new children to the list as they are added. You can
change the behavior (mode) of this routing in the second parameter to
`route`, for instance `route(listSource, 'replace')` will replace the
children as they are observed. It defaults to `'append'`.

When stamps for the entire tree are built ahead of time, two examples
of props are provided to be prebuilt as stamps.

## Comments and the Empty Component

The `<Comment comment="Some static comment" />` pseudo-component is
useful for adding HTML comments. The web was built on View Source, and
sometimes it is still nice to add visible comments to the DOM.

The `<Empty />` pseudo-component is an explicitly empty return state.
It's a bit more optimized than alternatives like using an empty fragment
(`<></>`, the "empty fish").

## Classic (v1) Children Binding

You may need to dynamically change children over time in your
components. The lowest level (and classic way) to do this
in Butterfloat is with `childrenBind` to an Observable of Components.
This binding takes an Observable of Components and as it observes new
Components it appends them (by default) as children. The binding mode
can be adjusted with the separate `childrenBindMode` attribute.

An example dynamic list:

```tsx
import { type jsx } from 'butterfloat'
import { NEVER, concat, delayWhen, from, interval, map } from 'rxjs'

function DynamicList(_: unknown, { jsx }: jsx.Mat) {
  const children = concat(
    from(['This', 'is', 'a', 'dynamic', 'list']).pipe(
      delayWhen((v, i) => interval(i * 500)),
    ),
    NEVER,
  ).pipe(map((text) => () => <li>{text}</li>))

  return <li childrenBind={children} />
}
```

This will append new children to the list as they are added.

There is an attribute to control the children binding called
`childrenBindMode`. It defaults to `'append'`, but can be set
to `'prepend'` to add new items to the top of the list, or
`'replace'` to only show the most recent component from the
observable.

## Next Steps

If you have gotten this far in the general tour you might be
interested in [Suspense and Advanced Binding][suspense].

[started]: ./getting-started.md
[style]: ./style.md
[suspense]: ./suspense.md
