[**butterfloat**](../../../../../../butterfloat.md)

---

[butterfloat](../../../../../../butterfloat.md) / [index](../../../../../butterfloat.md) / [jsx](../../../butterfloat.md) / [JSX](../butterfloat.md) / HtmlElementAttributesBind

# Type Alias: HtmlElementAttributesBind\<T\>

> **HtmlElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/internal.ts:49](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/jsx/internal.ts#L49)

Observable bindable attributes of an HTML Element

## Type Parameters

### T

`T`
