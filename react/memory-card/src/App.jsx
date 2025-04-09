import { useEffect, useState } from 'react'

import PokemonList from './components/PokemonList'
import './styles/App.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0)
  const [highestScore, setHighestScore] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [resetGame, setResetGame] = useState(false)

  useEffect(() => {
    if (currentScore === 12) {
      setHighestScore((prevScore) => Math.max(prevScore, currentScore))
      setCurrentScore(0)
      setShowModal(true)
    }
  }, [currentScore])

  const onChangeCurrentScore = () => {
    setCurrentScore((prevScore) => prevScore + 1)
  }

  const resetCurrentScore = () => {
    setHighestScore((prevScore) => Math.max(prevScore, currentScore))
    setCurrentScore(0)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setResetGame(prev => !prev)
  }

  return (
    <div className="app-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You clicked all 12 Pokemon successfully!</p>
            <button className="modal-button" onClick={handleCloseModal}>Play Again</button>
          </div>
        </div>
      )}
      
      <header className="app-header">
        <h1 className="game-title">Pokémon Memory Card</h1>
        <div className="score-board">
          <div className="score-container current">
            <h2 className="score-label">Current Score</h2>
            <span className="score-value">{currentScore}</span>
          </div>
          <div className="score-container high">
            <h2 className="score-label">Highest Score</h2>
            <span className="score-value">{highestScore}</span>
          </div>
        </div>
      </header>

      <section className="game-instructions">
        <div className="instruction-card">
          <p>Click on a Pokémon to earn points, but don't click on any more than once!</p>
        </div>
      </section>

      <main className="game-container">
        <PokemonList
          onChangeCurrentScore={onChangeCurrentScore}
          resetCurrentScore={resetCurrentScore}
          resetGame={resetGame}
        />
      </main>

      <footer className="app-footer">
        <p>Data from <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
      </footer>
    </div>
  )
}

export default App
