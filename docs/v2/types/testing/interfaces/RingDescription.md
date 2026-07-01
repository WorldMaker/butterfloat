[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [testing](../index.md) / RingDescription

# Interface: RingDescription\<Props\>

Defined in: [v2/testing/mat.ts:112](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L112)

A Component Context for Testing purposes

## Type Parameters

### Props

`Props` = `unknown`

## Properties

### defaultXmlns

> **defaultXmlns**: `null` \| `string`

Defined in: [v2/testing/mat.ts:147](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L147)

The default XML namespace registered for the Component

---

### description

> **description**: `string` \| [`NodeDescription`](../type-aliases/NodeDescription.md)

Defined in: [v2/testing/mat.ts:116](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L116)

The description of the Ring output of the Component

---

### effects

> **effects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:122](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L122)

The effects that were bound during the Component's execution

---

### immediateEffects

> **immediateEffects**: \[`Observable`\<`unknown`\>, (`item`) => `void`\][]

Defined in: [v2/testing/mat.ts:127](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L127)

The immediate effects that were bound during the Component's execution

---

### isStamp

> **isStamp**: `boolean`

Defined in: [v2/testing/mat.ts:135](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L135)

Whether the Component was marked as a stamp

---

### removal

> **removal**: `null` \| `Observable`\<`unknown`\>

Defined in: [v2/testing/mat.ts:131](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L131)

The removal effect that was bound during the Component's execution

---

### stampCondition

> **stampCondition**: `null` \| (`props`) => `boolean`

Defined in: [v2/testing/mat.ts:139](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L139)

The condition used to determine if the Component should be stamped

---

### stampJsonProps

> **stampJsonProps**: `null` \| `Props`

Defined in: [v2/testing/mat.ts:143](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L143)

The JSON serializable "canonical" props provided for the stamp

---

### xmlns

> **xmlns**: `Record`\<`string`, `string`\>

Defined in: [v2/testing/mat.ts:151](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/testing/mat.ts#L151)

The XML namespaces registered for the Component
