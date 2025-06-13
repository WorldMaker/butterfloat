[**butterfloat**](../../../../../../README.md)

***

[butterfloat](../../../../../../globals.md) / [jsx](../../../README.md) / [JSX](../README.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [jsx.ts:79](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/jsx.ts#L79)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
