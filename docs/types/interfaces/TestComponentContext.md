[butterfloat](../README.md) / [Exports](../modules.md) / TestComponentContext

# Interface: TestComponentContext\<Events\>

A Component Context for Testing purposes

## Type parameters

| Name | Type |
| :------ | :------ |
| `Events` | [`DefaultEvents`](../modules.md#defaultevents) |

## Table of contents

### Properties

- [context](TestComponentContext.md#context)
- [effects](TestComponentContext.md#effects)
- [immediateEffects](TestComponentContext.md#immediateeffects)

## Properties

### context

• **context**: [`ComponentContext`](ComponentContext.md)\<`Events`\>

#### Defined in

[component.ts:241](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L241)

___

### effects

• **effects**: [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][]

#### Defined in

[component.ts:244](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L244)

___

### immediateEffects

• **immediateEffects**: [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][]

#### Defined in

[component.ts:246](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L246)
