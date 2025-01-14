import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentError, setPaymentError] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const { cart = [], totalPrice = 0 } = location.state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!paymentData.name || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      setPaymentError("All fields are required");
      return false;
    }

    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumberPattern.test(paymentData.cardNumber)) {
      setPaymentError("Card number must be 16 digits");
      return false;
    }

    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryPattern.test(paymentData.expiryDate)) {
      setPaymentError("Expiry date must be in MM/YY format");
      return false;
    }

    if (!/^\d{3}$/.test(paymentData.cvv)) {
      setPaymentError("CVV must be 3 digits");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true); 
    setPaymentError(null); 

    if (!validateForm()) {
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch("https://api.example.com/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment failed");

      alert("Payment successful!");

      setPaymentData({ name: "", cardNumber: "", expiryDate: "", cvv: "" });
    } catch (error) {
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>

      <form onSubmit={handleSubmit} className="payment-form">
        <div>
          <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span> - ${item.price.toFixed(2)} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>

        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={paymentData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={paymentData.expiryDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={handleChange}
        />

        {paymentError && <p className="error-message">{paymentError}</p>}

        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default Payment;