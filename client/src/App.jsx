import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { CartSidebar } from './components/CartSidebar'
import { ProductDetails } from './components/ProductDetails'
import { Banner } from './components/Banner'
import { Footer } from './components/Footer'

function App() {
  const [backendStatus, setBackendStatus] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones Pro',
      brand: 'AudioMax',
      price: 129.99,
      originalPrice: 179.99,
      image: '🎧',
      badge: 'Top Seller',
      description:
        'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
      reviews: 2847,
      color: 'Black/Silver',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'USB-C Cable Pro',
      brand: 'TechLink',
      price: 14.99,
      originalPrice: 19.99,
      image: '🔌',
      badge: 'Budget Pick',
      description: 'Fast charging cable with enhanced durability. Supports 100W power delivery.',
      reviews: 5632,
      color: 'White',
      category: 'Accessories',
    },
    {
      id: 3,
      name: 'Phone Stand Deluxe',
      brand: 'StandTech',
      price: 24.99,
      originalPrice: 34.99,
      image: '📱',
      badge: 'New',
      description: 'Adjustable aluminum phone stand compatible with all devices. Portable design.',
      reviews: 1923,
      color: 'Silver',
      category: 'Accessories',
    },
    {
      id: 4,
      name: 'Portable Charger 25000',
      brand: 'PowerBank',
      price: 49.99,
      originalPrice: 69.99,
      image: '🔋',
      badge: 'Best Value',
      description:
        '25000mAh capacity with dual USB ports and USB-C input. Fast charging technology.',
      reviews: 4156,
      color: 'Black',
      category: 'Electronics',
    },
    {
      id: 5,
      name: 'Tempered Glass Protector',
      brand: 'ScreenShield',
      price: 9.99,
      image: '🛡️',
      badge: 'Essential',
      description:
        '9H hardness tempered glass protection. Easy installation with alignment tool included.',
      reviews: 7421,
      color: 'Clear',
      category: 'Accessories',
    },
    {
      id: 6,
      name: 'Premium Phone Case',
      brand: 'CaseGuard',
      price: 29.99,
      originalPrice: 39.99,
      image: '📦',
      badge: 'Featured',
      description: 'Military-grade protection with sleek design. Raised camera protection.',
      reviews: 3554,
      color: 'Midnight Blue',
      category: 'Accessories',
    },
    {
      id: 7,
      name: 'Wireless Charging Pad',
      brand: 'ChargeFast',
      price: 34.99,
      originalPrice: 49.99,
      image: '⚡',
      badge: 'Sale',
      description:
        'Fast wireless charging pad with non-slip surface. Works with all Qi-enabled devices.',
      reviews: 2103,
      color: 'White',
      category: 'Electronics',
    },
    {
      id: 8,
      name: 'Cable Organizer Kit',
      brand: 'TechOrganize',
      price: 12.99,
      image: '📏',
      badge: 'Value Pack',
      description:
        'Complete cable management solution with 5 reusable organizers. Keeps desk clean.',
      reviews: 1876,
      color: 'Black',
      category: 'Accessories',
    },
    {
      id: 9,
      name: 'Bluetooth Speaker Mini',
      brand: 'SoundWave',
      price: 39.99,
      originalPrice: 59.99,
      image: '🔊',
      badge: 'Compact',
      description: 'Portable Bluetooth speaker with 12-hour battery. Waterproof and shockproof.',
      reviews: 3287,
      color: 'Red',
      category: 'Electronics',
    },
    {
      id: 10,
      name: 'Screen Cleaning Kit',
      brand: 'CleanTech',
      price: 8.99,
      image: '🧹',
      badge: 'Bundle',
      description:
        'Professional screen cleaning solution with microfiber cloth. Safe for all screens.',
      reviews: 2541,
      color: 'Multi',
      category: 'Accessories',
    },
    {
      id: 11,
      name: 'Desktop Phone Dock',
      brand: 'StandTech',
      price: 19.99,
      originalPrice: 29.99,
      image: '🖥️',
      badge: 'Office',
      description:
        'Premium desktop dock with non-slip base. Perfect for video calls and streaming.',
      reviews: 1654,
      color: 'Silver',
      category: 'Accessories',
    },
    {
      id: 12,
      name: 'Travel Adapter Pro',
      brand: 'TravelTech',
      price: 24.99,
      originalPrice: 34.99,
      image: '🌍',
      badge: 'Travel',
      description: 'Universal travel adapter with USB ports. Works in 150+ countries.',
      reviews: 2876,
      color: 'Black',
      category: 'Electronics',
    },
  ])

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || ''
    fetch(`${apiUrl}/api/health`)
      .then((res) => res.json())
      .then((data) => setBackendStatus(data.status === 'ok'))
      .catch((err) => {
        console.error('Error fetching health check:', err)
        setBackendStatus(false)
      })
  }, [])

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    setShowCart(true)
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    setOrderPlaced(true)
    setCart([])
    setShowCart(false)
    setTimeout(() => {
      setOrderPlaced(false)
    }, 4000)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        backendStatus={backendStatus}
        onCartClick={() => setShowCart(true)}
        onHomeClick={() => {
          setSelectedCategory('All')
          setSearchTerm('')
        }}
      />

      <CartSidebar
        isOpen={showCart}
        cart={cart}
        onClose={() => setShowCart(false)}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <main className="main-container">
        {orderPlaced ? (
          <div className="success-section">
            <div className="success-card">
              <div className="success-icon">✅</div>
              <h1>Order Placed Successfully!</h1>
              <p>
                Thank you for your purchase. Your order will be shipped within 2-3 business days.
              </p>
              <div className="success-details">
                <p>📧 Check your email for order confirmation</p>
                <p>🚚 Track your shipment status anytime</p>
                <p>💬 Customer support available 24/7</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Banner backendStatus={backendStatus} />

            <section className="products-section">
              <div className="section-header">
                <h2>Featured Classics</h2>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="no-products">
                  <p>No products found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onViewDetails={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
