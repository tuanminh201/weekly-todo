package com.minh.weekly_todo_list.controller;

import com.minh.weekly_todo_list.model.TodoItem;
import com.minh.weekly_todo_list.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<TodoItem> getAllTodos() {
        return todoRepository.findAll();
    }

    @GetMapping("/day/{day}")
    public List<TodoItem> getTodosByDay(@PathVariable String day) {
        return todoRepository.findByDay(day);
    }

    @PostMapping
    public TodoItem createTodo(@RequestBody TodoItem todoItem) {
        return todoRepository.save(todoItem);
    }

    @PutMapping("/{id}")
    public TodoItem updateTodo(@PathVariable Long id, @RequestBody TodoItem updatedTodo) {
        TodoItem existing = todoRepository.findById(id).orElseThrow();
        existing.setTitle(updatedTodo.getTitle());
        existing.setDescription(updatedTodo.getDescription());
        existing.setDay(updatedTodo.getDay());
        existing.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
    }
}
