[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [v2/meta-types.ts:17](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/meta-types.ts#L17)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
