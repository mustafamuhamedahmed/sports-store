import React from "react";
import "../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="/privacy" className="footer__link">Privacy Policy</a>
        <a href="/terms" className="footer__link">Terms of Service</a>
        <a href="/contact" className="footer__link">Contact Us</a>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} SportsShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
