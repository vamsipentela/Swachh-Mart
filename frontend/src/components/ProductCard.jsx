import React from 'react';
// Standard CSS/Bootstrap icons for reliability
import './ProductCard.css';

const ProductCard = ({ product, loading }) => {
  if (loading) {
    return (
      <div className="product-card skeleton">
        <div className="card-image skeleton-loader" />
        <div className="card-content">
          <div className="skeleton-loader title" />
        </div>
      </div>
    );
  }

  // Purely a view card now, no clicks allowed.
  return (
    <div className="product-card" style={{ cursor: 'default' }}>
      <div className="card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-image"
        />
      </div>

      <div className="card-content">
        <h3 className="product-title">{product.name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
