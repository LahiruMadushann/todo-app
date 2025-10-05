import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { taskService } from '../../services/api.service';
import type { Task, TaskRequest } from '../../types/task.types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await taskService.getRecentTasks();
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskRequest: TaskRequest, { rejectWithValue }) => {
    try {
      const task = await taskService.createTask(taskRequest);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create task');
    }
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (id: number, { rejectWithValue }) => {
    try {
      await taskService.markAsCompleted(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete task');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create task
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.successMessage = 'Task created successfully!';
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Complete task
    builder.addCase(completeTask.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(completeTask.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.successMessage = 'Task completed successfully!';
    });
    builder.addCase(completeTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearSuccessMessage } = taskSlice.actions;
export default taskSlice.reducer;