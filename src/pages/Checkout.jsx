import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

// دالة للتحقق من صحة بيانات الدفع
const validatePaymentForm = (paymentData) => {
  const errors = {};
  if (!paymentData.cardNumber) errors.cardNumber = "Card number is required";
  if (!paymentData.expiryDate) errors.expiryDate = "Expiry date is required";
  if (!paymentData.cvc) errors.cvc = "CVC is required";
  return errors;
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    const paymentErrors = validatePaymentForm(paymentData);
    if (Object.keys(paymentErrors).length > 0) {
      setErrors(paymentErrors);
      return;
    }

    // محاكاة عملية الدفع
    setIsProcessing(true);
    setTimeout(() => {
      console.log("Payment Processed:", { paymentData, cart });
      alert("Payment Successful! Thank you for your order.");
      setIsProcessing(false);
      navigate("/thank-you"); // الانتقال إلى صفحة الشكر بعد الدفع
    }, 2000); // محاكاة عملية الدفع
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      {cart.length > 0 ? (
        <>
          <p>Please review your order and enter payment details.</p>
          <ul className="checkout-cart-list">
            {cart.map((product) => (
              <li key={product.id} className="checkout-cart-item">
                <div className="checkout-item-details">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <div className="checkout-item-total">
                  <p>Total: ${(product.price * product.quantity).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <form onSubmit={handleSubmit} className="payment-form">
              <div>
                <InputField
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  required
                  isValid={!errors.cardNumber}
                />
                {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
              </div>
              <div>
                <InputField
                  type="text"
                  name="expiryDate"
                  placeholder="Expiry Date (MM/YY)"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                  required
                  isValid={!errors.expiryDate}
                />
                {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
              </div>
              <div>
                <InputField
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={paymentData.cvc}
                  onChange={handleChange}
                  required
                  isValid={!errors.cvc}
                />
                {errors.cvc && <p className="error-message">{errors.cvc}</p>}
              </div>
              <Button type="submit" disabled={isProcessing} label={isProcessing ? "Processing..." : "Pay Now"} />
            </form>
          </div>
        </>
      ) : (
        <p>Your cart is empty. Please go back and add items to your cart.</p>
      )}
    </div>
  );
};

export default Payment;
