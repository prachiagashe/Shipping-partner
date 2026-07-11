import React from 'react';
import './components.css';

export const Input = ({ label, id, type = 'text', placeholder, value, onChange, required = false, className = '' }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}{required && <span className="required-asterisk">*</span>}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input-field"
      />
    </div>
  );
};
