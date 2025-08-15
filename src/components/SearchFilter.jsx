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
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
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
            <span className="filter-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
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
