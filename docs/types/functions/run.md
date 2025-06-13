[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / run

# Function: run()

> **run**(`container`, `component`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime.ts:16](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/runtime.ts#L16)

Run a Butterfloat component

## Parameters

### container

`Element`

Container the component will be a child in

### component

Component or description of component to run

[`ComponentDescription`](../interfaces/ComponentDescription.md) | [`Component`](../type-aliases/Component.md)

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
