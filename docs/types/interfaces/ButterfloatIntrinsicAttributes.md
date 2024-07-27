[butterfloat](../README.md) / [Exports](../modules.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Bind` | [`DefaultBind`](../modules.md#defaultbind) |
| `Events` | [`DefaultEvents`](../modules.md#defaultevents) & [`ButterfloatEvents`](ButterfloatEvents.md) |
| `Style` | [`DefaultStyleBind`](../modules.md#defaultstylebind) |

## Hierarchy

- [`ButterfloatAttributes`](../modules.md#butterfloatattributes)

  ↳ **`ButterfloatIntrinsicAttributes`**

## Table of contents

### Properties

- [bind](ButterfloatIntrinsicAttributes.md#bind)
- [childrenBind](ButterfloatIntrinsicAttributes.md#childrenbind)
- [childrenBindMode](ButterfloatIntrinsicAttributes.md#childrenbindmode)
- [classBind](ButterfloatIntrinsicAttributes.md#classbind)
- [events](ButterfloatIntrinsicAttributes.md#events)
- [immediateBind](ButterfloatIntrinsicAttributes.md#immediatebind)
- [immediateClassBind](ButterfloatIntrinsicAttributes.md#immediateclassbind)
- [immediateStyleBind](ButterfloatIntrinsicAttributes.md#immediatestylebind)
- [styleBind](ButterfloatIntrinsicAttributes.md#stylebind)

## Properties

### bind

• `Optional` **bind**: `Bind` & [`DelayBind`](DelayBind.md)

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

#### Defined in

[component.ts:84](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L84)

___

### childrenBind

• `Optional` **childrenBind**: [`ChildrenBind`](../modules.md#childrenbind)

Bind children as they are observed.

#### Inherited from

ButterfloatAttributes.childrenBind

#### Defined in

[component.ts:47](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L47)

___

### childrenBindMode

• `Optional` **childrenBindMode**: [`ChildrenBindMode`](../modules.md#childrenbindmode)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

ButterfloatAttributes.childrenBindMode

#### Defined in

[component.ts:51](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L51)

___

### classBind

• `Optional` **classBind**: [`ClassBind`](../modules.md#classbind)

Bind a boolean observable to the appearance of a class in classList.

#### Defined in

[component.ts:104](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L104)

___

### events

• `Optional` **events**: `Events`

Bind an event observable to a DOM event.

#### Defined in

[component.ts:92](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L92)

___

### immediateBind

• `Optional` **immediateBind**: `Bind`

Immediately bind an observable to a DOM property

#### Defined in

[component.ts:88](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L88)

___

### immediateClassBind

• `Optional` **immediateClassBind**: [`ClassBind`](../modules.md#classbind)

Immediately bind a boolean observable to the appearance of a class in classList.

#### Defined in

[component.ts:108](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L108)

___

### immediateStyleBind

• `Optional` **immediateStyleBind**: `Style`

Immediately bind an observable to a style property.

#### Defined in

[component.ts:100](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L100)

___

### styleBind

• `Optional` **styleBind**: `Style`

Bind an observable to a style property.

#### Defined in

[component.ts:96](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L96)
