import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TelegramProvider } from './contexts/TelegramContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ProfilePage from './pages/ProfilePage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import SellerPage from './pages/SellerPage'
import ShopsPage from './pages/ShopsPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <TelegramProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/seller/:id" element={<SellerPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Layout>
      </Router>
    </TelegramProvider>
  )
}

export default App
