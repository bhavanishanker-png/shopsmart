import React from 'react'

export function Header({ cartCount, onCartClick, onHomeClick }) {
  return (
    <header className="header">
      <div className="header-main">
        <div className="header-content">
          <div className="logo" onClick={onHomeClick}>
            TRIUMPH
          </div>

          <nav className="navbar-center">
            <button className="nav-item active">Motorcycles</button>
            <button className="nav-item">Accessories</button>
            <button className="nav-item">Apparel</button>
            <button className="nav-item">Owners</button>
            <button className="nav-item">Racing</button>
            <button className="nav-item">Brand</button>
          </nav>

          <div className="header-right">
            <button className="nav-link">Dealers</button>
            <button className="nav-link">Offers</button>
            <button className="nav-link">Test Ride</button>
            <button className="cart-button" onClick={onCartClick}>
              <span className="icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="language-btn">🇬🇧</button>
          </div>
        </div>
      </div>
    </header>
  )
}
