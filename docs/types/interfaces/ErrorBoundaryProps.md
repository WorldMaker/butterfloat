[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / ErrorBoundaryProps

# Interface: ErrorBoundaryProps

Defined in: [error-boundary.ts:24](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/error-boundary.ts#L24)

Properties supported by the `<ErrorBoundary>` pseudo-component

## Properties

### errorView

> **errorView**: [`SimpleComponent`](../type-aliases/SimpleComponent.md) \| [`ContextComponent`](../type-aliases/ContextComponent.md)\<[`ErrorViewProps`](ErrorViewProps.md)\>

Defined in: [error-boundary.ts:28](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/error-boundary.ts#L28)

Component to view when an error occurs below this boundary.

***

### errorViewBindMode?

> `optional` **errorViewBindMode**: `"append"` \| `"prepend"`

Defined in: [error-boundary.ts:33](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/error-boundary.ts#L33)

Bind mode for error views. Defaults to 'prepend'.

***

### preserveOnComplete?

> `optional` **preserveOnComplete**: `boolean`

Defined in: [error-boundary.ts:44](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/error-boundary.ts#L44)

Preserve DOM contents of the errored tree.

This is primarily a Debug tool. Components will still be unbound
as a part of completion so it leaves "dead" components around,
which are useful for debugging. Your error view may be enough
to warn users that the surrounding components have died, in which
case you may be able to make this useful in production builds as
well (as opposed to setting this in a raw `RuntimeOptions`).
