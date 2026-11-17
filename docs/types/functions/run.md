---
title: run
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / run

# Function: run()

> **run**(`container`, `component`, `options?`, `placeholder?`, `document?`): `Subscription`

Defined in: [runtime.ts:16](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/runtime.ts#L16)

Run a Butterfloat component

## Parameters

### container

`Element`

Container the component will be a child in

### component

[`ComponentDescription`](../interfaces/ComponentDescription.md) \| [`Component`](../type-aliases/Component.md)

Component or description of component to run

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
