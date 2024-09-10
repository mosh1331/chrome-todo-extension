import React, { useState, useEffect } from 'react';
import { styles } from '../../constants/style';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (chrome  && chrome?.storage) {
      chrome.storage.sync.get('todos', (result) => {
        if (result.todos) {
          setTodos(result.todos);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (  chrome  && chrome?.storage) {
      chrome.storage.sync.set({ todos });
    }
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Sticky To-Do</h3>
      <div>
        <input
          style={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            <span
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(index)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(index)} style={styles.removeButton}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default Todo;
