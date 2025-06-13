[**butterfloat**](../README.md)

***

[butterfloat](../globals.md) / ChildrenProperties

# Interface: ChildrenProperties

Defined in: [jsx.ts:159](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/jsx.ts#L159)

Properties supported by the `<Children>` pseudo-component

## Properties

### context?

> `optional` **context**: [`ComponentContext`](ComponentContext.md)\<`unknown`\>

Defined in: [jsx.ts:167](https://github.com/WorldMaker/butterfloat/blob/f0f5f6205e72911354af687f4fb1c543d3ebd586/jsx.ts#L167)

Context for the component to bind the children from, for deep binding.

This allows for binding children deeper into the tree, such as passing
your component's children into a "render function" of a deeper component
in the tree.
