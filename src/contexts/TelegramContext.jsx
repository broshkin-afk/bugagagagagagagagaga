import React, { createContext, useContext, useEffect, useState } from 'react'

const TelegramContext = createContext()

export const useTelegram = () => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error('useTelegram must be used within a TelegramProvider')
  }
  return context
}

export const TelegramProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [webApp, setWebApp] = useState(null)

  useEffect(() => {
    const app = window.Telegram?.WebApp
    if (app) {
      app.ready()
      setWebApp(app)
      
      if (app.initDataUnsafe?.user) {
        setUser(app.initDataUnsafe.user)
      } else {
        // Мокап пользователей для тестирования ролей
        setUser({
          id: 123456789,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          photo_url: 'https://picsum.photos/40/40?random=20'
        })
      }
      
      app.expand()
      app.MainButton.hide()
    } else {
      setUser({
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser',
        photo_url: 'https://picsum.photos/40/40?random=20'
      })
    }
  }, [])

  // Система ролей
  const getUserRole = (userId) => {
    // Проверяем, если это локальный хост, то демонстрационный админ
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    
    if (userId === 282063428) return 'impulse_admin'
    if (isLocalhost && userId === 123456789) return 'impulse_admin' // Для демо на локалхосте
    if (userId === 123456789) return 'shop_admin' // Для демо
    return 'user'
  }

  const userRole = user ? getUserRole(user.id) : 'user'

  const value = {
    user,
    webApp,
    userRole,
    showAlert: (message) => {
      if (webApp) {
        webApp.showAlert(message)
      } else {
        alert(message)
      }
    },
    showConfirm: (message) => {
      if (webApp) {
        return new Promise((resolve) => {
          webApp.showConfirm(message, resolve)
        })
      } else {
        return Promise.resolve(confirm(message))
      }
    }
  }

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
