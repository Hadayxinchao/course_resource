import { useState, useEffect } from "react";
import usePokemonData from "../utilities/usePokemonData";
import "../styles/PokemonList.css";

function PokemonList({ onChangeCurrentScore, resetCurrentScore, resetGame }) {
  const { pokemonData, isLoading, error } = usePokemonData(12);
  const [gameState, setGameState] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (pokemonData.length > 0) {
      setGameState(pokemonData.map((pokemon) => ({ ...pokemon, isClicked: false })));
    }
  }, [pokemonData]);

  useEffect(() => { 
    if (pokemonData.length > 0) {
      setGameState(prevState => 
        [...prevState]
          .map(pokemon => ({ ...pokemon, isClicked: false }))
          .sort(() => Math.random() - 0.5)
      );
    }
  }, [resetGame, pokemonData.length]);

  const shuffleCards = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setGameState(prevState => [...prevState].sort(() => Math.random() - 0.5));
      setIsShuffling(false);
    }, 300);
  }

  if (isLoading) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading Pokémon...</p>
    </div>;
  }

  if (error) {
    return <div className="error-container">
      <h3>Oh no! Something went wrong</h3>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>;
  }

  const handleCardClick = (id) => {
    if (isShuffling) return;

    const clickedPokemon = gameState.find((pokemon) => pokemon.id === id);

    if (clickedPokemon.isClicked) {
      setGameState(prevState => 
        prevState.map(pokemon => ({
          ...pokemon,
          isClicked: false
        }))
      );
      shuffleCards();
      resetCurrentScore();
    } else {
      setGameState(prevState => 
        prevState.map(pokemon => 
          pokemon.id === id ? { ...pokemon, isClicked: true } : pokemon
        )
      );
      if (gameState.every(pokemon => pokemon.isClicked)) {
        setGameState(prevState =>
          prevState.map(pokemon => ({ ...pokemon, isClicked: false }))
        );
        resetCurrentScore();
        
      } else {
        onChangeCurrentScore();
      }
      shuffleCards();
    }
  }

  return (
    <div className={`pokemon-grid ${isShuffling ? "is-shuffling" : ""}`}>
      {gameState.map((pokemon) => (
        <PokemonCard 
          pokemon={pokemon} 
          onCardClick={handleCardClick}
          key={pokemon.id}
        />
      ))}
    </div>
  );
}

function PokemonCard({ pokemon, onCardClick }) {
  return (
    <div 
      className={`pokemon-card ${pokemon.isClicked ? 'is-clicked' : ''}`} 
      onClick={() => onCardClick(pokemon.id)}

    >
      <div className="card-inner">
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <div className="pokemon-type-tag">#{pokemon.id}</div>
      </div>
    </div>
  );
}

export default PokemonList;