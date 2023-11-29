[butterfloat](../README.md) / [Exports](../modules.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Bind` | [`DefaultBind`](../modules.md#defaultbind) |
| `Events` | [`DefaultEvents`](../modules.md#defaultevents) & [`ButterfloatEvents`](ButterfloatEvents.md) |

## Hierarchy

- [`ButterfloatAttributes`](../modules.md#butterfloatattributes)

  ↳ **`ButterfloatIntrinsicAttributes`**

## Table of contents

### Properties

- [bind](ButterfloatIntrinsicAttributes.md#bind)
- [childrenBind](ButterfloatIntrinsicAttributes.md#childrenbind)
- [childrenBindMode](ButterfloatIntrinsicAttributes.md#childrenbindmode)
- [events](ButterfloatIntrinsicAttributes.md#events)
- [immediateBind](ButterfloatIntrinsicAttributes.md#immediatebind)

## Properties

### bind

• `Optional` **bind**: `Bind`

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

#### Defined in

[component.ts:67](https://github.com/WorldMaker/butterfloat/blob/290ead7/component.ts#L67)

___

### childrenBind

• `Optional` **childrenBind**: [`ChildrenBind`](../modules.md#childrenbind)

Bind children as they are observed.

#### Inherited from

ButterfloatAttributes.childrenBind

#### Defined in

[component.ts:47](https://github.com/WorldMaker/butterfloat/blob/290ead7/component.ts#L47)

___

### childrenBindMode

• `Optional` **childrenBindMode**: [`ChildrenBindMode`](../modules.md#childrenbindmode)

Mode in which to bind children. Defaults to 'append'.

#### Inherited from

ButterfloatAttributes.childrenBindMode

#### Defined in

[component.ts:51](https://github.com/WorldMaker/butterfloat/blob/290ead7/component.ts#L51)

___

### events

• `Optional` **events**: `Events`

Bind an event observable to a DOM event.

#### Defined in

[component.ts:75](https://github.com/WorldMaker/butterfloat/blob/290ead7/component.ts#L75)

___

### immediateBind

• `Optional` **immediateBind**: `Bind`

Immediately bind an observable to a DOM property

#### Defined in

[component.ts:71](https://github.com/WorldMaker/butterfloat/blob/290ead7/component.ts#L71)
