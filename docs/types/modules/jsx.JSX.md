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

[jsx.ts:79](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L79)

___

### ButterfloatElementBind

Ƭ **ButterfloatElementBind**\<`T`\>: [`HtmlElementAttributesBind`](jsx.JSX.md#htmlelementattributesbind)\<`T`\> & [`DefaultBind`](../modules.md#defaultbind)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:63](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L63)

___

### ButterfloatElementEvents

Ƭ **ButterfloatElementEvents**: [`HtmlEvents`](jsx.JSX.md#htmlevents) & [`ButterfloatEvents`](../interfaces/ButterfloatEvents.md) & [`DefaultEvents`](../modules.md#defaultevents)

#### Defined in

[jsx.ts:66](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L66)

___

### ButterfloatElementStyleBind

Ƭ **ButterfloatElementStyleBind**: [`HtmlElementStyleBind`](jsx.JSX.md#htmlelementstylebind) & [`DefaultStyleBind`](../modules.md#defaultstylebind)

#### Defined in

[jsx.ts:76](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L76)

___

### Element

Ƭ **Element**: [`NodeDescription`](../modules.md#nodedescription)

#### Defined in

[jsx.ts:17](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L17)

___

### HtmlElementAttributes

Ƭ **HtmlElementAttributes**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number ? Property : never]?: T[Property] }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:47](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L47)

___

### HtmlElementAttributesBind

Ƭ **HtmlElementAttributesBind**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number ? Property : never]?: Observable\<T[Property]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:53](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L53)

___

### HtmlElementStyleBind

Ƭ **HtmlElementStyleBind**: \{ [Property in keyof CSSStyleDeclaration]?: Observable\<CSSStyleDeclaration[Property]\> }

#### Defined in

[jsx.ts:70](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L70)

___

### HtmlElements

Ƭ **HtmlElements**: \{ [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes\<HTMLElementTagNameMap[Property]\> }

#### Defined in

[jsx.ts:86](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L86)

___

### HtmlEvents

Ƭ **HtmlEvents**\<`EventMap`\>: \{ [Property in keyof EventMap]?: ObservableEvent\<EventMap[Property]\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventMap` | `HTMLElementEventMap` |

#### Defined in

[jsx.ts:59](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L59)

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

[jsx.ts:33](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L33)

___

### IntrinsicAttributes

Ƭ **IntrinsicAttributes**: [`ChildrenBindable`](../interfaces/ChildrenBindable.md)

#### Defined in

[jsx.ts:96](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L96)

___

### WritableKeys

Ƭ **WritableKeys**\<`T`\>: \{ [P in keyof T]-?: IfEquals\<\{ [Q in P]: T[P] }, \{ -readonly [Q in P]: T[P] }, P\> }[keyof `T`]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:39](https://github.com/WorldMaker/butterfloat/blob/75c28b8/jsx.ts#L39)
