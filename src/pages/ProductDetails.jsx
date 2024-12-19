import React from "react";
import "./ProductDetails.css";

const ProductDetails = ({ product, onAddToCart }) => {
  const { name, description, price, image } = product;

  return (
    <div className="product-details">
      <img src={image} alt={name} className="product-details__image" />
      <div className="product-details__info">
        <h1 className="product-details__name">{name}</h1>
        <p className="product-details__description">{description}</p>
        <p className="product-details__price">${price}</p>
        <button className="product-details__button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
