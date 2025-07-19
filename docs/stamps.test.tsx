/* eslint @typescript-eslint/no-non-null-assertion: "off" */
import { JSDOM } from 'jsdom'
import { writeFile } from 'node:fs/promises'
import { describe, it } from 'node:test'
import { NEVER, type Observable, map } from 'rxjs'
import { ok } from 'node:assert/strict'
import {
  type ComponentContext,
  type ObservableEvent,
  StampCollection,
  buildStamp,
  jsx,
  makeTestComponentContext,
  makeTestEvent,
  runStamps,
} from '../index.js'

describe('stamps documentation', () => {
  // Test that the examples compile, but don't bother running them
  it.skip('shows a simple component stamp building example', async () => {
    const dom = new JSDOM(`
        <!doctype html>
        <html>
            <head>
                <title>Example Template</title>
            </head>
            <body id="app">
            </body>
        </html>
    `)
    const { window } = dom
    const { document } = window
    const appContainer = document.getElementById('app')!

    function Hello() {
      return <p>Hello World</p>
    }

    const hello = Hello()
    const helloStamp = buildStamp(hello)
    helloStamp.id = 'hello-component'
    appContainer.append(helloStamp)

    await writeFile('stamp-example-index.html', dom.serialize())
  })

  it.skip('shows a simple component stamp usage example', () => {
    function Hello() {
      return <p></p>
    }

    const appContainer = document.getElementById('app')!
    const helloStamp =
      appContainer.querySelector<HTMLTemplateElement>('hello-component')!

    const stamps = new StampCollection()
    // This component only has one Stamp
    stamps.registerOnlyStamp(Hello, helloStamp)

    runStamps(appContainer, Hello, stamps)
  })

  it.skip('shows building an example of a component with multiple stamp alternatives', async () => {
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

    function RollResult({ faces, roll }: RollResultProps) {
      const dtype = dieType(faces)
      const rollValue = roll.pipe(map((value: number) => value.toString()))
      return (
        <span
          class={`roll-result ${dtype}`}
          bind={{ innerText: rollValue }}
        ></span>
      )
    }

    const dom = new JSDOM(`
        <!doctype html>
        <html>
            <head>
                <title>Example Template</title>
            </head>
            <body id="app">
            </body>
        </html>
    `)
    const { window } = dom
    const { document } = window
    const appContainer = document.getElementById('app')!

    const d6stamp = buildStamp(RollResult({ faces: 6, roll: NEVER }), document)
    d6stamp.id = 'roll-result-d6'
    appContainer.append(d6stamp)

    const d20stamp = buildStamp(
      RollResult({ faces: 20, roll: NEVER }),
      document,
    )
    d20stamp.id = 'roll-result-d20'
    appContainer.append(d20stamp)

    const genericRollStamp = buildStamp(
      RollResult({ faces: 99, roll: NEVER }),
      document,
    )
    genericRollStamp.id = 'roll-result-generic'
    appContainer.append(genericRollStamp)

    await writeFile('index.html', dom.serialize())
  })

  it.skip('shows building a stamp collection of alternatives', () => {
    function Main() {
      return <p></p>
    }
    interface RollResultProps {
      faces: number
    }
    function RollResult(props: RollResultProps) {
      return <p>{props.faces}</p>
    }

    const appContainer = document.getElementById('app')!

    const d6stamp =
      appContainer.querySelector<HTMLTemplateElement>('roll-result-d6')!
    const d20stamp =
      appContainer.querySelector<HTMLTemplateElement>('roll-result-d20')!
    const genericRollStamp = appContainer.querySelector<HTMLTemplateElement>(
      'roll-result-generic',
    )!

    const stamps = new StampCollection()
    stamps
      .registerStampAlternative(RollResult, ({ faces }) => faces === 6, d6stamp)
      .registerStampAlternative(
        RollResult,
        ({ faces }) => faces === 20,
        d20stamp,
      )
      .registerStampAlternative(
        RollResult,
        ({ faces }) => faces !== 6 && faces !== 20,
        genericRollStamp,
      )

    runStamps(appContainer, Main, stamps)
  })

  it.skip('shows using a test context to build a stamp', () => {
    interface WinButtonEvents {
      click: ObservableEvent<MouseEvent>
    }

    function WinButton(
      _props: unknown,
      { events }: ComponentContext<WinButtonEvents>,
    ) {
      return (
        <button class="btn win-button" bindEvent={{ click: events.click }}>
          Click to Win!
        </button>
      )
    }

    const { context: winContext } = makeTestComponentContext({
      click: makeTestEvent<MouseEvent>(NEVER),
    })
    const winButtonStamp = buildStamp(WinButton({}, winContext))
    ok(winButtonStamp)
  })

  it.skip('shows building a prestamp', async () => {
    function Main() {
      return <p></p>
    }

    const dom = new JSDOM(`
        <!doctype html>
        <html>
            <head>
                <title>Example Template</title>
            </head>
            <body id="app">
            </body>
        </html>
    `)
    const { window } = dom
    const { document } = window
    const appContainer = document.getElementById('app')!

    const mainStamp = buildStamp(Main(), document)
    // Fill the container with the content of the template
    appContainer.append(mainStamp.content)

    await writeFile('index.html', dom.serialize())
  })

  it.skip('shows registering a prestamp', () => {
    function Main() {
      return <p></p>
    }

    const appContainer = document.getElementById('app')!

    const stamps = new StampCollection()
    stamps.registerPrestamp(Main, appContainer)

    runStamps(appContainer, Main, stamps)
  })
})
