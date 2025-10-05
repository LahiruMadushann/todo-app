package com.todo.todo_backend.controller;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest request) {
        TaskResponse response = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getRecentTasks() {
        List<TaskResponse> tasks = taskService.getRecentTasks();
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<TaskResponse> markAsCompleted(@PathVariable Long id) {
        TaskResponse response = taskService.markAsCompleted(id);
        return ResponseEntity.ok(response);
    }
}
