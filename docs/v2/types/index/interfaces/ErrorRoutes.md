---
title: ErrorRoutes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ErrorRoutes

# Interface: ErrorRoutes

Defined in: [v2/route.ts:114](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L114)

Error Routes

A set of routes that can be used to bind a component's children to an error boundary.

## Properties

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:118](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L118)

The mode to bind the error component to the parent component's children.

---

### routes

> **routes**: [`ErrorRoute`](../type-aliases/ErrorRoute.md)\<`any`\>[]

Defined in: [v2/route.ts:122](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L122)

The routes for handling errors.
