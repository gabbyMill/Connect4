import TicTacToe from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new TicTacToe();
    this.view = new View();

    // to understand this go to view.playEvent
    // see what it's giving as an arg
    // see what model.play is doing with that arg
    this.view.playEvent.addListener(move => {
      // move is cell num
      // basically a function that passes the event as an argument
      // to model.play function ?
      this.model.play(move);
    });

    this.model.updateCellEvent.addListener(data => {
      // data is an object with properties
      // move (cell num) & player (X or O)
      this.view.updateCell(data);
    });
    this.model.victoryEvent.addListener(winner => {
      // winner is probably the name of the winner...
      this.view.victory(winner);
    });
    this.model.drawEvent.addListener(() => {
      this.view.draw();
    });
  }

  run() {
    this.view.render();
  }
}

export default Controller;
