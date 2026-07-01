[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / SuspendRoutes

# Interface: SuspendRoutes

Defined in: [v2/route.ts:62](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L62)

Suspend Routes

A set of routes that can be used to bind a component's children to a suspension boundary.

## Properties

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:70](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L70)

The mode to bind the suspension component to the parent component's children.

---

### routes

> **routes**: [`SuspendRoute`](../type-aliases/SuspendRoute.md)\<`any`\>[]

Defined in: [v2/route.ts:74](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L74)

The routes for handling suspension states.

---

### suspend

> **suspend**: `Observable`\<`boolean`\>

Defined in: [v2/route.ts:66](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L66)

Observable that determines if the suspension boundary is active
