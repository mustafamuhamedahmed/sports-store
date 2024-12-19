import React, { useState } from "react";
import "./Checkout.css";

// دالة للتحقق من صحة البيانات
const validateForm = (formData) => {
  const errors = {};
  if (!formData.name) errors.name = "Full name is required";
  if (!formData.address) errors.address = "Address is required";
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }
  return errors;
};

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      name: "Running Shoes",
      price: 100,
      quantity: 1,
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Fitness T-Shirt",
      price: 50,
      quantity: 2,
      image: "https://via.placeholder.com/100",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // إدارة الحالة للنموذج
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  
  // إدارة الأخطاء
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة البيانات
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // محاكاة عملية إرسال الطلب
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Order Submitted:", { formData, cartItems });
      alert("Your order has been placed successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", address: "", email: "", phone: "" }); // إعادة تعيين النموذج
    }, 2000); // محاكاة عملية الدفع
  };

  return (
    <div className="checkout">
      <h1 className="checkout__title">Checkout</h1>

      <div className="checkout__container">
        {/* قسم المنتجات */}
        <div className="checkout__cart">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="checkout__cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="checkout__total">
            <h3>Total: ${totalPrice}</h3>
          </div>
        </div>

        {/* قسم تفاصيل الشحن */}
        <div className="checkout__form">
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <button type="submit" className="checkout__button" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
