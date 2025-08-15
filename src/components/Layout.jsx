import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideHeader = location.pathname.startsWith('/product/') || location.pathname.startsWith('/order/')
  
  return (
    <div className="layout">
      {!hideHeader && <Header />}
      <main className="main-content">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
