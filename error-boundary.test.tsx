import { ok } from 'node:assert/strict'
import { describe, it } from 'node:test'
import { ErrorBoundary, type ErrorViewProps } from './error-boundary.js'
import { jsx } from './jsx.js'

describe('error boundary', () => {
  it('supports an error view with an error prop', () => {
    const errorView = ({ error }: ErrorViewProps) => (
      <div className="alert alert-danger">
        An error occurred <small>{(error ?? {}).toString()}</small>
      </div>
    )
    const example = (
      <ErrorBoundary errorView={errorView}>
        <p>Other components here</p>
      </ErrorBoundary>
    )
    ok(example)
  })

  it('supports an append error binding', () => {
    const errorView = () => (
      <div className="alert alert-danger">An error occurred</div>
    )
    const example = (
      <ErrorBoundary errorView={errorView} errorViewBindMode="append">
        <p>Other components here</p>
      </ErrorBoundary>
    )
    ok(example)
  })

  it('supports preserveOnComplete', () => {
    const errorView = () => (
      <div className="alert alert-danger">An error occurred</div>
    )
    const example = (
      <ErrorBoundary errorView={errorView} preserveOnComplete>
        <p>Other components here</p>
      </ErrorBoundary>
    )
    ok(example)
  })
})
