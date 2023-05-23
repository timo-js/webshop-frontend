import React from "react";

const Dropdown = ({ label, value, options, onChange, name }) => {
  return (
    <div>
      <label style={{ width: "100%" }}>
        {label}
        <select
          className="form-select clickable"
          id={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Dropdown;
