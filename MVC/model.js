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
    console.log(this.board[move]);
    // originally this.board[move] checks if there is already something there
    // argument passed into play should be redefined to include 2 numbers
    // e.g instead of [5] should be something like [0][4]
    if (this.finished || move < 0 || move > 48 || this.board[move]) {
      console.log("returning false");
      // move > 48
      return false;
    }
    console.log(`board\n` + this.board);

    this.board[move] = this.currentPlayer;
    this.updateCellEvent.trigger({ move, player: this.currentPlayer });

    this.finished = this.victory() || this.draw();

    if (!this.finished) {
      this.switchPlayer();
    }

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
