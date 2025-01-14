import React from "react";
import { useLocation } from "react-router-dom";

const ViewDetails = () => {
  const location = useLocation();
  const { order } = location.state || {}; 

  if (!order) {
    return <div>Error: Order not found!</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Date:</strong> {order.date}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <p><strong>Status:</strong> {order.status}</p>
      
      <h2>Products:</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {order.products.map((product, index) => (
          <li key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewDetails;
