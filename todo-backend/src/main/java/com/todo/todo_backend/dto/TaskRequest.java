package com.todo.todo_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record TaskRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must be less than 200 characters")
        String title,
        String description
) {
}
