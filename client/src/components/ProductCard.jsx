import React from 'react'

export function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <div className="product-image">{product.image}</div>
        <div className="product-badge">{product.badge}</div>
        <button
          className="wishlist-btn"
          onClick={() => console.log('Added to wishlist:', product.name)}
        >
          ♡
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <p className="description">{product.description}</p>
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>
      </div>
      <div className="product-footer">
        <div className="price-section">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <div className="product-actions">
          <button className="view-btn" onClick={() => onViewDetails(product)}>
            View
          </button>
          <button className="add-btn" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
