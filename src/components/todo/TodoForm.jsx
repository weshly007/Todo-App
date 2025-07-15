import React, { useState } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { PRIORITY_LEVELS } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const TodoForm = () => {
  const { showAddForm, setShowAddForm, addTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState(PRIORITY_LEVELS.MEDIUM);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      addTodo(inputValue, priority);
      setInputValue('');
      setPriority(PRIORITY_LEVELS.MEDIUM);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setInputValue('');
    setPriority(PRIORITY_LEVELS.MEDIUM);
  };

  if (!showAddForm) {
    return (
      <Button
        onClick={() => setShowAddForm(true)}
        className="w-full"
        variant="primary"
      >
        <Plus className="h-5 w-5" />
        Add New Task
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter your task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        className="w-full"
        autoFocus
      />
      
      <div className="flex items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input-field px-3 py-2 text-sm"
        >
          <option value={PRIORITY_LEVELS.LOW}>Low Priority</option>
          <option value={PRIORITY_LEVELS.MEDIUM}>Medium Priority</option>
          <option value={PRIORITY_LEVELS.HIGH}>High Priority</option>
        </select>
        
        <Button onClick={handleSubmit} variant="success" size="sm">
          <Check className="h-4 w-4" />
        </Button>
        
        <Button onClick={handleCancel} variant="secondary" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TodoForm;