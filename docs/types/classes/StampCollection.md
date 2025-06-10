[butterfloat](../README.md) / [Exports](../modules.md) / StampCollection

# Class: StampCollection

A collection of Stamps that include the static DOM elements of Butterfloat components

## Table of contents

### Constructors

- [constructor](StampCollection.md#constructor)

### Methods

- [getStamp](StampCollection.md#getstamp)
- [isPrestamp](StampCollection.md#isprestamp)
- [registerOnlyStamp](StampCollection.md#registeronlystamp)
- [registerPrestamp](StampCollection.md#registerprestamp)
- [registerStampAlternative](StampCollection.md#registerstampalternative)

## Constructors

### constructor

• **new StampCollection**(): [`StampCollection`](StampCollection.md)

#### Returns

[`StampCollection`](StampCollection.md)

## Methods

### getStamp

▸ **getStamp**(`c`, `properties`): `undefined` \| `HTMLTemplateElement`

Get a Stamp for a component, given applicable properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`Component`](../modules.md#component) | Component |
| `properties` | `unknown` | Properties that apply to the component |

#### Returns

`undefined` \| `HTMLTemplateElement`

A stamp

#### Defined in

[stamp-collection.ts:30](https://github.com/WorldMaker/butterfloat/blob/51a08e2/stamp-collection.ts#L30)

___

### isPrestamp

▸ **isPrestamp**(`c`, `properties`, `container`): `boolean`

Check if a container was registered as a prestamp for this component with given properties

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`Component`](../modules.md#component) | Component |
| `properties` | `unknown` | Properties that apply to the component |
| `container` | `Element` \| `DocumentFragment` | Container to test for prestamp |

#### Returns

`boolean`

Is registered as a valid prestamp

#### Defined in

[stamp-collection.ts:48](https://github.com/WorldMaker/butterfloat/blob/51a08e2/stamp-collection.ts#L48)

___

### registerOnlyStamp

▸ **registerOnlyStamp**(`c`, `stamp`): [`StampCollection`](StampCollection.md)

Register one Stamp for all possible properties for the given Component

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`Component`](../modules.md#component) | Component |
| `stamp` | `HTMLTemplateElement` | Stamp to register |

#### Returns

[`StampCollection`](StampCollection.md)

this (for chaining)

#### Defined in

[stamp-collection.ts:66](https://github.com/WorldMaker/butterfloat/blob/51a08e2/stamp-collection.ts#L66)

___

### registerPrestamp

▸ **registerPrestamp**\<`Props`\>(`c`, `container`, `when?`): [`StampCollection`](StampCollection.md)

Register a container that was pre-stamped

#### Type parameters

| Name |
| :------ |
| `Props` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`Component`](../modules.md#component) | Component |
| `container` | `Element` \| `DocumentFragment` | Prestamped container |
| `when?` | [`StampPropertiesApply`](../modules.md#stamppropertiesapply)\<`Props`\> | Property filter for when the prestamp applies |

#### Returns

[`StampCollection`](StampCollection.md)

this (for chaining)

#### Defined in

[stamp-collection.ts:96](https://github.com/WorldMaker/butterfloat/blob/51a08e2/stamp-collection.ts#L96)

___

### registerStampAlternative

▸ **registerStampAlternative**\<`Props`\>(`c`, `when`, `stamp`): [`StampCollection`](StampCollection.md)

Register a possible Stamp for subset of possible properties for the given Component

#### Type parameters

| Name |
| :------ |
| `Props` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `c` | [`ContextComponent`](../modules.md#contextcomponent)\<`Props`\> | Component |
| `when` | [`StampPropertiesApply`](../modules.md#stamppropertiesapply)\<`Props`\> | Property filter for when the Stamp applies |
| `stamp` | `HTMLTemplateElement` | Stamp to register |

#### Returns

[`StampCollection`](StampCollection.md)

this (for chaining)

#### Defined in

[stamp-collection.ts:78](https://github.com/WorldMaker/butterfloat/blob/51a08e2/stamp-collection.ts#L78)
