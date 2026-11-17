---
title: HtmlElementAttributesBind
layout: api-page.vto
order: 200
tags:
  - api
---

[**butterfloat**](../../../../../../index.md)

***

[butterfloat](../../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [jsx.ts:79](https://github.com/WorldMaker/butterfloat/blob/986495a8bfd4fa00193a091b9237b34ebdd2433e/jsx.ts#L79)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
