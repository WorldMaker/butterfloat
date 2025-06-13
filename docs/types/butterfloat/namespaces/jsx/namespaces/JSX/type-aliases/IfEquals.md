[**butterfloat**](../../../../../../index.md)

***

[butterfloat](../../../../../../index.md) / [jsx](../../../index.md) / [JSX](../index.md) / IfEquals

# Type Alias: IfEquals\<X, Y, A, B\>

> **IfEquals**\<`X`, `Y`, `A`, `B`\> = \<`T`\>() => `T` *extends* `X` ? `1` : `2` *extends* \<`T`\>() => `T` *extends* `Y` ? `1` : `2` ? `A` : `B`

Defined in: [jsx.ts:46](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/jsx.ts#L46)

If types are equal. Meta-type for complex conditional types.

## Type Parameters

### X

`X`

### Y

`Y`

### A

`A` = `X`

### B

`B` = `never`
