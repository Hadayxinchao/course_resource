import { useState } from 'react';
import '../styles/GameComplete.css';

function GameComplete({ timeTaken, onSaveScore, levelName }) {
  const [playerName, setPlayerName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveScore(playerName, timeTaken);
  };
  
  // Format time as MM:SS.ms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  return (
    <div className="game-complete-overlay">
      <div className="game-complete-modal">
        <h2>Congratulations!</h2>
        <p className="level-completed">Level: {levelName}</p>
        <p>You found all characters in {formatTime(timeTaken)}!</p>
        
        <form onSubmit={handleSubmit}>
          <label>
            Enter your name for the high scores:
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save Score</button>
        </form>
      </div>
    </div>
  );
}

export default GameComplete;