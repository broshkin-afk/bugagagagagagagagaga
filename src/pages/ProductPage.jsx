import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './ProductPage.css'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = {
    id: parseInt(id),
    name: 'Etsy Account Premium',
    category: 'Marketplace',
    image: 'https://picsum.photos/300/300?random=1',
    price: 1500,
    stock: 25,
    followers: '50K+',
    description: 'Премиум аккаунт Etsy с активной аудиторией. Отличная вовлеченность, качественный контент. Подходит для продвижения брендов и товаров.',
    stats: {
      avgLikes: '4,200',
      avgComments: '340',
      engagement: '8.4%',
      age: '2 года'
    },
    seller: {
      id: 1,
      name: 'Impulse.cc',
      avatar: 'https://picsum.photos/50/50?random=100',
      rating: 4.9,
      reviewsCount: 1247,
      verified: true,
      totalSales: 3420,
      memberSince: '2022'
    },
    totalSales: 156,
    reviews: [
      {
        id: 1,
        user: 'Anna K.',
        avatar: 'https://picsum.photos/40/40?random=201',
        rating: 5,
        date: '2024-01-15',
        text: 'Отличный аккаунт! Все работает как описано, рекомендую.',
        anonymous: false
      },
      {
        id: 2,
        user: 'Анонимный покупатель',
        avatar: null,
        rating: 5,
        date: '2024-01-12',
        text: 'Быстрая доставка, все супер!',
        anonymous: true
      },
      {
        id: 3,
        user: 'Sergey M.',
        avatar: 'https://picsum.photos/40/40?random=202',
        rating: 4,
        date: '2024-01-10',
        text: 'Хороший товар, есть мелкие замечания по описанию.',
        anonymous: false
      }
    ]
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to cart`)
    // Здесь будет логика добавления в корзину
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating))
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <button className="back-button" onClick={handleBack}>
          ← Назад
        </button>
        <h1 className="page-title">Товар</h1>
        <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>

      <div className="container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-main-image" />
          <div className="product-category-badge">{product.category}</div>
        </div>

        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-subtitle">{product.followers} подписчиков</div>
          
          <div className="product-stats">
            <div className="stat-item">
              <span className="stat-label">Средние лайки</span>
              <span className="stat-value">{product.stats.avgLikes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Комментарии</span>
              <span className="stat-value">{product.stats.avgComments}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Вовлеченность</span>
              <span className="stat-value">{product.stats.engagement}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Возраст</span>
              <span className="stat-value">{product.stats.age}</span>
            </div>
          </div>

          <div className="product-description">
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>

          <div className="seller-info">
            <h3>Продавец</h3>
            <Link to={`/seller/${product.seller.id}`} className="seller-card">
              <div className="seller-avatar">
                <img src={product.seller.avatar} alt={product.seller.name} />
              </div>
              <div className="seller-details">
                <div className="seller-name-row">
                  <span className="seller-name">{product.seller.name}</span>
                  {product.seller.verified && (
                    <span className="verified-badge">✓ Проверенный продавец</span>
                  )}
                </div>
                <div className="seller-stats">
                  <div className="seller-rating">
                    <span className="rating-stars">⭐</span>
                    <span className="rating-value">{product.seller.rating}</span>
                    <span className="reviews-count">({product.seller.reviewsCount} отзывов)</span>
                  </div>
                  <div className="seller-meta">
                    <span>{product.seller.totalSales.toLocaleString()} продаж</span>
                    <span>•</span>
                    <span>На площадке с {product.seller.memberSince}</span>
                  </div>
                </div>
              </div>
              <div className="seller-arrow">→</div>
            </Link>
          </div>

          <div className="product-sales-info">
            <div className="sales-stat">
              <div className="sales-value">{product.totalSales}</div>
              <div className="sales-label">Продано</div>
            </div>
            <div className="rating-stat">
              <div className="rating-stars">{renderStars(4.8)}</div>
              <div className="rating-text">4.8 ({product.reviews.length} отзывов)</div>
            </div>
          </div>

          <div className="product-pricing">
            <div className="price-section">
              <div className="current-price">{product.price} USDT</div>
              <div className="stock-info">В наличии: {product.stock} шт</div>
            </div>
          </div>

          <div className="product-reviews">
            <h3>Отзывы ({product.reviews.length})</h3>
            <div className="reviews-list">
              {product.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-user">
                      {review.anonymous ? (
                        <div className="anonymous-avatar">👤</div>
                      ) : (
                        <img src={review.avatar} alt={review.user} className="review-avatar" />
                      )}
                      <div className="review-user-info">
                        <div className="review-user-name">{review.user}</div>
                        <div className="review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <div className="review-text">{review.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="add-to-cart-section">
          <div className="quantity-selector">
            <button 
              className="quantity-btn" 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
              className="quantity-input"
              min="1"
              max={product.stock}
            />
            <button 
              className="quantity-btn" 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          
                     <button className="add-to-cart-btn" onClick={handleAddToCart}>
             Добавить в корзину за {(product.price * quantity).toLocaleString()} USDT
           </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
