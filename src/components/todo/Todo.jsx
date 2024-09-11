import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styles } from '../../constants/style';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos from Chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get('todos', (result) => {
        if (result.todos) {
          setTodos(result.todos);
        }
      });
    }
  }, []);

  // Save todos to Chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
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

  // Handle drag and drop functionality
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newTodos = Array.from(todos);
    const [movedTodo] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, movedTodo);

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

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable-todos">
          {(provided) => (
            <ul
              style={styles.list}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable key={index} draggableId={`${index}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...styles.listItem,
                        ...provided.draggableProps.style,
                      }}
                    >
                      <span
                        style={{
                          textDecoration: todo.done ? 'line-through' : 'none',
                          cursor: 'pointer',
                          flex: 1,
                        }}
                        onClick={() => toggleTodo(index)}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => removeTodo(index)}
                        style={styles.removeButton}
                      >
                        Remove
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};



export default TodoApp;
