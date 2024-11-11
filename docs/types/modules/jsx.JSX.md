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

[jsx.ts:123](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L123)

___

### ButterfloatElementBind

Ƭ **ButterfloatElementBind**\<`T`\>: [`HtmlElementAttributesBind`](jsx.JSX.md#htmlelementattributesbind)\<`T`\> & [`DefaultBind`](../modules.md#defaultbind)

All Butterfloat bindable attributes of an element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:95](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L95)

___

### ButterfloatElementEvents

Ƭ **ButterfloatElementEvents**: [`HtmlEvents`](jsx.JSX.md#htmlevents) & [`ButterfloatEvents`](../interfaces/ButterfloatEvents.md) & [`DefaultEvents`](../modules.md#defaultevents)

All Butterfloat bindable events of an element

#### Defined in

[jsx.ts:101](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L101)

___

### ButterfloatElementStyleBind

Ƭ **ButterfloatElementStyleBind**: [`HtmlElementStyleBind`](jsx.JSX.md#htmlelementstylebind) & [`DefaultStyleBind`](../modules.md#defaultstylebind)

All Butterfloat bindable CSS styles

#### Defined in

[jsx.ts:117](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L117)

___

### Element

Ƭ **Element**: [`NodeDescription`](../modules.md#nodedescription)

JSX Element type

#### Defined in

[jsx.ts:23](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L23)

___

### HtmlElementAttributes

Ƭ **HtmlElementAttributes**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: T[Property] }

Attributes of an HTML Element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:62](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L62)

___

### HtmlElementAttributesBind

Ƭ **HtmlElementAttributesBind**\<`T`\>: \{ [Property in WritableKeys\<T\> as T[Property] extends string \| number \| null \| undefined ? Property : never]?: Observable\<T[Property]\> }

Observable bindable attributes of an HTML Element

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:75](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L75)

___

### HtmlElementStyleBind

Ƭ **HtmlElementStyleBind**: \{ [Property in keyof CSSStyleDeclaration]?: Observable\<CSSStyleDeclaration[Property]\> }

All bindable CSS styles of an HTML element

#### Defined in

[jsx.ts:108](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L108)

___

### HtmlElements

Ƭ **HtmlElements**: \{ [Property in keyof HTMLElementTagNameMap]: ButterfloatElementAttributes\<HTMLElementTagNameMap[Property]\> }

Available HTML Elements

#### Defined in

[jsx.ts:133](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L133)

___

### HtmlEvents

Ƭ **HtmlEvents**\<`EventMap`\>: \{ [Property in keyof EventMap]?: ObservableEvent\<EventMap[Property]\> }

Bindable DOM events

#### Type parameters

| Name | Type |
| :------ | :------ |
| `EventMap` | `HTMLElementEventMap` |

#### Defined in

[jsx.ts:88](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L88)

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

[jsx.ts:42](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L42)

___

### IntrinsicAttributes

Ƭ **IntrinsicAttributes**: [`ChildrenBindable`](../interfaces/ChildrenBindable.md)

JSX "intrinsic" attributes (additional attributes on JSX "intrinsics")

#### Defined in

[jsx.ts:149](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L149)

___

### WritableKeys

Ƭ **WritableKeys**\<`T`\>: \{ [P in keyof T]-?: IfEquals\<\{ [Q in P]: T[P] }, \{ -readonly [Q in P]: T[P] }, P\> }[keyof `T`]

Collect the writable keys of a type.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[jsx.ts:51](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L51)
