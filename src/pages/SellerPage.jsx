import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './SellerPage.css'

const SellerPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')

  const seller = {
    id: parseInt(id),
    name: 'Impulse.cc',
    avatar: 'https://picsum.photos/100/100?random=100',
    rating: 4.9,
    reviewsCount: 1337,
    verified: true,
    totalSales: 3420,
    memberSince: '2022',
    responseTime: '< 1 часа',
    description: 'Реальный генгста!!',
    badges: ['Проверенный продавец', 'Быстрая доставка', '24/7 поддержка']
  }

  const products = [
    {
      id: 1,
      name: 'Etsy Account Premium',
      category: 'Marketplace',
      image: 'https://picsum.photos/150/150?random=1',
      price: 1500,
      stock: 25,
      followers: '50K+'
    },
    {
      id: 2,
      name: 'Vinted Account Pro',
      category: 'Marketplace',
      image: 'https://picsum.photos/150/150?random=2',
      price: 2200,
      stock: 15,
      followers: '30K+'
    },
    {
      id: 3,
      name: 'Gmail Account',
      category: 'Email',
      image: 'https://picsum.photos/150/150?random=3',
      price: 800,
      stock: 50,
      followers: null
    }
  ]

  const reviews = [
    {
      id: 1,
      user: 'Anna K.',
      avatar: 'https://picsum.photos/40/40?random=201',
      rating: 5,
      date: '2024-01-15',
      text: 'Отличный продавец! Аккаунт работает идеально, быстрая доставка.',
      product: 'Etsy Account Premium'
    },
    {
      id: 2,
      user: 'Sergey M.',
      avatar: 'https://picsum.photos/40/40?random=202',
      rating: 5,
      date: '2024-01-12',
      text: 'Все как описано, рекомендую!',
      product: 'Gmail Account'
    },
    {
      id: 3,
      user: 'Elena P.',
      avatar: 'https://picsum.photos/40/40?random=203',
      rating: 4,
      date: '2024-01-10',
      text: 'Хороший сервис, есть небольшие замечания по оформлению.',
      product: 'Vinted Account Pro'
    }
  ]

  const handleBack = () => {
    navigate(-1)
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating))
  }

  return (
    <div className="seller-page">
      <div className="seller-header">
        <button className="back-button" onClick={handleBack}>
          ← Назад
        </button>
        <h1 className="page-title">Продавец</h1>
      </div>

      <div className="container">
        <div className="seller-profile">
          <div className="seller-main-info">
            <div className="seller-avatar-large">
              <img src={seller.avatar} alt={seller.name} />
            </div>
            <div className="seller-info-text">
              <div className="seller-name-verified">
                <h1 className="seller-name-large">{seller.name}</h1>
                {seller.verified && (
                  <span className="verified-badge-large">✓ Проверенный продавец</span>
                )}
              </div>
              <div className="seller-rating-large">
                <span className="rating-stars">{renderStars(seller.rating)}</span>
                <span className="rating-value">{seller.rating}</span>
                <span className="reviews-count">({seller.reviewsCount} отзывов)</span>
              </div>
              <div className="seller-description">
                <p>{seller.description}</p>
              </div>
            </div>
          </div>

          <div className="seller-badges">
            {seller.badges.map((badge, index) => (
              <span key={index} className="seller-badge">{badge}</span>
            ))}
          </div>

          <div className="seller-stats-grid">
            <div className="stat-card">
              <div className="stat-value">{seller.totalSales.toLocaleString()}</div>
              <div className="stat-label">Продаж</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{seller.responseTime}</div>
              <div className="stat-label">Ответ</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{seller.memberSince}</div>
              <div className="stat-label">На площадке с</div>
            </div>
          </div>
        </div>

        <div className="seller-content">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              Товары ({products.length})
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Отзывы ({reviews.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <div className="products-tab">
              <div className="products-grid">
                {products.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="product-card">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-category">{product.category}</div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      {product.followers && (
                        <div className="product-followers">{product.followers} подписчиков</div>
                      )}
                      <div className="product-bottom">
                        <div className="product-price">{product.price} USDT</div>
                        <div className="product-stock">В наличии: {product.stock} шт</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="review-user">
                        <img src={review.avatar} alt={review.user} className="review-avatar" />
                        <div className="review-user-info">
                          <div className="review-user-name">{review.user}</div>
                          <div className="review-date">{review.date}</div>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="review-product">
                      Товар: {review.product}
                    </div>
                    <div className="review-text">
                      {review.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerPage
