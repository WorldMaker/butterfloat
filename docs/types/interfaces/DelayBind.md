[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / DelayBind

# Interface: DelayBind

Defined in: [component.ts:94](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/component.ts#L94)

Support for delay binding special properties

## Properties

### bfDelayValue?

> `optional` **bfDelayValue**: `Observable`\<`unknown`\>

Defined in: [component.ts:103](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/component.ts#L103)

Delay scheduled binding for the "value" property.

Value is bound immediately by default to avoid user interaction
problems. This provides an opt-in for tested interaction patterns
and rare elements that use "value" for things aren't user
interaction such as <progress />.
