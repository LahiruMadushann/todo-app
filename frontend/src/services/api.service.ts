import axios, { AxiosError } from 'axios';
import type { Task, TaskRequest } from '../types/task.types';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  getRecentTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  createTask: async (taskRequest: TaskRequest): Promise<Task> => {
    const response = await api.post<Task>('/tasks', taskRequest);
    return response.data;
  },

  markAsCompleted: async (id: number): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}/complete`);
    return response.data;
  },
};

export default api;