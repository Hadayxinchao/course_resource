import { useEffect, useState } from 'react';
import '../styles/TargetingBox.css';

function TargetingBox({ position, characters, onCharacterSelect, isActive, isLoading }) {
  const [magnifiedImageUrl, setMagnifiedImageUrl] = useState('');
  
  useEffect(() => {
    // This would ideally be the same image as in GameBoard
    // For now, we'll use the current level image
    const gameImage = document.querySelector('.game-image');
    if (gameImage) {
      setMagnifiedImageUrl(gameImage.src);
    }
  }, []);
  
  const handleClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      className={`targeting-box ${'active'}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
    >
      <div className="magnifier">
        <div 
          className="magnified-image"
          style={{
            backgroundImage: `url(${magnifiedImageUrl})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            top: `${position.x}%`,
            left: `${position.y}%`
          }}
        ></div>
        <div className="target-crosshair"></div>
      </div>
      
      {isActive && (
        <div className="character-dropdown">
          <h4>Who did you find?</h4>
          <ul>
            {isLoading ? (
              <li className="loading-item">
                <div className="dropdown-spinner"></div>
                Checking...
              </li>
            ) : (
              <>
                {characters.map(character => (
                  <li 
                    key={character.id} 
                    onClick={() => onCharacterSelect(character)}
                    className="character-option"
                  >
                    {character.name}
                  </li>
                ))}
                <li className="cancel-option" onClick={() => onCharacterSelect(null)}>
                  Cancel
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TargetingBox;