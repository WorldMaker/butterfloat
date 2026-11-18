---
title: RingDescription
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [testing](../index.md) / RingDescription

# Interface: RingDescription\<Props\>

Defined in: [v2/testing/mat.ts:127](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L127)

A Component Context for Testing purposes

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### defaultXmlns

> **defaultXmlns**: `null` \| `string`

Defined in: [v2/testing/mat.ts:162](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L162)

The default XML namespace registered for the Component

***

### description

> **description**: `string` \| [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [v2/testing/mat.ts:131](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L131)

The description of the Ring output of the Component

***

### effects

> **effects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:137](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L137)

The effects that were bound during the Component's execution

***

### immediateEffects

> **immediateEffects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:142](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L142)

The immediate effects that were bound during the Component's execution

***

### isStamp

> **isStamp**: `boolean`

Defined in: [v2/testing/mat.ts:150](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L150)

Whether the Component was marked as a stamp

***

### removal

> **removal**: `null` \| `Observable`\<`unknown`\>

Defined in: [v2/testing/mat.ts:146](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L146)

The removal effect that was bound during the Component's execution

***

### stampCondition

> **stampCondition**: `null` \| ((`props`) => `boolean`)

Defined in: [v2/testing/mat.ts:154](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L154)

The condition used to determine if the Component should be stamped

***

### stampJsonProps

> **stampJsonProps**: `null` \| `Props`

Defined in: [v2/testing/mat.ts:158](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L158)

The JSON serializable "canonical" props provided for the stamp

***

### xmlns

> **xmlns**: `Record`\<`string`, `string`\>

Defined in: [v2/testing/mat.ts:166](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/testing/mat.ts#L166)

The XML namespaces registered for the Component
