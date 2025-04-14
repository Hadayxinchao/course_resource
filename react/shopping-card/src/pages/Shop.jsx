import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function Shop({ addToCart }) {
  const [products] = useState([
    { id: 1, name: "Stylish T-Shirt", price: 19.99, image: "https://placehold.co/400x400?text=T-Shirt" },
    { id: 2, name: "Denim Jeans", price: 49.99, image: "https://placehold.co/400x400?text=Jeans" },
    { id: 3, name: "Casual Shoes", price: 59.99, image: "https://placehold.co/400x400?text=Shoes" },
    { id: 4, name: "Watch", price: 99.99, image: "https://placehold.co/400x400?text=Watch" },
    { id: 5, name: "Backpack", price: 39.99, image: "https://placehold.co/400x400?text=Backpack" },
    { id: 6, name: "Sunglasses", price: 29.99, image: "https://placehold.co/400x400?text=Sunglasses" },
  ]);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  }

  return (
    <div className="shop-page">
      <h1>Shop Our Products</h1>
      
      {loading ? (
        <div className="loading-products">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop