---
title: ChildRouteBuilder
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / ChildRouteBuilder

# Class: ChildRouteBuilder\<Inputs\>

Defined in: [v2/route.ts:344](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L344)

Fluent, mutable builder for child routes

Shortcut: `route(input, mode)`

## Extends

- [`SuspendRouteBuilder`](SuspendRouteBuilder.md)

## Type Parameters

### Inputs

`Inputs` = `unknown`

## Constructors

### Constructor

> **new ChildRouteBuilder**\<`Inputs`\>(`input?`, `mode?`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:350](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L350)

#### Parameters

##### input?

`Observable`\<`Inputs`\>

##### mode?

`"replace"` \| `"append"` \| `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

#### Overrides

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`constructor`](SuspendRouteBuilder.md#constructor)

## Methods

### build()

> **build**(): [`ChildRoutes`](../interfaces/ChildRoutes.md)

Defined in: [v2/route.ts:421](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L421)

Build the child routes

#### Returns

[`ChildRoutes`](../interfaces/ChildRoutes.md)

Child routes for childrenBind

#### Overrides

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`build`](SuspendRouteBuilder.md#build)

***

### fixedWhen()

> **fixedWhen**\<`Props`\>(`when`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:407](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L407)

Add a child route that may be a fixed output

#### Type Parameters

##### Props

`Props`

#### Parameters

##### when

(`inputs`) => `false` \| `Props`

Function to map inputs to a set of props for the child component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when the route matches

##### bookProps?

`Props` \| `Props`[]

Optional JSON serializable props for the child component's stamp variant

#### Returns

`this`

this

***

### onComplete()

> **onComplete**(`component`, `mode?`): `this`

Defined in: [v2/route.ts:225](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L225)

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

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`onComplete`](SuspendRouteBuilder.md#oncomplete)

***

### onError()

> **onError**\<`Props`\>(`map`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:208](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L208)

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

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`onError`](SuspendRouteBuilder.md#onerror)

***

### suspend()

> **suspend**(`suspend`, `mode?`): `this`

Defined in: [v2/route.ts:290](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L290)

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

#### Inherited from

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`suspend`](SuspendRouteBuilder.md#suspend)

***

### when()

> **when**\<`Props`\>(`when`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:391](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L391)

Add a child route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### when

(`inputs`) => `false` \| `Props`

Function to map inputs to a set of props for the child component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when the route matches

##### bookProps?

`Props` \| `Props`[]

Optional JSON serializable props for the child component's stamp variant

#### Returns

`this`

this

***

### whenSuspended()

> **whenSuspended**\<`Props`\>(`map`, `component`, `bookProps?`): `this`

Defined in: [v2/route.ts:306](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L306)

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

#### Inherited from

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`whenSuspended`](SuspendRouteBuilder.md#whensuspended)

***

### withErrorMode()

> **withErrorMode**(`mode`): `this`

Defined in: [v2/route.ts:196](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L196)

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

[`SuspendRouteBuilder`](SuspendRouteBuilder.md).[`withErrorMode`](SuspendRouteBuilder.md#witherrormode)

***

### withInput()

> **withInput**\<`T`\>(`input`): `ChildRouteBuilder`\<`T`\>

Defined in: [v2/route.ts:367](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L367)

Set the input observable for the routes

It's preferable to set the input observable in the constructor, but this method can be used to set it
after construction. Overrides any previously set input observable.

#### Type Parameters

##### T

`T`

#### Parameters

##### input

`Observable`\<`T`\>

Observable to route to child components

#### Returns

`ChildRouteBuilder`\<`T`\>

this but type adjusted to the new input type

***

### withMode()

> **withMode**(`mode`): `this`

Defined in: [v2/route.ts:379](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L379)

Set the child binding mode for the routes

If not set, the default is 'append'. Last call wins if multiple calls are made.

#### Parameters

##### mode

`"replace"` \| `"append"` \| `"prepend"`

Child binding mode for the routes

#### Returns

`this`

this
