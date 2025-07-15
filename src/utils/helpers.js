import { PRIORITY_COLORS } from './constants';

export const getPriorityColor = (priority) => {
  return PRIORITY_COLORS[priority] || 'bg-gray-500';
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const sortTodosByPriority = (todos) => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};

export const filterTodos = (todos, filter, searchTerm) => {
  return todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
};