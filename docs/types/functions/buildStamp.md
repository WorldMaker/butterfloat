---
title: buildStamp
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / buildStamp

# Function: buildStamp()

> **buildStamp**(`description`, `document?`): `HTMLTemplateElement`

Defined in: [stamp-builder.ts:11](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/stamp-builder.ts#L11)

Build a Stamp of the static DOM parts from the tree produced by a Component

## Parameters

### description

[`NodeDescription`](../type-aliases/NodeDescription.md)

Node description tree

### document?

`Document` = `globalThis.document`

DOM document

## Returns

`HTMLTemplateElement`

Stamp (template tag)
