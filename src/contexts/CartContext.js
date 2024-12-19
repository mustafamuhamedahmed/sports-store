import React, { createContext, useState, useEffect, useContext } from "react";

// إنشاء السياق
const CartContext = createContext();

// مزود CartContext
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // محاولة تحميل السلة من localStorage
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // تحديث localStorage عندما تتغير السلة
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // إذا كان المنتج موجودًا بالفعل في السلة، نقوم بتحديث الكمية
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // إذا لم يكن موجودًا، نضيفه إلى السلة
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook مخصص لاستخدام CartContext
export const useCart = () => useContext(CartContext);
