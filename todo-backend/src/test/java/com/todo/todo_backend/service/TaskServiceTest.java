package com.todo.todo_backend.service;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.model.Task;
import com.todo.todo_backend.repository.TaskRepository;
import com.todo.todo_backend.serviceImpl.TaskServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private TaskRequest taskRequest;

    @BeforeEach
    void setUp() {
        task = Task.builder()
                .id(1L)
                .title("Test Task")
                .description("Test Description")
                .completed(false)
                .createdAt(LocalDateTime.now())
                .build();

        taskRequest = TaskRequest.builder()
                .title("Test Task")
                .description("Test Description")
                .build();
    }

    @Test
    void createTask_ShouldSaveAndReturnTask() {
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskResponse response = taskService.createTask(taskRequest);

        assertNotNull(response);
        assertEquals("Test Task", response.title());
        assertEquals("Test Description", response.description());
        assertFalse(response.completed());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void getRecentTasks_ShouldReturnMaxFiveTasks() {
        List<Task> tasks = Arrays.asList(
                task,
                Task.builder()
                        .id(2L)
                        .title("Task 2")
                        .description("Description 2")
                        .completed(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        when(taskRepository.findByCompletedFalseOrderByCreatedAtDesc(any(Pageable.class)))
                .thenReturn(tasks);

        List<TaskResponse> responses = taskService.getRecentTasks();

        assertNotNull(responses);
        assertEquals(2, responses.size());
        assertEquals("Test Task", responses.get(0).title());
        assertEquals("Task 2", responses.get(1).title());
        verify(taskRepository, times(1))
                .findByCompletedFalseOrderByCreatedAtDesc(PageRequest.of(0, 5));
    }
}
