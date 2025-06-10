[butterfloat](../README.md) / [Exports](../modules.md) / ErrorBoundaryProps

# Interface: ErrorBoundaryProps

Properties supported by the `<ErrorBoundary>` pseudo-component

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

[error-boundary.ts:28](https://github.com/WorldMaker/butterfloat/blob/51a08e2/error-boundary.ts#L28)

___

### errorViewBindMode

• `Optional` **errorViewBindMode**: ``"append"`` \| ``"prepend"``

Bind mode for error views. Defaults to 'prepend'.

#### Defined in

[error-boundary.ts:33](https://github.com/WorldMaker/butterfloat/blob/51a08e2/error-boundary.ts#L33)

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

[error-boundary.ts:44](https://github.com/WorldMaker/butterfloat/blob/51a08e2/error-boundary.ts#L44)
