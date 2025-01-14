import React from "react";
import "../styles/components/ProductCard.css";
import Button from "./Button";

const ProductCard = ({ name, price, image, onAddToCart, onProductClick }) => {
  return (
    <div className="product-card">
      <img
        src={image}
        alt={name}
        className="product-card__image"
        onClick={onProductClick} // إضافة حدث النقر على الصورة
        style={{ cursor: "pointer" }} // تغيير مؤشر الفأرة لإظهار أن الصورة قابلة للنقر
      />
      <div className="product-card__details">
        <h3 className="product-card__name" onClick={onProductClick} style={{ cursor: "pointer" }}>
          {name} {/* يمكنك جعل الاسم أيضًا قابل للنقر */}
        </h3>
        <p className="product-card__price">${price.toFixed(2)}</p>
        <Button onClick={onAddToCart} label="Add to Cart" />
      </div>
    </div>
  );
};

export default ProductCard;
