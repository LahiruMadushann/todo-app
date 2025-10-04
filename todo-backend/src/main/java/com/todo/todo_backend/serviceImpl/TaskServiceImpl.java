package com.todo.todo_backend.serviceImpl;

import com.todo.todo_backend.dto.TaskRequest;
import com.todo.todo_backend.dto.TaskResponse;
import com.todo.todo_backend.mapper.TaskMapper;
import com.todo.todo_backend.model.Task;
import com.todo.todo_backend.repository.TaskRepository;
import com.todo.todo_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
