import React from 'react';

export const Input = ({ label, id, type = 'text', placeholder, value, onChange, required = false, error, className = '' }) => {
  return (
    <div className={`flex flex-col mb-3 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-gray-900 mb-1">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`px-3 py-2 text-sm border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
};
