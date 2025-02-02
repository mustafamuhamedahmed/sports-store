import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import InputField from "../components/InputField"; 
import Button from "../components/Button"; 

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 }; 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { name: "", email: "", address: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Shipping Address is required.";
      isValid = false;
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      navigate("/orders", {
        state: { 
          cart,
          totalPrice,
          formData 
        }
      });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Checkout</h1>
      
      {/* Order Summary */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Order Summary</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((product) => (
            <li
              key={product.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{product.name}</h3>
                <p style={{ margin: "5px 0" }}>
                  Price: ${product.price} x {product.quantity}
                </p>
                <p style={{ fontWeight: "bold" }}>Subtotal: ${product.price * product.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <p style={{ fontWeight: "bold", textAlign: "right" }}>
          Total Price: ${totalPrice.toFixed(2)}
        </p>
      </div>

      {/* Shipping Information Form */}
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          error={errors.name}
          helperText={errors.name}
        />
        <InputField
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={errors.email}
          helperText={errors.email}
        />
        <InputField
          label="Shipping Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          error={errors.address}
          helperText={errors.address}
        />
        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          error={errors.phone}
          helperText={errors.phone}
        />
        <Button type="submit" label="Proceed to Orders" />
      </form>
    </div>
  );
};

export default Checkout;
