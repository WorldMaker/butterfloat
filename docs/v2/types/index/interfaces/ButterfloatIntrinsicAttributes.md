[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

Defined in: [v2/component.ts:94](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L94)

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

\[`key`: `string`\]: `unknown`

## Properties

### bind?

> `optional` **bind**: `Bind` & [`DelayBind`](DelayBind.md)

Defined in: [v2/component.ts:104](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L104)

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

---

### childrenBind?

> `optional` **childrenBind**: [`ChildrenBind`](../type-aliases/ChildrenBind.md)

Defined in: [v2/component.ts:49](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L49)

Bind children as they are observed.

#### Inherited from

`ButterfloatAttributes.childrenBind`

---

### childrenBindMode?

> `optional` **childrenBindMode**: [`ChildrenBindMode`](../type-aliases/ChildrenBindMode.md)

Defined in: [v2/component.ts:53](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L53)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

`ButterfloatAttributes.childrenBindMode`

---

### classBind?

> `optional` **classBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [v2/component.ts:124](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L124)

Bind a boolean observable to the appearance of a class in classList.

---

### events?

> `optional` **events**: `Events`

Defined in: [v2/component.ts:112](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L112)

Bind an event observable to a DOM event.

---

### immediateBind?

> `optional` **immediateBind**: `Bind`

Defined in: [v2/component.ts:108](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L108)

Immediately bind an observable to a DOM property

---

### immediateClassBind?

> `optional` **immediateClassBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [v2/component.ts:128](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L128)

Immediately bind a boolean observable to the appearance of a class in classList.

---

### immediateStyleBind?

> `optional` **immediateStyleBind**: `Style`

Defined in: [v2/component.ts:120](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L120)

Immediately bind an observable to a style property.

---

### styleBind?

> `optional` **styleBind**: `Style`

Defined in: [v2/component.ts:116](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/component.ts#L116)

Bind an observable to a style property.
