[**butterfloat**](../../index.md)

---

[butterfloat](../../index.md) / [index](../index.md) / ChildRouteBuilder

# Class: ChildRouteBuilder\<Inputs\>

Defined in: [v2/route.ts:153](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L153)

Fluid builder for child routes

## Type Parameters

### Inputs

`Inputs` = `unknown`

## Constructors

### Constructor

> **new ChildRouteBuilder**\<`Inputs`\>(`input?`, `mode?`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:165](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L165)

#### Parameters

##### input?

`Observable`\<`Inputs`\>

##### mode?

`"replace"` | `"append"` | `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

## Methods

### build()

> **build**(): [`ChildRoutes`](../interfaces/ChildRoutes.md)

Defined in: [v2/route.ts:296](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L296)

Build the child routes

#### Returns

[`ChildRoutes`](../interfaces/ChildRoutes.md)

Child routes for childrenBind

---

### onComplete()

> **onComplete**(`component`, `mode`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:283](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L283)

Add a completion boundary component

There may be only one completion boundary component. If multiple are added, the last one will be used.

#### Parameters

##### component

[`Component`](../type-aliases/Component.md)

Component to render when a completion occurs

##### mode

Child binding mode for the completion boundary component

`"replace"` | `"append"` | `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### onError()

> **onError**\<`Props`\>(`map`, `component`, `jsonProps?`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:266](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L266)

Add an error boundary route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### map

(`error`) => `false` \| `Props`

Map an error to a set of props for an error component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when an error occurs

##### jsonProps?

`Props`

Optional JSON serializable props for the error component's stamp variant

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### suspend()

> **suspend**(`suspend`, `mode`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:220](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L220)

Create a suspension boundary

#### Parameters

##### suspend

`Observable`\<`boolean`\>

Observable that determines if the suspension boundary is active

##### mode

Child binding mode for the suspension boundary

`"replace"` | `"append"` | `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### when()

> **when**\<`Props`\>(`when`, `component`, `jsonProps?`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:205](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L205)

Add a child route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### when

(`inputs`) => `false` \| `Props`

Function to map inputs to a set of props for the child component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when the route matches

##### jsonProps?

`Props`

Optional JSON serializable props for the child component's stamp variant

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### whenSuspended()

> **whenSuspended**\<`Props`\>(`map`, `component`, `jsonProps?`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:236](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L236)

Add a suspension boundary route

#### Type Parameters

##### Props

`Props`

#### Parameters

##### map

(`suspended`) => `false` \| `Props`

Map a suspension state to a set of props for a suspension component

##### component

[`Component`](../type-aliases/Component.md)\<`Props`\>

Component to render when suspended

##### jsonProps?

`Props`

Optional JSON serializable props for the suspension component's stamp variant

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### withErrorMode()

> **withErrorMode**(`mode`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:252](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L252)

Set the child binding mode for the error boundary

If not set, the default is 'append'. Last call wins if multiple calls are made.

#### Parameters

##### mode

Child binding mode for the error boundary

`"replace"` | `"append"` | `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this

---

### withInput()

> **withInput**\<`T`\>(`input`): `ChildRouteBuilder`\<`T`\>

Defined in: [v2/route.ts:181](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L181)

Set the input observable for the routes

It's preferable to set the input observable in the constructor, but this method can be used to set it
after construction. Overrides any previously set input observable.

#### Type Parameters

##### T

`T`

#### Parameters

##### input

`Observable`\<`T`\>

Observable to route to child components

#### Returns

`ChildRouteBuilder`\<`T`\>

this but type adjusted to the new input type

---

### withMode()

> **withMode**(`mode`): `ChildRouteBuilder`\<`Inputs`\>

Defined in: [v2/route.ts:193](https://github.com/WorldMaker/butterfloat/blob/5ef5606b21e7b4d0eaccd4053808a16364ffbcee/v2/route.ts#L193)

Set the child binding mode for the routes

If not set, the default is 'append'. Last call wins if multiple calls are made.

#### Parameters

##### mode

Child binding mode for the routes

`"replace"` | `"append"` | `"prepend"`

#### Returns

`ChildRouteBuilder`\<`Inputs`\>

this
