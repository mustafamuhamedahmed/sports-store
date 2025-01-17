import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Shop.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const products = useMemo(() => [
    { id: 1, name: "Nike Shoes", price: 120, description: "High-quality sports shoes.", image: "/assets/images/nike-shoes.jpg", category: "Shoes" },
    { id: 2, name: "Adidas T-Shirt", price: 40, description: "Comfortable sports t-shirt.", image: "/assets/images/adidas-shirt.jpg", category: "Clothing" },
    { id: 3, name: "Rugby Ball", price: 25, description: "Durable and high-quality rugby ball.", image: "/assets/images/rugby ball.jpg", category: "Sports" },
    { id: 4, name: "Tennis Racket", price: 35, description: "Professional tennis racket.", image: "/assets/images/tennis racket.jpg", category: "Sports" },
    { id: 5, name: "Puma Hat", price: 25, description: "Trendy Puma cap for casual wear.", image: "/assets/images/puma hat.jpg", category: "Clothing" },
    { id: 6, name: "Basketball", price: 95, description: "Official size basketball for games.", image: "/assets/images/basketball.jpg", category: "Sports" }
  ], []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  const goToShop = () => {
    navigate("/shop");
  };

  return (
    <div>
      <h1>Welcome to SportsShop</h1>
      <p>Explore the best sports products here!</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {searchQuery && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} style={{ maxWidth: "100px", height: "auto" }} />
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          !searchQuery && <p>Start typing to search for products...</p> 
        )}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button 
          onClick={goToShop}
          style={{
            padding: "10px 20px", 
            backgroundColor: "#007BFF", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer"
          }}
        >
          Go to Shop
        </button>
      </div>
    </div>
  );
};

export default Home;

