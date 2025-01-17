import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Observable, shareReplay, switchMap } from 'rxjs'
import {
  Children,
  type ComponentContext,
  type ObservableEvent,
  Suspense,
  jsx,
} from '../index.js'

describe('suspense documentation', () => {
  it('shows a simple suspense example', () => {
    interface LoadableVm {
      loading: Observable<boolean>
      load(): void
    }

    interface LoadViewModelProps {
      vm: LoadableVm
    }

    function LoadViewModel(
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

    ok(LoadViewModel)
  })

  it('shows an example with a suspense view', () => {
    interface LoadableVm {
      loading: Observable<boolean>
      load(): void
    }

    interface LoadViewModelProps {
      vm: LoadableVm
    }

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

    ok(LoadViewModel)
  })

  it('shows bfDomAttach', () => {
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
        shareReplay(1),
      )

      bindEffect(wrappedVanilla, () => {})

      return <div events={{ bfDomAttach: events.attach }} />
    }

    ok(VanillaWrapper)
  })
})
