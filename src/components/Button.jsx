import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', size = 'md', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all focus:outline-none';
  
  const sizeStyles = {
    md: 'py-3 px-6 text-sm',
    large: 'py-4 px-8 text-base',
  };

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-gray-100',
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
