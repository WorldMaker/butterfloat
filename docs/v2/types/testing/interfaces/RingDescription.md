[**butterfloat**](../../butterfloat.md)

***

[butterfloat](../../butterfloat.md) / [testing](../butterfloat.md) / RingDescription

# Interface: RingDescription\<Props\>

Defined in: [v2/testing/mat.ts:99](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L99)

A Component Context for Testing purposes

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### description

> **description**: `string` \| [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [v2/testing/mat.ts:103](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L103)

The description of the Ring output of the Component

***

### effects

> **effects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:109](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L109)

The effects that were bound during the Component's execution

***

### immediateEffects

> **immediateEffects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:114](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L114)

The immediate effects that were bound during the Component's execution

***

### isStamp

> **isStamp**: `boolean`

Defined in: [v2/testing/mat.ts:122](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L122)

Whether the Component was marked as a stamp

***

### removal

> **removal**: `null` \| `Observable`\<`unknown`\>

Defined in: [v2/testing/mat.ts:118](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L118)

The removal effect that was bound during the Component's execution

***

### stampCondition

> **stampCondition**: `null` \| (`props`) => `boolean`

Defined in: [v2/testing/mat.ts:126](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L126)

The condition used to determine if the Component should be stamped

***

### stampJsonProps

> **stampJsonProps**: `null` \| `Props`

Defined in: [v2/testing/mat.ts:130](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/testing/mat.ts#L130)

The JSON serializable "canonical" props provided for the stamp
