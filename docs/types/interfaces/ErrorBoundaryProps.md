[butterfloat](../README.md) / [Exports](../modules.md) / ErrorBoundaryProps

# Interface: ErrorBoundaryProps

## Table of contents

### Properties

- [errorView](ErrorBoundaryProps.md#errorview)
- [errorViewBindMode](ErrorBoundaryProps.md#errorviewbindmode)
- [preserveOnComplete](ErrorBoundaryProps.md#preserveoncomplete)

## Properties

### errorView

• **errorView**: [`SimpleComponent`](../modules.md#simplecomponent) \| [`ContextComponent`](../modules.md#contextcomponent)\<[`ErrorViewProps`](ErrorViewProps.md)\>

Component to view when an error occurs below this boundary.

#### Defined in

[error-boundary.ts:22](https://github.com/WorldMaker/butterfloat/blob/75c28b8/error-boundary.ts#L22)

___

### errorViewBindMode

• `Optional` **errorViewBindMode**: ``"append"`` \| ``"prepend"``

Bind mode for error views. Defaults to 'prepend'.

#### Defined in

[error-boundary.ts:27](https://github.com/WorldMaker/butterfloat/blob/75c28b8/error-boundary.ts#L27)

___

### preserveOnComplete

• `Optional` **preserveOnComplete**: `boolean`

Preserve DOM contents of the errored tree.

This is primarily a Debug tool. Components will still be unbound
as a part of completion so it leaves "dead" components around,
which are useful for debugging. Your error view may be enough
to warn users that the surrounding components have died, in which
case you may be able to make this useful in production builds as
well (as opposed to setting this in a raw `RuntimeOptions`).

#### Defined in

[error-boundary.ts:38](https://github.com/WorldMaker/butterfloat/blob/75c28b8/error-boundary.ts#L38)
