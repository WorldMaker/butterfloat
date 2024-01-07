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
- [ButterfloatElementStyleBind](jsx.JSX.md#butterfloatelementstylebind)
- [Element](jsx.JSX.md#element)
- [HtmlElementAttributes](jsx.JSX.md#htmlelementattributes)
- [HtmlElementAttributesBind](jsx.JSX.md#htmlelementattributesbind)
- [HtmlElementStyleBind](jsx.JSX.md#htmlelementstylebind)
- [HtmlElements](jsx.JSX.md#htmlelements)
- [HtmlEvents](jsx.JSX.md#htmlevents)
- [IfEquals](jsx.JSX.md#ifequals)
- [IntrinsicAttributes](jsx.JSX.md#intrinsicattributes)
- [WritableKeys](jsx.JSX.md#writablekeys)

## Type Aliases

### ButterfloatElementAttributes

Ƭ **ButterfloatElementAttributes**\<`T`\>: [`HtmlElementAttributes`](jsx.JSX.md#htmlelementattributes)\<`T`\> & [`ButterfloatIntrinsicAttributes`](../interfaces/ButterfloatIntrinsicAttributes.md)\<[`ButterfloatElementBind`](jsx.JSX.md#butterfloatelementbind)\<`T`\>, [`ButterfloatElementEvents`](jsx.JSX.md#butterfloatelementevents), [`ButterfloatElementStyleBind`](jsx.JSX.md#butterfloatelementstylebind)\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:87](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L87)

___

### ButterfloatElementBind

Ƭ **ButterfloatElementBind**\<`T`\>: [`HtmlElementAttributesBind`](jsx.JSX.md#htmlelementattributesbind)\<`T`\> & [`DefaultBind`](../modules.md#defaultbind)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:71](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L71)

___

### ButterfloatElementEvents

Ƭ **ButterfloatElementEvents**: [`HtmlEvents`](jsx.JSX.md#htmlevents) & [`ButterfloatEvents`](../interfaces/ButterfloatEvents.md) & [`DefaultEvents`](../modules.md#defaultevents)

#### Defined in

[jsx.ts:74](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L74)

___

### ButterfloatElementStyleBind

Ƭ **ButterfloatElementStyleBind**: [`HtmlElementStyleBind`](jsx.JSX.md#htmlelementstylebind) & [`DefaultStyleBind`](../modules.md#defaultstylebind)

#### Defined in

[jsx.ts:84](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L84)

___

### Element

Ƭ **Element**: [`NodeDescription`](../modules.md#nodedescription)

#### Defined in

[jsx.ts:17](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L17)

___

### HtmlElementAttributes

Ƭ **HtmlElementAttributes**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: T[Property] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:47](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L47)

___

### HtmlElementAttributesBind

Ƭ **HtmlElementAttributesBind**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: Observable\<T[Property]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:57](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L57)

___

### HtmlElementStyleBind

Ƭ **HtmlElementStyleBind**: \{ [Property in keyof CSSStyleDeclaration]?: Observable\<CSSStyleDeclaration[Property]\> }

#### Defined in

[jsx.ts:78](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L78)

___

### HtmlElements

Ƭ **HtmlElements**: \{ [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes\<HTMLElementTagNameMap[Property]\> }

#### Defined in

[jsx.ts:94](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L94)

___

### HtmlEvents

Ƭ **HtmlEvents**\<`EventMap`\>: \{ [Property in keyof EventMap]?: ObservableEvent\<EventMap[Property]\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventMap` | `HTMLElementEventMap` |

#### Defined in

[jsx.ts:67](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L67)

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

[jsx.ts:33](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L33)

___

### IntrinsicAttributes

Ƭ **IntrinsicAttributes**: [`ChildrenBindable`](../interfaces/ChildrenBindable.md)

#### Defined in

[jsx.ts:104](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L104)

___

### WritableKeys

Ƭ **WritableKeys**\<`T`\>: \{ [P in keyof T]-?: IfEquals\<\{ [Q in P]: T[P] }, \{ -readonly [Q in P]: T[P] }, P\> }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:39](https://github.com/WorldMaker/butterfloat/blob/eeb3fc2/jsx.ts#L39)
