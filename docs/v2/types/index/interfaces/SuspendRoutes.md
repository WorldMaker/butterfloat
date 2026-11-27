---
title: SuspendRoutes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / SuspendRoutes

# Interface: SuspendRoutes

Defined in: [v2/route.ts:77](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L77)

Suspend Routes

A set of routes that can be used to bind a component's children to a suspension boundary.

## Properties

### mode

> **mode**: `"replace"` \| `"swap"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:85](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L85)

The mode to bind the suspension component to the parent component's children.

---

### routes

> **routes**: [`SuspendRoute`](../type-aliases/SuspendRoute.md)\<`any`\>[]

Defined in: [v2/route.ts:89](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L89)

The routes for handling suspension states.

---

### suspend

> **suspend**: `Observable`\<`boolean`\>

Defined in: [v2/route.ts:81](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L81)

Observable that determines if the suspension boundary is active
