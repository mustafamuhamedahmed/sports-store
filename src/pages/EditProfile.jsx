import React, { useState } from "react";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "Mustafa Mohammed",
    email: "Mustafa@example.com",
    address: "123 Main St, City, Country",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // تنفيذ حفظ البيانات هنا (API أو تحديث في الذاكرة)
    console.log("Profile updated:", userData);
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
