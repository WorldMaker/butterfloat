---
title: ChildrenProperties
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / ChildrenProperties

# Interface: ChildrenProperties

Defined in: [jsx.ts:159](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/jsx.ts#L159)

Properties supported by the `<Children>` pseudo-component

## Properties

### context?

> `optional` **context?**: [`ComponentContext`](ComponentContext.md)\<`unknown`\>

Defined in: [jsx.ts:167](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/jsx.ts#L167)

Context for the component to bind the children from, for deep binding.

This allows for binding children deeper into the tree, such as passing
your component's children into a "render function" of a deeper component
in the tree.
