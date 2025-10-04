package com.todo.todo_backend.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TaskResponse(
        Long id,
        String title,
        String description,
        Boolean completed,
        LocalDateTime createdAt,
        LocalDateTime completedAt
) {
}
