import React from "react";
import "../styles/components/Header.css";

const Header = () => {
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
        <a href="/login" className="header__button">Login</a>
        <a href="/register" className="header__button">Register</a>
        <a href="/cart" className="header__cart">
          🛒 Cart 
        </a>
      </div>
    </header>
  );
};

export default Header;

