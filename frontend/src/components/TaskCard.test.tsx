import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskCard from './TaskCard'
import type { Task } from '../types/task.types'

describe('TaskCard Component', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: '2024-01-01T10:00:00',
  }

  const mockOnComplete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders task title', () => {
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} loading={false} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  test('renders task description', () => {
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} loading={false} />)
    
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  test('renders without description', () => {
    const taskWithoutDesc = { ...mockTask, description: undefined }
    
    render(<TaskCard task={taskWithoutDesc} onComplete={mockOnComplete} loading={false} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  test('calls onComplete when Done button is clicked', async () => {
    const user = userEvent.setup()
    
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} loading={false} />)
    
    const doneButton = screen.getByRole('button', { name: /done/i })
    await user.click(doneButton)

    expect(mockOnComplete).toHaveBeenCalledTimes(1)
    expect(mockOnComplete).toHaveBeenCalledWith(1)
  })

  test('disables Done button when loading', () => {
    render(<TaskCard task={mockTask} onComplete={mockOnComplete} loading={true} />)
    
    const doneButton = screen.getByRole('button', { name: /done/i })
    expect(doneButton).toBeDisabled()
  })
})