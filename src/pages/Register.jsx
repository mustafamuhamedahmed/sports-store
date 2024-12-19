import React, { useState } from "react";
import "./Register.css";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="register">
      <h1 className="register__title">Register</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="register__input"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register__input"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register__input"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button">Sign Up</button>
        <a href="/login" className="register__link">Already have an account? Log in</a>
      </form>
    </div>
  );
};

export default Register;
