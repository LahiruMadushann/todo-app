package com.todo.todo_backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.exception.GlobalExceptionHandler;
import com.todo.todo_backend.exception.TaskNotFoundException;
import com.todo.todo_backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TaskController.class)
@ContextConfiguration(classes = {TaskController.class, GlobalExceptionHandler.class, TaskControllerTest.TestConfig.class})
public class TaskControllerTest {

    @Configuration
    static class TestConfig {
        @Bean
        public TaskService taskService() {
            return Mockito.mock(TaskService.class);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    private TaskResponse taskResponse;
    private TaskRequest taskRequest;

    @BeforeEach
    void setUp() {
        Mockito.reset(taskService);

        taskRequest = TaskRequest.builder()
                .title("Test Task")
                .description("Test Description")
                .build();

        taskResponse = TaskResponse.builder()
                .id(1L)
                .title("Test Task")
                .description("Test Description")
                .completed(false)
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void createTask_ShouldReturnCreatedTask() throws Exception {
        when(taskService.createTask(any(TaskRequest.class))).thenReturn(taskResponse);

        mockMvc.perform(post("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Task"))
                .andExpect(jsonPath("$.description").value("Test Description"))
                .andExpect(jsonPath("$.completed").value(false));
    }

    @Test
    void createTask_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        TaskRequest invalidRequest = TaskRequest.builder()
                .title("")
                .description("Test Description")
                .build();

        mockMvc.perform(post("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.fieldErrors").exists());
    }

    @Test
    void getRecentTasks_ShouldReturnTaskList() throws Exception {
        List<TaskResponse> tasks = Arrays.asList(
                taskResponse,
                TaskResponse.builder()
                        .id(2L)
                        .title("Task 2")
                        .description("Description 2")
                        .completed(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        when(taskService.getRecentTasks()).thenReturn(tasks);

        mockMvc.perform(get("/api/v1/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Task"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].title").value("Task 2"));
    }

    @Test
    void markAsCompleted_ShouldReturnUpdatedTask() throws Exception {
        TaskResponse completedTask = TaskResponse.builder()
                .id(1L)
                .title("Test Task")
                .description("Test Description")
                .completed(true)
                .createdAt(LocalDateTime.now())
                .completedAt(LocalDateTime.now())
                .build();

        when(taskService.markAsCompleted(eq(1L))).thenReturn(completedTask);

        mockMvc.perform(put("/api/v1/tasks/1/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.completed").value(true))
                .andExpect(jsonPath("$.completedAt").exists());
    }

    @Test
    void markAsCompleted_WithInvalidId_ShouldReturnNotFound() throws Exception {
        when(taskService.markAsCompleted(eq(999L)))
                .thenThrow(new TaskNotFoundException("Task not found with id: 999"));

        mockMvc.perform(put("/api/v1/tasks/999/complete"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"))
                .andExpect(jsonPath("$.message").value("Task not found with id: 999"))
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.path").exists());
    }

    @Test
    void createTask_WithException_ShouldReturnInternalServerError() throws Exception {
        when(taskService.createTask(any(TaskRequest.class)))
                .thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(post("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(taskRequest)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.error").value("Internal Server Error"))
                .andExpect(jsonPath("$.message").value("An unexpected error occurred"));
    }
}