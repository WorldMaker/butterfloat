[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / DelayBind

# Interface: DelayBind

Defined in: [v2/component.ts:68](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L68)

Support for delay binding special properties

## Properties

### bfDelayValue?

> `optional` **bfDelayValue**: `Observable`\<`unknown`\>

Defined in: [v2/component.ts:77](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/component.ts#L77)

Delay scheduled binding for the "value" property.

Value is bound immediately by default to avoid user interaction
problems. This provides an opt-in for tested interaction patterns
and rare elements that use "value" for things aren't user
interaction such as <progress />.
