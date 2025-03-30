import { GameBoard } from "./gameBoard";

export class Player {
  constructor(type) {
    this.gameBoard = new GameBoard();
    this.type = type;
    
    // For AI targeting
    this.lastHit = null;
    this.successfulHits = [];
    this.targetStack = [];
    this.huntingDirection = null;
  }

  attack(enemyBoard, x, y) {
    return enemyBoard.receiveAttack(x, y);
  }

  computerAttack(enemyBoard) {
    let coordinates;
    
    if (this.targetStack.length > 0) {
      // Target adjacent cells to previous hits
      coordinates = this.targetStack.pop();
    } else {
      // Random attack
      coordinates = this.getRandomCoordinates(enemyBoard);
    }
    
    const x = coordinates.x;
    const y = coordinates.y;
    
    const hit = this.attack(enemyBoard, x, y);
    
    if (hit) {
      // Save this hit
      this.successfulHits.push({x, y});
      
      // Add adjacent cells to target stack
      this.addAdjacentCellsToTargetStack(x, y, enemyBoard);
    }
    
    return { x, y, hit };
  }
  
  getRandomCoordinates(enemyBoard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (enemyBoard.board[x][y].isHit);
    
    return { x, y };
  }
  
  addAdjacentCellsToTargetStack(x, y, enemyBoard) {
    // Define potential adjacent cells to target
    const adjacentCells = [
      { x: x-1, y: y },  // up
      { x: x+1, y: y },  // down
      { x: x, y: y-1 },  // left
      { x: x, y: y+1 }   // right
    ];
    
    // Filter valid targets and add to stack
    const validTargets = adjacentCells.filter(cell => {
      return this.isValidTarget(cell.x, cell.y, enemyBoard);
    });
    
    // Add valid targets to stack in a shuffled order
    this.shuffleArray(validTargets);
    this.targetStack.push(...validTargets);
  }
  
  isValidTarget(x, y, enemyBoard) {
    // Check if coordinates are within board boundaries
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      return false;
    }
    
    // Check if cell has already been targeted
    return !enemyBoard.board[x][y].isHit;
  }
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}