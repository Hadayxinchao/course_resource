import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Discover Stylish Collections</h1>
        <p>Find the perfect items to elevate your lifestyle with our carefully curated selection</p>
        <Link to="/shop" className="shop-now-btn">Shop Now</Link>
      </section>
      
      <section className="features">
        <div className="feature">
          <div className="feature-icon">🌟</div>
          <h3>Premium Quality</h3>
          <p>Carefully selected products that stand the test of time</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Get your items delivered in as little as 2 business days</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💯</div>
          <h3>Satisfaction Guarantee</h3>
          <p>Not completely satisfied? Return within 30 days for a full refund</p>
        </div>
      </section>
    </div>
  )
}

export default Home