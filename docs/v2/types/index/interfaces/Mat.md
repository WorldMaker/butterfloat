---
title: Mat
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / Mat

# Interface: Mat\<Events\>

Defined in: [v2/mat.ts:38](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L38)

Context provider for a Butterfloat Component

## Type Parameters

### Events

`Events` = `unknown`

## Properties

### bindEffect

> **bindEffect**: [`EffectHandler`](../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:68](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L68)

Bind an effect.

---

### bindImmediateEffect

> **bindImmediateEffect**: [`EffectHandler`](../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:72](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L72)

Bind an effect that should run without scheduled delays.

---

### bindRemoval

> **bindRemoval**: (`observable`) => `void`

Defined in: [v2/mat.ts:78](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L78)

Bind a removal effect.

The component is removed when the observable completes.

#### Parameters

##### observable

`Observable`\<`unknown`\>

#### Returns

`void`

---

### defaultXmlns

> `readonly` **defaultXmlns**: `null` \| `string`

Defined in: [v2/mat.ts:93](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L93)

Registered default namespace for the component.

---

### events

> **events**: `Events`

Defined in: [v2/mat.ts:64](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L64)

Events that the component expects to bind.

---

### jsx

> **jsx**: [`JsxFunction`](../type-aliases/JsxFunction.md)

Defined in: [v2/mat.ts:82](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L82)

JSX function to build appropriate Rings for this Mat

---

### mapXmlns

> **mapXmlns**: (`xmlns`, `defaultXmlns?`) => `void`

Defined in: [v2/mat.ts:89](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L89)

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

---

### stamp

> **stamp**: () => `void`

Defined in: [v2/mat.ts:102](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L102)

Mark the component as stable output regardless of props.

#### Returns

`void`

nothing

---

### stampWhen

> **stampWhen**: \<`Props`\>(`condition`, `jsonProps?`) => `void`

Defined in: [v2/mat.ts:109](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L109)

Mark the component as stable output when a condition is met.

#### Type Parameters

##### Props

`Props` = `unknown`

#### Parameters

##### condition

(`props`) => `boolean`

A function that receives the component props and returns whether the stamp matches.

##### jsonProps?

`Props`

Optional JSON serializable "canonical" representation of relevant props to this stamp.

#### Returns

`void`

nothing

---

### xmlns

> `readonly` **xmlns**: `Record`\<`string`, `string`\>

Defined in: [v2/mat.ts:97](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/mat.ts#L97)

Registered XML namespaces for the component.
