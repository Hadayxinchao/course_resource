import { useState, useEffect } from 'react';
import '../styles/ThemeSwitcher.css';

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('waldoTheme') === 'dark'
  );
  
  useEffect(() => {
    // Set initial theme based on localStorage or system preference
    if (localStorage.getItem('waldoTheme') === null) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);
  
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('waldoTheme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('waldoTheme', 'light');
    }
  }, [isDark]);
  
  return (
    <button 
      className="theme-switcher" 
      onClick={() => setIsDark(!isDark)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeSwitcher;