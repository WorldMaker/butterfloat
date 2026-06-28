[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

Defined in: [v2/component.ts:93](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L93)

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

Defined in: [v2/component.ts:103](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L103)

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

---

### childrenBind?

> `optional` **childrenBind**: [`ChildrenBind`](../type-aliases/ChildrenBind.md)

Defined in: [v2/component.ts:48](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L48)

Bind children as they are observed.

#### Inherited from

`ButterfloatAttributes.childrenBind`

---

### childrenBindMode?

> `optional` **childrenBindMode**: [`ChildrenBindMode`](../type-aliases/ChildrenBindMode.md)

Defined in: [v2/component.ts:52](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L52)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

`ButterfloatAttributes.childrenBindMode`

---

### classBind?

> `optional` **classBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [v2/component.ts:123](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L123)

Bind a boolean observable to the appearance of a class in classList.

---

### events?

> `optional` **events**: `Events`

Defined in: [v2/component.ts:111](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L111)

Bind an event observable to a DOM event.

---

### immediateBind?

> `optional` **immediateBind**: `Bind`

Defined in: [v2/component.ts:107](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L107)

Immediately bind an observable to a DOM property

---

### immediateClassBind?

> `optional` **immediateClassBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [v2/component.ts:127](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L127)

Immediately bind a boolean observable to the appearance of a class in classList.

---

### immediateStyleBind?

> `optional` **immediateStyleBind**: `Style`

Defined in: [v2/component.ts:119](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L119)

Immediately bind an observable to a style property.

---

### styleBind?

> `optional` **styleBind**: `Style`

Defined in: [v2/component.ts:115](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L115)

Bind an observable to a style property.
