import Event from "./event.js";

class View {
  constructor() {
    this.playEvent = new Event();
  }

  render() {
    const board = document.createElement("div");
    board.className = "board";

    this.cells = Array(49)
      .fill()
      .map((_, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";

        cell.addEventListener("click", () => {
          this.playEvent.trigger(i);
          // pass two numbers column and row ?
          // or column and place in column

          // playEvent triggers
          // model.play function with argument i
          // this passes the model i (cell no.) and continues on logic
          // checking for draw, win, etc...
        });

        board.appendChild(cell);

        return cell;
      });

    this.message = document.createElement("div");
    this.message.className = "message";

    document.body.appendChild(board);
    document.body.appendChild(this.message);
  }

  updateCell(data) {
    this.cells[data.move].innerHTML = data.player;
  }

  victory(winner) {
    this.message.innerHTML = `${winner} wins!`;
  }

  draw() {
    this.message.innerHTML = "It's a draw!";
  }
}

export default View;
