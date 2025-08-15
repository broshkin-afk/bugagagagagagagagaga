import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './OrderPage.css'

const OrderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showDispute, setShowDispute] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'seller',
      text: 'Здравствуйте! Ваш заказ принят в обработку.',
      time: '10:30'
    },
    {
      id: 2,
      sender: 'buyer',
      text: 'Когда будет готов аккаунт?',
      time: '10:35'
    },
    {
      id: 3,
      sender: 'seller',
      text: 'Аккаунт будет готов в течение 2-3 часов. Уведомлю как только все будет готово.',
      time: '10:40'
    }
  ])

  const order = {
    id: id === 'new' ? Date.now() : parseInt(id),
    date: new Date().toISOString().split('T')[0],
    status: id === 'new' ? 'processing' : (id === 'completed' ? 'completed' : 'delivery'),
            items: [
          { name: 'Etsy Account', price: 1500, quantity: 1 },
          { name: 'Vinted Account', price: 2200, quantity: 2 }
        ],
    total: 5900,
    seller: {
      name: 'TechStore',
      avatar: 'https://picsum.photos/40/40?random=30'
    }
  }

  const statusSteps = [
    { 
      key: 'processing', 
      label: 'Оформлено', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
          <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      key: 'delivery', 
      label: 'Выдача', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="1" y="3" width="15" height="13" stroke="currentColor" strokeWidth="2"/>
          <polygon points="16,3 21,8 21,16 16,16" stroke="currentColor" strokeWidth="2"/>
          <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      key: 'completed', 
      label: 'Выдано', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2"/>
          <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ]

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === order.status)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'buyer',
      text: message,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }

    setChatMessages(prev => [...prev, newMessage])
    setMessage('')
  }

  const handleBack = () => {
    navigate(-1)
  }

  const submitReview = () => {
    console.log('Review submitted:', {
      rating: reviewRating,
      text: reviewText,
      anonymous: isAnonymous
    })
    setShowReviewModal(false)
    setReviewText('')
    setReviewRating(5)
    setIsAnonymous(false)
  }

  const openDispute = () => {
    setShowDispute(true)
  }

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'active' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => onRatingChange?.(index + 1) : undefined}
      >
        ⭐
      </span>
    ))
  }

  return (
    <div className="order-page">
      <div className="order-header">
        <button className="back-button" onClick={handleBack}>
          ← Назад
        </button>
        <h1 className="page-title">Заказ #{order.id}</h1>
      </div>

      <div className="container">
        <div className="order-status-section">
          <h2>Статус заказа</h2>
          <div className="status-timeline">
            {statusSteps.map((step, index) => {
              const currentIndex = getCurrentStepIndex()
              const isActive = index <= currentIndex
              const isCurrent = index === currentIndex
              
              return (
                <div key={step.key} className={`status-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-label">{step.label}</div>
                  {index < statusSteps.length - 1 && (
                    <div className={`step-line ${index < currentIndex ? 'completed' : ''}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="order-details-section">
          <h2>Детали заказа</h2>
          <div className="order-info">
            <div className="order-date">
              Дата заказа: {new Date(order.date).toLocaleDateString('ru-RU')}
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">
                    {item.name} x{item.quantity}
                  </span>
                                     <span className="item-price">
                     {(item.price * item.quantity).toLocaleString()} USDT
                   </span>
                </div>
              ))}
            </div>
            
                         <div className="order-total">
               Итого: {order.total.toLocaleString()} USDT
             </div>
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <div className="seller-info">
              <img src={order.seller.avatar} alt={order.seller.name} className="seller-avatar" />
              <div className="seller-details">
                <div className="seller-name">{order.seller.name}</div>
                <div className="seller-status">Продавец онлайн</div>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === 'buyer' ? 'own' : 'other'}`}>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Написать продавцу..."
              className="message-input"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              ➤
            </button>
          </div>
        </div>

        {order.status === 'completed' && (
          <div className="order-actions">
            <button 
              className="review-button"
              onClick={() => setShowReviewModal(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Оставить отзыв
            </button>
            <button 
              className="dispute-button"
              onClick={openDispute}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Открыть спор
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Оставить отзыв</h3>
              <button className="close-button" onClick={() => setShowReviewModal(false)}>×</button>
            </div>
            
            <div className="review-form">
              <div className="rating-section">
                <label>Оценка:</label>
                <div className="stars-container">
                  {renderStars(reviewRating, true, setReviewRating)}
                </div>
              </div>

              <div className="review-text-section">
                <label>Отзыв:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Расскажите о своем опыте покупки..."
                  className="review-textarea"
                  rows={4}
                />
              </div>

              <div className="anonymous-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  Оставить отзыв анонимно
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowReviewModal(false)}
                >
                  Отмена
                </button>
                <button 
                  className="submit-button"
                  onClick={submitReview}
                  disabled={!reviewText.trim()}
                >
                  Отправить отзыв
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDispute && (
        <div className="modal-overlay" onClick={() => setShowDispute(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Открыть спор</h3>
              <button className="close-button" onClick={() => setShowDispute(false)}>×</button>
            </div>
            
            <div className="dispute-info">
              <p>Вы собираетесь открыть спор по данному заказу. Администрация рассмотрит вашу жалобу в течение 24 часов.</p>
              <p><strong>Причины для открытия спора:</strong></p>
              <ul>
                <li>Товар не соответствует описанию</li>
                <li>Проблемы с доступом к аккаунту</li>
                <li>Неполная информация от продавца</li>
              </ul>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowDispute(false)}
                >
                  Отмена
                </button>
                <button 
                  className="dispute-confirm-button"
                  onClick={() => {
                    console.log('Dispute opened for order:', order.id)
                    setShowDispute(false)
                  }}
                >
                  Открыть спор
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderPage
