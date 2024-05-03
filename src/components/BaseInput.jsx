import React from "react";
const BaseInput = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
  className = "",
}) => {
  return (
    <div>
      {label ? (
        <label className="form-label">
          {label} <span className="required-star">*</span>
        </label>
      ) : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${className} form-control custom_input`}
      />
    </div>
  );
};

export { BaseInput };
