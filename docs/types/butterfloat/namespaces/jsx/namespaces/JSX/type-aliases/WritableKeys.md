[**butterfloat**](../../../../../../README.md)

***

[butterfloat](../../../../../../globals.md) / [jsx](../../../README.md) / [JSX](../README.md) / WritableKeys

# Type Alias: WritableKeys\<T\>

> **WritableKeys**\<`T`\> = `{ [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P> }`\[keyof `T`\]

Defined in: [jsx.ts:55](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/jsx.ts#L55)

Collect the writable keys of a type.

## Type Parameters

### T

`T`
