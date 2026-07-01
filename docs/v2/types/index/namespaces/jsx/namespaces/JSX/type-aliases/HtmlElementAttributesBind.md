[**butterfloat**](../../../../../../index.md)

---

[butterfloat](../../../../../../index.md) / [index](../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/internal.ts:49](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/jsx/internal.ts#L49)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
