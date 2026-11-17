---
title: SvgElementAttributesBind
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../../../../../index.md)

---

[butterfloat](../../../../../../index.md) / [svg](../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / SvgElementAttributesBind

# Type Alias: SvgElementAttributesBind\<T\>

> **SvgElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/svg.ts:50](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/jsx/svg.ts#L50)

Observable bindable attributes of an SVG Element

## Type Parameters

### T

`T`
