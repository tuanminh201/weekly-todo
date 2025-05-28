import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeeklyView from './components/WeeklyView';
import { Todo } from './types/todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import ParticlesBackground from './components/background';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Omit<Todo, 'id'>>({
        title: '',
        description: '',
        day: 'Monday',
        completed: false
    });

    useEffect(() => {
        axios.get<Todo[]>('http://localhost:8080/api/todos')
            .then(res => setTodos(res.data))
            .catch(err => console.error('Failed to fetch todos', err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post<Todo>('http://localhost:8080/api/todos', formData)
            .then(res => {
                setTodos(prev => [...prev, res.data]);
                setFormData({ title: '', description: '', day: 'Monday', completed: false });
                setShowForm(false);
            })
            .catch(err => console.error('Create failed', err));
    };

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8080/api/todos/${id}`)
            .then(() => setTodos(prev => prev.filter(todo => todo.id !== id)))
            .catch(err => console.error('Delete failed', err));
    };

    const handleToggleComplete = (id: number, completed: boolean) => {
        const updated = todos.find(t => t.id === id);
        if (!updated) return;
        axios.put<Todo>(`http://localhost:8080/api/todos/${id}`, { ...updated, completed })
            .then(res => {
                setTodos(prev => prev.map(todo => todo.id === id ? res.data : todo));
            })
            .catch(err => console.error('Toggle failed', err));
    };

    const handleUpdateDay = (id: number, newDay: string) => {
        const updated = todos.find(t => t.id === id);
        if (!updated || updated.day === newDay) return;
        axios.put<Todo>(`http://localhost:8080/api/todos/${id}`, { ...updated, day: newDay })
            .then(res => {
                setTodos(prev => prev.map(todo => todo.id === id ? res.data : todo));
            })
            .catch(err => console.error('Update day failed', err));
    };

    return (
        <>
            <ParticlesBackground />
            <div className="container py-4 position-relative" style={{ zIndex: 1 }}>
                <h1 className="text-center mb-4 fw-bold text-white display-4">
                    Weekly To-Do List
                </h1>
                <div className="text-center mb-3">
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Task</button>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 bg-light">
                        <div className="row g-3">
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-2">
                                <select
                                    name="day"
                                    className="form-select"
                                    value={formData.day}
                                    onChange={handleChange}
                                >
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 d-grid">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                            <div className="col-md-2 d-grid">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            </div>
                        </div>
                    </form>
                )}

                <WeeklyView
                    todos={todos}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                    onUpdateDay={handleUpdateDay}
                />
            </div>
        </>
    );
};

export default App;
