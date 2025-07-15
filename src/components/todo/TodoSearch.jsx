import React from 'react';
import { Search } from 'lucide-react';
import { useTodos } from '../../hooks/useTodos';
import { useDebounce } from '../../hooks/useDebounce';
import Input from '../common/Input';

const TodoSearch = () => {
  const { searchTerm, setSearchTerm } = useTodos();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        icon={Search}
        className="w-full"
      />
    </div>
  );
};

export default TodoSearch;