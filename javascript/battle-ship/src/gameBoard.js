export class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.ships = [];
    this.missedAttacks = [];
  }

  placeShip(ship, x, y, isVertical) {
    if (!this.isValidPlacement(ship, x, y, isVertical)) {
      return false; // Invalid placement
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y].ship = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i].ship = ship;
      }
    }
    this.ships.push(ship);
    return true; // Ship placed successfully
  }

  isValidPlacement(ship, x, y, isVertical) {
    if (isVertical) {
      if (x + ship.length > 10) return false;
    } else {
      if (y + ship.length > 10) return false;
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y].ship) return false;
      }
    }
    else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i].ship) return false;
      }
    }
    return true; // Valid placement
  }

  receiveAttack(x, y, computerAttack = false) {
    const cell = this.board[x][y];
    if (cell.isHit) {
      return false; // Already hit
    }
    cell.isHit = true;
    if (cell.ship) {
      cell.ship.hit();
      return true; // Hit
    } else {
      this.missedAttacks.push({ x, y });
      return false; // Miss
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  createBoard() {
    const board = [];
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i][j] = { isHit: false, ship: null, computerAttack: false };
      }
    }
    return board;
  }
}