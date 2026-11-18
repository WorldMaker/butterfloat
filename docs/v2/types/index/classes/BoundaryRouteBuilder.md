---
title: BoundaryRouteBuilder
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / BoundaryRouteBuilder

# Class: BoundaryRouteBuilder

Defined in: [v2/route.ts:164](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L164)

Fluent, mutable builder for boundary routes

Shortcut: `boundary()`

Example usage:

```ts
const routes = boundary()
  .withErrorMode('prepend')
  .onError((error) => ({ message: String(error) }), ErrorComponent)
  .onComplete(CompleteComponent)
  .build()
```

## Extended by

- [`SuspendRouteBuilder`](SuspendRouteBuilder.md)

## Constructors

### Constructor

> **new BoundaryRouteBuilder**(): `BoundaryRouteBuilder`

#### Returns

`BoundaryRouteBuilder`

## Methods

### build()

> **build**(): [`ChildRoutes`](../interfaces/ChildRoutes.md)

Defined in: [v2/route.ts:219](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L219)

Build the child routes

#### Returns

[`ChildRoutes`](../interfaces/ChildRoutes.md)

Child routes for childrenBind

---

### onComplete()

> **onComplete**(`component`, `mode?`): `this`

Defined in: [v2/route.ts:206](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L206)

Add a completion boundary component

There may be only one completion boundary component. If multiple are added, the last one will be used.

#### Parameters

##### component

[`Component`](../type-aliases/Component.md)

Component to render when a completion occurs

##### mode?

`"replace"` \| `"append"` \| `"prepend"` = `'append'`

Child binding mode for the completion boundary component

#### Returns

`this`

this

---

### onError()

> **onError**\<`Props`\>(`map`, `component`, `jsonProps?`): `this`

Defined in: [v2/route.ts:189](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L189)

Add an error boundary route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### map

(`error`) => `false` \| `Props`

Map an error to a set of props for an error component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when an error occurs

##### jsonProps?

`Props` \| `Props`[]

Optional JSON serializable props for the error component's stamp variant

#### Returns

`this`

this

---

### withErrorMode()

> **withErrorMode**(`mode`): `this`

Defined in: [v2/route.ts:177](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L177)

Set the child binding mode for the error boundary

If not set, the default is 'append'. Last call wins if multiple calls are made.

#### Parameters

##### mode

`"replace"` \| `"append"` \| `"prepend"`

Child binding mode for the error boundary

#### Returns

`this`

this
