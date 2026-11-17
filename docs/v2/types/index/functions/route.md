---
title: route
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / route

# Function: route()

> **route**\<`Inputs`\>(`input?`, `mode?`): [`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Defined in: [v2/route.ts:340](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/route.ts#L340)

Route an Observable to child components

This creates a child binding route map that can be used for building
stamp-aware component trees.

## Type Parameters

### Inputs

`Inputs` = `unknown`

## Parameters

### input?

`Observable`\<`Inputs`\>

Observable to route to child components

### mode?

`"replace"` \| `"append"` \| `"prepend"`

Children binding mode

## Returns

[`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Route builder
