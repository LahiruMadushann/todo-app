import { describe, test, expect, vi, beforeEach } from 'vitest'
import taskReducer, {
  fetchTasks,
  completeTask,
  clearError,
  clearSuccessMessage,
} from './taskSlice'
import type { Task } from '../../types/task.types'

vi.mock('../../services/api.service')


describe('taskSlice', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
    successMessage: null,
  }

  const mockTask: Task = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: '2024-01-01T10:00:00',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should return the initial state', () => {
    expect(taskReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('clearError should clear error message', () => {
    const stateWithError = { ...initialState, error: 'Test error' }
    expect(taskReducer(stateWithError, clearError())).toEqual(initialState)
  })

  test('clearSuccessMessage should clear success message', () => {
    const stateWithSuccess = { ...initialState, successMessage: 'Test success' }
    expect(taskReducer(stateWithSuccess, clearSuccessMessage())).toEqual(initialState)
  })

  describe('fetchTasks', () => {
    test('fetchTasks.pending should set loading to true', () => {
      const action = { type: fetchTasks.pending.type }
      const state = taskReducer(initialState, action)
      expect(state.loading).toBe(true)
      expect(state.error).toBe(null)
    })

    test('fetchTasks.fulfilled should update tasks', () => {
      const tasks: Task[] = [mockTask]
      const action = { type: fetchTasks.fulfilled.type, payload: tasks }
      const state = taskReducer(initialState, action)
      expect(state.loading).toBe(false)
      expect(state.tasks).toEqual(tasks)
    })
  })

  describe('completeTask', () => {
    test('completeTask.fulfilled should remove task from list', () => {
      const stateWithTasks = { ...initialState, tasks: [mockTask] }
      const action = { type: completeTask.fulfilled.type, payload: 1 }
      const state = taskReducer(stateWithTasks, action)
      expect(state.loading).toBe(false)
      expect(state.tasks).toEqual([])
      expect(state.successMessage).toBe('Task completed successfully!')
    })
  })
})