import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { filteredTodos, searchTerm } = useTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">
          {searchTerm ? 'No tasks found' : 'No tasks yet'}
        </div>
        <div className="text-gray-500 text-sm">
          {searchTerm ? 'Try adjusting your search' : 'Add your first task to get started'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
