---
title: Route
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / Route

# Type Alias: Route\<Inputs, Props\>

> **Route**\<`Inputs`, `Props`\> = \[`when`: (`inputs`) => `Props` \| `false`, `component`: [`Component`](Component.md)\<`Props`\>, `jsonProps?`: `Props`\]

Defined in: [v2/route.ts:13](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/route.ts#L13)

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

**jsonProps**

Optional JSON serializable "canonical" props for the component stamp variant
