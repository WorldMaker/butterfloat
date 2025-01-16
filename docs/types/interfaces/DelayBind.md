[butterfloat](../README.md) / [Exports](../modules.md) / DelayBind

# Interface: DelayBind

Support for delay binding special properties

## Table of contents

### Properties

- [bfDelayValue](DelayBind.md#bfdelayvalue)

## Properties

### bfDelayValue

• `Optional` **bfDelayValue**: `Observable`\<`unknown`\>

Delay scheduled binding for the "value" property.

Value is bound immediately by default to avoid user interaction
problems. This provides an opt-in for tested interaction patterns
and rare elements that use "value" for things aren't user
interaction such as <progress />.

#### Defined in

[component.ts:103](https://github.com/WorldMaker/butterfloat/blob/981cdb4/component.ts#L103)
