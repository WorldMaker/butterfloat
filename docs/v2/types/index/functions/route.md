[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / route

# Function: route()

> **route**\<`Inputs`\>(`input?`, `mode?`): [`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Defined in: [v2/route.ts:340](https://github.com/WorldMaker/butterfloat/blob/abf91429ecafb6e62dab9ef64728d534d7159105/v2/route.ts#L340)

Route an Observable to child components

This creates a child binding route map that can be used for building
stamp-aware component trees.

## Type Parameters

### Inputs

`Inputs` = `unknown`

## Parameters

### input?

`Observable`\<`Inputs`\>

Observable to route to child components

### mode?

Children binding mode

`"replace"` | `"append"` | `"prepend"`

## Returns

[`ChildRouteBuilder`](../classes/ChildRouteBuilder.md)\<`Inputs`\>

Route builder
