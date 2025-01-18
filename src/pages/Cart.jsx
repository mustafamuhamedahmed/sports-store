import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const initialCart = location.state?.cart || []; 
  const [cart, setCart] = useState(initialCart);

  const handleRemoveProduct = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const handleChangeQuantity = (productId, action, availableQuantity) => {
    setCart(
      cart.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: action === "increase"
                ? Math.min(product.quantity + 1, availableQuantity) // زيادة الكمية مع التحقق من الكمية المتاحة
                : Math.max(product.quantity - 1, 1), // تقليل الكمية مع التأكد من أنها لا تصبح أقل من 1
            }
          : product
      )
    );
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, totalPrice } }); 
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((product) => (
              <li
                key={product.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>{product.name}</h3>
                  <p style={{ margin: "5px 0" }}>Price: ${product.price}</p>
                  <p style={{ margin: "5px 0" }}>Quantity: {product.quantity}</p>
                  <p style={{ margin: "5px 0" }}>Available Quantity: {product.availableQuantity}</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleChangeQuantity(product.id, "decrease", product.availableQuantity)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f0ad4e",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleChangeQuantity(product.id, "increase", product.availableQuantity)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#5cb85c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#d9534f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", textAlign: "right", fontWeight: "bold" }}>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
