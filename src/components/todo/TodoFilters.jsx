import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import { FILTER_TYPES } from '../../utils/constants';
import Button from '../common/Button';

const TodoFilters = () => {
  const { filter, setFilter } = useTodos();

  const filters = [
    { key: FILTER_TYPES.ALL, label: 'All' },
    { key: FILTER_TYPES.ACTIVE, label: 'Active' },
    { key: FILTER_TYPES.COMPLETED, label: 'Completed' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((f) => (
        <Button
          key={f.key}
          onClick={() => setFilter(f.key)}
          variant={filter === f.key ? 'primary' : 'secondary'}
          size="sm"
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
};

export default TodoFilters;
