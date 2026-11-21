---
title: Mat
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / Mat

# Interface: Mat\<Events\>

Defined in: [v2/mat.ts:48](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L48)

Context provider for a Butterfloat Component

## Type Parameters

### Events

`Events` = `unknown`

## Properties

### bindEffect

> **bindEffect**: [`EffectHandler`](../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:78](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L78)

Bind an effect.

***

### bindImmediateEffect

> **bindImmediateEffect**: [`EffectHandler`](../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:82](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L82)

Bind an effect that should run without scheduled delays.

***

### bindRemoval

> **bindRemoval**: (`observable`) => `void`

Defined in: [v2/mat.ts:88](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L88)

Bind a removal effect.

The component is removed when the observable completes.

#### Parameters

##### observable

`Observable`\<`unknown`\>

#### Returns

`void`

***

### defaultXmlns

> `readonly` **defaultXmlns**: `null` \| `string`

Defined in: [v2/mat.ts:103](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L103)

Registered default namespace for the component.

***

### events

> **events**: `Events`

Defined in: [v2/mat.ts:74](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L74)

Events that the component expects to bind.

***

### jsx

> **jsx**: [`JsxFunction`](../type-aliases/JsxFunction.md)

Defined in: [v2/mat.ts:92](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L92)

JSX function to build appropriate Rings for this Mat

***

### mapXmlns

> **mapXmlns**: (`xmlns`, `defaultXmlns?`) => `void`

Defined in: [v2/mat.ts:99](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L99)

Register a map of XML namespaces for the component.

#### Parameters

##### xmlns

`Record`\<`string`, `string`\>

Map of namespaces for the component

##### defaultXmlns?

`string`

Default namespace for the component

#### Returns

`void`

nothing

***

### stamp

> **stamp**: (`options?`) => `void`

Defined in: [v2/mat.ts:112](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L112)

Mark the component as stable output regardless of props.

#### Parameters

##### options?

[`StampOptions`](StampOptions.md)

#### Returns

`void`

nothing

***

### stampWhen

> **stampWhen**: \<`Props`\>(`condition`, `bookProps?`, `options?`) => `void`

Defined in: [v2/mat.ts:119](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L119)

Mark the component as stable output when a condition is met.

#### Type Parameters

##### Props

`Props` = `unknown`

#### Parameters

##### condition

(`props`) => `boolean`

A function that receives the component props and returns whether the stamp matches.

##### bookProps?

`Props`

Optional JSON serializable "canonical" representation of this stamp when booked.

##### options?

[`StampOptions`](StampOptions.md)

#### Returns

`void`

nothing

***

### xmlns

> `readonly` **xmlns**: `Record`\<`string`, `string`\>

Defined in: [v2/mat.ts:107](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/mat.ts#L107)

Registered XML namespaces for the component.
