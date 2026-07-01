[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ErrorRoute

# Type Alias: ErrorRoute\<Props\>

> **ErrorRoute**\<`Props`\> = \[(`error`) => `Props` \| `false`, [`Component`](Component.md)\<`Props`\>, `Props`\]

Defined in: [v2/route.ts:88](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L88)

Error Route

Map an error to a component that can handle it. If the map function returns false,
the next route will be tried.

## Type Parameters

### Props

`Props` = `any`

## Param

Function to map an error to a component's props

## Param

Component to render when an error occurs

## Param

Optional JSON serializable "canonical" props for the component stamp variant
