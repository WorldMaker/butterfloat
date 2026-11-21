---
title: StampWhenComponent
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / StampWhenComponent

# Interface: StampWhenComponent\<Props\>

Defined in: [v2/stamp.ts:23](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/stamp.ts#L23)

Simple, stable component with attached condition for stamp reuse.

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### bookProps?

> `optional` **bookProps?**: `Props`

Defined in: [v2/stamp.ts:37](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/stamp.ts#L37)

JSON serializable "canonical" representation of this stamp when booked.

***

### condition

> **condition**: (`props`) => `boolean`

Defined in: [v2/stamp.ts:29](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/stamp.ts#L29)

Condition to determine if the stamp matches for this component.

#### Parameters

##### props

`Props`

Props of the component to determine if the stamp matches.

#### Returns

`boolean`

True if the stamp matches, false otherwise.

***

### options?

> `optional` **options?**: [`StampOptions`](StampOptions.md)

Defined in: [v2/stamp.ts:41](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/stamp.ts#L41)

Options used for stamping this component.

***

### ring

> **ring**: [`Ring`](../type-aliases/Ring.md)

Defined in: [v2/stamp.ts:33](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/stamp.ts#L33)

Ring output of the component.
