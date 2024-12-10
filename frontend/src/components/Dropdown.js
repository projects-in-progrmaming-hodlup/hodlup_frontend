/* src/components/Dropdown.js */
import React from 'react';
import '../styles/Dropdown.css';


const Dropdown = ({ label, options, onSelect, selectedValue }) => {
  return (
    <div>
      <label>{label}</label>
      <select 
        value={selectedValue} 
        onChange={(e) => onSelect(e.target.value)}>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
