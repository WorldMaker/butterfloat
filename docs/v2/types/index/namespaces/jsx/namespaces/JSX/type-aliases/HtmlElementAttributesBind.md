[**butterfloat**](../../../../../../butterfloat.md)

***

[butterfloat](../../../../../../butterfloat.md) / [index](../../../../../butterfloat.md) / [jsx](../../../butterfloat.md) / [JSX](../butterfloat.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/internal.ts:49](https://github.com/WorldMaker/butterfloat/blob/af672d4d0ebec939f275a98eb8f06207bb8e6487/v2/jsx/internal.ts#L49)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
