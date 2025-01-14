import React from "react";
import PropTypes from "prop-types";
import "../styles/components/InputField.css";
const InputField = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  required = false,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={name} className="input-field__label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        aria-invalid={error ? "true" : "false"}
        className={`input-field__input ${error ? "input-field__input--error" : ""}`}
      />
      {error && <p className="input-field__error">{error}</p>}
    </div>
  );
};

// تحديد الأنواع للخصائص (Props)
InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

// القيمة الافتراضية للخصائص
InputField.defaultProps = {
  type: "text",
  required: false,
  onFocus: () => {},
  onBlur: () => {},
};

export default InputField;
