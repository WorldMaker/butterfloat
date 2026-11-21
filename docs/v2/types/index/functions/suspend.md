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

Defined in: [v2/route.ts:463](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L463)

Build a new suspension boundary

This creates a route map for handling suspension states in
stamp-aware component trees.

## Parameters

### suspend

`Observable`\<`boolean`\>

### mode?

`"replace"` \| `"swap"` \| `"append"` \| `"prepend"` = `'append'`

## Returns

[`SuspendRouteBuilder`](../classes/SuspendRouteBuilder.md)

Route builder
