[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / IfEquals

# Type Alias: IfEquals\<X, Y, A, B\>

> **IfEquals**\<`X`, `Y`, `A`, `B`\> = \<`T`\>() => `T` _extends_ `X` ? `1` : `2` _extends_ \<`T`\>() => `T` _extends_ `Y` ? `1` : `2` ? `A` : `B`

Defined in: [v2/meta-types.ts:8](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/meta-types.ts#L8)

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
