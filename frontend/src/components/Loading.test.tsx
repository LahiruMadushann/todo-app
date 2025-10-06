import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading Component', () => {
  test('renders loading spinner', () => {
    render(<Loading />)
    
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
  })

  test('has correct structure', () => {
    const { container } = render(<Loading />)
    
    const spinnerContainer = container.querySelector('.animate-spin')
    expect(spinnerContainer).toBeInTheDocument()
  })
})