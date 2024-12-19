import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = {
    name: "Mustafa Mohammed",
    email: "Mustafa@example.com",
    avatar: "https://via.placeholder.com/100",
  };

  return (
    <div className="profile">
      <div className="profile__header">
        <img src={user.avatar} alt={user.name} className="profile__avatar" />
        <div className="profile__info">
          <h2 className="profile__name">{user.name}</h2>
          <p className="profile__email">{user.email}</p>
        </div>
      </div>
      <div className="profile__actions">
        <button className="profile__button">Edit Profile</button>
        <button className="profile__button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
