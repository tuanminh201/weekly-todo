package com.minh.weekly_todo_list.model;

import jakarta.persistence.*;

@Entity
public class TodoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Column(name = "\"day\"")
    private String day;

    private boolean completed;

    public TodoItem() {
    }

    public TodoItem(String title, String description, String day, boolean completed) {
        this.title = title;
        this.description = description;
        this.day = day;
        this.completed = completed;
    }

    // Getter và Setter bên dưới giữ nguyên
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
