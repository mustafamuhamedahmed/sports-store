import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"; 
import Header from "./components/Header";  
import Footer from "./components/Footer";  
import Home from "./pages/Home";  
import Shop from "./pages/Shop"; 
import ProductDetails from "./pages/ProductDetails";  
import Profile from "./pages/Profile";  
import Cart from "./pages/Cart";  
import Login from "./pages/Login";  
import Register from "./pages/Register"; 
import AdminPage from "./pages/AdminPage";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders"; // إضافة صفحة Orders
import EditProfile from "./pages/EditProfile"; // صفحة لتعديل البيانات
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
                <Route path="/product/:id" element={<ProductDetails />} />  
                <Route path="/profile" element={<Profile />} />  
                <Route path="/cart" element={<Cart />} />  
                <Route path="/login" element={<Login />} />  
                <Route path="/register" element={<Register />} /> 
                <Route path="/AdminPage" element={<AdminPage />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/edit-profile" element={<EditProfile />} />
              </Routes>
            </main>
            <Footer />  
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
