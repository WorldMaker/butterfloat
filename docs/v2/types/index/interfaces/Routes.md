---
title: Routes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / Routes

# Interface: Routes\<Inputs\>

Defined in: [v2/route.ts:36](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L36)

Routes

A set of routes that can be used to bind a component's children to an observable input.

## Type Parameters

### Inputs

`Inputs` = `any`

## Properties

### fixed?

> `optional` **fixed?**: `boolean`

Defined in: [v2/route.ts:40](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L40)

Whether any of the routes are fixed.

---

### input

> **input**: `Observable`\<`Inputs`\>

Defined in: [v2/route.ts:44](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L44)

Observable that produces inputs to route to child components

---

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:48](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L48)

The mode to bind the child components to the parent component's children.

---

### routes

> **routes**: [`Route`](../type-aliases/Route.md)\<`Inputs`, `any`\>[]

Defined in: [v2/route.ts:52](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L52)

The routes for handling the inputs.
