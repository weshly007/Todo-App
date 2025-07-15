import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} animate-spin rounded-full border-2 border-gray-300 border-t-purple-500`} />
    </div>
  );
};

export default LoadingSpinner;
