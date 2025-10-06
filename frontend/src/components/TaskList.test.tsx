import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'
import type { Task } from '../types/task.types'

describe('TaskList Component', () => {
  const mockOnComplete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders empty state when no tasks', () => {
    render(<TaskList tasks={[]} onComplete={mockOnComplete} loading={false} />)
    
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
    expect(screen.getByText('Create your first task to get started!')).toBeInTheDocument()
  })

  test('renders list of tasks', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
        createdAt: '2024-01-01T10:00:00',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: false,
        createdAt: '2024-01-02T10:00:00',
      },
    ]

    render(<TaskList tasks={mockTasks} onComplete={mockOnComplete} loading={false} />)
    
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })
})