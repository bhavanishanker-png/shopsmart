import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('App', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => new Promise(() => {}))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders Triumph brand title', () => {
    render(<App />)
    const brandElement = screen.getByText(/TRIUMPH/i)
    expect(brandElement).toBeInTheDocument()
  })
})
