import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Главная',
      icon: ''
    },
    {
      path: '/cart',
      label: 'Корзина',
      icon: ''
    },
    {
      path: '/profile',
      label: 'Профиль',
      icon: ''
    }
  ]

  return (
    <nav className="bottom-nav">
      <div className="nav-container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
