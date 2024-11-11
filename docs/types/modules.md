[butterfloat](README.md) / Exports

# butterfloat

## Table of contents

### Namespaces

- [jsx](modules/jsx.md)

### Classes

- [StampCollection](classes/StampCollection.md)

### Interfaces

- [ButterfloatEvents](interfaces/ButterfloatEvents.md)
- [ButterfloatIntrinsicAttributes](interfaces/ButterfloatIntrinsicAttributes.md)
- [ChildrenBindDescription](interfaces/ChildrenBindDescription.md)
- [ChildrenBindable](interfaces/ChildrenBindable.md)
- [ChildrenDescription](interfaces/ChildrenDescription.md)
- [ChildrenProperties](interfaces/ChildrenProperties.md)
- [ComponentContext](interfaces/ComponentContext.md)
- [ComponentDescription](interfaces/ComponentDescription.md)
- [DelayBind](interfaces/DelayBind.md)
- [ElementDescription](interfaces/ElementDescription.md)
- [ErrorBoundaryProps](interfaces/ErrorBoundaryProps.md)
- [ErrorViewProps](interfaces/ErrorViewProps.md)
- [FragmentDescription](interfaces/FragmentDescription.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [StaticDescription](interfaces/StaticDescription.md)
- [StaticProperties](interfaces/StaticProperties.md)
- [SuspenseProps](interfaces/SuspenseProps.md)
- [TestComponentContext](interfaces/TestComponentContext.md)

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
- [StampPropertiesApply](modules.md#stamppropertiesapply)
- [StateSetter](modules.md#statesetter)

### Functions

- [Children](modules.md#children)
- [ErrorBoundary](modules.md#errorboundary)
- [Fragment](modules.md#fragment)
- [Static](modules.md#static)
- [Suspense](modules.md#suspense)
- [buildStamp](modules.md#buildstamp)
- [butterfly](modules.md#butterfly)
- [hasAnyBinds](modules.md#hasanybinds)
- [jsx](modules.md#jsx)
- [makeTestComponentContext](modules.md#maketestcomponentcontext)
- [makeTestEvent](modules.md#maketestevent)
- [run](modules.md#run)
- [runOnlyStamps](modules.md#runonlystamps)
- [runStamps](modules.md#runstamps)

## Type Aliases

### Attributes

Ƭ **Attributes**: `Record`\<`string`, `unknown`\>

Attributes of a Node Description

#### Defined in

[component.ts:50](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L50)

___

### ButterfloatAttributes

Ƭ **ButterfloatAttributes**: [`HtmlAttributes`](modules.md#htmlattributes) & [`ChildrenBindable`](interfaces/ChildrenBindable.md)

Butterfloat Attributes

#### Defined in

[component.ts:84](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L84)

___

### ChildrenBind

Ƭ **ChildrenBind**: `Observable`\<[`Component`](modules.md#component)\>

An Observable that produces child Components

#### Defined in

[component.ts:60](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L60)

___

### ChildrenBindMode

Ƭ **ChildrenBindMode**: ``"append"`` \| ``"prepend"`` \| ``"replace"``

The mode to bind new children to a container

#### Defined in

[component.ts:65](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L65)

___

### ClassBind

Ƭ **ClassBind**: `Record`\<`string`, `Observable`\<`boolean`\>\>

Bind for classBind

#### Defined in

[component.ts:114](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L114)

___

### Component

Ƭ **Component**: [`ContextComponent`](modules.md#contextcomponent) \| [`SimpleComponent`](modules.md#simplecomponent)

A Butterfloat Component

#### Defined in

[component.ts:40](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L40)

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

A Butterfloat Component provided properties and additional context-sensitive tools

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Props` |
| `context` | [`ComponentContext`](interfaces/ComponentContext.md)\<`Events`\> |

##### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:27](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L27)

___

### DefaultBind

Ƭ **DefaultBind**: `Record`\<`string`, `Observable`\<`unknown`\>\>

Default bind attribute accepted binds

#### Defined in

[component.ts:89](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L89)

___

### DefaultEvents

Ƭ **DefaultEvents**: `Record`\<`string`, [`ObservableEvent`](modules.md#observableevent)\<`unknown`\>\>

Default collection of Butterfloat bindings to DOM events

#### Defined in

[events.ts:24](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/events.ts#L24)

___

### DefaultStyleBind

Ƭ **DefaultStyleBind**: `Record`\<`string`, `Observable`\<`unknown`\>\>

Default styleBind attribute accepted binds

#### Defined in

[component.ts:109](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L109)

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

[component.ts:7](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L7)

___

### HtmlAttributes

Ƭ **HtmlAttributes**: `Record`\<`string`, `unknown`\>

HTML Attributes

#### Defined in

[component.ts:55](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L55)

___

### JsxChildren

Ƭ **JsxChildren**: ([`NodeDescription`](modules.md#nodedescription) \| `string`)[]

Possible children to a JSX node

#### Defined in

[component.ts:45](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L45)

___

### NodeDescription

Ƭ **NodeDescription**: [`ElementDescription`](interfaces/ElementDescription.md) \| [`ComponentDescription`](interfaces/ComponentDescription.md) \| [`FragmentDescription`](interfaces/FragmentDescription.md) \| [`ChildrenDescription`](interfaces/ChildrenDescription.md) \| [`StaticDescription`](interfaces/StaticDescription.md)

A description of a node in a Butterfloat DOM tree

#### Defined in

[component.ts:230](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L230)

___

### ObservableEvent

Ƭ **ObservableEvent**\<`T`\>: `Observable`\<`T`\> & \{ `[ButterfloatEvent]`: `unknown`  }

An Observable intended for binding to a DOM event

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[events.ts:8](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/events.ts#L8)

___

### SimpleComponent

Ƭ **SimpleComponent**: () => [`NodeDescription`](modules.md#nodedescription)

#### Type declaration

▸ (): [`NodeDescription`](modules.md#nodedescription)

The simplest form of Butterfloat Component

##### Returns

[`NodeDescription`](modules.md#nodedescription)

#### Defined in

[component.ts:35](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L35)

___

### StampPropertiesApply

Ƭ **StampPropertiesApply**\<`Props`\>: (`properties`: `Props`) => `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Props` | `any` |

#### Type declaration

▸ (`properties`): `boolean`

Property filter function for a Stamp alternative

##### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Props` |

##### Returns

`boolean`

#### Defined in

[stamp-collection.ts:8](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/stamp-collection.ts#L8)

___

### StateSetter

Ƭ **StateSetter**\<`T`\>: `T` \| (`currentValue`: `T`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[butterfly.ts:3](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/butterfly.ts#L3)

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

[jsx.ts:172](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L172)

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

[component.ts:27](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L27)

___

### Fragment

▸ **Fragment**(`attributes`, `...children`): [`NodeDescription`](modules.md#nodedescription)

Create a fragment of other nodes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attributes` | [`ButterfloatAttributes`](modules.md#butterfloatattributes) | Attributes |
| `...children` | [`JsxChildren`](modules.md#jsxchildren) | Children |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

Fragment node

#### Defined in

[jsx.ts:186](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L186)

___

### Static

▸ **Static**(`props`): [`NodeDescription`](modules.md#nodedescription)

Attach a static DOM element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`StaticProperties`](interfaces/StaticProperties.md) | Static properties |

#### Returns

[`NodeDescription`](modules.md#nodedescription)

Static node

#### Defined in

[jsx.ts:217](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L217)

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

[component.ts:27](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L27)

___

### buildStamp

▸ **buildStamp**(`description`, `document?`): `HTMLTemplateElement`

Build a Stamp of the static DOM parts from the tree produced by a Component

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `description` | [`NodeDescription`](modules.md#nodedescription) | `undefined` | Node description tree |
| `document` | `Document` | `globalThis.document` | DOM document |

#### Returns

`HTMLTemplateElement`

Stamp (template tag)

#### Defined in

[stamp-builder.ts:11](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/stamp-builder.ts#L11)

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

[butterfly.ts:20](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/butterfly.ts#L20)

___

### hasAnyBinds

▸ **hasAnyBinds**(`description`): `boolean`

Does an element description have any binds?

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | [`ElementDescription`](interfaces/ElementDescription.md)\<[`DefaultBind`](modules.md#defaultbind)\> | Element description |

#### Returns

`boolean`

True if any dynamic binds

#### Defined in

[component.ts:277](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L277)

___

### jsx

▸ **jsx**(`element`, `attributes`, `...children`): [`NodeDescription`](modules.md#nodedescription)

Describe a node. Builder for JSX and TSX transformation.

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

[jsx.ts:231](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/jsx.ts#L231)

___

### makeTestComponentContext

▸ **makeTestComponentContext**\<`Events`\>(`events`): [`TestComponentContext`](interfaces/TestComponentContext.md)\<`Events`\>

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

[`TestComponentContext`](interfaces/TestComponentContext.md)\<`Events`\>

A test context for testing context component

#### Defined in

[component.ts:254](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/component.ts#L254)

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

[events.ts:31](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/events.ts#L31)

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

[runtime.ts:17](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/runtime.ts#L17)

___

### runOnlyStamps

▸ **runOnlyStamps**(`container`, `component`, `stamps`, `options?`, `placeholder?`, `document?`): `Subscription`

Preview only functionality because Butterfloat internally uses anonymous components

Run a Butterfloat component with only Stamps

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `Element` | `undefined` | Container the component will be a child in |
| `component` | [`ComponentDescription`](interfaces/ComponentDescription.md) \| [`Component`](modules.md#component) | `undefined` | Component or description of component to run |
| `stamps` | [`StampCollection`](classes/StampCollection.md) | `undefined` | - |
| `options?` | [`RuntimeOptions`](interfaces/RuntimeOptions.md) | `undefined` | - |
| `placeholder?` | `Element` \| `CharacterData` | `undefined` | Optional placeholder child of the container to replace |
| `document` | `Document` | `globalThis.document` | Document to use for creating new nodes |

#### Returns

`Subscription`

Subscription

#### Defined in

[runtime-only-stamps.ts:20](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/runtime-only-stamps.ts#L20)

___

### runStamps

▸ **runStamps**(`container`, `component`, `stamps`, `options?`, `placeholder?`, `document?`): `Subscription`

Run a Butterfloat component with Stamps

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `container` | `Element` | `undefined` | Container the component will be a child in |
| `component` | [`ComponentDescription`](interfaces/ComponentDescription.md) \| [`Component`](modules.md#component) | `undefined` | Component or description of component to run |
| `stamps` | [`StampCollection`](classes/StampCollection.md) | `undefined` | - |
| `options?` | [`RuntimeOptions`](interfaces/RuntimeOptions.md) | `undefined` | - |
| `placeholder?` | `Element` \| `CharacterData` | `undefined` | Optional placeholder child of the container to replace |
| `document` | `Document` | `globalThis.document` | Document to use for creating new nodes |

#### Returns

`Subscription`

Subscription

#### Defined in

[runtime-stamps.ts:18](https://github.com/WorldMaker/butterfloat/blob/0fc9e0b/runtime-stamps.ts#L18)
