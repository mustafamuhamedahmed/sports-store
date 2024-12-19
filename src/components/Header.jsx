import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState(""); // حالة لتخزين نص البحث

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // تحديث نص البحث
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // منع إرسال النموذج بشكل افتراضي
    // يمكن إضافة منطق البحث هنا (مثل توجيه المستخدم إلى صفحة البحث أو إجراء استعلام API)
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <a href="/">🏀 SportsShop</a>
      </div>
      <nav className="header__nav">
        <a href="/shop" className="header__link">Shop</a>
        <a href="/about" className="header__link">About</a>
        <a href="/contact" className="header__link">Contact</a>
      </nav>
      <div className="header__actions">
        <form onSubmit={handleSearchSubmit} className="header__search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="header__search-input"
          />
          <button type="submit" className="header__search-button">
            🔍
          </button>
        </form>
        <a href="/login" className="header__button">Login</a>
        <a href="/register" className="header__button">Register</a>
        <a href="/cart" className="header__cart">
          🛒 Cart <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
