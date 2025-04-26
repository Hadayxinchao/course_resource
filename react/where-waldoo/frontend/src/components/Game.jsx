import { useState, useEffect } from 'react';
import LevelSelection from './LevelSelection';
import GameBoard from './GameBoard';
import GameComplete from './GameComplete';
import Leaderboard from './Leaderboard';
import '../styles/Game.css';

function Game() {
  const [gameState, setGameState] = useState('level_selection');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [savedScore, setSavedScore] = useState(null);
  
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setGameState('playing');
  };
  
  const handleGameComplete = (timeTaken) => {
    setCompletionTime(timeTaken);
    setGameState('game_complete');
  };
  
  const handleSaveScore = async (playerName, timeTaken) => {
    try {
      const response = await fetch('/api/game_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          level_id: selectedLevel.id,
          player_name: playerName,
          time_taken: timeTaken
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const savedScore = await response.json();
      setSavedScore(savedScore);
      setGameState('leaderboard');
      
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Failed to save your score. Please try again.');
    }
  };
  
  const handleBackToLevels = () => {
    setGameState('level_selection');
    setSelectedLevel(null);
    setCompletionTime(null);
    setSavedScore(null);
  };
  
  // New handler for viewing leaderboard from level selection
  const handleViewLeaderboard = (level) => {
    setSelectedLevel(level);
    setGameState('view_leaderboard'); // New state for viewing leaderboard without a saved score
  };

  const handleExitGame = () => {
    // Maybe ask for confirmation if the game is in progress
    if (confirm("Are you sure you want to exit the game? Your progress will be lost.")) {
      setGameState('level_selection');
    }
  };

  useEffect(() => {
    // Save game state to localStorage when changed
    if (selectedLevel && gameState === 'playing') {
      localStorage.setItem('waldoGameState', JSON.stringify({
        levelId: selectedLevel.id,
        gameState: gameState
      }));
    }
    
    if (gameState === 'level_selection') {
      localStorage.removeItem('waldoGameState');
    }
  }, [gameState, selectedLevel]);
  
  // Add to initialization logic
  useEffect(() => {
    // Check if there's a saved game
    const savedGame = localStorage.getItem('waldoGameState');
    if (savedGame) {
      try {
        const { levelId } = JSON.parse(savedGame);
        // Fetch the level data and resume game
        fetch(`/api/level_images/${levelId}`)
          .then(response => response.json())
          .then(levelData => {
            setSelectedLevel(levelData);
            // Optionally show a "Resume Game?" dialog
            // or automatically resume
          });
      } catch (e) {
        console.error("Failed to parse saved game", e);
        localStorage.removeItem('waldoGameState');
      }
    }
  }, []);
  
  return (
    <div className="game">
      <h1 className="game-title">Where's Waldo?</h1>
      
      {gameState === 'level_selection' && (
        <LevelSelection 
          onLevelSelect={handleLevelSelect} 
          onViewLeaderboard={handleViewLeaderboard} // Pass the new handler
        />
      )}
      
      {gameState === 'playing' && selectedLevel && (
        <GameBoard 
          levelData={selectedLevel} 
          onGameComplete={handleGameComplete}
          onExitGame={handleExitGame}
        />
      )}
      
      {gameState === 'game_complete' && selectedLevel && completionTime && (
        <GameComplete 
          timeTaken={completionTime} 
          onSaveScore={handleSaveScore}
          levelName={selectedLevel.name}
        />
      )}
      
      {/* Handle both cases for leaderboard - after saving score and direct view */}
      {(gameState === 'leaderboard' || gameState === 'view_leaderboard') && selectedLevel && (
        <Leaderboard 
          levelId={selectedLevel.id}
          levelName={selectedLevel.name}
          playerScore={savedScore} // This will be null when viewing directly from level selection
          onBackToLevels={handleBackToLevels}
        />
      )}
    </div>
  );
}

export default Game;