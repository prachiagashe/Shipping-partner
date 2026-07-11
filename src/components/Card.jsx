import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col ${className}`}>
      {children}
    </div>
  );
};
