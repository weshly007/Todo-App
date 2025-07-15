import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <CheckSquare className="h-8 w-8 text-purple-400" />
        <h1 className="text-4xl font-bold gradient-text">
          Todo App
        </h1>
      </div>
      <p className="text-gray-400">Organize your life with style</p>
    </header>
  );
};

export default Header;
