[**butterfloat**](../../../../../../index.md)

***

[butterfloat](../../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [jsx.ts:79](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/jsx.ts#L79)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
