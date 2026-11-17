---
title: WritableKeys
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../../../../../../index.md)

***

[butterfloat](../../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [jsx.ts:55](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/jsx.ts#L55)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
