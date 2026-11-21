---
title: ChildRoutes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ChildRoutes

# Interface: ChildRoutes

Defined in: [v2/route.ts:146](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L146)

Child Routes

A collection of routes that can be used to bind child components to a parent component.

## Properties

### complete?

> `optional` **complete?**: [`CompleteRoutes`](CompleteRoutes.md)

Defined in: [v2/route.ts:162](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L162)

Routes for a completion boundary

---

### error?

> `optional` **error?**: [`ErrorRoutes`](ErrorRoutes.md)

Defined in: [v2/route.ts:158](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L158)

Routes for an error boundary

---

### onlyFixed?

> `optional` **onlyFixed?**: `boolean`

Defined in: [v2/route.ts:166](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L166)

Whether only a fixed (may complete) route is present

---

### routes?

> `optional` **routes?**: [`Routes`](Routes.md)\<`any`\>

Defined in: [v2/route.ts:150](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L150)

Routes for an observable input

---

### suspend?

> `optional` **suspend?**: [`SuspendRoutes`](SuspendRoutes.md)

Defined in: [v2/route.ts:154](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L154)

Routes for a suspension boundary
