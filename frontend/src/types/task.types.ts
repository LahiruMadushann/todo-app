export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface TaskRequest {
  title: string;
  description?: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  fieldErrors: {
    [key: string]: string;
  };
}