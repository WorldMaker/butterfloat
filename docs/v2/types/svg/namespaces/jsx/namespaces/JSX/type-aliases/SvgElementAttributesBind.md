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

Defined in: [v2/jsx/svg.ts:55](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/jsx/svg.ts#L55)

Observable bindable attributes of an SVG Element

## Type Parameters

### T

`T`
