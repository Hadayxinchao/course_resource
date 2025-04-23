import { useState, useEffect } from 'react';
import TargetingBox from './TargetingBox';
import '../styles/GameBoard.css';

function GameBoard({ levelData, onGameComplete }) {
  const [mousePosition, setMousePosition] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [gameStartTime, setGameStartTime] = useState(null);
  
  // Characters would ideally come from the level data
  // For now we'll use the default characters
  const characters = [
    { id: 1, name: 'Waldo' },
    { id: 2, name: 'Wizard' },
    { id: 3, name: 'Wilma' },
  ];

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
    
    setMousePosition({ x: percentX, y: percentY });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const handleImageClick = (e) => {
    // Set click position to current mouse position
    if (mousePosition) {
      setClickPosition({ ...mousePosition });
    }
  };

  const handleCharacterSelect = (character) => {
    // This will later validate with backend
    // For now, just simulate adding the character to found list
    if (!foundCharacters.find(char => char.id === character.id)) {
      // Add character position to simulate finding them at their clicked position
      const characterWithPosition = {
        ...character,
        position: { ...clickPosition }
      };
      
      setFoundCharacters([...foundCharacters, characterWithPosition]);
    }
    
    // Close character selection dropdown
    setClickPosition(null);
  };
  
  const handleOutsideClick = () => {
    setClickPosition(null);
  };

  return (
    <div className="game-board" onClick={handleOutsideClick}>
      <div className="image-container" onClick={(e) => e.stopPropagation()}>
        <img 
          src={levelData.image} 
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
          />
        )}
      </div>
    </div>
  );
}

export default GameBoard;