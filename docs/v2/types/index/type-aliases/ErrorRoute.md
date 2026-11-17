---
title: ErrorRoute
layout: preview-page.vto
order: 200
tags:
  - preview
---

[**butterfloat**](../../index.md)

***

[butterfloat](../../index.md) / [index](../index.md) / ErrorRoute

# Type Alias: ErrorRoute\<Props\>

> **ErrorRoute**\<`Props`\> = \[`map`: (`error`) => `Props` \| `false`, `component`: [`Component`](Component.md)\<`Props`\>, `jsonProps?`: `Props`\]

Defined in: [v2/route.ts:88](https://github.com/WorldMaker/butterfloat/blob/51f7df6624b5ddc4fd0750e3754beaba5e5105c1/v2/route.ts#L88)

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

**jsonProps**

Optional JSON serializable "canonical" props for the component stamp variant
