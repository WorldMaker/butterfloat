---
title: ButterfloatIntrinsicAttributes
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

Defined in: [v2/component.ts:80](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L80)

JSX attributes for "intrinics" (elements) supported by Butterfloat

## Extends

- [`ButterfloatAttributes`](../type-aliases/ButterfloatAttributes.md)

## Type Parameters

### Bind

`Bind` = [`DefaultBind`](../type-aliases/DefaultBind.md)

### Events

`Events` = [`DefaultEvents`](../../testing/type-aliases/DefaultEvents.md) & [`ButterfloatEvents`](ButterfloatEvents.md)

### Style

`Style` = [`DefaultStyleBind`](../type-aliases/DefaultStyleBind.md)

## Indexable

> \[`key`: `string`\]: `unknown`

## Properties

### bind?

> `optional` **bind?**: `Bind`

Defined in: [v2/component.ts:90](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L90)

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

---

### childrenBind?

> `optional` **childrenBind?**: [`ChildrenBind`](../type-aliases/ChildrenBind.md)

Defined in: [v2/component.ts:50](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L50)

Bind children as they are observed.

#### Inherited from

`ButterfloatAttributes.childrenBind`

---

### childrenBindMode?

> `optional` **childrenBindMode?**: [`ChildrenBindMode`](../type-aliases/ChildrenBindMode.md)

Defined in: [v2/component.ts:54](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L54)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

`ButterfloatAttributes.childrenBindMode`

---

### classBind?

> `optional` **classBind?**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [v2/component.ts:102](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L102)

Bind a boolean observable to the appearance of a class in classList.

---

### events?

> `optional` **events?**: `Events`

Defined in: [v2/component.ts:94](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L94)

Bind an event observable to a DOM event.

---

### styleBind?

> `optional` **styleBind?**: `Style`

Defined in: [v2/component.ts:98](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/component.ts#L98)

Bind an observable to a style property.
