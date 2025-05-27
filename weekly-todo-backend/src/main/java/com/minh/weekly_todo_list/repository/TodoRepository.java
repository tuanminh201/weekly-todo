package com.minh.weekly_todo_list.repository;

import com.minh.weekly_todo_list.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findByDay(String day);
}
