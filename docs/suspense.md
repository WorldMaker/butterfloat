# Suspense and Advanced Binding

Previously in the [Getting Started][started] tour, we discussed
[Component Children and Children Binding][children]. With a handle
on several types of binding by this point, we should be able to dig
into some of the meatier aspects of Butterfloat's binding mechanics
and some of its advanced features, especially Suspense binding.

## Default Scheduling versus Immediate Scheduling

There are two common "flavors" of binds in Butterfloat: default and
immediate. The primary places you see these flavors are in the JSX
`bind` versus `bindImmediate` attributes and in the
`ComponentContext` the differences between `bindEffect` and
`bindImmediateEffect` helpers.

The immediate flavor gets the longer names because it shouldn't be
the default. The default scheduling flavor tries to be smarter by
default.

There's one obvious exception to note that fields named `value` are
_always_ immediately bound even when in the `bind` default attribute.
This is because the way value fields usually imply a user input
space where delays would be most noticeable to users and most
detrimental to user interaction. (Though the advice here is that
you should consider twice if you need to bind an input's value.)

Default scheduling exists to orchestrate bound changes to hopefully
maximize responsiveness of the application. The general basics are
that changes are aggregated and buffered so that they happen no
_faster_ than `requestAnimationFrame` time. This allows the browser
to slow things down in the case of heavy repaints or backgrounded
windows or other user interaction priorities. This should reduce
noticeable "churn" of changes from a user's perspective (very basic
debouncing/throttling), and increase the priorities of user
interaction responsiveness.

It is suggested to start with default scheduling and then as a
developer where you learn that some updates provide a better
user experience when immediately bound, you can move those bindings
to the appropriate `bindImmediate` or `bindImmediateEffect`.

## Suspense

Suspense is an optional, added layer on top of the default
scheduling that further buffers changes based on a developer-provided
`Observable<boolean>`.

To configure suspense, you use the Suspense system-provided
component:

```tsx
import { Children, ComponentContext, Suspense, jsx } from 'butterfloat'
import { Observable } from 'rxjs'

export interface LoadableVm {
  loading: Observable<boolean>
  load(): void
}

interface LoadViewModelProps {
  vm: LoadableVm
}

export function LoadViewModel(
  { vm }: LoadViewModelProps,
  context: ComponentContext,
) {
  vm.load()
  return (
    <Suspense when={vm.loading}>
      <Children context={context} />
    </Suspense>
  )
}
```

When the provided observable is true (in this example, while the
`LoadableVm` is loading), all default-scheduled bindings for the
entire tree below the Suspense component are buffered but not
applied. Once the observable is false again, the buffered changes
will be applied.

Suspense can be a powerful tool to avoid UI bouncing and churn
and sometimes costly repaints while a complicated amount of state is
being loaded or calculated or otherwise complexly and deeply changed
or reconfigured.

Note that Suspense cannot and will not interfere with immediate
bindings and you will need to find your own way to throttle or
suspend your immediate changes to the DOM tree.

There's one other optional feature, the Suspense object can take
an optional `suspenseView` component to be swapped into place while
the suspense `when` observable is true:

```ts
function LoadViewModel(
    { vm }: LoadViewModelProps,
    context: ComponentContext,
) {
    vm.load()
    return (
    <Suspense
        when={vm.loading}
        suspenseView={() => (
        <p>
            Loading… <progress />
        </p>
        )}
    >
        <Children context={context} />
    </Suspense>
    )
}
```

Note that _both_ components and their bindings are live at the
same time, but which one is a child in the tree is swapped/replaced.
A performance consideration to keep in mind is to generally avoid
bindings in a `suspenseView`, the more static HTML it is the likely
it will perform better. Also, again, you may want to keep in mind
that your immediate bindings in _both_ trees are unaffected by any
suspense changes.

## `bfDomAttach` Event

As a last resort you may wish to manage your own bindings directly
to the `HTMLElement` in the DOM that your JSX represents. This can
be useful for bridging to classic Vanilla JS components, for
instance. To provide for this need, you can bind to the `bfDomAttach`
event on a static element.

```ts
import { ComponentContext, jsx } from 'butterfloat'
import { Observable, shareReplay, switchMap } from 'rxjs'

interface SomeVanillaComponent {
    destroy(): void
}

interface SomeVanillaComponentFactory {
    render(element: HTMLElement): SomeVanillaComponent
}

interface VanillaWrapperProps {
    vanillaFactory: SomeVanillaComponentFactory
}

interface VanillaWrapperEvents {
    attach: ObservableEvent<HTMLElement>
}

function VanillaWrapper(
    { vanillaFactory }: VanillaWrapperProps,
    { bindEffect, events }: ComponentContext<VanillaWrapperEvents>,
) {
    const wrappedVanilla = events.attach.pipe(
      switchMap(
        (element) =>
        new Observable<SomeVanillaComponent>((subscriber) => {
            const component = vanillaFactory.render(element)
            subscriber.next(component)
            return () => component.destroy()
        }),
      ),
      shareReplay(1)
    )

    bindEffect(wrappedVanilla, () => {})

    return <div events={{ bfDomAttach: events.attach }} />
}
```

One useful thing to note here is that we are handling the vanilla
component's full lifetime in the Observable through the use of
`switchMap` and making sure that we return the teardown logic of
it in the `new Observable` constructor. In general, Butterfloat
suggests using Observable lifetimes for handling resource cleanup.

`bindEffect` forces that observable to be eventually subscribed,
but if you had other bindings that depended on that `wrappedVanilla`
component you may not that empty `bindEffect` at all.

[children]: ./children.md
[started]: ./getting-started.md
