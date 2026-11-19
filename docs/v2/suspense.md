---
title: Suspense and Advanced Binding
order: 6
---

# Suspense and Advanced Binding

Previously in the [Getting Started][started] tour, we discussed
[Component Children and Children Binding][children]. With a handle
on several types of binding by this point, we should be able to dig
into some of the meatier aspects of Butterfloat's binding mechanics
and some of its advanced features, especially Suspense binding.

## Default Scheduling (Delayed Scheduling) versus Immediate Scheduling

There are two common "flavors" of binds in Butterfloat: delayed (which is
largely the default) and immediate. The primary places you see these
flavors are in the JSX `bind` versus `immediateBind` attributes, `classBind`
versus `immediateClassBind`, `styleBind` versus `immediateStyleBind`,
and in the `ComponentContext` the differences between `bindEffect`
and `bindImmediateEffect` helpers.

The immediate flavor gets the longer names because it shouldn't be
the default. The delayed scheduling flavor tries to be smarter by
default.

There's one obvious exception to note that fields named `value` are
_always_ immediately bound even when in the `bind` default attribute.
This is because the way value fields usually imply a user input
space where delays would be most noticeable to users and most
detrimental to user interaction. (Though the advice here is that
you should consider twice if you need to bind an input's value.)

If you do want to opt-in to a delay scheduled `value` field, such
as for elements that use `value` outside of direct user interaction
such as `<progress />` elements, or in cases where you have tested
and are careful of the user interaction repercussions, you can use
the `bfDelayValue` special key to the default `bind` attribute.

Delayed scheduling exists to orchestrate bound changes to hopefully
maximize responsiveness of the application. The general basics are
that changes are aggregated and buffered so that they happen no
_faster_ than `requestAnimationFrame` time. This allows the browser
to slow things down in the case of heavy repaints or backgrounded
windows or other user interaction priorities. This should reduce
noticeable "churn" of changes from a user's perspective (very basic
debouncing/throttling), and increase the priorities of user
interaction responsiveness.

It is suggested to start with delayed scheduling as your default and
then as a developer where you learn that some updates provide a better
user experience when immediately bound, you can move those bindings
to the appropriate `immediateBind` or `bindImmediateEffect`.

(One such case for `bindImmediateEffect` over `bindEffect` is for
events where you need to prevent the default action, such as binding
effects for events to `<a href="#" events={{ click }} />` or
`<form method="POST" action="/fallback/address" events={{ submit }} />`.)

## Suspense

Suspense is an optional, added layer on top of the default
scheduling that further buffers changes based on a developer-provided
`Observable<boolean>`.

To configure suspense, you use the `suspend()` option in [Children Routing][]:

```tsx
import { suspend, Children, type jsx } from 'butterfloat'
import type { Observable } from 'rxjs'

export interface LoadableVm {
  loading: Observable<boolean>
  load(): void
}

interface LoadViewModelProps {
  vm: LoadableVm
}

function LoadViewModel({ vm }: LoadViewModelProps, mat: jsx.Mat) {
  const { jsx } = mat
  vm.load()
  const suspendRoute = suspend(vm.loading).build()
  return (
    <div childrenBind={suspendRoute}>
      <Children context={mat} />
    </div>
  )
}
```

When the provided observable is true (in this example, while the
`LoadableVm` is loading), all default-scheduled bindings for the
entire tree below the Suspense component are buffered but not
applied. Once the observable is false again, the buffered changes
will be applied.

Suspense can be a powerful tool to avoid UI bouncing and churn
and sometimes costly repaints while a complicated amount of state is
being loaded or calculated or otherwise complexly and deeply changed
or reconfigured.

Note that Suspense cannot and will not interfere with immediate
bindings and you will need to find your own way to throttle or
suspend your immediate changes to the DOM tree.

There's one other optional feature, you can route a `when` observable is
true. It works like any other children binding route, but also accepts
the special `'swap'` binding mode:

```tsx
import { stamp, suspend, Children, type jsx } from 'butterfloat'
import type { Observable } from 'rxjs'

export interface LoadableVm {
  loading: Observable<boolean>
  load(): void
}

interface LoadViewModelProps {
  vm: LoadableVm
}

const LoadingView = stamp((jsx) => (
  <p>
    Loading… <progress />
  </p>
))

function LoadViewModel({ vm }: LoadViewModelProps, mat: jsx.Mat) {
  const { jsx } = mat
  vm.load()
  const suspendRoute = suspend(vm.loading, 'swap')
    .whenSuspended((_suspended) => ({}), LoadingView)
    .build()
  return (
    <div childrenBind={suspendRoute}>
      <Children context={mat} />
    </div>
  )
}
```

With the `'swap'` mode _both_ components and their bindings are live at
the same time, but which one is a child in the tree is swapped. A
performance consideration to keep in mind is to in the `whenSuspended`
component to a minimum, the more static HTML it is the likely
it will perform better. Also, again, you may want to keep in mind
that your immediate bindings in _both_ trees are unaffected by any
suspense changes.

