import { Ship } from "./ship";
import { GameBoard } from "./gameBoard";
import { Player } from "./player";
import { renderBoard } from "./renderBoard";
import { renderShip } from "./renderShip";

export class GameUI {
  constructor() {
    this.humanPlayer = new Player("human");
    this.computerPlayer = new Player("computer");
    this.currentPlayer = this.humanPlayer;
    this.gameOver = false;
    this.setupPhase = true;

    this.shipTypes = [
      { name: "Carrier", length: 5 },
      { name: "Battleship", length: 4 },
      { name: "Cruiser", length: 3 },
      { name: "Submarine", length: 3 },
      { name: "Destroyer", length: 2 },
    ];

    this.currentShipIndex = 0;
    this.isVertical = false;
    this.gameMode = "vsComputer";
  }

  createModeSelection() {
    const modeContainer = document.createElement("div");
    modeContainer.classList.add("mode-selection");

    const modeTitle = document.createElement("h3");
    modeTitle.textContent = "Select Game Mode";
    modeContainer.appendChild(modeTitle);

    const vsComputerBtn = document.createElement("button");
    vsComputerBtn.textContent = "Play vs Computer";
    vsComputerBtn.classList.add("mode-button");
    vsComputerBtn.addEventListener("click", () => {
      this.gameMode = "vsComputer";
      this.startSetupPhase();
      modeContainer.remove();
    });

    const twoPlayerBtn = document.createElement("button");
    twoPlayerBtn.textContent = "Two Player Game";
    twoPlayerBtn.classList.add("mode-button");
    twoPlayerBtn.addEventListener("click", () => {
      this.gameMode = "twoPlayer";
      this.startSetupPhase();
      modeContainer.remove();
    });

    modeContainer.appendChild(vsComputerBtn);
    modeContainer.appendChild(twoPlayerBtn);

    document.body.appendChild(modeContainer);
  }

  startSetupPhase() {
    this.init();

    if (this.gameMode === "twoPlayer") {
      this.player1 = new Player("Player 1");
      this.player2 = new Player("Player 2");
      this.currentPlayer = this.player1;
      this.currentSetupPlayer = this.player1;

      const playerBoardLabel = document.querySelector(".board-section h2");
      if (playerBoardLabel) playerBoardLabel.textContent = "Player 1's Board";

      const enemyBoardLabel = document.querySelectorAll(
        ".board-section:nth-child(2) h2"
      );
      if (enemyBoardLabel) enemyBoardLabel.textContent = "Player 2's Board";

      this.statusMessage.textContent = "Player 1: Place your ships";
    }
  }

  init() {
    this.createGameContainer();
    this.createPlayerBoards();
    this.createControlPanel();
    this.createShipPlacementZone();
    this.setupDragAndDrop();
    this.setupEventListeners();
  }

  showPassDeviceScreen(message, callback) {
    const overlay = document.createElement("div");
    overlay.classList.add("pass-device-overlay");

    const content = document.createElement("div");
    content.classList.add("pass-device-content");

    const messageElement = document.createElement("h2");
    messageElement.textContent = message;

    const continueBtn = document.createElement("button");
    continueBtn.textContent = "Continue";
    continueBtn.addEventListener("click", () => {
      overlay.remove();

      if (this.gameMode === "twoPlayer") {
        const playerBoardLabel = document.querySelector(".board-section h2");
        const enemyBoardLabel = document.querySelectorAll(
          ".board-section:nth-child(2) h2"
        );

        if (this.currentPlayer === this.player1) {
          playerBoardLabel.textContent = "Player 1's Board";
          enemyBoardLabel[0].textContent = "Player 2's Board";
        } else {
          playerBoardLabel.textContent = "Player 2's Board";
          enemyBoardLabel[0].textContent = "Player 1's Board";
        }

        this.updateBoards();
      }

      if (callback) callback();
    });

    content.appendChild(messageElement);
    content.appendChild(continueBtn);
    overlay.appendChild(content);

    document.body.appendChild(overlay);
  }
  createGameContainer() {
    const container = document.createElement("div");
    container.classList.add("game-container");
    document.body.appendChild(container);
    this.container = container;
  }

