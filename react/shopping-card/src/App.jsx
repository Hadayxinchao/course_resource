import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Shop from './pages/Shop'
import NavBar from './components/NavBar'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    const quantityToAdd = product.quantity || 1

    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...existingItem, quantity: existingItem.quantity + quantityToAdd } : item))
    } else {
      setCart([...cart, { ...product, quantity: quantityToAdd }])
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item))
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar cartItemsCount={getCartTotal()} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop addToCart={addToCart}/>} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 Shopping Cart Project</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App