import React from 'react'

export function CartSidebar({ isOpen, cart, onClose, onRemove, onUpdateQuantity, onCheckout }) {
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const shippingCost = cartTotal > 50 ? 0 : 9.99

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <aside className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart ({itemCount})</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <p className="empty-text">Add items to get started</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">{item.image}</div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      readOnly
                    />
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-button" onClick={() => onRemove(item.id)}>
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              {shippingCost > 0 && (
                <p className="shipping-notice">Free shipping on orders over $50</p>
              )}
              <div className="summary-row tax">
                <span>Estimated Tax:</span>
                <span>${((cartTotal + shippingCost) * 0.08).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <strong>Total:</strong>
                <strong>
                  ${(cartTotal + shippingCost + (cartTotal + shippingCost) * 0.08).toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="cart-footer">
              <button className="checkout-button" onClick={onCheckout}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
