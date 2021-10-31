import Event from "./event.js";

class TicTacToe {
  constructor() {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Array(7).fill());
    }
    this.board = arr;
    this.currentPlayer = "X";
    this.finished = false;

    this.updateCellEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
  }

  play(move) {
    const coor = exactLocationFinder(move); // short for coordinates
    // (array of 2 values that point to the location of the cell in the board)

    if (this.finished || move < 0 || move > 48) {
      return false;
    }

    let victoryArg;
    for (let i = 6; i > -1; i--) {
      if (!this.board[i][coor[1]]) {
        this.board[i][coor[1]] = this.currentPlayer;
        const domLocation = 7 * i + coor[1];
        victoryArg = [i, coor[1]];
        this.updateCellEvent.trigger({
          move: domLocation,
          player: this.currentPlayer,
        });
        break;
      }
    }

    this.finished = this.victory(victoryArg) || this.draw();

    if (!this.finished) {
      this.switchPlayer();
    }

    return true;
  }

  victory(vicArg) {
    const v = this.checkForWin(vicArg);
    if (v) {
      if (this.currentPlayer === "X") {
        this.victoryEvent.trigger("Red");
      } else {
        this.victoryEvent.trigger("Blue");
      }
    }

    return v;
  }

  draw() {
    const draw = this.board.every(arr => arr.every(cell => cell));
    // checks if every sub array is full
    // in other words if all the board is full with no win from either player

    if (draw) {
      this.drawEvent.trigger();
    }

    return draw;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }
  checkForWin(move) {
    // move is array of 2 coordinates
    const r = move[0];
    const c = move[1];
    if (
      // checks for horizontal line
      c >= 3 &&
      this.board[r][c] === this.board[r][c - 1] &&
      this.board[r][c - 1] === this.board[r][c - 2] &&
      this.board[r][c - 2] === this.board[r][c - 3]
    ) {
      return true;
    }
    if (
      // checks for horizontal line
      this.board[r][c] === this.board[r][c + 1] &&
      this.board[r][c + 1] === this.board[r][c + 2] &&
      this.board[r][c + 2] === this.board[r][c + 3]
    ) {
      return true;
    }
    if (
      // checks for vertical line
      r <= 3 &&
      this.board[r][c] === this.board[r + 1][c] &&
      this.board[r + 1][c] === this.board[r + 2][c] &&
      this.board[r + 2][c] === this.board[r + 3][c]
    ) {
      return true;
    }
    if (
      // checks for diagonal line
      c >= 3 &&
      r <= 3 &&
      this.board[r][c] === this.board[r + 1][c - 1] &&
      this.board[r][c] === this.board[r + 2][c - 2] &&
      this.board[r][c] === this.board[r + 3][c - 3]
    ) {
      console.log(1);
      return true;
    }
    if (
      // checks for diagonal line
      r >= 3 &&
      c <= 3 &&
      this.board[r][c] === this.board[r - 1][c + 1] &&
      this.board[r][c] === this.board[r - 2][c + 2] &&
      this.board[r][c] === this.board[r - 3][c + 3]
    ) {
      return true;
    }
    if (
      // checks for diagonal line
      r >= 3 &&
      c >= 3 &&
      this.board[r][c] === this.board[r - 1][c - 1] &&
      this.board[r][c] === this.board[r - 2][c - 2] &&
      this.board[r][c] === this.board[r - 3][c - 3]
    ) {
      return true;
    }
    if (
      // checks for diagonal line
      r <= 3 &&
      c <= 3 &&
      this.board[r][c] === this.board[r + 1][c + 1] &&
      this.board[r][c] === this.board[r + 2][c + 2] &&
      this.board[r][c] === this.board[r + 3][c + 3]
    ) {
      return true;
    }
    return false;
  }
}

export default TicTacToe;

function exactLocationFinder(cellNum) {
  if (cellNum > 41) {
    return [6, cellNum - 42];
  }
  if (cellNum > 34) {
    return [5, cellNum - 35];
  }
  if (cellNum > 27) {
    return [4, cellNum - 28];
  }
  if (cellNum > 20) {
    return [3, cellNum - 21];
  }
  if (cellNum > 13) {
    return [2, cellNum - 14];
  }
  if (cellNum > 6) {
    return [1, cellNum - 7];
  } else {
    return [0, cellNum];
  }
}