## `bfDomAttach` Event

As a last resort you may wish to manage your own bindings directly
to the `HTMLElement` in the DOM that your JSX represents. This can
be useful for bridging to classic Vanilla JS components, for
instance. To provide for this need, you can bind to the `bfDomAttach`
event on a static element.

```tsx
import { type jsx } from 'butterfloat'
import { type Observable, shareReplay, switchMap } from 'rxjs'

interface SomeVanillaComponent {
  destroy(): void
}

interface SomeVanillaComponentFactory {
  render(element: HTMLElement): SomeVanillaComponent
}

interface VanillaWrapperProps {
  vanillaFactory: SomeVanillaComponentFactory
}

interface VanillaWrapperEvents {
  attach: ObservableEvent<HTMLElement>
}

function VanillaWrapper(
  { vanillaFactory }: VanillaWrapperProps,
  { jsx, bindEffect, events }: jsx.Mat<VanillaWrapperEvents>,
) {
  const wrappedVanilla = events.attach.pipe(
    switchMap(
      (element) =>
        new Observable<SomeVanillaComponent>((subscriber) => {
          const component = vanillaFactory.render(element)
          subscriber.next(component)
          return () => component.destroy()
        }),
    ),
    shareReplay(1),
  )

  bindEffect(wrappedVanilla, () => {})

  return <div events={{ bfDomAttach: events.attach }} />
}
```

One useful thing to note here is that we are handling the vanilla
component's full lifetime in the Observable through the use of
`switchMap` and making sure that we return the teardown logic of
it in the `new Observable` constructor. In general, Butterfloat
suggests using Observable lifetimes for handling resource cleanup.

`bindEffect` forces that observable to be eventually subscribed,
but if you had other bindings that depended on that `wrappedVanilla`
component you may not that empty `bindEffect` at all.

### `Static` attachment

As a final bypass and alternative to `innerHTML` JSX attributes,
you can use the `<Static element={staticDomElement} />`
pseudo-component. Static does no lifetime handling and provides
no teardown lifecycle events. The DOM elements attached this way
_should be_ truly static (no event handlers, as a big for
instance).

`Static` can be considered an escape hatch for things such as
SVG and MathML and vanilla JS template systems that populate their
own DOM elements.

## Error Boundary

A common need is to centrally catch any errors below a certain point in
a component and present an alternative "Something went wrong" view.

Error boundaries are built as a part of [Children Routing][] by attaching
`onError` routes to `route(input)`, `suspend(when)`, or `boundary()`
builders.

You can also set `withErrorMode(mode)` to have different children binding
mode applied when an error occurs. The default is `'append'`.

## Completion, Removal, and Fixed Binding

In Butterfloat, when a binding completes it may indicate something went
wrong, though not quite an error. By default when a binding completes
Butterfloat sends a warning, and signals the nearest Complete Boundary
up the component tree. These are registered with [Children Routing][]
similar to an Error boundary, with an `onComplete` route.

If no Complete boundaries are inside the component (the signal bubbles all
the way to the component boundary) the component itself completes and it
is _removed_ at that time.

This behavior may be surprising the first time it is encountered,
but it is the behavior of least surprise in the long term. Rather
than a component left in a dead, static, or only partially working
state with no visible change, it is removed as it seems to have finished
its job.

It can be useful to explicitly declare that when an Observable completes
the component should be removed (and that this is neither an error nor
a completion boundary condition), so the `jsx.Mat` provides a
`bindRemoval` to bind an Observable's completion to removing the
component.

Some bindings make sense to have a point of completion where the bindings
have completed their job (finished loading, for instance), are not an
error and don't signal teardown of the component as a whole. These
bindings in Butterfloat are referred to as _fixed_ and are also useful
for Stamp building, for "pre-loaded Stamps", and static site generation.

By default Stamps will try to run only fixed bindings and try to wait for
them all to complete. When running from such a stamp, the runtime will
not run fixed bindings, just the rest.

> [!NOTE]
> "Fixed" comes from the boxing analogy that "the fix was in" and the
> outcome at least somewhat predetermined. It can also be considered in
> the mathematical analogy of converging towards a "fixed point" (final
> state).

### Debugging Surprise Completions

Completion Boundaries can be added with [Children Routing][].

Butterfloat includes some `console.debug` output to help debug
which type of binding may have completed. It is also suggested to
try using [rxjs-spy][spy] to instrument your observables in debug
builds. That can be a very useful debugging tool in general for
Butterfloat applications.

(You may also want to configure your production bundler, if you use
one, to trim `console.debug`` lines from production builds if it
doesn’t already. Though these completion logs should be rare in
any case and many browsers ignore them when development consoles
are not open.)

[children]: ./children.md
[Children Routing]: ./children.md#children-routing
[started]: ./getting-started.md
[spy]: https://github.com/cartant/rxjs-spy
