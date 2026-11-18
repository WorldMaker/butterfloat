---
title: HtmlElementAttributesBind
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../../../../../index.md)

---

[butterfloat](../../../../../../index.md) / [index](../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/internal.ts:49](https://github.com/WorldMaker/butterfloat/blob/fd11e40543acd934674b5ba9db8715003f04fae5/v2/jsx/internal.ts#L49)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
