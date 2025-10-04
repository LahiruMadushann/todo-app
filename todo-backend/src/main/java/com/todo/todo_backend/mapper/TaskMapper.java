package com.todo.todo_backend.mapper;

import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.model.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .completed(task.getCompleted())
                .createdAt(task.getCreatedAt())
                .completedAt(task.getCompletedAt())
                .build();
    }
}
