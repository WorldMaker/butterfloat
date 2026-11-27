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

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: BindObservable\<T\[Property\]\> \}

Defined in: [v2/jsx/internal.ts:48](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/jsx/internal.ts#L48)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
