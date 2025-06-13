[**butterfloat**](../README.md)

***

[butterfloat](../globals.md) / run

# Function: run()

> **run**(`container`, `component`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime.ts:17](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/runtime.ts#L17)

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
