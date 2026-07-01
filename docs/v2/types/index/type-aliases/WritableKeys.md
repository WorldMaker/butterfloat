[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [v2/meta-types.ts:17](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/meta-types.ts#L17)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
