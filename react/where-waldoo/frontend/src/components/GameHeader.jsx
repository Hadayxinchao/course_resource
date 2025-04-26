import Timer from './Timer';
import '../styles/GameHeader.css';

function GameHeader({ levelData, onExit, startTime, foundCharactersCount, totalCharactersCount }) {
  return (
    <div className="game-header">
      <button className="exit-button" onClick={onExit}>
        ← Back to Levels
      </button>
      
      <div className="level-info">
        <h2>{levelData.name}</h2>
        <div className="level-difficulty">{levelData.difficulty}</div>
      </div>
      
      <div className="game-stats">
        <div className="character-count">
          Found: <strong>{foundCharactersCount}/{totalCharactersCount}</strong>
        </div>
        <Timer startTime={startTime} isRunning={true} />
      </div>
    </div>
  );
}

export default GameHeader;