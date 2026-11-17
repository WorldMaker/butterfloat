---
title: jsx
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / jsx

# Function: jsx()

> **jsx**(`element`, `attributes`, ...`children`): [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [jsx.ts:269](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/jsx.ts#L269)

Describe a node. Builder for JSX and TSX transformation.

## Parameters

### element

`string` \| [`Component`](../type-aliases/Component.md)

An element to build

### attributes

`null` \| [`ButterfloatAttributes`](../type-aliases/ButterfloatAttributes.md)

Attributes

### children

...[`JsxChildren`](../type-aliases/JsxChildren.md)

Children

## Returns

[`NodeDescription`](../type-aliases/NodeDescription.md)

Node description
