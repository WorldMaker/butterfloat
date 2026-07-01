[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / Route

# Type Alias: Route\<Inputs, Props\>

> **Route**\<`Inputs`, `Props`\> = \[(`inputs`) => `Props` \| `false`, [`Component`](Component.md)\<`Props`\>, `Props`\]

Defined in: [v2/route.ts:13](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L13)

A route that can be used to bind a component's children to an observable input.
If the when function returns false, the next route will be tried.

## Type Parameters

### Inputs

`Inputs` = `any`

### Props

`Props` = `any`

## Param

Function to determine if the route should be used based on the input

## Param

Component to render when the route is matched

## Param

Optional JSON serializable "canonical" props for the component stamp variant
