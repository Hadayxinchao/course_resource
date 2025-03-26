import './styles.css';

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.slide');
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const dotsContainer = document.querySelector('.navigation-dots');
  
  // Variables
  const slideCount = slides.length;
  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds
  
  // Initialize the carousel
  function initCarousel() {
    // Create navigation dots
    createNavigationDots();
    
    // Set initial position
    updateCarouselPosition();
    
    // Start automatic sliding
    startSlideInterval();
    
    // Add event listeners
    prevArrow.addEventListener('click', prevSlide);
    nextArrow.addEventListener('click', nextSlide);
    
    // Pause interval on hover
    carousel.addEventListener('mouseenter', stopSlideInterval);
    carousel.addEventListener('mouseleave', startSlideInterval);
  }
  
  // Create navigation dots
  function createNavigationDots() {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentSlide) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  // Update carousel position
  function updateCarouselPosition() {
    carousel.style.transform = `translateX(-${currentSlide * (100 / slideCount)}%)`;
    
    // Update active dot
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarouselPosition();
  }
  
  // Go to previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarouselPosition();
  }
  
  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarouselPosition();
    
    // Reset the interval to prevent immediate switching after clicking
    stopSlideInterval();
    startSlideInterval();
  }
  
  // Start the automatic sliding interval
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  
  // Stop the automatic sliding interval
  function stopSlideInterval() {
    clearInterval(slideInterval);
  }
  
  // Initialize the carousel
  initCarousel();
});