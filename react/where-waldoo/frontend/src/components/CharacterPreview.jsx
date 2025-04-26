import '../styles/CharacterPreview.css';

function CharacterPreview({ characters, foundCharacters }) {
  return (
    <div className="character-preview">
      <h3>Characters to Find</h3>
      <div className="character-list">
        {characters.map(character => {
          const isFound = foundCharacters.some(c => c.id === character.id);
          return (
            <div key={character.id} className={`character-item ${isFound ? 'found' : ''}`}>
              <div className="character-icon">
                {isFound ? '✓' : '❌'}
              </div>
              <span>{character.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CharacterPreview;