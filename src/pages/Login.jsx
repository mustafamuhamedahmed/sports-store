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

  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080/";

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
      const response = await fetch(`${baseUrl}signin`, {
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

      if (response.ok) {
        const { jwtToken, userId, userRole } = data;

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userRole", userRole);

        if (userRole === "CUSTOMER") {
          const productsResponse = await fetch(`${baseUrl}api/customer/products`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });

          if (productsResponse.ok) {
            const products = await productsResponse.json();
            console.log("Products:", products);
            navigate("/dashboard");
          } else {
            setError("Failed to fetch products.");
          }
        } else {
          setError("Unauthorized user role.");
        }
      } else {
        setError(data.message || "Incorrect email or password.");
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
    </div>
  );
};

export default Login;
