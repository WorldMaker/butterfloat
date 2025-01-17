[butterfloat](../README.md) / [Exports](../modules.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events, Style\>

JSX attributes for "intrinics" (elements) supported by Butterfloat

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

[component.ts:129](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L129)

___

### childrenBind

• `Optional` **childrenBind**: [`ChildrenBind`](../modules.md#childrenbind)

Bind children as they are observed.

#### Inherited from

ButterfloatAttributes.childrenBind

#### Defined in

[component.ts:74](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L74)

___

### childrenBindMode

• `Optional` **childrenBindMode**: [`ChildrenBindMode`](../modules.md#childrenbindmode)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

ButterfloatAttributes.childrenBindMode

#### Defined in

[component.ts:78](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L78)

___

### classBind

• `Optional` **classBind**: [`ClassBind`](../modules.md#classbind)

Bind a boolean observable to the appearance of a class in classList.

#### Defined in

[component.ts:149](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L149)

___

### events

• `Optional` **events**: `Events`

Bind an event observable to a DOM event.

#### Defined in

[component.ts:137](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L137)

___

### immediateBind

• `Optional` **immediateBind**: `Bind`

Immediately bind an observable to a DOM property

#### Defined in

[component.ts:133](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L133)

___

### immediateClassBind

• `Optional` **immediateClassBind**: [`ClassBind`](../modules.md#classbind)

Immediately bind a boolean observable to the appearance of a class in classList.

#### Defined in

[component.ts:153](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L153)

___

### immediateStyleBind

• `Optional` **immediateStyleBind**: `Style`

Immediately bind an observable to a style property.

#### Defined in

[component.ts:145](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L145)

___

### styleBind

• `Optional` **styleBind**: `Style`

Bind an observable to a style property.

#### Defined in

[component.ts:141](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L141)
