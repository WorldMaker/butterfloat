---
title: Route
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / Route

# Type Alias: Route\<Inputs, Props\>

> **Route**\<`Inputs`, `Props`\> = \[`when`: (`inputs`) => `Props` \| `false`, `component`: [`Component`](Component.md)\<`Props`\>, `bookProps?`: `Props` \| `Props`[], `options?`: `RouteOptions`\]

Defined in: [v2/route.ts:23](https://github.com/WorldMaker/butterfloat/blob/db089724455df59238b08e38420b31487ad712d9/v2/route.ts#L23)

A route that can be used to bind a component's children to an observable input.
If the when function returns false, the next route will be tried.

## Type Parameters

### Inputs

`Inputs` = `any`

### Props

`Props` = `any`

## Param

**when**

Function to determine if the route should be used based on the input

## Param

**component**

Component to render when the route is matched

## Param

**bookProps**

Optional JSON serializable "canonical" props for the component stamp variant
