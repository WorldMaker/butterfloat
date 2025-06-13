[**butterfloat**](../README.md)

***

[butterfloat](../globals.md) / runOnlyStamps

# Function: runOnlyStamps()

> **runOnlyStamps**(`container`, `component`, `stamps`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime-only-stamps.ts:20](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/runtime-only-stamps.ts#L20)

**`Experimental`**

Preview only functionality because Butterfloat internally uses anonymous components

Run a Butterfloat component with only Stamps

## Parameters

### container

`Element`

Container the component will be a child in

### component

Component or description of component to run

[`ComponentDescription`](../interfaces/ComponentDescription.md) | [`Component`](../type-aliases/Component.md)

### stamps

[`StampCollection`](../classes/StampCollection.md)

### options?

[`RuntimeOptions`](../interfaces/RuntimeOptions.md)

### placeholder?

Optional placeholder child of the container to replace

`Element` | `CharacterData`

### document?

`Document` = `globalThis.document`

Document to use for creating new nodes

## Returns

`Subscription`

Subscription
