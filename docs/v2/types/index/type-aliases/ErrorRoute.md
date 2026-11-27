---
title: ErrorRoute
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ErrorRoute

# Type Alias: ErrorRoute\<Props\>

> **ErrorRoute**\<`Props`\> = \[`map`: (`error`) => `Props` \| `false`, `component`: [`Component`](Component.md)\<`Props`\>, `bookProps?`: `Props` \| `Props`[]\]

Defined in: [v2/route.ts:103](https://github.com/WorldMaker/butterfloat/blob/b4273efab3f0cf481e72bdc16afc8960d40d96e1/v2/route.ts#L103)

Error Route

Map an error to a component that can handle it. If the map function returns false,
the next route will be tried.

## Type Parameters

### Props

`Props` = `any`

## Param

**map**

Function to map an error to a component's props

## Param

**component**

Component to render when an error occurs

## Param

**bookProps**

Optional JSON serializable "canonical" props for the component stamp variant
