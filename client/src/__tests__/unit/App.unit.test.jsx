import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../../App'

describe('App Unit Tests', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ status: 'ok' })
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders Triumph brand text in Header', () => {
    render(<App />)
    expect(screen.getByText(/TRIUMPH/i)).toBeInTheDocument()
  })

  it('renders Featured Classics section', () => {
    render(<App />)
    expect(screen.getByText(/Featured Classics/i)).toBeInTheDocument()
  })

  it('renders products automatically', () => {
    render(<App />)
    expect(screen.getByText(/Wireless Headphones Pro/i)).toBeInTheDocument()
    expect(screen.getByText(/Premium Phone Case/i)).toBeInTheDocument()
  })
})
