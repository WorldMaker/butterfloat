# Component Children and Dynamic Children

Previously in the [Getting Started][started] tour was an introduction
to [state management][state]. Components sit in a nested tree and at
some point either need to include children that have been passed to
them or dynamically add children elements somewhere in the tree.

## Component Children

To include the children of a component we use the `Children`
system-defined component. This looks like a component to help remind
us that children may be dynamically bound and could change in the
component's lifetime.

A simple example of a fancy list wrapper:

```ts
import { Children, ComponentContext, jsx } from 'butterfloat'

interface CoolListProps {}

function CoolList(props: CoolListProps, context: ComponentContext) {
    return (
    <div className="cool-list-wrapper">
        <ul className="cool-list">
            <Children context={context} />
        </ul>
    </div>
    )
}

function ListPage() {
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
component takes the `ComponentContext` of the component it should
bind the children of. (This is the same `ComponentContext` that
provides tools such as `events` and `bindEffect`.)

It tries to default to the children of the current component and in
this case the context could be omitted because it is embedded
entirely inside static HTML, but it is probably a best practice to
provide the context in case it does move to somewhere else in the
tree with another component in the way.

## Dynamic Children Binding

You may need to dynamically change children over time in your
components. The lowest level (and currently only way) to do this
in Butterfloat is with `childrenBind`. This binding takes an
Observable of Components and as it observes new Components it
appends them (by default) as children.

An example dynamic list:

```ts
import { jsx } from 'butterfloat'
import { NEVER, concat, delayWhen, from, interval, map } from 'rxjs'

function DynamicList() {
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

`childrenBind` can also be applied to components (hence why
components need `<Children />` to display their children) and
fragments as well (by expanding `<></>` to
`<Fragment childrenBind={children}></Fragment>`).

## Next Steps

If you have gotten this far in the general tour you might be
interested in [Suspense and Advanced Binding][suspense].

[started]: ./getting-started.md
[state]: ./state.md
[suspense]: ./suspense.md
