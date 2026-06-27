[**butterfloat**](../../../../butterfloat.md)

---

[butterfloat](../../../../butterfloat.md) / [index](../../../butterfloat.md) / [jsx](../butterfloat.md) / Mat

# Interface: Mat\<Events, Props\>

Defined in: [v2/mat.ts:26](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L26)

## Type Parameters

### Events

`Events` = `unknown`

### Props

`Props` = `unknown`

## Properties

### bindEffect

> **bindEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:42](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L42)

Bind an effect.

---

### bindImmediateEffect

> **bindImmediateEffect**: [`EffectHandler`](../../../type-aliases/EffectHandler.md)

Defined in: [v2/mat.ts:46](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L46)

Bind an effect that should run without scheduled delays.

---

### events

> **events**: `Events`

Defined in: [v2/mat.ts:38](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L38)

Events that the component expects to bind.

---

### jsx

> **jsx**: [`JsxFunction`](../../../type-aliases/JsxFunction.md)

Defined in: [v2/mat.ts:50](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L50)

JSX function to build appropriate Rings for this Mat

---

### stamp()

> **stamp**: () => `void`

Defined in: [v2/mat.ts:55](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L55)

Mark the component as stable output regardless of props.

#### Returns

`void`

nothing

---

### stampWhen()

> **stampWhen**: (`condition`) => `void`

Defined in: [v2/mat.ts:61](https://github.com/WorldMaker/butterfloat/blob/e395bf5abc01402ffb704b905f50e95cd22ec31c/v2/mat.ts#L61)

Mark the component as stable output when a condition is met.

#### Parameters

##### condition

(`props`) => `boolean`

A function that receives the component props and returns whether the stamp matches.

#### Returns

`void`

nothing
