import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NEVER, concat, delayWhen, from, interval, map } from 'rxjs'
import {
  Children,
  type ComponentContext,
  Comment,
  Empty,
  jsx,
} from '../index.js'

describe('children documentation', () => {
  it('shows a simple list wrapper with children', () => {
    interface CoolListProps {}

    function CoolList(_props: CoolListProps, context: ComponentContext) {
      return (
        <div className="cool-list-wrapper">
          <ul className="cool-list">
            <Children context={context} />
          </ul>
        </div>
      )
    }

    function ListPage() {
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
    function DynamicList() {
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
    const desc = <Comment comment="This is a comment" />
    ok(desc)
  })

  it('mentions empty', () => {
    const desc = <Empty />
    ok(desc)
  })
})
