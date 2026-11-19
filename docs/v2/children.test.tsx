import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER, concat, delayWhen, from, interval, map } from 'rxjs'
import {
  route,
  stampWhen,
  Children,
  Comment,
  Empty,
  type jsx,
} from '../../v2/index.js'
import { describeRing } from '../../v2/testing/index.js'

describe('v2 children documentation', () => {
  it('shows a simple list wrapper with children', () => {
    function CoolList(_props: unknown, mat: jsx.Mat) {
      const { jsx } = mat
      return (
        <div className="cool-list-wrapper">
          <ul className="cool-list">
            <Children context={mat} />
          </ul>
        </div>
      )
    }

    function ListPage(_props: unknown, { jsx }: jsx.Mat) {
      return (
        <div className="list-page">
          <CoolList>
            <li>This</li>
            <li>Is</li>
            <li>Wrapped</li>
            <li>In</li>
            <li>A</li>
            <li>Cool</li>
            <li>List</li>
          </CoolList>
        </div>
      )
    }

    ok(ListPage)
  })

  it('shows a dynamic list example', () => {
    const ListItem = stampWhen((jsx, { text }: { text: string }) => ({
      ring: <li>{text}</li>,
      condition: (props) => props.text === text,
      jsonProps: { text },
    }))

    function DynamicList(_props: unknown, { jsx }: jsx.Mat) {
      const listSource = concat(
        from(['This', 'is', 'a', 'dynamic', 'list']).pipe(
          delayWhen((_v, i) => interval(i * 500)),
        ),
        NEVER,
      )

      const listRoute = route(listSource)
        .when((text) => ({ text }), ListItem, [
          { text: 'This' },
          { text: 'list' },
        ])
        .build()

      return <li childrenBind={listRoute} />
    }

    ok(DynamicList)
  })

  it('shows a classic v1 dynamic list example', () => {
    function DynamicList(_props: unknown, { jsx }: jsx.Mat) {
      const children = concat(
        from(['This', 'is', 'a', 'dynamic', 'list']).pipe(
          delayWhen((_v, i) => interval(i * 500)),
        ),
        NEVER,
      ).pipe(map((text) => () => <li>{text}</li>))

      return <li childrenBind={children} />
    }

    ok(DynamicList)
  })

  it('mentions comment', () => {
    const desc = describeRing((jsx) => <Comment comment="This is a comment" />)
    ok(desc)
  })

  it('mentions empty', () => {
    const desc = describeRing((jsx) => <Empty />)
    ok(desc)
  })
})
