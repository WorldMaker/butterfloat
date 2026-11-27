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

Defined in: [v2/testing/mat.ts:135](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L135)

A Component Context for Testing purposes

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### defaultXmlns

> **defaultXmlns**: `null` \| `string`

Defined in: [v2/testing/mat.ts:174](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L174)

The default XML namespace registered for the Component

***

### description

> **description**: `string` \| [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [v2/testing/mat.ts:139](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L139)

The description of the Ring output of the Component

***

### effects

> **effects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:145](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L145)

The effects that were bound during the Component's execution

***

### immediateEffects

> **immediateEffects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:150](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L150)

The immediate effects that were bound during the Component's execution

***

### isStamp

> **isStamp**: `boolean`

Defined in: [v2/testing/mat.ts:158](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L158)

Whether the Component was marked as a stamp

***

### removal

> **removal**: `null` \| `Observable`\<`unknown`\>

Defined in: [v2/testing/mat.ts:154](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L154)

The removal effect that was bound during the Component's execution

***

### stampBookProps

> **stampBookProps**: `null` \| `Props`

Defined in: [v2/testing/mat.ts:166](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L166)

The JSON serializable "canonical" props provided for the stamp

***

### stampCondition

> **stampCondition**: `null` \| ((`props`) => `boolean`)

Defined in: [v2/testing/mat.ts:162](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L162)

The condition used to determine if the Component should be stamped

***

### stampOptions

> **stampOptions**: `null` \| [`StampOptions`](../../index/interfaces/StampOptions.md)

Defined in: [v2/testing/mat.ts:170](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L170)

The options used for stamping this component

***

### xmlns

> **xmlns**: `Record`\<`string`, `string`\>

Defined in: [v2/testing/mat.ts:178](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/testing/mat.ts#L178)

The XML namespaces registered for the Component
