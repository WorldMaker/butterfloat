[**butterfloat**](../index.md)

***

[butterfloat](../index.md) / ChildrenProperties

# Interface: ChildrenProperties

Defined in: [jsx.ts:159](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/jsx.ts#L159)

Properties supported by the `<Children>` pseudo-component

## Properties

### context?

> `optional` **context**: [`ComponentContext`](ComponentContext.md)\<`unknown`\>

Defined in: [jsx.ts:167](https://github.com/WorldMaker/butterfloat/blob/df545ef96728808e6ed86d129bea41fdc458751b/jsx.ts#L167)

Context for the component to bind the children from, for deep binding.

This allows for binding children deeper into the tree, such as passing
your component's children into a "render function" of a deeper component
in the tree.
