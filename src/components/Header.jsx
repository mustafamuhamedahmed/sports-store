import React, { useEffect, useState } from "react";
import "../styles/components/Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // التحقق من وجود بيانات المستخدم في التخزين المحلي (مثلاً إذا كان المستخدم قد سجل دخوله)
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

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
        {!isAuthenticated ? (
          <>
            <a href="/login" className="header__button">Login</a>
            <a href="/register" className="header__button">Register</a>
          </>
        ) : (
          <a href="/dashboard" className="header__button">Dashboard</a> // يمكنك إضافة رابط للوصول إلى صفحة dashboard
        )}
        <a href="/cart" className="header__cart">
          🛒 Cart <span className="header__cart-count">2</span>
        </a>
      </div>
    </header>
  );
};

export default Header;

