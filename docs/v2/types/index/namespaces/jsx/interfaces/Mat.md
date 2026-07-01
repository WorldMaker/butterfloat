[**butterfloat**](../../../../butterfloat.md)

***

[butterfloat](../../../../butterfloat.md) / [index](../../../butterfloat.md) / [jsx](../butterfloat.md) / Mat

# Interface: Mat\<Events\>

Defined in: [v2/mat.ts:36](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L36)

Context provider for a Butterfloat Component

## Type Parameters

### Events

`Events` = `unknown`

## Properties

### bindEffect

> **bindEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:52](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L52)

Bind an effect.

***

### bindImmediateEffect

> **bindImmediateEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:56](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L56)

Bind an effect that should run without scheduled delays.

***

### bindRemoval()

> **bindRemoval**: (`observable`) => `void`

Defined in: [v2/mat.ts:62](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L62)

Bind a removal effect.

The component is removed when the observable completes.

#### Parameters

##### observable

`Observable`\<`unknown`\>

#### Returns

`void`

***

### events

> **events**: `Events`

Defined in: [v2/mat.ts:48](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L48)

Events that the component expects to bind.

***

### jsx

> **jsx**: [`JsxFunction`](../../../type-aliases/JsxFunction.md)

Defined in: [v2/mat.ts:66](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L66)

JSX function to build appropriate Rings for this Mat

***

### stamp()

> **stamp**: () => `void`

Defined in: [v2/mat.ts:71](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L71)

Mark the component as stable output regardless of props.

#### Returns

`void`

nothing

***

### stampWhen()

> **stampWhen**: \<`Props`\>(`condition`, `jsonProps?`) => `void`

Defined in: [v2/mat.ts:78](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/mat.ts#L78)

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
