[**butterfloat**](../../../../butterfloat.md)

---

[butterfloat](../../../../butterfloat.md) / [index](../../../butterfloat.md) / [jsx](../butterfloat.md) / Mat

# Interface: Mat\<Events\>

Defined in: [v2/mat.ts:36](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L36)

Context provider for a Butterfloat Component

## Type Parameters

### Events

`Events` = `unknown`

## Properties

### bindEffect

> **bindEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:52](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L52)

Bind an effect.

---

### bindImmediateEffect

> **bindImmediateEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:56](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L56)

Bind an effect that should run without scheduled delays.

---

### events

> **events**: `Events`

Defined in: [v2/mat.ts:48](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L48)

Events that the component expects to bind.

---

### jsx

> **jsx**: [`JsxFunction`](../../../type-aliases/JsxFunction.md)

Defined in: [v2/mat.ts:60](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L60)

JSX function to build appropriate Rings for this Mat

---

### stamp()

> **stamp**: () => `void`

Defined in: [v2/mat.ts:65](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L65)

Mark the component as stable output regardless of props.

#### Returns

`void`

nothing

---

### stampWhen()

> **stampWhen**: \<`Props`\>(`condition`, `jsonProps?`) => `void`

Defined in: [v2/mat.ts:72](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/mat.ts#L72)

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
