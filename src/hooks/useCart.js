import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

// Hook مخصص لإدارة سلة المشتريات
const useCart = () => {
  const context = useContext(CartContext);

  // التحقق من وجود الـ Context
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = context;

  // حساب عدد العناصر في السلة
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return { cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount };
};

export default useCart;
