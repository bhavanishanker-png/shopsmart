import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../../App'

describe('Frontend + Backend integration', () => {
  beforeEach(() => {
    // Mock the backend fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ status: 'ok' }),
      })
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })

  it('loads header, banner and product components correctly', async () => {
    render(<App />)

    // Verify default triumph layout loads successfully instead of backend data directly
    expect(screen.getByText(/TRIUMPH/i)).toBeInTheDocument()
    expect(screen.getByText(/1200/i)).toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
