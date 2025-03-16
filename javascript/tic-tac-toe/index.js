// Player Factory
const Player = (name, marker) => {
  return { name, marker};
}


// Gameboard Module
const GameBoard = (() => {
  let board = Array(9).fill('');
  
  const getBoard = () => board;

  const makeMove = (index, marker) => {
    if (board[index] === '') {
      board[index] = marker;
      return true;
    }
    return false;
  }

  const reset = () => {
    board = Array(9).fill('');
  };

  return { getBoard, makeMove, reset };
})(); 

// Game Controller Module
const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameActive = false;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = () => {
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      const board = GameBoard.getBoard();
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  const checkTie = () => {
    return GameBoard.getBoard().every(cell => cell !== '');
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const start = (player1Name, player2Name) => {
    players = [Player(player1Name, 'X'), Player(player2Name, 'O')];
    gameActive = true;
    currentPlayerIndex = 0;
    GameBoard.reset();
  };

  return {
    getCurrentPlayer,
    switchPlayer,
    checkWinner,
    checkTie,
    start,
    get gameActive() { return gameActive; },
    set gameActive(value) { gameActive = value; }
  }
})();

// Display Controller Module
const DisplayController = (() => {
  const gameBoard = document.getElementById('gameBoard');
  const gameStatus = document.getElementById('gameStatus');
  const playerForm = document.getElementById('playerForm');
  const gameContainer = document.getElementById('gameContainer');
  const startButton = document.getElementById('startGame');
  const restartButton = document.getElementById('restartGame');

  const updateBoard = () => {
    const board = GameBoard.getBoard();
    [...gameBoard.children].forEach((cell, index) => {
      cell.textContent = board[index];
    });
  };

  const updateStatus = (message) => {
    gameStatus.textContent = message;
  }

  startButton.addEventListener('click', () => {
    const player1Name = document.getElementById('player1').value || 'Player 1';
    const player2Name = document.getElementById('player2').value || 'Player 2';

    GameController.start(player1Name, player2Name);
    gameContainer.style.display = 'block';
    playerForm.style.display = 'none';
    updateStatus(`${GameController.getCurrentPlayer().name}'s turn`);
    updateBoard();
  });

  restartButton.addEventListener('click', () => {
    gameContainer.style.display = 'none';
    playerForm.style.display = 'block';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
  });

  gameBoard.addEventListener('click', (e) => {
    if (!GameController.gameActive) return;
    
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const index = cell.dataset.index;
    let currentPlayer = GameController.getCurrentPlayer();

    if (GameBoard.makeMove(index, currentPlayer.marker)) {
      updateBoard();
      
      if (GameController.checkWinner()) {
        updateStatus(`${currentPlayer.name} wins!`);
        GameController.gameActive = false;
        return;
      }

      if (GameController.checkTie()) {
        updateStatus('It\'s a tie!');
        GameController.gameActive = false;
        return;
      }

      GameController.switchPlayer();
      currentPlayer = GameController.getCurrentPlayer();
      updateStatus(`${currentPlayer.name}'s turn ${currentPlayer.marker}`);
    }
  });
})();