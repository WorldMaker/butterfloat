[butterfloat](../README.md) / [Exports](../modules.md) / [jsx](jsx.md) / JSX

# Namespace: JSX

[jsx](jsx.md).JSX

Overloads to Typescript's JSX typing

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

Attributes available in Butterfloat from an HTML element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:127](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L127)

___

### ButterfloatElementBind

Ƭ **ButterfloatElementBind**\<`T`\>: [`HtmlElementAttributesBind`](jsx.JSX.md#htmlelementattributesbind)\<`T`\> & [`DefaultBind`](../modules.md#defaultbind)

All Butterfloat bindable attributes of an element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:99](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L99)

___

### ButterfloatElementEvents

Ƭ **ButterfloatElementEvents**: [`HtmlEvents`](jsx.JSX.md#htmlevents) & [`ButterfloatEvents`](../interfaces/ButterfloatEvents.md) & [`DefaultEvents`](../modules.md#defaultevents)

All Butterfloat bindable events of an element

#### Defined in

[jsx.ts:105](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L105)

___

### ButterfloatElementStyleBind

Ƭ **ButterfloatElementStyleBind**: [`HtmlElementStyleBind`](jsx.JSX.md#htmlelementstylebind) & [`DefaultStyleBind`](../modules.md#defaultstylebind)

All Butterfloat bindable CSS styles

#### Defined in

[jsx.ts:121](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L121)

___

### Element

Ƭ **Element**: [`NodeDescription`](../modules.md#nodedescription)

JSX Element type

#### Defined in

[jsx.ts:27](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L27)

___

### HtmlElementAttributes

Ƭ **HtmlElementAttributes**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: T[Property] }

Attributes of an HTML Element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:66](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L66)

___

### HtmlElementAttributesBind

Ƭ **HtmlElementAttributesBind**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: Observable\<T[Property]\> }

Observable bindable attributes of an HTML Element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:79](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L79)

___

### HtmlElementStyleBind

Ƭ **HtmlElementStyleBind**: \{ [Property in keyof CSSStyleDeclaration]?: Observable\<CSSStyleDeclaration[Property]\> }

All bindable CSS styles of an HTML element

#### Defined in

[jsx.ts:112](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L112)

___

### HtmlElements

Ƭ **HtmlElements**: \{ [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes\<HTMLElementTagNameMap[Property]\> }

Available HTML Elements

#### Defined in

[jsx.ts:137](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L137)

___

### HtmlEvents

Ƭ **HtmlEvents**\<`EventMap`\>: \{ [Property in keyof EventMap]?: ObservableEvent\<EventMap[Property]\> }

Bindable DOM events

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventMap` | `HTMLElementEventMap` |

#### Defined in

[jsx.ts:92](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L92)

___

### IfEquals

Ƭ **IfEquals**\<`X`, `Y`, `A`, `B`\>: \<T\>() => `T` extends `X` ? ``1`` : ``2`` extends \<T\>() => `T` extends `Y` ? ``1`` : ``2`` ? `A` : `B`

If types are equal. Meta-type for complex conditional types.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `X` | `X` |
| `Y` | `Y` |
| `A` | `X` |
| `B` | `never` |

#### Defined in

[jsx.ts:46](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L46)

___

### IntrinsicAttributes

Ƭ **IntrinsicAttributes**: [`ChildrenBindable`](../interfaces/ChildrenBindable.md)

JSX "intrinsic" attributes (additional attributes on JSX "intrinsics")

#### Defined in

[jsx.ts:153](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L153)

___

### WritableKeys

Ƭ **WritableKeys**\<`T`\>: \{ [P in keyof T]-?: IfEquals\<\{ [Q in P]: T[P] }, \{ -readonly [Q in P]: T[P] }, P\> }[keyof `T`]

Collect the writable keys of a type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:55](https://github.com/WorldMaker/butterfloat/blob/981cdb4/jsx.ts#L55)
