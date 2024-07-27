[butterfloat](../README.md) / [Exports](../modules.md) / TestComponentContext

# Interface: TestComponentContext\<Events\>

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

[component.ts:172](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L172)

___

### effects

• **effects**: [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][]

#### Defined in

[component.ts:175](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L175)

___

### immediateEffects

• **immediateEffects**: [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][]

#### Defined in

[component.ts:177](https://github.com/WorldMaker/butterfloat/blob/d39706f/component.ts#L177)
