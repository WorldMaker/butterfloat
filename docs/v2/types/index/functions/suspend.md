---
title: suspend
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / suspend

# Function: suspend()

> **suspend**(`suspend`, `mode?`): [`SuspendRouteBuilder`](../classes/SuspendRouteBuilder.md)

Defined in: [v2/route.ts:413](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/route.ts#L413)

Build a new suspension boundary

This creates a route map for handling suspension states in
stamp-aware component trees.

## Parameters

### suspend

`Observable`\<`boolean`\>

### mode?

`"replace"` \| `"append"` \| `"prepend"` = `'append'`

## Returns

[`SuspendRouteBuilder`](../classes/SuspendRouteBuilder.md)

Route builder
