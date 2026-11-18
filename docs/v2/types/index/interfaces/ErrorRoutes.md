---
title: ErrorRoutes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / ErrorRoutes

# Interface: ErrorRoutes

Defined in: [v2/route.ts:99](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/route.ts#L99)

Error Routes

A set of routes that can be used to bind a component's children to an error boundary.

## Properties

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:103](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/route.ts#L103)

The mode to bind the error component to the parent component's children.

***

### routes

> **routes**: [`ErrorRoute`](../type-aliases/ErrorRoute.md)\<`any`\>[]

Defined in: [v2/route.ts:107](https://github.com/WorldMaker/butterfloat/blob/5e8c149e07de151f629442b1866646cbb6758cbc/v2/route.ts#L107)

The routes for handling errors.
