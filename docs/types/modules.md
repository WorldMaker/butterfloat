[butterfloat](README.md) / Exports

# butterfloat

## Table of contents

### Namespaces

- [jsx](modules/jsx.md)

### Interfaces

- [ButterfloatEvents](interfaces/ButterfloatEvents.md)
- [ButterfloatIntrinsicAttributes](interfaces/ButterfloatIntrinsicAttributes.md)
- [ChildrenBindDescription](interfaces/ChildrenBindDescription.md)
- [ChildrenBindable](interfaces/ChildrenBindable.md)
- [ChildrenDescription](interfaces/ChildrenDescription.md)
- [ChildrenProperties](interfaces/ChildrenProperties.md)
- [ComponentContext](interfaces/ComponentContext.md)
- [ComponentDescription](interfaces/ComponentDescription.md)
- [ElementDescription](interfaces/ElementDescription.md)
- [ErrorBoundaryProps](interfaces/ErrorBoundaryProps.md)
- [ErrorViewProps](interfaces/ErrorViewProps.md)
- [FragmentDescription](interfaces/FragmentDescription.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [SuspenseProps](interfaces/SuspenseProps.md)

### Type Aliases

- [Attributes](modules.md#attributes)
- [ButterfloatAttributes](modules.md#butterfloatattributes)
- [ChildrenBind](modules.md#childrenbind)
- [ChildrenBindMode](modules.md#childrenbindmode)
- [ClassBind](modules.md#classbind)
- [Component](modules.md#component)
- [ContextComponent](modules.md#contextcomponent)
- [DefaultBind](modules.md#defaultbind)
- [DefaultEvents](modules.md#defaultevents)
- [DefaultStyleBind](modules.md#defaultstylebind)
- [EffectHandler](modules.md#effecthandler)
- [HtmlAttributes](modules.md#htmlattributes)
- [JsxChildren](modules.md#jsxchildren)
- [NodeDescription](modules.md#nodedescription)
- [ObservableEvent](modules.md#observableevent)
- [SimpleComponent](modules.md#simplecomponent)
- [StateSetter](modules.md#statesetter)

### Functions

- [Children](modules.md#children)
- [ErrorBoundary](modules.md#errorboundary)
- [Fragment](modules.md#fragment)
- [Suspense](modules.md#suspense)
- [butterfly](modules.md#butterfly)
- [hasAnyBinds](modules.md#hasanybinds)
- [jsx](modules.md#jsx)
- [makeTestComponentContext](modules.md#maketestcomponentcontext)
- [makeTestEvent](modules.md#maketestevent)
- [run](modules.md#run)

## Type Aliases

### Attributes

Ƭ **Attributes**: `Record`\<`string`, `unknown`\>

#### Defined in

[component.ts:35](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L35)

___

### ButterfloatAttributes

Ƭ **ButterfloatAttributes**: [`HtmlAttributes`](modules.md#htmlattributes) & [`ChildrenBindable`](interfaces/ChildrenBindable.md)

#### Defined in

[component.ts:54](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L54)

___

### ChildrenBind

Ƭ **ChildrenBind**: `Observable`\<[`Component`](modules.md#component)\>

#### Defined in

[component.ts:39](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L39)

___

### ChildrenBindMode

Ƭ **ChildrenBindMode**: ``"append"`` \| ``"prepend"`` \| ``"replace"``

#### Defined in

[component.ts:41](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L41)

___

### ClassBind

Ƭ **ClassBind**: `Record`\<`string`, `Observable`\<`boolean`\>\>

#### Defined in

[component.ts:60](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L60)

___

### Component

Ƭ **Component**: [`ContextComponent`](modules.md#contextcomponent) \| [`SimpleComponent`](modules.md#simplecomponent)

#### Defined in

[component.ts:31](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L31)

___

### ContextComponent

Ƭ **ContextComponent**\<`Props`, `Events`\>: (`props`: `Props`, `context`: [`ComponentContext`](interfaces/ComponentContext.md)\<`Events`\>) => [`NodeDescription`](modules.md#nodedescription)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Props` | `any` |
| `Events` | `any` |

#### Type declaration

▸ (`props`, `context`): [`NodeDescription`](modules.md#nodedescription)

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |
| `context` | [`ComponentContext`](interfaces/ComponentContext.md)\<`Events`\> |

##### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:24](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L24)

___

### DefaultBind

Ƭ **DefaultBind**: `Record`\<`string`, `Observable`\<`unknown`\>\>

#### Defined in

[component.ts:56](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L56)

___

### DefaultEvents

Ƭ **DefaultEvents**: `Record`\<`string`, [`ObservableEvent`](modules.md#observableevent)\<`unknown`\>\>

#### Defined in

[events.ts:15](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/events.ts#L15)

___

### DefaultStyleBind

Ƭ **DefaultStyleBind**: `Record`\<`string`, `Observable`\<`unknown`\>\>

#### Defined in

[component.ts:58](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L58)

___

### EffectHandler

Ƭ **EffectHandler**: \<T\>(`observable`: `Observable`\<`T`\>, `effect`: (`item`: `T`) => `void` \| `Promise`\<`void`\>) => `void`

#### Type declaration

▸ \<`T`\>(`observable`, `effect`): `void`

Handles an effect

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `observable` | `Observable`\<`T`\> |
| `effect` | (`item`: `T`) => `void` \| `Promise`\<`void`\> |

##### Returns

`void`

#### Defined in

[component.ts:7](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L7)

___

### HtmlAttributes

Ƭ **HtmlAttributes**: `Record`\<`string`, `unknown`\>

#### Defined in

[component.ts:37](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L37)

___

### JsxChildren

Ƭ **JsxChildren**: ([`NodeDescription`](modules.md#nodedescription) \| `string`)[]

#### Defined in

[component.ts:33](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L33)

___

### NodeDescription

Ƭ **NodeDescription**: [`ElementDescription`](interfaces/ElementDescription.md) \| [`ComponentDescription`](interfaces/ComponentDescription.md) \| [`FragmentDescription`](interfaces/FragmentDescription.md) \| [`ChildrenDescription`](interfaces/ChildrenDescription.md)

#### Defined in

[component.ts:147](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L147)

___

### ObservableEvent

Ƭ **ObservableEvent**\<`T`\>: `Observable`\<`T`\> & \{ `[ButterfloatEvent]`: `unknown`  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[events.ts:5](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/events.ts#L5)

___

### SimpleComponent

Ƭ **SimpleComponent**: () => [`NodeDescription`](modules.md#nodedescription)

#### Type declaration

▸ (): [`NodeDescription`](modules.md#nodedescription)

##### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:29](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L29)

___

### StateSetter

Ƭ **StateSetter**\<`T`\>: `T` \| (`currentValue`: `T`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[butterfly.ts:3](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/butterfly.ts#L3)

## Functions

### Children

▸ **Children**(`props`): [`NodeDescription`](modules.md#nodedescription)

Bind the children of a component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ChildrenProperties`](interfaces/ChildrenProperties.md) | Children properties |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

Children node

#### Defined in

[jsx.ts:116](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/jsx.ts#L116)

___

### ErrorBoundary

▸ **ErrorBoundary**(`props`, `context`): [`NodeDescription`](modules.md#nodedescription)

Present an error view when errors occur below this in the tree.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ErrorBoundaryProps`](interfaces/ErrorBoundaryProps.md) |
| `context` | [`ComponentContext`](interfaces/ComponentContext.md)\<`any`\> |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:24](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L24)

___

### Fragment

▸ **Fragment**(`attributes`, `...children`): [`NodeDescription`](modules.md#nodedescription)

Create a fragment of other nodes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributes` | ``null`` \| [`ButterfloatAttributes`](modules.md#butterfloatattributes) | Attributes |
| `...children` | [`JsxChildren`](modules.md#jsxchildren) | Children |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

Fragment node

#### Defined in

[jsx.ts:130](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/jsx.ts#L130)

___

### Suspense

▸ **Suspense**(`props`, `context`): [`NodeDescription`](modules.md#nodedescription)

Suspend the bindings in children when a observable flag has been raised.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SuspenseProps`](interfaces/SuspenseProps.md) |
| `context` | [`ComponentContext`](interfaces/ComponentContext.md)\<`any`\> |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:24](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L24)

___

### butterfly

▸ **butterfly**\<`T`\>(`startingValue`): [observable: Observable\<T\>, next: Function, error: Function, complete: Function]

Create an atomic Observable for representation of a small piece of state while splitting
the read API and write APIs in a way making it easier to protect write APIs from escaping
API boundaries.

In this case "butterfly" is something of an analogy to "butterfly your shrimp", but also
just an evocative name that calls back to the origins of this engine's own name.

This is just a simple BehaviorSubject constructor/wrapper that is made to resemble React's
useState with the idea of making it less likely to leak the subject as a whole across API
boundaries by thinking of it as a tuple of two to four things, three of which should be
"private".

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startingValue` | `T` | Starting value for atomic |

#### Returns

[observable: Observable\<T\>, next: Function, error: Function, complete: Function]

[observable, next, error, complete]

#### Defined in

[butterfly.ts:20](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/butterfly.ts#L20)

___

### hasAnyBinds

▸ **hasAnyBinds**(`description`): `boolean` \| [`ChildrenBind`](modules.md#childrenbind)

Does an element description have any binds?

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | [`ElementDescription`](interfaces/ElementDescription.md)\<[`DefaultBind`](modules.md#defaultbind)\> | Element description |

#### Returns

`boolean` \| [`ChildrenBind`](modules.md#childrenbind)

True if any dynamic binds

#### Defined in

[component.ts:181](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L181)

___

### jsx

▸ **jsx**(`element`, `attributes`, `...children`): [`NodeDescription`](modules.md#nodedescription)

Describe a node. Builder for JSX and TSX tranformation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `element` | `string` \| [`Component`](modules.md#component) | An element to build |
| `attributes` | ``null`` \| [`ButterfloatAttributes`](modules.md#butterfloatattributes) | Attributes |
| `...children` | [`JsxChildren`](modules.md#jsxchildren) | Children |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

Node description

#### Defined in

[jsx.ts:152](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/jsx.ts#L152)

___

### makeTestComponentContext

▸ **makeTestComponentContext**\<`Events`\>(`events`): `Object`

Make a test context for testing context components.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Events` | [`DefaultEvents`](modules.md#defaultevents) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `events` | `Events` | Mocked events for testing |

#### Returns

`Object`

A test context for testing context component

| Name | Type |
| :------ | :------ |
| `context` | [`ComponentContext`](interfaces/ComponentContext.md)\<`Events`\> |
| `effects` | [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][] |
| `immediateEffects` | [`Observable`\<`unknown`\>, (`item`: `any`) => `void`][] |

#### Defined in

[component.ts:158](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/component.ts#L158)

___

### makeTestEvent

▸ **makeTestEvent**\<`T`\>(`observable`): [`ObservableEvent`](modules.md#observableevent)\<`T`\>

Mock an event for testing purposes only

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observable` | `Observable`\<`T`\> | Observable of events that occur |

#### Returns

[`ObservableEvent`](modules.md#observableevent)\<`T`\>

ObservableEvent

#### Defined in

[events.ts:22](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/events.ts#L22)

___

### run

▸ **run**(`container`, `component`, `options?`, `placeholder?`, `document?`): `Subscription`

Run a Butterfloat component

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `Element` | `undefined` | Container the component will be a child in |
| `component` | [`ComponentDescription`](interfaces/ComponentDescription.md) \| [`Component`](modules.md#component) | `undefined` | Component or description of component to run |
| `options?` | [`RuntimeOptions`](interfaces/RuntimeOptions.md) | `undefined` | - |
| `placeholder?` | `Element` \| `CharacterData` | `undefined` | Optional placeholder child of the container to replace |
| `document` | `Document` | `globalThis.document` | Document to use for creating new nodes |

#### Returns

`Subscription`

Subscription

#### Defined in

[runtime.ts:24](https://github.com/WorldMaker/butterfloat/blob/37e9dd5/runtime.ts#L24)
