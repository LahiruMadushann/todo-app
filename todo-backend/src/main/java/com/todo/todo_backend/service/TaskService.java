package com.todo.todo_backend.service;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
}
