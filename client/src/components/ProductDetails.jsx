import React from 'react'

export function ProductDetails({ product, onClose, onAddToCart }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-image">
            <div className="product-image-large">{product.image}</div>
            <div className="product-badge">{product.badge}</div>
          </div>

          <div className="modal-info">
            <h1>{product.name}</h1>
            <p className="modal-brand">{product.brand}</p>

            <div className="modal-rating">
              <span className="stars">★★★★★</span>
              <span className="reviews">({product.reviews} reviews)</span>
              <button className="review-link">See all reviews</button>
            </div>

            <div className="modal-price">
              <span className="price-large">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="discount">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <div className="modal-description">
              <h3>Description</h3>
              <p>{product.description}</p>
              <ul>
                <li>✓ Premium quality materials</li>
                <li>✓ Long lasting durability</li>
                <li>✓ Compatible with all devices</li>
                <li>✓ 2 year warranty included</li>
              </ul>
            </div>

            <div className="modal-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                <div className="spec">
                  <span className="label">Color:</span>
                  <span>{product.color || 'Various'}</span>
                </div>
                <div className="spec">
                  <span className="label">In Stock:</span>
                  <span className="in-stock">✓ In Stock</span>
                </div>
                <div className="spec">
                  <span className="label">Warranty:</span>
                  <span>2 Years</span>
                </div>
                <div className="spec">
                  <span className="label">Shipping:</span>
                  <span>2-3 Business Days</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <input type="number" min="1" defaultValue="1" className="quantity-input" />
              <button className="add-to-cart-modal" onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
              <button className="wishlist-modal">♡ Add to Wishlist</button>
            </div>

            <div className="modal-shipping">
              <p>
                🚚 <strong>Free shipping</strong> on orders over $50
              </p>
              <p>
                ↩️ <strong>30 day returns</strong> - Shop with confidence
              </p>
              <p>
                ✓ <strong>Authentic products</strong> - Direct from brand
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
