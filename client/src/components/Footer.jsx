import React from 'react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About ShopSmart</h4>
          <ul>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#press">Press</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#returns">Returns</a>
            </li>
            <li>
              <a href="#shipping">Shipping Info</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#cookies">Cookie Settings</a>
            </li>
            <li>
              <a href="#security">Security</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">📘 Facebook</a>
            <a href="#twitter">𝕏 Twitter</a>
            <a href="#instagram">📷 Instagram</a>
            <a href="#youtube">▶️ YouTube</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Get exclusive deals delivered to your inbox</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; 2026 ShopSmart. All rights reserved.</p>
          <div className="payment-methods">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 Amex</span>
            <span>💳 PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
