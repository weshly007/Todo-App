import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEY, PRIORITY_LEVELS, FILTER_TYPES } from '../utils/constants';
import { generateId, filterTodos, sortTodosByPriority } from '../utils/helpers';

const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: FILTER_TYPES.ALL,
  searchTerm: '',
  showAddForm: false,
  editingId: null,
  editValue: '',
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    
    case 'ADD_TODO':
      const newTodo = {
        id: generateId(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority || PRIORITY_LEVELS.MEDIUM,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...state,
        todos: [newTodo, ...state.todos],
        showAddForm: false,
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
            : todo
        ),
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : todo
        ),
        editingId: null,
        editValue: '',
      };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_SHOW_ADD_FORM':
      return { ...state, showAddForm: action.payload };
    
    case 'START_EDITING':
      return {
        ...state,
        editingId: action.payload.id,
        editValue: action.payload.text,
      };
    
    case 'CANCEL_EDITING':
      return {
        ...state,
        editingId: null,
        editValue: '',
      };
    
    case 'SET_EDIT_VALUE':
      return { ...state, editValue: action.payload };
    
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [, setStoredTodos] = useLocalStorage(STORAGE_KEY, []);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (savedTodos.length > 0) {
      dispatch({ type: 'SET_TODOS', payload: savedTodos });
    } else {
      // Default todos for demo
      const defaultTodos = [
        {
          id: generateId(),
          text: 'Complete project proposal',
          completed: false,
          priority: PRIORITY_LEVELS.HIGH,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          text: 'Review code changes',
          completed: true,
          priority: PRIORITY_LEVELS.MEDIUM,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: generateId(),
          text: 'Schedule team meeting',
          completed: false,
          priority: PRIORITY_LEVELS.LOW,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      dispatch({ type: 'SET_TODOS', payload: defaultTodos });
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    setStoredTodos(state.todos);
  }, [state.todos, setStoredTodos]);

  const filteredTodos = filterTodos(state.todos, state.filter, state.searchTerm);
  const sortedTodos = sortTodosByPriority(filteredTodos);

  const stats = {
    total: state.todos.length,
    completed: state.todos.filter(t => t.completed).length,
    active: state.todos.filter(t => !t.completed).length,
  };

  const value = {
    ...state,
    dispatch,
    filteredTodos: sortedTodos,
    stats,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
