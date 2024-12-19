import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  // حالة تخزين بيانات المستخدم
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // محاكاة جلب بيانات المستخدم من API أو من localStorage
  useEffect(() => {
    const fetchUserData = () => {
      // محاكاة طلب API لجلب بيانات المستخدم
      const currentUser = {
        name: "Mustafa Mohammed",
        email: "Mustafa@example.com",
        address: "123 Main St, City, Country",
      };

      setUser(currentUser);
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  // عرض الرسالة أثناء تحميل البيانات
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <div className="dashboard__info">
        <h2>Your Account Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>

      <div className="dashboard__actions">
        <Link to="/edit-profile" className="dashboard__link">
          Edit Profile
        </Link>
        <Link to="/orders" className="dashboard__link">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
