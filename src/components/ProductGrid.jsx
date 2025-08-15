import React from 'react'
import { Link } from 'react-router-dom'
import './ProductGrid.css'

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: 'Etsy Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 1500,
      stock: 25,
      followers: '132'
    },
    {
      id: 2,
      name: 'Vinted Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 2200,
      stock: 12,
      followers: '123'
    },
    {
      id: 3,
      name: 'Fiverr Account',
      category: 'Marketplace',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 5000,
      stock: 8,
      followers: '123'
    },
    {
      id: 4,
      name: 'Gmail Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 800,
      stock: 45,
      followers: '123'
    },
    {
      id: 5,
      name: 'GMX Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 3500,
      stock: 6,
      followers: '123'
    },
    {
      id: 6,
      name: 'Outlook Account',
      category: 'Email',
      image: 'https://media.discordapp.net/attachments/1361120104942801018/1405879055861026876/image.png?ex=68a06e66&is=689f1ce6&hm=bbfb99826c3c8d8ef9596b0e90915a14e271983702a9f81c7c711970addbb084&=&format=webp&quality=lossless',
      price: 1800,
      stock: 18,
      followers: '123'
    }
  ]

  const categories = [
    { name: 'Все', count: products.length },
    { name: 'Marketplace', count: products.filter(p => p.category === 'Marketplace').length },
    { name: 'Email', count: products.filter(p => p.category === 'Email').length }
  ]

  return (
    <div className="product-section">
      <div className="container">
        <div className="categories">
          {categories.map((category) => (
            <button key={category.name} className="category-chip">
              {category.name} ({category.count})
            </button>
          ))}
        </div>
        
        <div className="products-grid">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="product-card"
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-category">{product.category}</div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-followers">{product.followers} подписчиков</div>
                
                                 <div className="product-bottom">
                   <div className="product-price">{product.price} USDT</div>
                   <div className="product-stock">
                     В наличии: {product.stock} шт
                   </div>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGrid
