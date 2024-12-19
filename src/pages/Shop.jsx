import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // حالة البحث

  const products = [
    { id: 1, name: "Nike Shoes", price: 120, image: "/assets/images/nike-shoes.jpg" },
    { id: 2, name: "Adidas T-Shirt", price: 40, image: "/assets/images/adidas-shirt.jpg" },
    { id: 3, name: "Puma Hat", price: 25, image: "/assets/images/puma-hat.jpg" },
    { id: 4, name: "Reebok Shorts", price: 35, image: "/assets/images/reebok-shorts.jpg" }
  ];

  const addToCart = (product) => {
    const productExists = cart.some((item) => item.id === product.id);
    if (!productExists) {
      setCart([...cart, product]);
      console.log(`${product.name} added to cart!`);
    } else {
      console.log(`${product.name} is already in the cart.`);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  // تصفية المنتجات بناءً على نص البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())  // البحث بدون حساسية لحروف كبيرة أو صغيرة
  );

  return (
    <div>
      <h1>Shop</h1>
      
      {/* حقل البحث */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // تحديث حالة البحث
        />
      </div>

      {/* عرض المنتجات بناءً على البحث */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p>No products found</p>  // رسالة في حالة عدم وجود نتائج بحث
        )}
      </div>

      {/* عرض السلة */}
      <div>
        <h2>Cart</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.name} 
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${totalPrice}</p>
      </div>
    </div>
  );
};

export default Shop;
