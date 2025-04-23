import { useState } from 'react';
import '../styles/LevelSelection.css';

function LevelSelection({ onLevelSelect }) {
  const levels = [
    {
      id: 1,
      name: 'Stadium',
      image: '/waldo_snow.jpg',
      difficulty: 'Easy',
      description: 'Find Waldo, Wizard and Wilma in this snow scene!'
    },
    {
      id: 2,
      name: 'Beach Party',
      image: '/waldo_stadium.jpg',
      difficulty: 'Medium',
      description: 'Locate our hidden characters among the crowded stadium scene!'
    },
    {
      id: 3,
      name: 'Medieval Fair',
      image: '/waldo_maze.jpg',
      difficulty: 'Hard',
      description: 'Our toughest challenge! Find all characters in this busy maze!'
    }
  ];

  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  const handleStartGame = () => {
    if (selectedLevel) {
      onLevelSelect(selectedLevel);
    }
  };

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
              <img src={level.image} alt={level.name} />
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