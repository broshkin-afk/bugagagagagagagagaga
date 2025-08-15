import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CartPage.css'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Etsy Account',
      image: 'https://picsum.photos/80/80?random=1',
      price: 1500,
      quantity: 1,
      category: 'Marketplace'
    },
    {
      id: 2,
      name: 'Vinted Account',
      image: 'https://picsum.photos/80/80?random=2',
      price: 2200,
      quantity: 2,
      category: 'Marketplace'
    }
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Корзина</h1>
          {cartItems.length > 0 && (
            <span className="cart-count">{totalItems} товаров</span>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Корзина пустая</h2>
            <p>Добавьте товары для покупки</p>
            <Link to="/" className="btn-primary">
              За покупками
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                                     <div className="item-details">
                     <h3 className="item-name">{item.name}</h3>
                     <div className="item-category">{item.category}</div>
                     <div className="item-price">{item.price.toLocaleString()} USDT</div>
                   </div>
                  
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

                         <div className="cart-summary">
               <div className="summary-row">
                 <span>Товары ({totalItems} шт)</span>
                 <span>{totalAmount.toLocaleString()} USDT</span>
               </div>
               
               <div className="summary-row total">
                 <span>Итого</span>
                 <span>{totalAmount.toLocaleString()} USDT</span>
               </div>
              
              <Link 
                to="/order/new" 
                className="checkout-btn"
              >
                Оформить заказ
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartPage
