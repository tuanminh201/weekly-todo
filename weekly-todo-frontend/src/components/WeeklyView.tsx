import React from 'react';
import { Todo } from '../types/todo';

interface WeeklyViewProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onToggleComplete: (id: number, completed: boolean) => void;
    onUpdateDay: (id: number, newDay: string) => void;
}

const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

const WeeklyView: React.FC<WeeklyViewProps> = ({ todos, onDelete, onToggleComplete, onUpdateDay }) => {
    const getTodosForDay = (day: string) => {
        return todos.filter(todo => todo.day === day);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, todoId: number) => {
        e.dataTransfer.setData('text/plain', todoId.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: string) => {
        e.preventDefault();
        const todoId = parseInt(e.dataTransfer.getData('text/plain'), 10);
        if (!isNaN(todoId)) {
            onUpdateDay(todoId, day);
        }
    };

    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div style={{ marginTop: '2rem', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
                Today is: {today}
            </h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-6">
                {daysOfWeek.map(day => {
                    const dayTodos = getTodosForDay(day);
                    return (
                        <div
                            key={day}
                            style={{
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '1rem',
                                minHeight: '300px',
                                minWidth: '250px',
                            }}
                            onDrop={(e) => handleDrop(e, day)}
                            onDragOver={allowDrop}
                        >
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{day}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {dayTodos.map(todo => (
                                    <div
                                        key={todo.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, todo.id)}
                                    >
                                        <label
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexGrow: 1,
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => onToggleComplete(todo.id, !todo.completed)}
                                                style={{ marginRight: '0.5rem' }}
                                            />
                                            <span
                                                style={{
                                                    textDecoration: todo.completed
                                                        ? 'line-through'
                                                        : 'none',
                                                }}
                                            >
                                                {todo.title}
                                            </span>
                                        </label>
                                        <button
                                            onClick={() => onDelete(todo.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'red',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyView;
