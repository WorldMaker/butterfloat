---
title: SuspendRouteBuilder
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / SuspendRouteBuilder

# Class: SuspendRouteBuilder

Defined in: [v2/route.ts:270](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L270)

Fluent, mutable builder for suspension boundaries

Shortcut: `suspend(whenObservable, mode)`

Example usage:

```ts
const builder = suspend(whenObservable, 'append')
  .whenSuspended(map, component, bookProps)
  .build()
```

## Extends

- [`BoundaryRouteBuilder`](BoundaryRouteBuilder.md)

## Extended by

- [`ChildRouteBuilder`](ChildRouteBuilder.md)

## Constructors

### Constructor

> **new SuspendRouteBuilder**(`suspend?`, `mode?`): `SuspendRouteBuilder`

Defined in: [v2/route.ts:275](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L275)

#### Parameters

##### suspend?

`Observable`\<`boolean`\>

##### mode?

`"replace"` \| `"swap"` \| `"append"` \| `"prepend"`

#### Returns

`SuspendRouteBuilder`

#### Overrides

[`BoundaryRouteBuilder`](BoundaryRouteBuilder.md).[`constructor`](BoundaryRouteBuilder.md#constructor)

## Methods

### build()

> **build**(): [`ChildRoutes`](../interfaces/ChildRoutes.md)

Defined in: [v2/route.ts:319](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L319)

Build the child routes

#### Returns

[`ChildRoutes`](../interfaces/ChildRoutes.md)

Child routes for childrenBind

#### Overrides

[`BoundaryRouteBuilder`](BoundaryRouteBuilder.md).[`build`](BoundaryRouteBuilder.md#build)

---

### onComplete()

> **onComplete**(`component`, `mode?`): `this`

Defined in: [v2/route.ts:225](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L225)

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

#### Inherited from

[`BoundaryRouteBuilder`](BoundaryRouteBuilder.md).[`onComplete`](BoundaryRouteBuilder.md#oncomplete)

---

### onError()

> **onError**\<`Props`\>(`map`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:208](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L208)

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

##### bookProps?

`Props` \| `Props`[]

Optional JSON serializable props for the error component's stamp variant

#### Returns

`this`

this

#### Inherited from

[`BoundaryRouteBuilder`](BoundaryRouteBuilder.md).[`onError`](BoundaryRouteBuilder.md#onerror)

---

### suspend()

> **suspend**(`suspend`, `mode?`): `this`

Defined in: [v2/route.ts:290](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L290)

Create a suspension boundary

#### Parameters

##### suspend

`Observable`\<`boolean`\>

Observable that determines if the suspension boundary is active

##### mode?

`"replace"` \| `"swap"` \| `"append"` \| `"prepend"` = `'append'`

Child binding mode for the suspension boundary

#### Returns

`this`

this

---

### whenSuspended()

> **whenSuspended**\<`Props`\>(`map`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:306](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L306)

Add a suspension boundary route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### map

(`suspended`) => `false` \| `Props`

Map a suspension state to a set of props for a suspension component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when suspended

##### bookProps?

`Props` \| `Props`[]

Optional JSON serializable props for the suspension component's stamp variant

#### Returns

`this`

this

---

### withErrorMode()

> **withErrorMode**(`mode`): `this`

Defined in: [v2/route.ts:196](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L196)

Set the child binding mode for the error boundary

If not set, the default is 'append'. Last call wins if multiple calls are made.

#### Parameters

##### mode

`"replace"` \| `"append"` \| `"prepend"`

Child binding mode for the error boundary

#### Returns

`this`

this

#### Inherited from

[`BoundaryRouteBuilder`](BoundaryRouteBuilder.md).[`withErrorMode`](BoundaryRouteBuilder.md#witherrormode)
