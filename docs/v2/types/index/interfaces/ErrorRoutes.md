[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / ErrorRoutes

# Interface: ErrorRoutes

Defined in: [v2/route.ts:99](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/route.ts#L99)

Error Routes

A set of routes that can be used to bind a component's children to an error boundary.

## Properties

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:103](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/route.ts#L103)

The mode to bind the error component to the parent component's children.

---

### routes

> **routes**: [`ErrorRoute`](../type-aliases/ErrorRoute.md)\<`any`\>[]

Defined in: [v2/route.ts:107](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/route.ts#L107)

The routes for handling errors.
