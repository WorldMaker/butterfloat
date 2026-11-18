---
title: IfEquals
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / IfEquals

# Type Alias: IfEquals\<X, Y, A, B\>

> **IfEquals**\<`X`, `Y`, `A`, `B`\> = \<`T`\>() => `T` _extends_ `X` ? `1` : `2` _extends_ \<`T`\>() => `T` _extends_ `Y` ? `1` : `2` ? `A` : `B`

Defined in: [v2/meta-types.ts:8](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/meta-types.ts#L8)

If types are equal. Meta-type for complex conditional types.

## Type Parameters

### X

`X`

### Y

`Y`

### A

`A` = `X`

### B

`B` = `never`
