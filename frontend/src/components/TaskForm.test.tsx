import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

describe('TaskForm Component', () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders form fields', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={false}
      />
    )

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create task/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  test('submit button is disabled when title is empty', () => {
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={false}
      />
    )

    const submitButton = screen.getByRole('button', { name: /create task/i })
    expect(submitButton).toBeDisabled()
  })

  test('calls onSubmit with title and description', async () => {
    const user = userEvent.setup()
    
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={false}
      />
    )

    const titleInput = screen.getByLabelText(/title/i)
    const descInput = screen.getByLabelText(/description/i)

    await user.type(titleInput, 'Test Task')
    await user.type(descInput, 'Test Description')

    const submitButton = screen.getByRole('button', { name: /create task/i })
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith('Test Task', 'Test Description')
  })

  test('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TaskForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        loading={false}
      />
    )

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await user.click(cancelButton)

    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })
})