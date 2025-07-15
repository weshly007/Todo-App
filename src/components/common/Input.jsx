import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  onKeyPress,
  className = '',
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={`input-field px-4 py-2 ${Icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;