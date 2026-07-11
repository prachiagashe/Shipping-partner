import React from 'react';
import './components.css';

export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', ...props }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
