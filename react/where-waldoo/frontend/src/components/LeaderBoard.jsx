import { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

function Leaderboard({ levelId, levelName, playerScore, onBackToLevels }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/level_images/${levelId}/game_sessions`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch scores: ${response.status}`);
        }
        
        const data = await response.json();
        setScores(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching scores:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchScores();
  }, [levelId]);
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  if (loading) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard - {levelName}</h2>
        <div className="loading-spinner"></div>
        <p>Loading scores...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="leaderboard error">
        <h2>Error Loading Leaderboard</h2>
        <p>{error}</p>
        <button onClick={onBackToLevels}>Back to Levels</button>
      </div>
    );
  }
  
  return (
    <div className="leaderboard">
      <h2>Leaderboard - {levelName}</h2>
      
      {/* Only show the player's score section if they just completed a game */}
      {playerScore && (
        <div className="your-score">
          <h3>Your Score</h3>
          <div className="score-row your-result">
            <div className="rank">#{playerScore.rank}</div>
            <div className="player-name">{playerScore.player_name}</div>
            <div className="time-taken">{formatTime(playerScore.time_taken)}</div>
          </div>
        </div>
      )}
      
      <div className="top-scores">
        <h3>Top Scores</h3>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr 
                key={score.id} 
                className={playerScore && playerScore.id === score.id ? 'current-player' : ''}
              >
                <td>{index + 1}</td>
                <td>{score.player_name}</td>
                <td>{formatTime(score.time_taken)}</td>
              </tr>
            ))}
            
            {scores.length === 0 && (
              <tr>
                <td colSpan="3" className="no-scores">No scores yet! Be the first to complete this level.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="leaderboard-actions">
        <button onClick={onBackToLevels} className="back-button">
          {playerScore ? 'Back to Level Selection' : 'Return to Levels'}
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;