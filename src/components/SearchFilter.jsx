import React, { useState } from 'react'
import './SearchFilter.css'

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleFilterClick = () => {
    setShowFilters(!showFilters)
    onFilter?.()
  }

  return (
    <div className="search-filter">
      <div className="container">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Поиск аккаунтов..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <button 
            className="filter-button"
            onClick={handleFilterClick}
          >
            <span className="filter-icon">⚙️</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <h4>Категория</h4>
              <div className="filter-chips">
                <button className="filter-chip active">Все</button>
                <button className="filter-chip">Marketplace</button>
                <button className="filter-chip">Email</button>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Цена</h4>
              <div className="price-range">
                <input type="number" placeholder="От" className="price-input" />
                <span>-</span>
                <input type="number" placeholder="До" className="price-input" />
              </div>
            </div>
            
            <div className="filter-actions">
              <button className="btn-secondary" onClick={() => setShowFilters(false)}>
                Сбросить
              </button>
              <button className="btn-primary" onClick={() => setShowFilters(false)}>
                Применить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter
