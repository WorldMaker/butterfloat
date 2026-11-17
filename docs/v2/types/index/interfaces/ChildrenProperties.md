---
title: ChildrenProperties
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ChildrenProperties

# Interface: ChildrenProperties

Defined in: [v2/rings/children.ts:19](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/rings/children.ts#L19)

Properties supported by the `<Children>` pseudo-component

## Properties

### context

> **context**: [`Mat`](Mat.md)\<`unknown`\>

Defined in: [v2/rings/children.ts:27](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/rings/children.ts#L27)

Context for the component to bind the children from, for deep binding.

This allows for binding children deeper into the tree, such as passing
your component's children into a "render function" of a deeper component
in the tree.
