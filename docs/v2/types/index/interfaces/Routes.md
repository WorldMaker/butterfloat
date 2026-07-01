[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / Routes

# Interface: Routes\<Inputs\>

Defined in: [v2/route.ts:25](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/route.ts#L25)

Routes

A set of routes that can be used to bind a component's children to an observable input.

## Type Parameters

### Inputs

`Inputs` = `any`

## Properties

### input

> **input**: `Observable`\<`Inputs`\>

Defined in: [v2/route.ts:29](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/route.ts#L29)

Observable that produces inputs to route to child components

---

### mode

> **mode**: `"replace"` \| `"append"` \| `"prepend"`

Defined in: [v2/route.ts:33](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/route.ts#L33)

The mode to bind the child components to the parent component's children.

---

### routes

> **routes**: [`Route`](../type-aliases/Route.md)\<`Inputs`, `any`\>[]

Defined in: [v2/route.ts:37](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/route.ts#L37)

The routes for handling the inputs.
