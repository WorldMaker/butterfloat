[butterfloat](../README.md) / [Exports](../modules.md) / ButterfloatIntrinsicAttributes

# Interface: ButterfloatIntrinsicAttributes\<Bind, Events\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `Bind` | [`DefaultBind`](../modules.md#defaultbind) |
| `Events` | [`DefaultEvents`](../modules.md#defaultevents) & `ButterfloatEvents` |

## Hierarchy

- [`ButterfloatAttributes`](../modules.md#butterfloatattributes)

  ↳ **`ButterfloatIntrinsicAttributes`**

## Table of contents

### Properties

- [bind](ButterfloatIntrinsicAttributes.md#bind)
- [childrenBind](ButterfloatIntrinsicAttributes.md#childrenbind)
- [childrenPrepend](ButterfloatIntrinsicAttributes.md#childrenprepend)
- [events](ButterfloatIntrinsicAttributes.md#events)
- [immediateBind](ButterfloatIntrinsicAttributes.md#immediatebind)

## Properties

### bind

• `Optional` **bind**: `Bind`

Bind an observable to an DOM property.

May use an non-immediate scheduler. Obvious exception: all "value" bindings are immediate, given their role in user inputs.

#### Defined in

[component.ts:65](https://github.com/WorldMaker/butterfloat/blob/c1ff555/component.ts#L65)

___

### childrenBind

• `Optional` **childrenBind**: [`ChildrenBind`](../modules.md#childrenbind)

Bind children as they are observed.

#### Inherited from

ButterfloatAttributes.childrenBind

#### Defined in

[component.ts:45](https://github.com/WorldMaker/butterfloat/blob/c1ff555/component.ts#L45)

___

### childrenPrepend

• `Optional` **childrenPrepend**: `boolean`

When binding children, prepend them rather than the default append.

#### Inherited from

ButterfloatAttributes.childrenPrepend

#### Defined in

[component.ts:49](https://github.com/WorldMaker/butterfloat/blob/c1ff555/component.ts#L49)

___

### events

• `Optional` **events**: `Events`

Bind an event observable to a DOM event.

#### Defined in

[component.ts:73](https://github.com/WorldMaker/butterfloat/blob/c1ff555/component.ts#L73)

___

### immediateBind

• `Optional` **immediateBind**: `Bind`

Immediately bind an observable to a DOM property

#### Defined in

[component.ts:69](https://github.com/WorldMaker/butterfloat/blob/c1ff555/component.ts#L69)
