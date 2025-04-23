import { useState } from 'react';
import LevelSelection from './components/LevelSelection';
import GameBoard from './components/GameBoard';
import Timer from './components/Timer';
import GameComplete from './components/GameComplete';
import './App.css';

// Game states
const GAME_STATE = {
  LEVEL_SELECTION: 'level_selection',
  PLAYING: 'playing',
  COMPLETED: 'completed'
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.LEVEL_SELECTION);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [finalTime, setFinalTime] = useState(0);
  
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setGameStartTime(new Date());
    setGameState(GAME_STATE.PLAYING);
  };
  
  const handleGameComplete = (timeTaken) => {
    setFinalTime(timeTaken);
    setGameState(GAME_STATE.COMPLETED);
  };
  
  const handleSaveScore = (playerName, time) => {
    // This will later send the score to the backend
    console.log(`Player ${playerName} completed level ${selectedLevel.name} in ${time} seconds`);
    
    // For now, just log and return to level selection
    alert(`Score saved! ${playerName}: ${time} seconds`);
    
    // Return to level selection
    setGameState(GAME_STATE.LEVEL_SELECTION);
  };
  
  const renderCurrentScreen = () => {
    switch(gameState) {
      case GAME_STATE.LEVEL_SELECTION:
        return <LevelSelection onLevelSelect={handleLevelSelect} />;
        
      case GAME_STATE.PLAYING:
        return (
          <>
            <header>
              <div className="game-info">
                <h1>Where's Waldo?</h1>
                <h2>{selectedLevel.name}</h2>
              </div>
              <Timer startTime={gameStartTime} isRunning={true} />
            </header>
            <main>
              <GameBoard 
                levelData={selectedLevel} 
                onGameComplete={handleGameComplete} 
              />
            </main>
          </>
        );
        
      case GAME_STATE.COMPLETED:
        return (
          <>
            <main>
              <GameComplete 
                timeTaken={finalTime} 
                onSaveScore={handleSaveScore} 
                levelName={selectedLevel.name}
              />
            </main>
          </>
        );
        
      default:
        return <div>Something went wrong!</div>;
    }
  };
  
  return (
    <div className="app">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;