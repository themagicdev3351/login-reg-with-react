import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => updateTodo(todo.id)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={addTodo}>Add Todo</button>
            </div>
        </div>
    );
};

export default TodoList;
