import React, { useState } from 'react'
import './Stories.css'

const Stories = () => {
  const [viewedStories, setViewedStories] = useState(new Set())
  const [selectedStory, setSelectedStory] = useState(null)
  const [showStoryModal, setShowStoryModal] = useState(false)

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
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      isNew: true
    },
    {
      id: 3,
      title: 'VIP',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      isNew: true
    },
    {
      id: 4,
      title: 'Тренды',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      isNew: false
    },
    {
      id: 5,
      title: 'Обзоры',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      isNew: false
    }
  ]

  const handleStoryClick = (story) => {
    setSelectedStory(story)
    setShowStoryModal(true)
    setViewedStories(prev => new Set([...prev, story.id]))
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
      closeStoryModal()
    }, 5000)
  }

  const closeStoryModal = () => {
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
            onClick={(e) => e.stopPropagation()}
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
            {/* Progress Bar */}
            <div className="story-progress-bar">
              <div className="story-progress-fill"></div>
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
