package com.todo.todo_backend.serviceImpl;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.exception.TaskNotFoundException;
import com.todo.todo_backend.mapper.TaskMapper;
import com.todo.todo_backend.model.Task;
import com.todo.todo_backend.repository.TaskRepository;
import com.todo.todo_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskResponse createTask(TaskRequest request) {
        log.debug("Creating task with title: {} and description: {}", request.title(), request.description());

        try {
            Task task = Task.builder()
                    .title(request.title())
                    .description(request.description())
                    .completed(false)
                    .build();

            Task savedTask = taskRepository.save(task);
            log.info("Task created successfully with id: {}", savedTask.getId());

            return taskMapper.mapToResponse(savedTask);
        } catch (Exception e) {
            log.error("Failed to create task with title: {}", request.title(), e);
            throw new RuntimeException("Failed to create task", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getRecentTasks() {
        log.debug("Fetching recent incomplete tasks (limit: 5)");

        try {
            List<Task> tasks = taskRepository.findByCompletedFalseOrderByCreatedAtDesc(
                    PageRequest.of(0, 5)
            );

            log.info("Retrieved {} recent tasks", tasks.size());

            return tasks.stream()
                    .map(taskMapper::mapToResponse)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Failed to fetch recent tasks", e);
            throw new RuntimeException("Failed to fetch recent tasks", e);
        }
    }

    @Override
    public TaskResponse markAsCompleted(Long id) {
        log.debug("Marking task as completed with id: {}", id);

        try {
            Task task = taskRepository.findById(id)
                    .orElseThrow(() -> {
                        log.warn("Task not found with id: {}", id);
                        return new TaskNotFoundException("Task not found with id: " + id);
                    });

            if (task.getCompleted()) {
                log.info("Task with id: {} is already completed", id);
            }

            task.setCompleted(true);
            task.setCompletedAt(LocalDateTime.now());
            Task updatedTask = taskRepository.save(task);

            log.info("Task with id: {} marked as completed successfully", id);

            return taskMapper.mapToResponse(updatedTask);
        } catch (TaskNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to mark task as completed with id: {}", id, e);
            throw new RuntimeException("Failed to mark task as completed", e);
        }
    }
}