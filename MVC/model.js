import Event from "./event.js";

class TicTacToe {
  constructor() {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Array(7).fill());
    }
    this.board = arr; // previously Array(9).fill()
    this.currentPlayer = "X";
    this.finished = false;

    this.updateCellEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
  }

  play(move) {
    const coor = exactLocationFinder(move); // short for coordinates
    // (array of 2 values that point to the location of the cell in the board)

    if (
      this.finished ||
      move < 0 ||
      move > 48
      // || this.board[coor[0]][coor[1]]
    ) {
      console.log("returning false");
      // move > 48
      return false;
    }
    // small bug, user still has to click above
    // because of this.board in if returning false
    for (let i = 6; i > -1; i--) {
      if (!this.board[i][coor[1]]) {
        this.board[i][coor[1]] = this.currentPlayer;
        console.log(this.board[i][coor[1]]);
        const domLocation = 7 * i + coor[1];
        this.updateCellEvent.trigger({
          move: domLocation,
          player: this.currentPlayer,
        });
        break;
      }
    }

    this.finished = this.victory() || this.draw();

    if (!this.finished) {
      this.switchPlayer();
    }
    console.log(this.board);

    return true;
  }

  victory() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const victory = lines.some(
      l =>
        this.board[l[0]] &&
        this.board[l[0]] === this.board[l[1]] &&
        this.board[l[1]] === this.board[l[2]]
    );

    if (victory) {
      this.victoryEvent.trigger(this.currentPlayer);
    }

    return victory;
  }

  draw() {
    // not sure this should be touched
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
