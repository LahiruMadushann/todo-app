import { describe, test, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import App from './App'
import { renderWithProviders } from './test-utils'
import { taskService } from './services/api.service'
import type { Task } from './types/task.types'

vi.mock('./services/api.service')

const mockedTaskService = taskService as any

describe('App Component', () => {
  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Test Task 1',
      description: 'Description 1',
      completed: false,
      createdAt: '2024-01-01T10:00:00',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders app title', async () => {
    mockedTaskService.getRecentTasks = vi.fn().mockResolvedValue([])
    
    renderWithProviders(<App />)
    
    expect(screen.getByText('My Todo List')).toBeInTheDocument()
  })

  test('fetches and displays tasks on mount', async () => {
    mockedTaskService.getRecentTasks = vi.fn().mockResolvedValue(mockTasks)
    
    renderWithProviders(<App />)
    
    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    })
  })

  test('shows Add New Task button', async () => {
    mockedTaskService.getRecentTasks = vi.fn().mockResolvedValue([])
    
    renderWithProviders(<App />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add new task/i })).toBeInTheDocument()
    })
  })
})