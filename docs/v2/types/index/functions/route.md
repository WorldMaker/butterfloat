---
title: route
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / route

# Function: route()

> **route**\<`Inputs`\>(`input`, `mode?`): [`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Defined in: [v2/route.ts:429](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/route.ts#L429)

Route an Observable to child components

This creates a child binding route map that can be used for building
stamp-aware component trees.

## Type Parameters

### Inputs

`Inputs` = `unknown`

## Parameters

### input

`Observable`\<`Inputs`\>

Observable to route to child components

### mode?

`"replace"` \| `"append"` \| `"prepend"` = `'append'`

Children binding mode

## Returns

[`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Route builder
