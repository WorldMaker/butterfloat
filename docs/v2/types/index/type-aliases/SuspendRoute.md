[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / SuspendRoute

# Type Alias: SuspendRoute\<Props\>

> **SuspendRoute**\<`Props`\> = \[(`suspended`) => `Props` \| `false`, [`Component`](Component.md)\<`Props`\>, `Props`\]

Defined in: [v2/route.ts:51](https://github.com/WorldMaker/butterfloat/blob/4298a71ecb56d7968e79381ec7094547a652efc1/v2/route.ts#L51)

Suspend Route

Map a suspension state to a component that can handle it. If the map function returns false,
the next route will be tried.

## Type Parameters

### Props

`Props` = `any`

## Param

Function to map a suspension state to a component's props

## Param

Component to render when a suspension state occurs

## Param

Optional JSON serializable "canonical" props for the component stamp variant
