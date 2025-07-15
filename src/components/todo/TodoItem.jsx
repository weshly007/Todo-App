import React from 'react';
import { Check, X, Edit3, Trash2, Clock } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { getPriorityColor } from '../../utils/helpers';
import { formatDate } from '../../utils/dateUtils';
import { PRIORITY_LEVELS } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const TodoItem = ({ todo }) => {
  const {
    toggleTodo,
    deleteTodo,
    updateTodo,
    startEditing,
    cancelEditing,
    setEditValue,
    saveEdit,
    editingId,
    editValue,
  } = useTodos();

  const isEditing = editingId === todo.id;

  const handlePriorityChange = (newPriority) => {
    updateTodo(todo.id, { priority: newPriority });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div className={`glass-card p-4 transition-all duration-200 hover:bg-white/20 animate-slide-in ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center gap-3">
        {/* Complete Button */}
        <Button
          onClick={() => toggleTodo(todo.id)}
          variant="ghost"
          size="sm"
          className={`w-6 h-6 p-0 rounded-full border-2 ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-400 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check className="h-3 w-3 text-white" />}
        </Button>

        {/* Priority Indicator */}
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(todo.priority)}`} />

        {/* Todo Content */}
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full"
              autoFocus
            />
          ) : (
            <div className="flex flex-col">
              <span className={`text-white ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">
                  {formatDate(todo.createdAt)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button onClick={saveEdit} variant="success" size="sm">
                <Check className="h-4 w-4" />
              </Button>
              <Button onClick={cancelEditing} variant="secondary" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <select
                value={todo.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="input-field px-2 py-1 text-xs"
              >
                <option value={PRIORITY_LEVELS.LOW}>Low</option>
                <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
                <option value={PRIORITY_LEVELS.HIGH}>High</option>
              </select>

              <Button
                onClick={() => startEditing(todo.id, todo.text)}
                variant="ghost"
                size="sm"
              >
                <Edit3 className="h-4 w-4" />
              </Button>

              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;