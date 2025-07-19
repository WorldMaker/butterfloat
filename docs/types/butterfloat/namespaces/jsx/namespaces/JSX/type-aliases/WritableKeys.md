[**butterfloat**](../../../../../../index.md)

***

[butterfloat](../../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [jsx.ts:55](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/jsx.ts#L55)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
