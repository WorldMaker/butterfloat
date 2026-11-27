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

Defined in: [v2/route.ts:479](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L479)

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

Children binding mode, defaults to 'append'

## Returns

[`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Route builder
