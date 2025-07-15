import { useTodoContext } from '../context/TodoContext';

export const useTodos = () => {
  const { dispatch, ...rest } = useTodoContext();

  const addTodo = (text, priority) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: { text: text.trim(), priority } });
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const updateTodo = (id, updates) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setShowAddForm = (show) => {
    dispatch({ type: 'SET_SHOW_ADD_FORM', payload: show });
  };

  const startEditing = (id, text) => {
    dispatch({ type: 'START_EDITING', payload: { id, text } });
  };

  const cancelEditing = () => {
    dispatch({ type: 'CANCEL_EDITING' });
  };

  const setEditValue = (value) => {
    dispatch({ type: 'SET_EDIT_VALUE', payload: value });
  };

  const saveEdit = () => {
    if (rest.editValue.trim()) {
      updateTodo(rest.editingId, { text: rest.editValue.trim() });
    }
  };

  return {
    ...rest,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    setSearchTerm,
    setShowAddForm,
    startEditing,
    cancelEditing,
    setEditValue,
    saveEdit,
  };
};