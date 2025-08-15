import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ShopsPage.css'

const ShopsPage = () => {
  const [favorites, setFavorites] = useState(new Set([1])) // Мокап избранных

  const shops = [
    {
      id: 1,
      name: 'Impulse.cc',
      avatar: 'https://picsum.photos/80/80?random=100',
      rating: 4.9,
      reviewsCount: 1247,
      verified: true,
      totalSales: 3420,
      memberSince: '2022',
      description: 'Официальный магазин аккаунтов для маркетплейсов и социальных сетей.',
      categories: ['Marketplace', 'Email', 'Social'],
      productsCount: 15,
      responseTime: '< 1 час'
    },
    {
      id: 2,
      name: 'Digital Store',
      avatar: 'https://picsum.photos/80/80?random=101',
      rating: 4.7,
      reviewsCount: 892,
      verified: true,
      totalSales: 2156,
      memberSince: '2023',
      description: 'Качественные цифровые товары и аккаунты для бизнеса.',
      categories: ['Business', 'Tools'],
      productsCount: 8,
      responseTime: '< 2 часа'
    },
    {
      id: 3,
      name: 'Account Hub',
      avatar: 'https://picsum.photos/80/80?random=102',
      rating: 4.5,
      reviewsCount: 645,
      verified: false,
      totalSales: 1543,
      memberSince: '2023',
      description: 'Широкий выбор аккаунтов для различных платформ.',
      categories: ['Social', 'Gaming'],
      productsCount: 12,
      responseTime: '< 4 часа'
    }
  ]

  const toggleFavorite = (shopId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(shopId)) {
        newFavorites.delete(shopId)
      } else {
        newFavorites.add(shopId)
      }
      return newFavorites
    })
  }

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating))
  }

  return (
    <div className="shops-page">
      <div className="shops-header">
        <div className="container">
          <h1 className="page-title">Шопы</h1>
          <p className="page-subtitle">Проверенные продавцы маркетплейса</p>
        </div>
      </div>

      <div className="container">
        <div className="shops-stats">
          <div className="stat-item">
            <div className="stat-value">{shops.reduce((sum, shop) => sum + shop.totalSales, 0).toLocaleString()}</div>
            <div className="stat-label">Общие продажи</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{shops.length}</div>
            <div className="stat-label">Активных шопов</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{shops.filter(s => s.verified).length}</div>
            <div className="stat-label">Проверенных</div>
          </div>
        </div>

        <div className="shops-list">
          {shops.map((shop) => (
            <div key={shop.id} className="shop-card">
              <Link to={`/seller/${shop.id}`} className="shop-main-info">
                <div className="shop-avatar">
                  <img src={shop.avatar} alt={shop.name} />
                  {shop.verified && (
                    <div className="verified-badge-small">✓</div>
                  )}
                </div>
                <div className="shop-details">
                  <div className="shop-name-row">
                    <h3 className="shop-name">{shop.name}</h3>
                    <div className="shop-rating">
                      <span className="rating-stars">{renderStars(shop.rating)}</span>
                      <span className="rating-value">{shop.rating}</span>
                    </div>
                  </div>
                  
                  <div className="shop-stats-row">
                    <span className="total-sales">{shop.totalSales.toLocaleString()} продаж</span>
                    <span className="products-count">{shop.productsCount} товаров</span>
                    <span className="response-time">{shop.responseTime}</span>
                  </div>

                  <div className="shop-categories">
                    {shop.categories.map((category, index) => (
                      <span key={index} className="category-tag">{category}</span>
                    ))}
                  </div>

                  <p className="shop-description">{shop.description}</p>
                </div>
              </Link>

              <div className="shop-actions">
                <button 
                  className={`favorite-btn ${favorites.has(shop.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(shop.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={favorites.has(shop.id) ? "currentColor" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <Link to={`/seller/${shop.id}`} className="view-shop-btn">
                  Смотреть шоп
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="shops-footer">
          <div className="info-card">
            <h3>Хотите открыть свой шоп?</h3>
            <p>Свяжитесь с администрацией для получения разрешения на создание магазина</p>
            <button className="contact-admin-btn">Связаться с админом</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopsPage
