[**butterfloat**](../../butterfloat.md)

***

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / IfEquals

# Type Alias: IfEquals\<X, Y, A, B\>

> **IfEquals**\<`X`, `Y`, `A`, `B`\> = \<`T`\>() => `T` *extends* `X` ? `1` : `2` *extends* \<`T`\>() => `T` *extends* `Y` ? `1` : `2` ? `A` : `B`

Defined in: [v2/meta-types.ts:8](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/meta-types.ts#L8)

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
