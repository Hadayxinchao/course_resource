import { useState, useEffect } from 'react';
import TargetingBox from './TargetingBox';
import GameHeader from './GameHeader';
import CharacterPreview from './CharacterPreview';
import '../styles/GameBoard.css';

function GameBoard({ levelData, onGameComplete, onExitGame }) {
  const [mousePosition, setMousePosition] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [message, setMessage] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const characters = levelData.characters || [];

  useEffect(() => {
    setGameStartTime(new Date());
  }, []);
  
  useEffect(() => {
    if (foundCharacters.length === characters.length && foundCharacters.length > 0) {
      const endTime = new Date();
      const timeTaken = (endTime - gameStartTime) / 1000; // in seconds
      onGameComplete(timeTaken);
    }
  }, [foundCharacters, characters.length, gameStartTime, onGameComplete]);

  const handleMouseMove = (e) => {
    // Get mouse coordinates relative to the image
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position (to handle different screen sizes)
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    if (!clickPosition) {
      setMousePosition({ x: percentX, y: percentY });
    }
  };

  const handleMouseLeave = () => {
    if (!clickPosition) {
      setMousePosition(null);
    }
  };

  const handleImageClick = (e) => {
    // Get mouse coordinates relative to the image
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Set both mouse and click position to the current click location
    const newPosition = { x: percentX, y: percentY };
    setMousePosition(newPosition);
    setClickPosition(newPosition);
    
    // Clear any previous messages when clicking
    setMessage(null);
  };

  const validateWithBackend = async (character, position) => {
    try {
      setIsValidating(true);
      
      const response = await fetch('/api/validate_character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'credentials': 'include'
        },
        body: JSON.stringify({
          level_id: levelData.id,
          character_id: character.id,
          x_position: position.x,
          y_position: position.y
        }),
      });
      
      const result = await response.json();
      
      if (result.valid) {
        // Character was found correctly
        const characterWithPosition = {
          ...character,
          position: { ...position }
        };
        
        setFoundCharacters(prev => [...prev, characterWithPosition]);
        setMessage({ text: result.message, type: 'success' });
      } else {
        // Character was not found at this position
        setMessage({ text: result.message, type: 'error' });
      }
      
      return result.valid;
    } catch (error) {
      console.error('Error validating character selection:', error);
      setMessage({ 
        text: 'Error connecting to the server. Please try again.', 
        type: 'error' 
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleCharacterSelect = async (character) => {
    // If character is null, it means the user clicked "Cancel"
    if (character === null) {
      setClickPosition(null);
      return;
    }
    
    // If this character is already found, ignore the selection
    if (foundCharacters.find(char => char.id === character.id)) {
      setClickPosition(null);
      return;
    }
    
    // Close character selection dropdown
    setClickPosition(null);
  };
  
  const handleOutsideClick = () => {
    setClickPosition(null);
    // Clear message when clicking outside
    setMessage(null);
  };

  return (
    <div className="game-board-container">
      <GameHeader 
        levelData={levelData}
        onExit={onExitGame}
        startTime={gameStartTime}
        foundCharactersCount={foundCharacters.length}
        totalCharactersCount={characters.length}
      />
      
      {/* Add the CharacterPreview component */}
      <CharacterPreview 
        characters={characters}
        foundCharacters={foundCharacters}
      />
      <div className="game-board" onClick={handleOutsideClick}>
        <div className="image-container" onClick={(e) => e.stopPropagation()}>
          <img 
            src={levelData.image_url} 
            alt={`Where's Waldo - ${levelData.name}`} 
            onClick={handleImageClick} 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="game-image"
          />
          
          {/* Display markers for found characters */}
          {foundCharacters.map(char => (
            <div 
              key={char.id}
              className="character-marker"
              style={{
                left: `${char.position?.x}%`,
                top: `${char.position?.y}%`
              }}
            >
              ✓
            </div>
          ))}
          
          {/* Show targeting box when mouse is over the image */}
          {mousePosition && (
            <TargetingBox 
              position={mousePosition} 
              isActive={clickPosition !== null}
              characters={clickPosition ? characters.filter(char => 
                !foundCharacters.find(found => found.id === char.id)
              ) : []}
              onCharacterSelect={handleCharacterSelect}
              isLoading={isValidating}
            />
          )}
          
          {/* Display feedback message */}
          {message && (
            <div className={`feedback-message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
}

export default GameBoard;