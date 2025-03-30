export function renderBoard(board) {
  const boardElement = document.createElement("div");
  boardElement.classList.add("game-board");

  for (let i = 0; i < board.length; i++) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("board-row");

    for (let j = 0; j < board[i].length; j++) {
      const cellElement = document.createElement("div");
      cellElement.classList.add("board-cell");
      cellElement.dataset.x = i;
      cellElement.dataset.y = j;

      if (board[i][j].isHit) {
        cellElement.classList.add("hit");
      }

      if (board[i][j].ship) {
        cellElement.classList.add("ship");
      }

      rowElement.appendChild(cellElement);
    }

    boardElement.appendChild(rowElement);
  }

  return boardElement;
}