[**butterfloat**](../README.md)

***

[butterfloat](../globals.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

Defined in: [component.ts:119](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L119)

JSX attributes for "intrinics" (elements) supported by Butterfloat

## Extends

- [`ButterfloatAttributes`](../type-aliases/ButterfloatAttributes.md)

## Type Parameters

### Bind

`Bind` = [`DefaultBind`](../type-aliases/DefaultBind.md)

### Events

`Events` = [`DefaultEvents`](../type-aliases/DefaultEvents.md) & [`ButterfloatEvents`](ButterfloatEvents.md)

### Style

`Style` = [`DefaultStyleBind`](../type-aliases/DefaultStyleBind.md)

## Indexable

\[`key`: `string`\]: `unknown`

## Properties

### bind?

> `optional` **bind**: `Bind` & [`DelayBind`](DelayBind.md)

Defined in: [component.ts:129](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L129)

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

***

### childrenBind?

> `optional` **childrenBind**: [`ChildrenBind`](../type-aliases/ChildrenBind.md)

Defined in: [component.ts:74](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L74)

Bind children as they are observed.

#### Inherited from

`ButterfloatAttributes.childrenBind`

***

### childrenBindMode?

> `optional` **childrenBindMode**: [`ChildrenBindMode`](../type-aliases/ChildrenBindMode.md)

Defined in: [component.ts:78](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L78)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

`ButterfloatAttributes.childrenBindMode`

***

### classBind?

> `optional` **classBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [component.ts:149](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L149)

Bind a boolean observable to the appearance of a class in classList.

***

### events?

> `optional` **events**: `Events`

Defined in: [component.ts:137](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L137)

Bind an event observable to a DOM event.

***

### immediateBind?

> `optional` **immediateBind**: `Bind`

Defined in: [component.ts:133](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L133)

Immediately bind an observable to a DOM property

***

### immediateClassBind?

> `optional` **immediateClassBind**: [`ClassBind`](../type-aliases/ClassBind.md)

Defined in: [component.ts:153](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L153)

Immediately bind a boolean observable to the appearance of a class in classList.

***

### immediateStyleBind?

> `optional` **immediateStyleBind**: `Style`

Defined in: [component.ts:145](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L145)

Immediately bind an observable to a style property.

***

### styleBind?

> `optional` **styleBind**: `Style`

Defined in: [component.ts:141](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/component.ts#L141)

Bind an observable to a style property.
