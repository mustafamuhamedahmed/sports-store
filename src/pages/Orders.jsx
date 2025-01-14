import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import InputField from "../components/InputField"; 
import Button from "../components/Button"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = () => {
      const fetchedOrders = [
        {
          id: 1,
          date: "2024-12-01",
          total: 150,
          status: "Shipped",
          products: [
            { name: "Nike Shoes", price: 120, quantity: 1 },
            { name: "Puma Hat", price: 30, quantity: 1 },
          ],
        },
        {
          id: 2,
          date: "2024-11-25",
          total: 80,
          status: "Delivered",
          products: [
            { name: "Adidas T-Shirt", price: 40, quantity: 2 },
          ],
        },
        {
          id: 3,
          date: "2024-10-15",
          total: 200,
          status: "Pending",
          products: [
            { name: "Basketball", price: 95, quantity: 1 },
            { name: "Tennis Racket", price: 35, quantity: 3 },
          ],
        },
      ];

      setOrders(fetchedOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading your orders...</div>;
  }

  const handleViewDetails = (order) => {
    navigate("/orders/details", { state: { order } });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Orders</h1>
      
      <InputField
        label="Search Orders"
        name="search"
        placeholder="Search by Order ID or Status"
        onChange={(e) => {
        }}
      />
      
      <div style={{ marginTop: "20px" }}>
        {orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <Button label="View Details" onClick={() => handleViewDetails(order)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

