import React from 'react'
import { useTelegram } from '../contexts/TelegramContext'
import './Header.css'

const Header = () => {
  const { user } = useTelegram()
  const balance = 1250.50

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="user-info">
            <div className="avatar">
              {user?.photo_url ? (
                <img src={user.photo_url} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {user?.first_name?.[0] || 'U'}
                </div>
              )}
            </div>
            <div className="user-details">
              <div className="username">
                {user?.first_name} {user?.last_name}
              </div>
              {user?.username && (
                <div className="handle">@{user.username}</div>
              )}
            </div>
          </div>
          <div className="balance">
            <div className="balance-label">Баланс</div>
            <div className="balance-amount">{balance.toFixed(2)} USDT</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
