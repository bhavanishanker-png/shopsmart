import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders Triumph brand title', () => {
    render(<App />)
    const brandElement = screen.getByText(/TRIUMPH/i)
    expect(brandElement).toBeInTheDocument()
  })
})
