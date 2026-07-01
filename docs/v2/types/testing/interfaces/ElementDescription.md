[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [testing](../butterfloat.md) / ElementDescription

# Interface: ElementDescription\<Bind\>

Defined in: [v2/testing/description.ts:39](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L39)

Description of a DOM element and its bindings

## Extends

- [`ChildrenBindDescription`](ChildrenBindDescription.md)

## Type Parameters

### Bind

`Bind` = [`DefaultBind`](../../index/type-aliases/DefaultBind.md)

## Properties

### attributes

> **attributes**: [`Attributes`](../../index/type-aliases/Attributes.md)

Defined in: [v2/testing/description.ts:52](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L52)

The attributes of the element

---

### bind

> **bind**: `Bind`

Defined in: [v2/testing/description.ts:56](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L56)

Bindings

---

### children

> **children**: [`JsxChildrenDescription`](../type-aliases/JsxChildrenDescription.md)

Defined in: [v2/testing/description.ts:25](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L25)

The static children

#### Inherited from

[`ChildrenBindDescription`](ChildrenBindDescription.md).[`children`](ChildrenBindDescription.md#children)

---

### childrenBind?

> `optional` **childrenBind**: [`ChildrenBind`](../../index/type-aliases/ChildrenBind.md)

Defined in: [v2/testing/description.ts:29](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L29)

Children bindings

#### Inherited from

[`ChildrenBindDescription`](ChildrenBindDescription.md).[`childrenBind`](ChildrenBindDescription.md#childrenbind)

---

### childrenBindMode?

> `optional` **childrenBindMode**: [`ChildrenBindMode`](../../index/type-aliases/ChildrenBindMode.md)

Defined in: [v2/testing/description.ts:33](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L33)

The mode to bind children

#### Inherited from

[`ChildrenBindDescription`](ChildrenBindDescription.md).[`childrenBindMode`](ChildrenBindDescription.md#childrenbindmode)

---

### classBind

> **classBind**: [`ClassBind`](../../index/type-aliases/ClassBind.md)

Defined in: [v2/testing/description.ts:76](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L76)

Class bindings

---

### element

> **element**: `string`

Defined in: [v2/testing/description.ts:48](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L48)

The element name/type

---

### events

> **events**: [`DefaultEvents`](../type-aliases/DefaultEvents.md)

Defined in: [v2/testing/description.ts:64](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L64)

Events

---

### immediateBind

> **immediateBind**: `Bind`

Defined in: [v2/testing/description.ts:60](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L60)

Immediate bindings

---

### immediateClassBind

> **immediateClassBind**: [`ClassBind`](../../index/type-aliases/ClassBind.md)

Defined in: [v2/testing/description.ts:80](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L80)

Immediate class bindings

---

### immediateStyleBind

> **immediateStyleBind**: [`DefaultStyleBind`](../../index/type-aliases/DefaultStyleBind.md)

Defined in: [v2/testing/description.ts:72](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L72)

Immediate style bindings

---

### styleBind

> **styleBind**: [`DefaultStyleBind`](../../index/type-aliases/DefaultStyleBind.md)

Defined in: [v2/testing/description.ts:68](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L68)

Style bindings

---

### type

> **type**: `"element"`

Defined in: [v2/testing/description.ts:44](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/testing/description.ts#L44)

The type of the description
