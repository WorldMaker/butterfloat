---
title: Migration From v1 to v2
order: 100
---

# Migration from v1 to v2

Butterfloat v1.7 is the transition/preview release for Butterfloat v2.0.
The v2.0 API is presented side-by-side the v1.x API under the `/v2`
export. Deprecation warnings were added to v1.x APIs that are removed or
changing in v2.0. An adapter to run v2 components inside a v1.7 component
is provided to help with component at a time migrations.

The benefits to the v2.0 API are a Stamp-first/Stamp-native Butterfloat
with some additional power and performance provided by Contextual JSX.
[Why Butterfloat v2?][motivation] includes more details on the
motivation behind this upgrade.

[motivation]: ../../motivation/v2.md

## Compatibility Overview

At the highest level there are few main compatibility breaks and most of
the rest of the changes are either features from the new API or
downstream compatibility breaks:

- `ComponentContext` has been renamed to `jsx.Mat`
- The top-level `jsx` import is now _type only_
- The runtime `jsx` function may be destructured from `jsx.Mat`
- The return type of `jsx` is no longer `NodeDescription`
- `immediateBind` attributes were removed for the `immediate()` marker
- Fragments and Components no longer support `childrenBind`
- Boundary components (`ErrorBoundary` and `Suspense`) have become
  [Children Routing](#upgrade-to-children-routing)

In v2 the `ComponentContext` is more important than ever and a shorter,
faster name to type seemed like a good idea. A lot of new power in v2
comes from the `jsx` runtime function being far more contextual and so
is provided by the new `jsx.Mat` component context parameter.

The context-sensitive output of `jsx` is called `Ring` and
`NodeDescription` is no longer an "intermediate tree", and instead a
testing-only output of specific testing `Ring`s.

## Use Deprecation Warnings to Upgrade Immediate Bindings

The v2 style of immediate binding was back-ported to v1.7. The new
approach uses a "marker" function instead of the previous explosion of
JSX attributes.

While the components are still v1.7 use the provided deprecation
warnings to switch to the new style of immediate binds.

```diff
+ import { delayed, immediate } from 'butterfloat'
…
- <div immediateBind={{ textContent }} />
+ <div bind={{ textContent: immediate(textContent) }} />
…
- <div immediateStyleBind={{ color }} />
+ <div styleBind={{ color: immediate(color) }} />
…
- <div immediateClassBind={{ myClass }} />
+ <div classBind={{ myClass: immmediate(myClass) }} />
…
- <progress bind={{ bfDelayValue: myValue }} />
+ <progress bind={{ value: delayed(myValue) }} />
```

## Update Imports

A good place to start in your migrations is from the bottom up in your
component tree. The `<V2 component={Component} props={props} />`
component can be used to host v2 components inside higher components in
your v1 tree as you migrate.

One of the first places to start in migrating a component should likely
be to change the top-level imports:

```diff
- import { type ComponentContext, jsx } from 'butterfloat'
+ import { type jsx } from 'butterfloat/v2'
```

`ComponentContext` is replaced by `jsx.Mat` and the important thing is
that the top-level `jsx` import is now type only. Using the Typescript
`type` keyword here provides extra type safety that you don't accidentally
build JSX types without a `jsx.Mat` involved.

> [!NOTE]
> A `jsx` top-level import is required for JSX types to work because for
> now Typescript only supports ambient namespaces for `jsx` types and
> ambient namespaces are only supported in top-level imports.

## Destructure Runtime `jsx`

In Butterfloat v2 all components should take the second parameter, the
`jsx.Mat` (which replaced `ComponentContext`). One big reason for this
is because the runtime `jsx` function for a Component is now provide by
the `jsx.Mat`.

```diff
- function ExampleComponent() {
+ function ExampleComponent(_props: unknown, { jsx }: jsx.Mat) {
```

For smaller Components, such as many of the places where arrow functions
might have been used, consider shortcuts like [`stamp()`][],
[`stampWhen()`][], and `svg()`. See [Stamps](../../stamps/) for details.

[`stamp()`]: ../../stamps/#shortcut-for-truly-simple-components
[`stampWhen()`]: ../../stamps/#shortcut-for-simple-stamps-with-alternates

## Replace Boundary Components

`<ErrorBoundary />` and `<Suspense />` become [Children Routing][].
More details under the [Suspense](../../suspense/) documentation, as
well as well as [Upgrade to Children Routing](#upgrade-to-children-routing)
below.

## New Features

Much of the benefits of the migration are in the new features that
Butterfloat v2 brings.

### Opt-in to New Stamp Metadata

[Stamps](../stamps/) can be collected automatically in Butterfloat v2
using the new markers and shortcuts `stamp()` and `stampWhen()`.

Automatically collected stamps can be used for "deep" stamping and for
collecting potentially all of the stamps in a component tree when combined
with [Children Routing][].

### Upgrade to Children Routing

[Children Routing][] amplifies `childrenBind`
to be stamp-aware and deep stamp collecting friendly.

Any use of `childrenBind` may be a great place to use the `route(input)`
helper function to build Children Routes.

Additionally, `ErrorBoundary` becomes a `childrenBind` of any error route
such as `boundary().onError(…)` or `route(input).onError(…)`.

`Suspense` becomes a `childrenBind` of any suspend route such as
`suspend(suspendInput).whenSuspended(…)` or
`route(input).suspend(suspendInput).whenSuspended(…)`.

Completion boundaries are new with Children Routing including
`boundary().onComplete(…)` and `route(input).onComplete(…)`.

### Add Fixed Bindings and Routes

[Fixed bindings][] are bindings that may naturally complete when they are
no longer needed (they come to a fixed outcome).

Similarly, [Children Routing][] supports fixed routes.

Combined, these tools provide more ways to build even deeper stamps when
"booking" them (running only fixed bindings and routes until they
complete).

This is most useful for things like static site generation. Especially,
static site generation where you can use the same components in multiple
ways, both static and dynamic.

[Children Routing]: ../children.md#children-routing
[Fixed bindings]: ../suspense.md#completion-removal-and-fixed-binding
