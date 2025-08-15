import React from 'react'
import SearchFilter from '../components/SearchFilter'
import Stories from '../components/Stories'
import ProductGrid from '../components/ProductGrid'

const HomePage = () => {
  const handleSearch = (query) => {
    console.log('Search:', query)
  }

  const handleFilter = () => {
    console.log('Filter clicked')
  }

  return (
    <div className="home-page">
      <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />
      <Stories />
      <ProductGrid />
    </div>
  )
}

export default HomePage
