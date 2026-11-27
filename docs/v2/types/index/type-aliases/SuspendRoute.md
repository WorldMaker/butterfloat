---
title: SuspendRoute
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / SuspendRoute

# Type Alias: SuspendRoute\<Props\>

> **SuspendRoute**\<`Props`\> = \[`map`: (`suspended`) => `Props` \| `false`, `component`: [`Component`](Component.md)\<`Props`\>, `bookProps?`: `Props` \| `Props`[]\]

Defined in: [v2/route.ts:66](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L66)

Suspend Route

Map a suspension state to a component that can handle it. If the map function returns false,
the next route will be tried.

## Type Parameters

### Props

`Props` = `any`

## Param

**map**

Function to map a suspension state to a component's props

## Param

**component**

Component to render when a suspension state occurs

## Param

**bookProps**

Optional JSON serializable "canonical" props for the component stamp variant