  createPlayerBoards() {
    const playerBoardSection = document.createElement("div");
    playerBoardSection.classList.add("board-section");

    const playerLabel = document.createElement("h2");
    playerLabel.textContent = "Your Board";

    this.playerBoardSection = renderBoard(this.humanPlayer.gameBoard.board);
    this.playerBoardSection.classList.add("player-board");

    playerBoardSection.appendChild(playerLabel);
    playerBoardSection.appendChild(this.playerBoardSection);

    const computerBoardSection = document.createElement("div");
    computerBoardSection.classList.add("board-section");

    const computerLabel = document.createElement("h2");
    computerLabel.textContent = "Enemy Board";

    this.computerBoardSection = renderBoard(
      this.computerPlayer.gameBoard.board
    );
    this.computerBoardSection.classList.add("computer-board");

    computerBoardSection.appendChild(computerLabel);
    computerBoardSection.appendChild(this.computerBoardSection);

    this.container.appendChild(playerBoardSection);
    this.container.appendChild(computerBoardSection);
  }

  createControlPanel() {
    const controlPanel = document.createElement("div");
    controlPanel.classList.add("control-panel");

    const instructions = document.createElement("p");
    instructions.textContent =
      "Place your ships on the board. Click 'Rotate Ship' to change orientation.";
    controlPanel.appendChild(instructions);

    this.shipInfo = document.createElement("div");
    this.shipInfo.classList.add("ship-info");
    this.updateShipInfo();
    controlPanel.appendChild(this.shipInfo);

    const rotateButton = document.createElement("button");
    rotateButton.textContent = "Rotate Ship";
    rotateButton.addEventListener("click", () => {
      this.isVertical = !this.isVertical;
      this.updateShipInfo();
    });
    controlPanel.appendChild(rotateButton);

    const randomButton = document.createElement("button");
    randomButton.textContent = "Randomize Ships";
    randomButton.addEventListener("click", () => {
      if (this.gameMode === "twoPlayer") {
        // Just randomize ships, don't show start button
        this.placeShipsRandomly();
      } else {
        // For computer mode, show start button after randomizing
        startButton.style.display = "inline-block";
        this.placeShipsRandomly();
        this.createShipPlacementZone();
        this.setupDragAndDrop();
      }
    });
    controlPanel.appendChild(randomButton);

    this.statusMessage = document.createElement("p");
    this.statusMessage.classList.add("status-message");
    this.statusMessage.textContent = "Place your ships to begin.";
    controlPanel.appendChild(this.statusMessage);

    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.classList.add("start-button");
    startButton.addEventListener("click", () => {
      if (this.setupPhase) {
        resetButton.style.display = "inline-block";
        startButton.style.display = "none";
        const shipContainer =
          this.controlPanel.querySelector(".ship-container");
        this.controlPanel.removeChild(shipContainer);
        this.finishSetup();
      } else {
        this.statusMessage.textContent = "Game already started!";
      }
    });
    controlPanel.appendChild(startButton);

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.classList.add("reset-button");
    resetButton.addEventListener("click", () => {
      resetButton.style.display = "none";
      startButton.style.display = "none";
      this.humanPlayer.gameBoard = new GameBoard();
      this.computerPlayer.gameBoard = new GameBoard();
      this.currentShipIndex = 0;
      this.isVertical = false;
      this.setupPhase = true;
      this.gameOver = false;
      this.currentPlayer = this.humanPlayer;
      this.updatePlayerBoard();
      this.updateComputerBoard();
      this.updateShipInfo();
      this.statusMessage.textContent = "Place your ships to begin.";
    });
    controlPanel.appendChild(resetButton);

    this.container.appendChild(controlPanel);
    this.controlPanel = controlPanel;
  }

