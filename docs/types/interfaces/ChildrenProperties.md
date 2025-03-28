[butterfloat](../README.md) / [Exports](../modules.md) / ChildrenProperties

# Interface: ChildrenProperties

Properties supported by the `<Children>` pseudo-component

## Table of contents

### Properties

- [context](ChildrenProperties.md#context)

## Properties

### context

• `Optional` **context**: [`ComponentContext`](ComponentContext.md)\<`unknown`\>

Context for the component to bind the children from, for deep binding.

This allows for binding children deeper into the tree, such as passing
your component's children into a "render function" of a deeper component
in the tree.

#### Defined in

[jsx.ts:167](https://github.com/WorldMaker/butterfloat/blob/098685f/jsx.ts#L167)
