import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import PostCoupons from "./pages/PostCoupons";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import { ToastContainer } from 'react-toastify'; // استيراد ToastContainer

import "./styles/global.css";
import "./styles/variables.css";
import "./App.css";
import { formatPrice } from "./utils/formatPrice";
import { SPORTS_CATEGORIES, TAX_RATE } from "./utils/constants";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

console.log(SPORTS_CATEGORIES);
console.log(`Tax Rate: ${TAX_RATE * 100}%`);

const price = 99.99;
console.log(formatPrice(price, "USD"));

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/products/:productId" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/post-coupons" element={<PostCoupons />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} /> 
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer /> {/* إضافة ToastContainer في أسفل التطبيق */}
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
