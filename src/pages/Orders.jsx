import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  // حالة لتخزين قائمة الطلبات
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // محاكاة جلب بيانات الطلبات من API أو من localStorage
  useEffect(() => {
    const fetchOrders = () => {
      // محاكاة بيانات الطلبات
      const fetchedOrders = [
        {
          id: 1,
          date: "2024-12-01",
          total: 150,
          status: "Shipped",
        },
        {
          id: 2,
          date: "2024-11-25",
          total: 80,
          status: "Delivered",
        },
        {
          id: 3,
          date: "2024-10-15",
          total: 200,
          status: "Pending",
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

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__list">
        {orders.map((order) => (
          <div key={order.id} className="orders__item">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <button className="orders__button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;