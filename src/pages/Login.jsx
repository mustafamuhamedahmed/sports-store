import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userRole, setUserRole] = useState("");  

  const navigate = useNavigate(); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async () => {
    setError("");
    setIsEmailValid(true);
    setIsPasswordValid(true);

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://your-api-url.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json(); 

      if (response.ok && data.success) {
        const { role } = data;
        setUserRole(role);
        setIsAuthenticated(true);
        console.log("Access granted - " + role + " Page");

        if (role === "Customer") {
          navigate("/ship"); 
        } else if (role === "Admin") {
          navigate("/admin"); 
        }
      } else {
        setError(data.message || "Incorrect email or password.");
        setIsAuthenticated(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <InputField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        isValid={isEmailValid}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        isValid={isPasswordValid}
      />

      <Button
        label={loading ? "Logging in..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />

      {isAuthenticated && (
        <div style={{ color: "green", marginTop: "20px" }}>
          {userRole === "Customer"
            ? "Access granted! Redirecting to Customer page..."
            : "Access granted! Redirecting to Admin page..."}
        </div>
      )}
      
      {!isAuthenticated && error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;

