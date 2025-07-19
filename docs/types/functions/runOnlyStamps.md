[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / runOnlyStamps

# Function: runOnlyStamps()

> **runOnlyStamps**(`container`, `component`, `stamps`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime-only-stamps.ts:19](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/runtime-only-stamps.ts#L19)

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
