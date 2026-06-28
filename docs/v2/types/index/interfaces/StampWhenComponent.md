[**butterfloat**](../../butterfloat.md)

---

[butterfloat](../../butterfloat.md) / [index](../butterfloat.md) / StampWhenComponent

# Interface: StampWhenComponent\<Props\>

Defined in: [v2/stamp.ts:22](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/stamp.ts#L22)

Simple, stable component with attached condition for stamp reuse.

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### condition()

> **condition**: (`props`) => `boolean`

Defined in: [v2/stamp.ts:28](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/stamp.ts#L28)

Condition to determine if the stamp matches for this component.

#### Parameters

##### props

`Props`

Props of the component to determine if the stamp matches.

#### Returns

`boolean`

True if the stamp matches, false otherwise.

---

### jsonProps?

> `optional` **jsonProps**: `Props`

Defined in: [v2/stamp.ts:36](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/stamp.ts#L36)

JSON serialziable "canonical" representation of the applicable props to this stamp.

---

### ring

> **ring**: [`Ring`](../type-aliases/Ring.md)

Defined in: [v2/stamp.ts:32](https://github.com/WorldMaker/butterfloat/blob/8bb7c26d4a2b22df7ce934175f236b2a73e1fe7f/v2/stamp.ts#L32)

Ring output of the component.
