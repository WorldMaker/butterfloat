[butterfloat](../README.md) / [Exports](../modules.md) / [jsx](jsx.md) / JSX

# Namespace: JSX

[jsx](jsx.md).JSX

## Table of contents

### Interfaces

- [IntrinsicElements](../interfaces/jsx.JSX.IntrinsicElements.md)

### Type Aliases

- [ButterfloatElementAttributes](jsx.JSX.md#butterfloatelementattributes)
- [ButterfloatElementBind](jsx.JSX.md#butterfloatelementbind)
- [ButterfloatElementEvents](jsx.JSX.md#butterfloatelementevents)
- [Element](jsx.JSX.md#element)
- [HtmlElementAttributes](jsx.JSX.md#htmlelementattributes)
- [HtmlElementAttributesBind](jsx.JSX.md#htmlelementattributesbind)
- [HtmlElements](jsx.JSX.md#htmlelements)
- [HtmlEvents](jsx.JSX.md#htmlevents)
- [IfEquals](jsx.JSX.md#ifequals)
- [IntrinsicAttributes](jsx.JSX.md#intrinsicattributes)
- [WritableKeys](jsx.JSX.md#writablekeys)

## Type Aliases

### ButterfloatElementAttributes

Ƭ **ButterfloatElementAttributes**\<`T`\>: [`HtmlElementAttributes`](jsx.JSX.md#htmlelementattributes)\<`T`\> & [`ButterfloatIntrinsicAttributes`](../interfaces/ButterfloatIntrinsicAttributes.md)\<[`ButterfloatElementBind`](jsx.JSX.md#butterfloatelementbind)\<`T`\>, [`ButterfloatElementEvents`](jsx.JSX.md#butterfloatelementevents)\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:69](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L69)

___

### ButterfloatElementBind

Ƭ **ButterfloatElementBind**\<`T`\>: [`HtmlElementAttributesBind`](jsx.JSX.md#htmlelementattributesbind)\<`T`\> & [`DefaultBind`](../modules.md#defaultbind)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:62](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L62)

___

### ButterfloatElementEvents

Ƭ **ButterfloatElementEvents**: [`HtmlEvents`](jsx.JSX.md#htmlevents) & [`ButterfloatEvents`](../interfaces/ButterfloatEvents.md) & [`DefaultEvents`](../modules.md#defaultevents)

#### Defined in

[jsx.ts:65](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L65)

___

### Element

Ƭ **Element**: [`NodeDescription`](../modules.md#nodedescription)

#### Defined in

[jsx.ts:16](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L16)

___

### HtmlElementAttributes

Ƭ **HtmlElementAttributes**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number ? Property : never]?: T[Property] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:46](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L46)

___

### HtmlElementAttributesBind

Ƭ **HtmlElementAttributesBind**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number ? Property : never]?: Observable\<T[Property]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:52](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L52)

___

### HtmlElements

Ƭ **HtmlElements**: \{ [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes\<HTMLElementTagNameMap[Property]\> }

#### Defined in

[jsx.ts:75](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L75)

___

### HtmlEvents

Ƭ **HtmlEvents**\<`EventMap`\>: \{ [Property in keyof EventMap]?: ObservableEvent\<EventMap[Property]\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventMap` | `HTMLElementEventMap` |

#### Defined in

[jsx.ts:58](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L58)

___

### IfEquals

Ƭ **IfEquals**\<`X`, `Y`, `A`, `B`\>: \<T\>() => `T` extends `X` ? ``1`` : ``2`` extends \<T\>() => `T` extends `Y` ? ``1`` : ``2`` ? `A` : `B`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `X` | `X` |
| `Y` | `Y` |
| `A` | `X` |
| `B` | `never` |

#### Defined in

[jsx.ts:32](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L32)

___

### IntrinsicAttributes

Ƭ **IntrinsicAttributes**: [`ChildrenBindable`](../interfaces/ChildrenBindable.md)

#### Defined in

[jsx.ts:85](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L85)

___

### WritableKeys

Ƭ **WritableKeys**\<`T`\>: \{ [P in keyof T]-?: IfEquals\<\{ [Q in P]: T[P] }, \{ -readonly [Q in P]: T[P] }, P\> }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:38](https://github.com/WorldMaker/butterfloat/blob/290ead7/jsx.ts#L38)
