[**butterfloat**](../../../../../../butterfloat.md)

---

[butterfloat](../../../../../../butterfloat.md) / [svg](../../../../../butterfloat.md) / [jsx](../../../butterfloat.md) / [JSX](../butterfloat.md) / SvgElementAttributesBind

# Type Alias: SvgElementAttributesBind\<T\>

> **SvgElementAttributesBind**\<`T`\> = \{ \[Property in WritableKeys\<T\> as T\[Property\] extends string \| number \| null \| undefined ? Property : never\]?: Observable\<T\[Property\]\> \}

Defined in: [v2/jsx/svg.ts:50](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/jsx/svg.ts#L50)

Observable bindable attributes of an SVG Element

## Type Parameters

### T

`T`
