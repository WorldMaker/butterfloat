[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / DelayBind

# Interface: DelayBind

Defined in: [v2/component.ts:69](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/component.ts#L69)

Support for delay binding special properties

## Properties

### bfDelayValue?

> `optional` **bfDelayValue**: `Observable`\<`unknown`\>

Defined in: [v2/component.ts:78](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/component.ts#L78)

Delay scheduled binding for the "value" property.

Value is bound immediately by default to avoid user interaction
problems. This provides an opt-in for tested interaction patterns
and rare elements that use "value" for things aren't user
interaction such as <progress />.
