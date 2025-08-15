import React, { useState } from 'react'
import { useTelegram } from '../contexts/TelegramContext'
import './AdminPage.css'

const AdminPage = () => {
  const { userRole } = useTelegram()
  const [activeTab, setActiveTab] = useState('overview')

  // Статистика для админов
  const stats = {
    totalUsers: 15420,
    totalShops: 12,
    totalSales: 125630,
    pendingDisputes: 3,
    pendingShopRequests: 5,
    totalRevenue: 1256300
  }

  const disputes = [
    {
      id: 1,
      orderId: 1001,
      buyer: 'Anna K.',
      seller: 'TechStore',
      reason: 'Товар не соответствует описанию',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      orderId: 1002,
      buyer: 'Sergey M.',
      seller: 'Digital Store',
      reason: 'Проблемы с доступом к аккаунту',
      date: '2024-01-14',
      status: 'pending'
    }
  ]

  const shopRequests = [
    {
      id: 1,
      userId: 123456,
      username: 'new_seller',
      shopName: 'Gaming Accounts',
      description: 'Магазин игровых аккаунтов',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      userId: 789012,
      username: 'digital_master',
      shopName: 'Digital Assets',
      description: 'Цифровые товары и услуги',
      date: '2024-01-14',
      status: 'pending'
    }
  ]

  const approveShopRequest = (requestId) => {
    console.log('Approved shop request:', requestId)
  }

  const rejectShopRequest = (requestId) => {
    console.log('Rejected shop request:', requestId)
  }

  const resolveDispute = (disputeId, resolution) => {
    console.log('Resolved dispute:', disputeId, resolution)
  }

  if (userRole !== 'impulse_admin') {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <h1>Панель администратора</h1>
        </div>
        <div className="container">
          <div className="access-denied">
            <h2>Доступ запрещен</h2>
            <p>У вас нет прав для просмотра этой страницы.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <h1>Панель администратора</h1>
          <p>Управление маркетплейсом Impulse.cc</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Обзор
          </button>
          <button 
            className={`tab ${activeTab === 'disputes' ? 'active' : ''}`}
            onClick={() => setActiveTab('disputes')}
          >
            Споры ({disputes.length})
          </button>
          <button 
            className={`tab ${activeTab === 'shops' ? 'active' : ''}`}
            onClick={() => setActiveTab('shops')}
          >
            Заявки шопов ({shopRequests.length})
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
                  <div className="stat-label">Пользователей</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="8,1 8,4 16,4 16,1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalShops}</div>
                  <div className="stat-label">Активных шопов</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalSales.toLocaleString()}</div>
                  <div className="stat-label">Продаж</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.totalRevenue.toLocaleString()} USDT</div>
                  <div className="stat-label">Оборот</div>
                </div>
              </div>
              
              <div className="stat-card urgent">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.pendingDisputes}</div>
                  <div className="stat-label">Ожидают решения</div>
                </div>
              </div>
              
              <div className="stat-card pending">
                <div className="stat-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stats.pendingShopRequests}</div>
                  <div className="stat-label">Новых заявок</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'disputes' && (
          <div className="disputes-tab">
            <h2>Активные споры</h2>
            <div className="disputes-list">
              {disputes.map((dispute) => (
                <div key={dispute.id} className="dispute-card">
                  <div className="dispute-header">
                    <div className="dispute-info">
                      <h3>Спор #{dispute.id}</h3>
                      <p>Заказ #{dispute.orderId}</p>
                    </div>
                    <div className="dispute-date">{dispute.date}</div>
                  </div>
                  
                  <div className="dispute-details">
                    <div className="dispute-parties">
                      <span><strong>Покупатель:</strong> {dispute.buyer}</span>
                      <span><strong>Продавец:</strong> {dispute.seller}</span>
                    </div>
                    <div className="dispute-reason">
                      <strong>Причина:</strong> {dispute.reason}
                    </div>
                  </div>
                  
                  <div className="dispute-actions">
                    <button 
                      className="resolve-btn buyer"
                      onClick={() => resolveDispute(dispute.id, 'buyer')}
                    >
                      В пользу покупателя
                    </button>
                    <button 
                      className="resolve-btn seller"
                      onClick={() => resolveDispute(dispute.id, 'seller')}
                    >
                      В пользу продавца
                    </button>
                    <button 
                      className="resolve-btn neutral"
                      onClick={() => resolveDispute(dispute.id, 'neutral')}
                    >
                      Компромисс
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shops' && (
          <div className="shops-tab">
            <h2>Заявки на создание шопов</h2>
            <div className="requests-list">
              {shopRequests.map((request) => (
                <div key={request.id} className="request-card">
                  <div className="request-header">
                    <div className="request-info">
                      <h3>{request.shopName}</h3>
                      <p>@{request.username} (ID: {request.userId})</p>
                    </div>
                    <div className="request-date">{request.date}</div>
                  </div>
                  
                  <div className="request-description">
                    <p>{request.description}</p>
                  </div>
                  
                  <div className="request-actions">
                    <button 
                      className="approve-btn"
                      onClick={() => approveShopRequest(request.id)}
                    >
                      Одобрить
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => rejectShopRequest(request.id)}
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
