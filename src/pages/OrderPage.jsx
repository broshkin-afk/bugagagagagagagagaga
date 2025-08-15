import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './OrderPage.css'

const OrderPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
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
    status: id === 'new' ? 'processing' : 'delivery',
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
    { key: 'processing', label: 'Оформлено', icon: '📝' },
    { key: 'delivery', label: 'Выдача', icon: '🚚' },
    { key: 'completed', label: 'Выдано', icon: '✅' }
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
      </div>
    </div>
  )
}

export default OrderPage
