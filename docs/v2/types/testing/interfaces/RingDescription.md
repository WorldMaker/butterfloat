[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [testing](../butterfloat.md) / RingDescription

# Interface: RingDescription\<Props\>

Defined in: [v2/testing/mat.ts:88](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L88)

A Component Context for Testing purposes

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### description

> **description**: `string` \| [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [v2/testing/mat.ts:92](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L92)

The description of the Ring output of the Component

---

### effects

> **effects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:98](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L98)

The effects that were bound during the Component's execution

---

### immediateEffects

> **immediateEffects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:103](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L103)

The immediate effects that were bound during the Component's execution

---

### isStamp

> **isStamp**: `boolean`

Defined in: [v2/testing/mat.ts:107](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L107)

Whether the Component was marked as a stamp

---

### stampCondition

> **stampCondition**: `null` \| (`props`) => `boolean`

Defined in: [v2/testing/mat.ts:111](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L111)

The condition used to determine if the Component should be stamped

---

### stampJsonProps

> **stampJsonProps**: `null` \| `Props`

Defined in: [v2/testing/mat.ts:115](https://github.com/WorldMaker/butterfloat/blob/15273263d9620fccfeace6b38b7438b86253ac04/v2/testing/mat.ts#L115)

The JSON serializable "canonical" props provided for the stamp
