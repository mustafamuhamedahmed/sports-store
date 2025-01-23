import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedRole === "Customer" && storedName && storedEmail) {
      setUserRole(storedRole);
      setUserName(storedName);
      setEmail(storedEmail);
      setLoading(false);
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleEdit = () => {
    setNewName(userName);
    setNewEmail(email);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (!newName || !newEmail) {
      setError("Both name and email are required.");
      return;
    }


    localStorage.setItem("userName", newName);
    localStorage.setItem("userEmail", newEmail);

    setUserName(newName);
    setEmail(newEmail);
    setIsEditing(false);
    setError(""); 

    setMessage("Profile updated successfully!");
    setMessageType("success");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");

    setMessage("Logged out successfully!");
    setMessageType("success");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Welcome to your Dashboard, {userName}!</h1>

      <div>
        <h2>Customer Dashboard</h2>
        <p>Here you can manage your orders, view your profile, and more.</p>
      </div>

      {/* عرض رسالة التأكيد */}
      {message && (
        <div style={{
          padding: "10px",
          margin: "20px 0",
          backgroundColor: messageType === "success" ? "green" : "red",
          color: "white",
          borderRadius: "5px"
        }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <h3>Your Profile</h3>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {email}</p>

        {!isEditing ? (
          <div>
            <button onClick={handleEdit}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
            <br />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button onClick={handleSaveChanges}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
