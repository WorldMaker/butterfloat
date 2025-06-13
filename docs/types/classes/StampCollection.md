[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / StampCollection

# Class: StampCollection

Defined in: [stamp-collection.ts:17](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L17)

A collection of Stamps that include the static DOM elements of Butterfloat components

## Constructors

### Constructor

> **new StampCollection**(): `StampCollection`

#### Returns

`StampCollection`

## Methods

### getStamp()

> **getStamp**(`c`, `properties`): `undefined` \| `HTMLTemplateElement`

Defined in: [stamp-collection.ts:30](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L30)

Get a Stamp for a component, given applicable properties

#### Parameters

##### c

[`Component`](../type-aliases/Component.md)

Component

##### properties

`unknown`

Properties that apply to the component

#### Returns

`undefined` \| `HTMLTemplateElement`

A stamp

***

### isPrestamp()

> **isPrestamp**(`c`, `properties`, `container`): `boolean`

Defined in: [stamp-collection.ts:48](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L48)

Check if a container was registered as a prestamp for this component with given properties

#### Parameters

##### c

[`Component`](../type-aliases/Component.md)

Component

##### properties

`unknown`

Properties that apply to the component

##### container

Container to test for prestamp

`DocumentFragment` | `Element`

#### Returns

`boolean`

Is registered as a valid prestamp

***

### registerOnlyStamp()

> **registerOnlyStamp**(`c`, `stamp`): `StampCollection`

Defined in: [stamp-collection.ts:66](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L66)

Register one Stamp for all possible properties for the given Component

#### Parameters

##### c

[`Component`](../type-aliases/Component.md)

Component

##### stamp

`HTMLTemplateElement`

Stamp to register

#### Returns

`StampCollection`

this (for chaining)

***

### registerPrestamp()

> **registerPrestamp**\<`Props`\>(`c`, `container`, `when?`): `StampCollection`

Defined in: [stamp-collection.ts:96](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L96)

Register a container that was pre-stamped

#### Type Parameters

##### Props

`Props`

#### Parameters

##### c

[`Component`](../type-aliases/Component.md)

Component

##### container

Prestamped container

`DocumentFragment` | `Element`

##### when?

[`StampPropertiesApply`](../type-aliases/StampPropertiesApply.md)\<`Props`\>

Property filter for when the prestamp applies

#### Returns

`StampCollection`

this (for chaining)

***

### registerStampAlternative()

> **registerStampAlternative**\<`Props`\>(`c`, `when`, `stamp`): `StampCollection`

Defined in: [stamp-collection.ts:78](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/stamp-collection.ts#L78)

Register a possible Stamp for subset of possible properties for the given Component

#### Type Parameters

##### Props

`Props`

#### Parameters

##### c

[`ContextComponent`](../type-aliases/ContextComponent.md)\<`Props`\>

Component

##### when

[`StampPropertiesApply`](../type-aliases/StampPropertiesApply.md)\<`Props`\>

Property filter for when the Stamp applies

##### stamp

`HTMLTemplateElement`

Stamp to register

#### Returns

`StampCollection`

this (for chaining)
