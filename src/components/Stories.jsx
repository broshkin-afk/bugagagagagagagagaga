import React, { useState, useCallback, useEffect } from 'react'
import './Stories.css'

const Stories = () => {
  const [viewedStories, setViewedStories] = useState(new Set())
  const [selectedStory, setSelectedStory] = useState(null)
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [autoCloseTimer, setAutoCloseTimer] = useState(null)

  const stories = [
    {
      id: 1,
      title: 'Новинки',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      isNew: true
    },
    {
      id: 2,
      title: 'Скидки',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405914756480761866/IMG_5857.jpg?ex=68a08fa6&is=689f3e26&hm=768e5b3084f29cc8cfc4fd5b48969520c17aad204137eb620e9fdfd351cd3436&=&format=webp&width=733&height=977',
      isNew: true
    },
    {
      id: 3,
      title: 'VIP',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405906530376749076/IMG_7044.jpg?ex=68a087fd&is=689f367d&hm=6b1f31d921fabc0ca767e76e379742cdb0ce8fe7e8fb32fa3d51d87be4c6dc4b&=&format=webp&width=263&height=350',
      isNew: true
    },
    {
      id: 4,
      title: 'Тренды',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879180788502558/IMG_6268.jpg?ex=68a06e84&is=689f1d04&hm=01f4a40e8e52b6c96f76f49b177c838da1c9702a2c9bcea564afa7fcd392cd3d&=&format=webp&width=263&height=350',
      isNew: false
    },
    {
      id: 5,
      title: 'Обзоры',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1404633081377460325/stone-island-x-supreme-paintball-camo-crinkle-reps-puffer-v0-b621jmf8idhb1.png?ex=689fda7f&is=689e88ff&hm=d0d493dde3176a73a62b5c66c2ac8dd093f4e13269271514f8b47ad38fa5f64d&=&format=webp&quality=lossless&width=749&height=978',
      isNew: false
    }
  ]

  // Функция для перехода к следующей истории или закрытия модала
  const goToNextStoryOrClose = useCallback(() => {
    setCurrentStoryIndex(prevIndex => {
      if (prevIndex < stories.length - 1) {
        const nextIndex = prevIndex + 1
        const nextStoryData = stories[nextIndex]
        setSelectedStory(nextStoryData)
        setViewedStories(prev => new Set([...prev, nextStoryData.id]))
        return nextIndex
      } else {
        // Если это последняя история, закрываем модал
        setShowStoryModal(false)
        setSelectedStory(null)
        return prevIndex
      }
    })
  }, [stories.length])

  // Запуск таймера для автопереключения
  useEffect(() => {
    if (showStoryModal && selectedStory) {
      // Очищаем предыдущий таймер
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer)
      }
      
      // Устанавливаем новый таймер
      const timer = setTimeout(goToNextStoryOrClose, 5000)
      setAutoCloseTimer(timer)
      
      // Очистка при размонтировании или изменении истории
      return () => {
        if (timer) {
          clearTimeout(timer)
        }
      }
    }
  }, [showStoryModal, selectedStory, goToNextStoryOrClose, autoCloseTimer])

  const handleStoryClick = (story) => {
    const storyIndex = stories.findIndex(s => s.id === story.id)
    setCurrentStoryIndex(storyIndex)
    setSelectedStory(story)
    setShowStoryModal(true)
    setViewedStories(prev => new Set([...prev, story.id]))
  }

  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      const nextIndex = currentStoryIndex + 1
      const nextStoryData = stories[nextIndex]
      setCurrentStoryIndex(nextIndex)
      setSelectedStory(nextStoryData)
      setViewedStories(prev => new Set([...prev, nextStoryData.id]))
    } else {
      // Если это последняя история, закрываем модал
      closeStoryModal()
    }
  }

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      const prevIndex = currentStoryIndex - 1
      const prevStoryData = stories[prevIndex]
      setCurrentStoryIndex(prevIndex)
      setSelectedStory(prevStoryData)
      setViewedStories(prev => new Set([...prev, prevStoryData.id]))
    }
  }

  const closeStoryModal = () => {
    // Очищаем таймер при закрытии
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer)
      setAutoCloseTimer(null)
    }
    
    setShowStoryModal(false)
    setSelectedStory(null)
  }

  const sortedStories = [...stories].sort((a, b) => {
    const aViewed = viewedStories.has(a.id)
    const bViewed = viewedStories.has(b.id)
    
    if (aViewed && !bViewed) return 1
    if (!aViewed && bViewed) return -1
    return 0
  })

  return (
    <div className="stories">
      <div className="container">
        <div className="stories-scroll">
          {sortedStories.map((story) => {
            const isViewed = viewedStories.has(story.id)
            return (
              <div 
                key={story.id}
                className={`story-item ${isViewed ? 'viewed' : ''}`}
                onClick={() => handleStoryClick(story)}
              >
                <div className="story-ring">
                  <div className="story-image">
                    <img src={story.image} alt={story.title} />
                  </div>
                  {story.isNew && !isViewed && (
                    <div className="story-badge">🆕</div>
                  )}
                </div>
                <span className="story-title">{story.title}</span>
              </div>
            )
          })}
        </div>
      </div>

      {showStoryModal && selectedStory && (
        <div className="story-modal-overlay" onClick={closeStoryModal}>
                     <div 
             className="story-modal" 
             onClick={(e) => {
               e.stopPropagation()
               const rect = e.currentTarget.getBoundingClientRect()
               const clickX = e.clientX - rect.left
               const width = rect.width
               
               // Клик в левой половине - предыдущая история
               if (clickX < width * 0.3) {
                 prevStory()
               }
               // Клик в правой половине - следующая история
               else if (clickX > width * 0.7) {
                 nextStory()
               }
             }}
             onTouchStart={(e) => {
               const touch = e.touches[0]
               e.target.touchStartY = touch.clientY
             }}
             onTouchEnd={(e) => {
               const touch = e.changedTouches[0]
               const touchStartY = e.target.touchStartY
               const touchEndY = touch.clientY
               const diffY = touchStartY - touchEndY
               
               // Свайп вниз для закрытия
               if (diffY < -50) {
                 closeStoryModal()
               }
             }}
           >
                         {/* Progress Bars */}
             <div className="story-progress-container">
               {stories.map((_, index) => (
                 <div 
                   key={index} 
                   className={`story-progress-bar ${index === currentStoryIndex ? 'active' : ''} ${index < currentStoryIndex ? 'completed' : ''}`}
                 >
                   <div 
                     key={`${index}-${selectedStory?.id}`}
                     className="story-progress-fill"
                   ></div>
                 </div>
               ))}
             </div>
            
            <div className="story-modal-header">
              <h3>{selectedStory.title}</h3>
              <button className="close-button" onClick={closeStoryModal}>×</button>
            </div>
            
            <div className="story-modal-content">
              <img src={selectedStory.image} alt={selectedStory.title} />
              <div className="story-description">
                <h4>{selectedStory.title}</h4>
                {selectedStory.isNew && <span className="new-badge">🆕 Новинка</span>}
                <p>Подробная информация о {selectedStory.title.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stories
