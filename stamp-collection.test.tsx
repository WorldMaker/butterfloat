import { JSDOM } from 'jsdom'
import { equal } from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { ContextComponent } from './component.js'
import { jsx } from './jsx.js'
import { buildStamp } from './stamp-builder.js'
import { StampCollection } from './stamp-collection.js'

describe('stamp collection', () => {
  const { window } = new JSDOM()
  const { document } = window

  it('registers complex stamps', () => {
    interface SneakyComponentProps {
      warn: boolean
      faces: number
    }

    const Sneaky = ({ warn, faces }: SneakyComponentProps) => {
      if (warn) {
        const even = faces % 2 == 0
        return <div class="red">{even ? 'Even' : 'Odd'}</div>
      }
      const faceName = faces > 0 && faces < 3 ? faces.toString() : 'Many'
      return <div>{faceName}</div>
    }
    const SneakyComponent: ContextComponent<SneakyComponentProps> = Sneaky

    const redOdd = Sneaky({ warn: true, faces: 1 })
    const redEven = Sneaky({ warn: true, faces: 2 })
    const face1 = Sneaky({ warn: false, faces: 1 })
    const face2 = Sneaky({ warn: false, faces: 2 })
    const face3 = Sneaky({ warn: false, faces: 3 })
    const facesMany = Sneaky({ warn: false, faces: 4 })

    const redOddStamp = buildStamp(redOdd, document)
    const redEvenStamp = buildStamp(redEven, document)
    const face1Stamp = buildStamp(face1, document)
    const face2Stamp = buildStamp(face2, document)
    const face3Stamp = buildStamp(face3, document)
    const facesManyStamp = buildStamp(facesMany, document)

    const stamps = new StampCollection()
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => warn && faces % 2 === 0,
        redEvenStamp,
      )
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => warn && faces % 2 !== 0,
        redOddStamp,
      )
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => !warn && faces === 1,
        face1Stamp,
      )
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => !warn && faces === 2,
        face2Stamp,
      )
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => !warn && faces === 3,
        face3Stamp,
      )
      .registerStampAlternative(
        SneakyComponent,
        ({ warn, faces }) => !warn && (faces < 0 || faces > 3),
        facesManyStamp,
      )

    equal(
      stamps.getStamp(SneakyComponent, { warn: true, faces: 32 }),
      redEvenStamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: true, faces: 49 }),
      redOddStamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: false, faces: -34 }),
      facesManyStamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: false, faces: 99 }),
      facesManyStamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: false, faces: 1 }),
      face1Stamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: false, faces: 2 }),
      face2Stamp,
    )
    equal(
      stamps.getStamp(SneakyComponent, { warn: false, faces: 3 }),
      face3Stamp,
    )
  })
})
