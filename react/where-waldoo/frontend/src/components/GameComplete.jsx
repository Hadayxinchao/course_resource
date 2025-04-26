import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import '../styles/GameComplete.css';

function GameComplete({ timeTaken, onSaveScore, levelName }) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    await onSaveScore(playerName, timeTaken);
    setIsSubmitting(false);
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
      <Confetti 
        width={windowDimensions.width}
        height={windowDimensions.height}
        numberOfPieces={200}
        recycle={false}
      />
      <div className="game-complete-overlay">
        <div className="game-complete-modal">
          <h2>Congratulations!</h2>
          <p className="level-completed">Level: {levelName}</p>
          <p className="completion-time">You found all characters in <span>{formatTime(timeTaken)}</span>!</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="player-name">
                Enter your name for the high scores:
              </label>
              <input
                id="player-name"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                required
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" disabled={isSubmitting || !playerName.trim()}>
              {isSubmitting ? 'Saving...' : 'Save Score'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GameComplete;