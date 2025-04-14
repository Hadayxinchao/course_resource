import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (e) => {
    // Parse input as number and ensure it's at least 1
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(''); // Allow empty field while typing
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => {
      const current = typeof prevQuantity === 'string' ? 1 : prevQuantity;
      return current + 1;
    });
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => {
      const current = typeof prevQuantity === 'string' ? 1 : prevQuantity;
      return current > 1 ? current - 1 : 1;
    });
  };

  const handleAddToCart = () => {
    // Ensure quantity is at least 1 before adding to cart
    const finalQuantity = quantity === '' || quantity < 1 ? 1 : quantity;
    
    // Create a modified product with the selected quantity
    const productWithQuantity = {
      ...product,
      quantity: finalQuantity
    };
    
    // Visual feedback animation
    setIsAdding(true);
    
    addToCart(productWithQuantity);
    
    // Reset state after animation
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1); // Reset quantity after adding to cart
    }, 800);
  };

  // Check if product is new (less than 30 days old)
  const isNew = Math.random() > 0.7; // Just for demo - replace with actual logic

  return (
    <div className="product-card">
      <div className="img-container">
        <img src={product.image} alt={product.name} />
        {isNew && <span className="badge">New</span>}
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        
        <div className="quantity-selector">
          <button 
            className="quantity-btn" 
            onClick={decrementQuantity}
            aria-label="Decrease quantity"
            disabled={isAdding}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            aria-label="Quantity"
            disabled={isAdding}
          />
          <button 
            className="quantity-btn" 
            onClick={incrementQuantity}
            aria-label="Increase quantity"
            disabled={isAdding}
          >
            +
          </button>
        </div>
        
        <button 
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`} 
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <span className="icon">✓</span>
              Added!
            </>
          ) : (
            <>
              <span className="icon">🛒</span>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}