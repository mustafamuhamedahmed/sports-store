import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);  // لإظهار نموذج التعديل
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    // محاكاة جلب بيانات المستخدم
    const fetchUserData = () => {
      const currentUser = {
        name: "Mustafa Mohammed",
        email: "Mustafa@example.com",
        address: "123 Main St, City, Country",
      };

      setUser(currentUser);
      setEditedUser(currentUser);  // تعيين البيانات المعدلة أيضا
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);  // إعادة البيانات الأصلية
  };

  const handleSaveEdit = () => {
    setUser(editedUser);  // حفظ التغييرات
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>

      <div className="dashboard__info">
        <h2>Your Account Information</h2>
        {isEditing ? (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </label>
            <br />
            <label>
              Address:
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
              />
            </label>
            <br />
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        )}
      </div>

      <div className="dashboard__actions">
        <Link to="/orders" className="dashboard__link">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
