import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductPage.css'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: parseInt(id),
    name: 'Etsy Account Premium',
    category: 'Marketplace',
    image: 'https://picsum.photos/300/300?random=1',
    price: 1500,
    stock: 25,
    followers: '50K+',
    description: 'Премиум аккаунт Etsy с активной аудиторией. Отличная вовлеченность, качественный контент. Подходит для продвижения брендов и товаров.',
    features: [
      '50,000+ подписчиков',
      'Высокая вовлеченность (8%+)',
      'Активная аудитория 18-35 лет',
      'Качественный контент',
      'Верифицированный email',
      'Смена пароля включена'
    ],
    stats: {
      avgLikes: '4,200',
      avgComments: '340',
      engagement: '8.4%',
      age: '2 года'
    }
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

  return (
    <div className="product-page">
      <div className="product-header">
        <button className="back-button" onClick={handleBack}>
          ← Назад
        </button>
        <h1 className="page-title">Товар</h1>
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

          <div className="product-features">
            <h3>Что включено</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-pricing">
            <div className="price-section">
              <div className="current-price">{product.price} ₽</div>
              <div className="stock-info">В наличии: {product.stock} шт</div>
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
