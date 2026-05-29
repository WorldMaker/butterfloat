/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import { describe, it } from 'node:test'
import { ok } from 'node:assert/strict'
import { type Observable, map } from 'rxjs'
import { type jsx, stamp, stampWhen } from '../../v2/index.js'

describe('v2 stamps documentation', () => {
  // Test that the examples compile, but don't bother running them
  it('shows marking a simple component as a stamp', () => {
    function Hello(_: unknown, { jsx, stamp }: jsx.Mat) {
      stamp() // mark this component as a Stamp
      return <p>Hello World</p>
    }
    ok(Hello)
  })

  it('shows a shortcut for marking a simple component as a stamp', () => {
    const Hello = stamp((jsx) => <p>Hello World</p>)
    ok(Hello)
  })

  it('shows marking a component with bindings as a stamp', () => {
    interface HelloProps {
      message: Observable<string>
    }

    function Hello({ message }: HelloProps, { jsx, stamp }: jsx.Mat) {
      stamp() // mark this component as a Stamp
      return <p bind={{ innerText: message }} />
    }
    ok(Hello)
  })

  it('shows marking a component with multiple alternatives as a stamp', () => {
    interface RollResultProps {
      faces: number
      roll: Observable<number>
    }

    function dieType(faces: number) {
      switch (faces) {
        case 6:
          return 'd6'
        case 20:
          return 'd20'
        default:
          return 'generic-roll'
      }
    }

    function RollResult(
      { faces, roll }: RollResultProps,
      { jsx, stampWhen }: jsx.Mat<unknown, RollResultProps>,
    ) {
      // this HTML is stable when given the same faces value
      // (the static `class` attribute is different for each faces value)
      stampWhen((props) => props.faces === faces)
      const dtype = dieType(faces)
      const rollValue = roll.pipe(map((value: number) => value.toString()))
      return (
        <span
          class={`roll-result ${dtype}`}
          bind={{ innerText: rollValue }}
        ></span>
      )
    }
    ok(RollResult)

    // *** Example of using the component with different faces values ***

    interface ThreeRolesProps {
      roll1: Observable<number>
      roll2: Observable<number>
      roll3: Observable<number>
    }

    /* Assuming this is the only uses of RollResult in the current run, the
      comments below are the stamping behavior. */

    const ThreeRoles = stamp(
      (jsx, { roll1, roll2, roll3 }: ThreeRolesProps) => (
        <div>
          <RollResult faces={20} roll={roll1} />
          {/* creates faces === 20 stamp */}
          <RollResult faces={6} roll={roll2} />
          {/* creates faces === 6 stamp */}
          <RollResult faces={20} roll={roll3} />
          {/* reuses stamp where faces === 20 */}
        </div>
      ),
    )
    ok(ThreeRoles)
  })

  it('shows a shortcut for marking a component with multiple alternatives as a stamp', () => {
    interface RollResultProps {
      faces: number
      roll: Observable<number>
    }

    function dieType(faces: number) {
      switch (faces) {
        case 6:
          return 'd6'
        case 20:
          return 'd20'
        default:
          return 'generic-roll'
      }
    }

    const RollResult = stampWhen((jsx, { faces, roll }: RollResultProps) => ({
      condition: (props) => props.faces === faces,
      ring: (
        <span
          class={`roll-result ${dieType(faces)}`}
          bind={{
            innerText: roll.pipe(map((value: number) => value.toString())),
          }}
        ></span>
      ),
    }))
    ok(RollResult)
  })
})
