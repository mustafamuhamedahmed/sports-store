import React from "react";
import "../styles/components/Button.css";

const Button = ({ label, onClick, type = "button", styleClass = "" }) => {
  return (
    <button className={`button ${styleClass}`} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;