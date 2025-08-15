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

  const value = {
    user,
    webApp,
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
