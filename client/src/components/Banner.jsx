import React from 'react'

export function Banner() {
  return (
    <section className="hero-banner">
      <div className="hero-background">
        <div className="ceiling-light"></div>
      </div>
      <div className="hero-grid-floor"></div>

      <div className="hero-top-content">
        <h1 className="hero-title">THE BONNIE TO YOUR CLYDE</h1>
        <button className="shop-classics-btn">SHOP CLASSICS</button>
      </div>

      <div className="hero-middle">
        <div className="hero-stat left-stat">
          <div className="stat-circle"></div>
          <span className="stat-number">1200</span>
          <span className="stat-label">CC ENGINE</span>
        </div>

        <div className="hero-product-image">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"
            alt="Motorcycle"
            className="main-product"
          />
        </div>

        <div className="hero-stat right-stat">
          <div className="stat-circle"></div>
          <span className="stat-number">76</span>
          <span className="stat-label">HORSEPOWER</span>
        </div>
      </div>

      <div className="hero-actions">
        <button className="action-card">
          <span className="action-icon">🏍️</span>
          Build Your Legacy
        </button>
        <button className="action-card">
          <span className="action-icon">🏁</span>
          Book a Test Ride
        </button>
        <button className="action-card">
          <span className="action-icon">🔧</span>
          Schedule a Service
        </button>
      </div>
    </section>
  )
}
