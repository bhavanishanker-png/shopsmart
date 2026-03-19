import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../../App'

describe('App Unit Tests', () => {
  let fetchSpy

  beforeEach(() => {
    fetchSpy = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 'ok',
            message: 'ShopSmart Backend is running',
            timestamp: '2026-02-19T12:00:00.000Z',
          }),
      })
    )
    global.fetch = fetchSpy
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // 1. Renders the main heading
  it('renders ShopSmart heading', () => {
    global.fetch = vi.fn(() => new Promise(() => {}))
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/ShopSmart/i)
  })
  // 2. Shows loading state before fetch resolves
  it('shows loading state initially', () => {
    // Make fetch hang indefinitely so we can catch the loading state
    global.fetch = vi.fn(() => new Promise(() => {}))
    render(<App />)
    expect(screen.getByText(/Loading backend status/i)).toBeInTheDocument()
  })

  // 3. Displays status after successful fetch
  it('displays status after fetch', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('ok')).toBeInTheDocument()
    })
  })

  // 4. Displays message after fetch
  it('displays message after fetch', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/ShopSmart Backend is running/i)).toBeInTheDocument()
    })
  })

  // 5. Displays timestamp after fetch
  it('displays timestamp after fetch', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/2026-02-19/)).toBeInTheDocument()
    })
  })

  // 6. Renders the card container
  it('renders card container', () => {
    global.fetch = vi.fn(() => new Promise(() => {}))
    render(<App />)
    const card = document.querySelector('.card')
    expect(card).toBeInTheDocument()
  })

  // 7. Renders the hint text
  it('renders hint text', () => {
    global.fetch = vi.fn(() => new Promise(() => {}))
    render(<App />)
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
    expect(screen.getByText('src/App.jsx')).toBeInTheDocument()
  })

  // 8. Handles fetch error gracefully (does not crash)
  it('handles fetch error gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')))
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<App />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching health check:', expect.any(Error))
    })

    // App should still render without crashing
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/ShopSmart/i)
    consoleSpy.mockRestore()
  })

  // 9. Calls fetch exactly once on mount
  it('calls fetch on mount', async () => {
    render(<App />)
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })
    expect(fetchSpy).toHaveBeenCalledWith('/api/health')
  })

  // 10. Status span has the correct CSS class
  it('status has correct CSS class', async () => {
    render(<App />)
    await waitFor(() => {
      const statusSpan = screen.getByText('ok')
      expect(statusSpan).toHaveClass('status-ok')
    })
  })
})
