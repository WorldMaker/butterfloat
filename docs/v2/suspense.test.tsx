import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { Observable, shareReplay, switchMap } from 'rxjs'
import {
  stamp,
  suspend,
  Children,
  type ObservableEvent,
  type jsx,
} from '../../v2/index.js'

describe('v2 suspense documentation', () => {
  it('shows a simple suspense example', () => {
    interface LoadableVm {
      loading: Observable<boolean>
      load(): void
    }

    interface LoadViewModelProps {
      vm: LoadableVm
    }

    function LoadViewModel({ vm }: LoadViewModelProps, mat: jsx.Mat) {
      const { jsx } = mat
      vm.load()
      const suspendRoute = suspend(vm.loading).build()
      return (
        <div childrenBind={suspendRoute}>
          <Children context={mat} />
        </div>
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

    const LoadingView = stamp((jsx) => (
      <p>
        Loading… <progress />
      </p>
    ))

    function LoadViewModel({ vm }: LoadViewModelProps, mat: jsx.Mat) {
      const { jsx } = mat
      vm.load()
      const suspendRoute = suspend(vm.loading, 'swap')
        .whenSuspended((_suspended) => ({}), LoadingView)
        .build()
      return (
        <div childrenBind={suspendRoute}>
          <Children context={mat} />
        </div>
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
      { jsx, bindEffect, events }: jsx.Mat<VanillaWrapperEvents>,
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
