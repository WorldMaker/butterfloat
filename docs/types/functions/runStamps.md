---
title: runStamps
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / runStamps

# Function: runStamps()

> **runStamps**(`container`, `component`, `stamps`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime-stamps.ts:17](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/runtime-stamps.ts#L17)

Run a Butterfloat component with Stamps

## Parameters

### container

`Element`

Container the component will be a child in

### component

[`ComponentDescription`](../interfaces/ComponentDescription.md) \| [`Component`](../type-aliases/Component.md)

Component or description of component to run

### stamps

[`StampCollection`](../classes/StampCollection.md)

### options?

[`RuntimeOptions`](../interfaces/RuntimeOptions.md)

### placeholder?

`Element` \| `CharacterData`

Optional placeholder child of the container to replace

### document?

`Document` = `globalThis.document`

Document to use for creating new nodes

## Returns

`Subscription`

Subscription
