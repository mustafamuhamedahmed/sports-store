import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import EditProfile from "./pages/EditProfile";
import Payment from "./pages/Payment";
import PostCoupons from "./pages/PostCoupons";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute"; // حماية المسارات الخاصة
import { ToastContainer } from "react-toastify";

import "./styles/global.css";
import "./styles/variables.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

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
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/post-coupons" element={<PrivateRoute><PostCoupons /></PrivateRoute>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