  updateShipInfo() {
    if (this.currentShipIndex < this.shipTypes.length) {
      const shipType = this.shipTypes[this.currentShipIndex];
      this.shipInfo.textContent = `Placing ${shipType.name} (${
        shipType.length
      } cells) - Orientation: ${this.isVertical ? "Vertical" : "Horizontal"}`;
    } else {
      this.shipInfo.textContent = "All ships placed!";
    }
  }

  createShipPlacementZone() {
    const recentShipContainer =
      this.controlPanel.querySelector(".ship-container");
    if (recentShipContainer) {
      this.controlPanel.removeChild(recentShipContainer);
    }
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-container");

    this.shipTypes.forEach((shipType, index) => {
      const shipElement = renderShip(new Ship(shipType.name, shipType.length));
      shipElement.id = `ship-${index}`;
      shipElement.dataset.index = index;
      shipElement.dataset.name = shipType.name;
      shipElement.dataset.length = shipType.length;

      // Add drag capability
      shipElement.setAttribute("draggable", true);
      shipElement.addEventListener(
        "dragstart",
        this.handleDragStart.bind(this)
      );

      shipContainer.appendChild(shipElement);
    });

    this.controlPanel.appendChild(shipContainer);
  }

  setupDragAndDrop() {
    const cells = this.playerBoardSection.querySelectorAll(".board-cell");
    const shipContainer = this.controlPanel.querySelector(".ship-container");
    if (!shipContainer.hasChildNodes()) {
      this.controlPanel.removeChild(shipContainer);
    }

    cells.forEach((cell) => {
      cell.addEventListener("dragover", this.handleDragOver.bind(this));
      cell.addEventListener("drop", this.handleDrop.bind(this));
      cell.addEventListener("dragenter", this.handleDragEnter.bind(this));
      cell.addEventListener("dragleave", this.handleDragLeave.bind(this));
    });

    document.querySelectorAll(".ship-piece").forEach((ship) => {
      ship.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const isVertical = ship.classList.contains("vertical");

        if (isVertical) {
          ship.classList.remove("vertical");
          ship.style.width = `${30 * parseInt(ship.dataset.length)}px`;
          ship.style.height = "30px";
        } else {
          ship.classList.add("vertical");
          ship.style.height = `${30 * parseInt(ship.dataset.length)}px`;
          ship.style.width = "30px";
        }
      });
    });
  }

  setupEventListeners() {
    const playerCells = this.playerBoardSection.querySelectorAll(".board-cell");
    playerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (this.setupPhase && this.currentShipIndex < this.shipTypes.length) {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);
          this.placePlayerShip(x, y);
        }
      });
    });

    const computerCells = this.computerBoardSection.querySelectorAll(".board-cell");
    computerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (!this.setupPhase && !this.gameOver) {
          // In two-player mode, only allow attacks when it's the current player's turn
          if (this.gameMode === "twoPlayer" || 
            (this.gameMode === "vsComputer" && this.currentPlayer === this.humanPlayer)) {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            this.playerAttack(x, y);
          }
        }
      });
    });
  }

  handleDragStart(e) {
    this.draggedShip = e.target;
    e.dataTransfer.setData("text/plain", e.target.id);

    this.isVertical = e.target.classList.contains("vertical");
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.target.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    e.target.classList.remove("dragover");

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    const shipIndex = parseInt(this.draggedShip.dataset.index);
    const shipType = this.shipTypes[shipIndex];
    const ship = new Ship(shipType.name, shipType.length);

    if (this.humanPlayer.gameBoard.placeShip(ship, x, y, this.isVertical)) {
      this.updatePlayerBoard();
      this.draggedShip.remove();

      this.currentShipIndex++;
      this.updateShipInfo();

      if (this.currentShipIndex >= this.shipTypes.length) {
        const startButton = document.querySelector(".start-button");
        if (startButton) startButton.style.display = "inline-block";
      }
    } else {
      this.statusMessage.textContent = "Invalid ship placement. Try again.";
    }

    this.setupDragAndDrop();
  }

  placePlayerShip(x, y) {
    const shipType = this.shipTypes[this.currentShipIndex];
    const ship = new Ship(shipType.name, shipType.length);

    const currentBoard = this.gameMode === "twoPlayer"
      ? this.currentSetupPlayer.gameBoard
      : this.humanPlayer.gameBoard;

    if (currentBoard.placeShip(ship, x, y, this.isVertical)) {
      this.updatePlayerBoard();
      this.currentShipIndex++;
      this.updateShipInfo();

      if (this.currentShipIndex >= this.shipTypes.length) {
        const startButton = document.querySelector(".start-button");
        if (startButton && this.gameMode !== "twoPlayer") {
          startButton.style.display = "inline-block";
        } else if (this.gameMode === "twoPlayer") {
          this.finishSetup();
        }
      }
    } else {
      this.statusMessage.textContent = "Invalid ship placement. Try again.";
    }
  }

  placeShipsRandomly() {
    if (this.gameMode === 'twoPlayer') {
      const currentBoard = this.currentSetupPlayer.gameBoard;

      this.currentSetupPlayer.gameBoard = new GameBoard();

      this.shipTypes.forEach((shipType) => {
        const ship = new Ship(shipType.name, shipType.length);
        let placed = false;
        
        while (!placed) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const isVertical = Math.random() < 0.5;
          
          if (this.currentSetupPlayer.gameBoard.placeShip(ship, x, y, isVertical)) {
            placed = true;
          }
        }
      });

      this.currentShipIndex = this.shipTypes.length;
      this.updateShipInfo();

      if (this.currentSetupPlayer === this.player1) {
        const newPlayerBoard = renderBoard(this.player1.gameBoard.board);
        this.playerBoardSection.replaceWith(newPlayerBoard);
        this.playerBoardSection = newPlayerBoard;
        this.playerBoardSection.classList.add("player-board");
      } else {
        const newPlayerBoard = renderBoard(this.player2.gameBoard.board);
        this.playerBoardSection.replaceWith(newPlayerBoard);
        this.playerBoardSection = newPlayerBoard;
        this.playerBoardSection.classList.add("player-board");
      }
      
      this.finishSetup();
    } else {
      this.humanPlayer.gameBoard = new GameBoard();

      this.shipTypes.forEach((shipType) => {
        const ship = new Ship(shipType.name, shipType.length);
        let placed = false;

        while (!placed) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const isVertical = Math.random() < 0.5;

          if (this.humanPlayer.gameBoard.placeShip(ship, x, y, isVertical)) {
            placed = true;
          }
        }
      });

      this.currentShipIndex = this.shipTypes.length;
      this.updateShipInfo();
      this.updatePlayerBoard();
    }
  }

  finishSetup() {
    if (this.gameMode === "twoPlayer") {
      if (this.currentSetupPlayer === this.player1) {
        // Player 1 finished setup, now it's Player 2's turn
        this.currentSetupPlayer = this.player2;
        this.showPassDeviceScreen("Pass the device to Player 2", () => {
          // Reset board for Player 2's setup
          const playerBoardLabel = document.querySelector(".board-section h2");
          if (playerBoardLabel) playerBoardLabel.textContent = "Player 2's Board";
          
          const enemyBoardLabel = document.querySelector(".board-section:nth-child(2) h2");
          if (enemyBoardLabel) enemyBoardLabel.textContent = "Player 1's Board";
          
          // Reset ship placement UI for Player 2
          this.currentShipIndex = 0;
          this.isVertical = false;
          this.updateShipInfo();
          this.createShipPlacementZone();
          this.setupDragAndDrop();
          
          // Update the board to show Player 2's empty board
          this.playerBoardSection = renderBoard(this.player2.gameBoard.board);
          document.querySelector(".board-section .game-board").replaceWith(this.playerBoardSection);
          this.playerBoardSection.classList.add("player-board");
          
          this.setupEventListeners();
          this.statusMessage.textContent = "Player 2: Place your ships";
        });
      } else {
        // Both players have finished setup, start the game
        this.setupPhase = false;
        this.currentPlayer = this.player1;
        
        // Remove any remaining ship placement UI
        const shipContainer = this.controlPanel.querySelector(".ship-container");
        if (shipContainer) this.controlPanel.removeChild(shipContainer);
        
        this.showPassDeviceScreen("Game is starting! Pass the device to Player 1", () => {
          const playerBoardLabel = document.querySelector(".board-section h2");
          if (playerBoardLabel) playerBoardLabel.textContent = "Player 1's Board";
          
          const enemyBoardLabel = document.querySelector(".board-section:nth-child(2) h2");
          if (enemyBoardLabel) enemyBoardLabel.textContent = "Player 2's Board";
          
          this.updateBoards();
          this.statusMessage.textContent = "Player 1's turn to attack!";
        });
      }
    } else {
      // Original implementation for vs Computer
      this.setupPhase = false;
      this.statusMessage.textContent = "Game started. Your turn to attack!";
      this.placeComputerShipsRandomly();
    }
  }

  placeComputerShipsRandomly() {
    this.shipTypes.forEach((shipType) => {
      const ship = new Ship(shipType.name, shipType.length);
      let placed = false;

      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const vertical = Math.random() > 0.5;

        if (this.computerPlayer.gameBoard.placeShip(ship, x, y, vertical)) {
          placed = true;
        }
      }
    });
  }

  playerAttack(x, y) {
    if (this.gameMode === "twoPlayer") {
      this.twoPlayerAttack(x, y);
      return;
    }

    if (this.computerPlayer.gameBoard.board[x][y].isHit) {
      return;
    }

    // Process the attack
    const hit = this.humanPlayer.attack(this.computerPlayer.gameBoard, x, y);
    this.updateComputerBoard();

    if (hit) {
      this.statusMessage.textContent = "Hit!";
    } else {
      this.statusMessage.textContent = "Miss!";
    }

    // Check if game over
    if (this.computerPlayer.gameBoard.allShipsSunk()) {
      this.gameOver = true;
      this.statusMessage.textContent = "You win! All enemy ships sunk!";
      return;
    } else {
      this.currentPlayer = this.computerPlayer;
      setTimeout(() => this.computerTurn(), 1000);
    }
  }

  twoPlayerAttack(x, y) {
    const currentPlayer =
      this.currentPlayer === this.player1 ? this.player1 : this.player2;
    const enemyPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;

    if (enemyPlayer.gameBoard.board[x][y].isHit) {
      return;
    }

    const hit = currentPlayer.attack(enemyPlayer.gameBoard, x, y);
    this.updateBoards();

    if (hit) {
      this.statusMessage.textContent = "Hit!";
    } else {
      this.statusMessage.textContent = "Miss!";
    }

    if (enemyPlayer.gameBoard.allShipsSunk()) {
      this.gameOver = true;
      const winnerName =
        currentPlayer === this.player1 ? "Player 1" : "Player 2";
      this.statusMessage.textContent = `${winnerName} wins! All enemy ships sunk!`;
      return;
    }

    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    const nextPlayerName =
      this.currentPlayer === this.player1 ? "Player 1" : "Player 2";

    this.showPassDeviceScreen(`${nextPlayerName}'s turn!`, () => {
      this.statusMessage.textContent = `${nextPlayerName}'s turn!`;
    });
  }

  updateBoards() {
    if (this.gameMode === "twoPlayer") {
      const currentPlayer =
        this.currentPlayer === this.player1 ? this.player1 : this.player2;
      const enemyPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;

      const newPlayerBoard = renderBoard(currentPlayer.gameBoard.board);
      this.playerBoardSection.replaceWith(newPlayerBoard);
      this.playerBoardSection = newPlayerBoard;
      this.playerBoardSection.classList.add("player-board");

      const newEnemyBoard = renderBoard(enemyPlayer.gameBoard.board);
      this.computerBoardSection.replaceWith(newEnemyBoard);
      this.computerBoardSection = newEnemyBoard;
      this.computerBoardSection.classList.add("computer-board");

      this.computerBoardSection
        .querySelectorAll(".ship:not(.hit)")
        .forEach((cell) => {
          cell.classList.remove("ship");
        });

      const enemyCells =
        this.computerBoardSection.querySelectorAll(".board-cell");
      enemyCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (!this.setupPhase && !this.gameOver) {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            this.playerAttack(x, y);
          }
        });
      });
    } else {
      this.updatePlayerBoard();
      this.updateComputerBoard();
    }
  }

  computerTurn() {
    const result = this.computerPlayer.computerAttack(
      this.humanPlayer.gameBoard
    );
    const x = result.x;
    const y = result.y;

    // First highlight where the computer is attacking
    this.highlightAttackCell(x, y);

    setTimeout(() => {
      this.updatePlayerBoard();

      if (result.hit) {
        this.statusMessage.textContent = `Computer hit at (${x}, ${y})!`;
      } else {
        this.statusMessage.textContent = `Computer missed at (${x}, ${y})!`;
      }

      if (this.humanPlayer.gameBoard.allShipsSunk()) {
        this.gameOver = true;
        this.statusMessage.textContent = "You lose! All your ships sunk!";
        return;
      } else {
        this.currentPlayer = this.humanPlayer;
        setTimeout(() => {
          this.statusMessage.textContent = "Your turn!";
        }, 1000);
      }
    }, 1000);
  }

  getComputerAttackCoordinates() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.humanPlayer.gameBoard.board[x][y].isHit);

    return { x, y };
  }

  highlightAttackCell(x, y) {
    const cells = this.playerBoardSection.querySelectorAll(".board-cell");
    const targetCell = [...cells].find(
      (cell) => parseInt(cell.dataset.x) === x && parseInt(cell.dataset.y) === y
    );

    if (targetCell) {
      targetCell.classList.add("computer-targeting");
      this.statusMessage.textContent = `Computer attacking at (${x}, ${y})...`;
    }
  }

  updatePlayerBoard() {
    const newBoard = renderBoard(this.humanPlayer.gameBoard.board);
    this.playerBoardSection.replaceWith(newBoard);
    this.playerBoardSection = newBoard;
    this.playerBoardSection.classList.add("player-board");

    if (this.setupPhase) {
      const playerCells =
        this.playerBoardSection.querySelectorAll(".board-cell");
      playerCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          if (
            this.setupPhase &&
            this.currentShipIndex < this.shipTypes.length
          ) {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);
            this.placePlayerShip(x, y);
          }
        });
      });
    }
  }

  updateComputerBoard() {
    const newBoard = renderBoard(this.computerPlayer.gameBoard.board);
    this.computerBoardSection.replaceWith(newBoard);
    this.computerBoardSection = newBoard;
    this.computerBoardSection.classList.add("computer-board");

    this.computerBoardSection
      .querySelectorAll(".ship:not(.hit)")
      .forEach((cell) => {
        cell.classList.remove("ship");
      });

    const computerCells =
      this.computerBoardSection.querySelectorAll(".board-cell");
    computerCells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (
          !this.setupPhase &&
          this.currentPlayer === this.humanPlayer &&
          !this.gameOver
        ) {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);
          this.playerAttack(x, y);
        }
      });
    });
  }
}
