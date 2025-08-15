import React, { useState } from 'react'
import { useTelegram } from '../contexts/TelegramContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const { user } = useTelegram()
  const [activeTab, setActiveTab] = useState('orders')

  const orders = [
          {
        id: 1,
        date: '2024-01-15',
        items: [
          { name: 'Etsy Account', price: 1500, quantity: 1 }
        ],
        total: 1500,
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-01-10',
        items: [
          { name: 'Vinted Account', price: 2200, quantity: 1 },
          { name: 'Gmail Account', price: 800, quantity: 2 }
        ],
        total: 3800,
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-01-08',
        items: [
          { name: 'Fiverr Account', price: 5000, quantity: 1 }
        ],
        total: 5000,
        status: 'in_progress'
      }
  ]

  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
    completedOrders: orders.filter(order => order.status === 'completed').length,
    avgOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Выполнен'
      case 'in_progress': return 'В процессе'
      case 'cancelled': return 'Отменен'
      default: return 'Неизвестно'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50'
      case 'in_progress': return '#FF9800'
      case 'cancelled': return '#f44336'
      default: return '#999'
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user?.first_name?.[0] || 'U'}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
              {user?.first_name} {user?.last_name}
            </h1>
            {user?.username && (
              <div className="profile-username">@{user.username}</div>
            )}
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            История заказов
          </button>
          <button 
            className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            Статистика
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>История заказов</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>У вас пока нет заказов</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">Заказ #{order.id}</div>
                      <div 
                        className="order-status"
                        style={{ color: getStatusColor(order.status) }}
                      >
                        {getStatusText(order.status)}
                      </div>
                    </div>
                    
                    <div className="order-date">
                      {new Date(order.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
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
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-section">
            <h2>Статистика покупок</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalOrders}</div>
                <div className="stat-label">Всего заказов</div>
              </div>
              
                             <div className="stat-card">
                 <div className="stat-value">{stats.totalSpent.toLocaleString()} USDT</div>
                 <div className="stat-label">Потрачено</div>
               </div>
              
              <div className="stat-card">
                <div className="stat-value">{stats.completedOrders}</div>
                <div className="stat-label">Выполнено</div>
              </div>
              
                             <div className="stat-card">
                 <div className="stat-value">{Math.round(stats.avgOrderValue).toLocaleString()} USDT</div>
                 <div className="stat-label">Средний чек</div>
               </div>
            </div>

            <div className="achievements">
              <h3>Достижения</h3>
              <div className="achievement-list">
                <div className="achievement-item">
                  <span className="achievement-icon">🥇</span>
                  <div className="achievement-info">
                    <div className="achievement-title">Первая покупка</div>
                    <div className="achievement-desc">Совершил первую покупку</div>
                  </div>
                </div>
                
                <div className="achievement-item">
                  <span className="achievement-icon">💎</span>
                  <div className="achievement-info">
                    <div className="achievement-title">VIP покупатель</div>
                    <div className="achievement-desc">Потратил более 5000 USDT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
