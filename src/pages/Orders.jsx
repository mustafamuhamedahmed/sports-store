import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  // محاكاة جلب الطلبات
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      order.id.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm)
    );
  });

  const handleViewDetails = (order) => {
    navigate("/view-details", { state: { order } });
  };

  if (isLoading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Your Orders</h1>

      {/* إضافة InputField للبحث */}
      <InputField
        label="Search Orders"
        name="search"
        placeholder="Search by Order ID or Status"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }} // إضافة هامش بين الـ InputField وبقية المحتوى
      />
      
      {/* عرض قائمة الطلبات */}
      <div style={{ marginTop: "20px" }}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              
              {/* استخدام Button لعرض التفاصيل */}
              <Button 
                label="View Details" 
                onClick={() => handleViewDetails(order)} 
                style={{ marginTop: "10px" }} // إضافة هامش بين الزر وبقية المحتوى
              />
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;

