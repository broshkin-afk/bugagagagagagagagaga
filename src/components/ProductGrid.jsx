import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ProductGrid.css'

// SVG Icons для переключателя вида
const GridViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
    <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
    <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const ListViewIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2"/>
    <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2"/>
  </svg>
)

const ProductGrid = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' (2 в ряд) или 'list' (1 в ряд)
  const [quantities, setQuantities] = useState({})
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'popular', 'price_low', 'price_high', 'rating'
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Закрытие выпадающего списка при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const products = [
    {
      id: 1,
      name: 'Etsy Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 3,
      stock: 25,
      seller: 'Impulse',
      rating: 4.8,
      createdAt: '2024-01-20',
      popularity: 95
    },
    {
      id: 2,
      name: 'Vinted Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 5,
      stock: 12,
      seller: 'Impulse',
      rating: 4.9,
      createdAt: '2024-01-18',
      popularity: 88
    },
    {
      id: 3,
      name: 'Fiverr Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 2,
      stock: 8,
      seller: 'Impulse',
      rating: 4.7,
      createdAt: '2024-01-15',
      popularity: 76
    },
    {
      id: 4,
      name: 'Gmail Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 1,
      stock: 45,
      seller: 'Impulse',
      rating: 4.6,
      createdAt: '2024-01-22',
      popularity: 82
    },
    {
      id: 5,
      name: 'GMX Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 4,
      stock: 6,
      seller: 'Impulse',
      rating: 4.5,
      createdAt: '2024-01-10',
      popularity: 65
    },
    {
      id: 6,
      name: 'Outlook Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 2,
      stock: 18,
      seller: 'Impulse',
      rating: 4.4,
      createdAt: '2024-01-12',
      popularity: 71
    }
  ]

  const sortOptions = [
    { value: 'newest', label: 'По новизне' },
    { value: 'popular', label: 'По популярности' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'price_low', label: 'Цена: по возрастанию' },
    { value: 'price_high', label: 'Цена: по убыванию' }
  ]

  const getQuantity = (productId) => {
    return quantities[productId] || 1
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }))
    }
  }

  const addToCart = (product) => {
    const quantity = getQuantity(product.id)
    console.log(`Added ${quantity} of ${product.name} to cart`)
    // Здесь будет логика добавления в корзину
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    
    return (
      <div className="rating-stars">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
        {'☆'.repeat(emptyStars)}
      </div>
    )
  }

  const getSortedProducts = () => {
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'popular':
          return b.popularity - a.popularity
        case 'rating':
          return b.rating - a.rating
        case 'price_low':
          return a.price - b.price
        case 'price_high':
          return b.price - a.price
        default:
          return 0
      }
    })
    return sorted
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    setShowSortDropdown(false)
  }

  return (
    <div className="product-section">
      <div className="container">
        <div className="section-header">
          <div className="sort-section">
            <div className="sort-dropdown" ref={dropdownRef}>
              <button 
                className="sort-button"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <span>{sortOptions.find(option => option.value === sortBy)?.label}</span>
                <ChevronDownIcon />
              </button>
              
              {showSortDropdown && (
                <div className="sort-options">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="2 в ряд"
            >
              <GridViewIcon />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="1 в ряд"
            >
              <ListViewIcon />
            </button>
          </div>
        </div>
        
        <div className={`products-grid ${viewMode}`}>
          {getSortedProducts().map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-category">{product.category}</div>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    {renderStars(product.rating)}
                    <span className="rating-value">{product.rating}</span>
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-seller">
                    Продавец: {product.seller}
                    <span className="verified-check">
                      <svg width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="#9ca3af"/>
                      </svg>
                    </span>
                  </div>
                  <div className="product-price-stock">
                    <span className="product-price">{product.price} USDT</span>
                    <span className="product-stock">{product.stock} шт</span>
                  </div>
                </div>
              </Link>
              
              <div className="product-actions">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                    disabled={getQuantity(product.id) <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{getQuantity(product.id)}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                    disabled={getQuantity(product.id) >= product.stock}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  title="Добавить в корзину"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
