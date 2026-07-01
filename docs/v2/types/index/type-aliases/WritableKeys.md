[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [v2/meta-types.ts:17](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/meta-types.ts#L17)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
