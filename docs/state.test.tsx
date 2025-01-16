import { describe, it } from 'node:test'
import {
  type ComponentContext,
  type ObservableEvent,
  type StateSetter,
  butterfly,
  jsx,
} from '../index.js'
import { type Observable, map } from 'rxjs'
import { ok } from 'assert/strict'

describe('state management documentation', () => {
  it('shows a simple garden stats block', () => {
    function Garden() {
      const [money, _setMoney] = butterfly(1)
      const [labor, _setLabor] = butterfly(0)

      const moneyPercent = money.pipe(
        map((money) => money.toLocaleString(undefined, { style: 'percent ' })),
      )

      const laborPercent = labor.pipe(
        map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
      )

      return (
        <div className="garden">
          <div className="stat-label">Money</div>
          <progress
            title="Money"
            bind={{ value: money, innerText: moneyPercent }}
          />
          <div className="stat-label">Labor</div>
          <progress
            title="Labor"
            bind={{ value: labor, innerText: laborPercent }}
          />
        </div>
      )
    }
    ok(Garden)
  })

  it('shows a first activity', () => {
    interface GardenProps {}

    interface GardenEvents {
      rake: ObservableEvent<MouseEvent>
    }

    function Garden(
      _props: GardenProps,
      { bindEffect, events }: ComponentContext<GardenEvents>,
    ) {
      const [money, setMoney] = butterfly(1)
      const [labor, setLabor] = butterfly(0)

      const moneyPercent = money.pipe(
        map((money) => money.toLocaleString(undefined, { style: 'percent ' })),
      )

      const laborPercent = labor.pipe(
        map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
      )

      bindEffect(events.rake, () => {
        setMoney((money) => money - 0.15)
        setLabor((labor) => labor + 0.3)
      })

      return (
        <div className="garden">
          <div className="stat-label">Money</div>
          <progress
            title="Money"
            bind={{ value: money, innerText: moneyPercent }}
          />
          <div className="stat-label">Labor</div>
          <progress
            title="Labor"
            bind={{ value: labor, innerText: laborPercent }}
          />
          <div className="section-label">Activities</div>
          <button type="button" events={{ click: events.rake }}>
            Rake
          </button>
        </div>
      )
    }
    ok(Garden)
  })

  it('shows an example view model', () => {
    class GardenState {
      // *** Resources ***

      readonly #money: Observable<number>
      readonly #setMoney: (money: StateSetter<number>) => void
      get money() {
        return this.#money
      }

      readonly #labor: Observable<number>
      readonly #setLabor: (labor: StateSetter<number>) => void
      get labor() {
        return this.#labor
      }

      // *** Views of our resources ***

      readonly #moneyPercent: Observable<string>
      get moneyPercent() {
        return this.#moneyPercent
      }

      readonly #laborPercent: Observable<string>
      get laborPercent() {
        return this.#laborPercent
      }

      constructor() {
        ;[this.#money, this.#setMoney] = butterfly(1)
        ;[this.#labor, this.#setLabor] = butterfly(0)

        this.#moneyPercent = this.money.pipe(
          map((money) =>
            money.toLocaleString(undefined, { style: 'percent ' }),
          ),
        )

        this.#laborPercent = this.labor.pipe(
          map((labor) => labor.toLocaleString(undefined, { style: 'percent' })),
        )
      }

      // *** Activities ***

      rake() {
        this.#setMoney((money) => money - 0.15)
        this.#setLabor((labor) => labor + 0.3)
      }
    }
    ok(GardenState)

    interface GardenProps {}

    interface GardenEvents {
      rake: ObservableEvent<MouseEvent>
    }

    function Garden(
      _props: GardenProps,
      { bindEffect, events }: ComponentContext<GardenEvents>,
    ) {
      const vm = new GardenState()

      bindEffect(events.rake, () => vm.rake())

      return (
        <div className="garden">
          <div className="stat-label">Money</div>
          <progress
            title="Money"
            bind={{ value: vm.money, innerText: vm.moneyPercent }}
          />
          <div className="stat-label">Labor</div>
          <progress
            title="Labor"
            bind={{ value: vm.labor, innerText: vm.laborPercent }}
          />
          <div className="section-label">Activities</div>
          <button type="button" events={{ click: events.rake }}>
            Rake
          </button>
        </div>
      )
    }
    ok(Garden)
  })
})
