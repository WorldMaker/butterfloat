[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / butterfly

# Function: butterfly()

> **butterfly**\<`T`\>(`startingValue`): \[`Observable`\<`T`\>, (`value`) => `void`, (`error`) => `void`, () => `void`\]

Defined in: [butterfly.ts:20](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/butterfly.ts#L20)

Create an atomic Observable for representation of a small piece of state while splitting
the read API and write APIs in a way making it easier to protect write APIs from escaping
API boundaries.

In this case "butterfly" is something of an analogy to "butterfly your shrimp", but also
just an evocative name that calls back to the origins of this engine's own name.

This is just a simple BehaviorSubject constructor/wrapper that is made to resemble React's
useState with the idea of making it less likely to leak the subject as a whole across API
boundaries by thinking of it as a tuple of two to four things, three of which should be
"private".

## Type Parameters

### T

`T`

## Parameters

### startingValue

`T`

Starting value for atomic

## Returns

\[`Observable`\<`T`\>, (`value`) => `void`, (`error`) => `void`, () => `void`\]

[observable, next, error, complete]
