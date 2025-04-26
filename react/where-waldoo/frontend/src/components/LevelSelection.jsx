import { useState, useEffect } from 'react';
import '../styles/LevelSelection.css';

function LevelSelection({ onLevelSelect, onViewLeaderboard }) {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/level_images');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch levels: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched levels:', data);
        setLevels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching levels:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleStartGame = () => {
    if (selectedLevel) {
      onLevelSelect(selectedLevel);
    }
  };
  
  const handleViewLeaderboard = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (selectedLevel) {
      onViewLeaderboard(selectedLevel);
    }
  };

  if (loading) {
    return (
      <div className="level-selection loading">
        <div className="loading-spinner"></div>
        <p>Loading levels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="level-selection error">
        <h2>Error Loading Levels</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (levels.length === 0) {
    return (
      <div className="level-selection empty">
        <h2>No Levels Available</h2>
        <p>There are currently no game levels available.</p>
      </div>
    );
  }

  return (
    <div className="level-selection">
      <h2>Select a Level</h2>
      
      <div className="levels-grid">
        {levels.map(level => (
          <div 
            key={level.id} 
            className={`level-card ${selectedLevel?.id === level.id ? 'selected' : ''}`}
            onClick={() => handleLevelClick(level)}
          >
            <div className="level-image">
              <img src={level.image_url} alt={level.name} />
            </div>
            <div className="level-info">
              <h3>{level.name}</h3>
              <span className="difficulty">{level.difficulty}</span>
              <p>{level.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="level-controls">
        <button 
          className="leaderboard-button"
          onClick={handleViewLeaderboard}
          disabled={!selectedLevel}
        >
          View Leaderboard
        </button>
        
        <button 
          className="start-button" 
          onClick={handleStartGame}
          disabled={!selectedLevel}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default LevelSelection;