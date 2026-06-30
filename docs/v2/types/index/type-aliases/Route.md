[**butterfloat**](../../butterfloat.md)

***

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / Route

# Type Alias: Route\<Inputs, Props\>

> **Route**\<`Inputs`, `Props`\> = \[(`inputs`) => `Props` \| `false`, [`Component`](Component.md)\<`Props`\>, `Props`\]

Defined in: v2/route.ts:13

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
