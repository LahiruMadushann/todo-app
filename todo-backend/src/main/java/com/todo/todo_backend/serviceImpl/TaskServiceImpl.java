package com.todo.todo_backend.serviceImpl;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.mapper.TaskMapper;
import com.todo.todo_backend.model.Task;
import com.todo.todo_backend.repository.TaskRepository;
import com.todo.todo_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskResponse createTask(TaskRequest request) {
        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .completed(false)
                .build();

        Task savedTask = taskRepository.save(task);
        return taskMapper.mapToResponse(savedTask);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getRecentTasks() {
        List<Task> tasks = taskRepository.findByCompletedFalseOrderByCreatedAtDesc(
                PageRequest.of(0, 5)
        );
        return tasks.stream()
                .map(taskMapper::mapToResponse)
                .collect(Collectors.toList());
    }
}
