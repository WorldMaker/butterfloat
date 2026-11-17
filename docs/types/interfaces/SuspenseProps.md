---
title: SuspenseProps
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / SuspenseProps

# Interface: SuspenseProps

Defined in: [suspense.ts:14](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/suspense.ts#L14)

Properties supported by the `<Suspense>` pseudo-component

## Properties

### suspenseView?

> `optional` **suspenseView?**: [`Component`](../type-aliases/Component.md)

Defined in: [suspense.ts:22](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/suspense.ts#L22)

Show an optional component instead when suspended.

***

### when

> **when**: `Observable`\<`boolean`\>

Defined in: [suspense.ts:18](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/suspense.ts#L18)

Suspend children bindings when true.
