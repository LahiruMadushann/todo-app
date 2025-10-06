import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Alert from './Alert'

describe('Alert Component', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders error alert with message', () => {
    render(
      <Alert
        type="error"
        message="Test error message"
        onClose={mockOnClose}
        autoClose={false}
      />
    )

    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })

  test('renders success alert with message', () => {
    render(
      <Alert
        type="success"
        message="Test success message"
        onClose={mockOnClose}
        autoClose={false}
      />
    )

    expect(screen.getByText('Test success message')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <Alert
        type="error"
        message="Test message"
        onClose={mockOnClose}
        autoClose={false}
      />
    )

    const closeButton = screen.getByRole('button')
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('auto-closes after specified duration', async () => {
    vi.useFakeTimers()

    render(
      <Alert
        type="success"
        message="Auto close test"
        onClose={mockOnClose}
        autoClose={true}
        duration={3000}
      />
    )

    expect(mockOnClose).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(3000)

    expect(mockOnClose).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })
})