import TicTacToe from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new TicTacToe();
    this.view = new View();

    this.view.playEvent.addListener(move => {
      // move is cell num
      this.model.play(move);
    });

    this.model.updateCellEvent.addListener(data => {
      // data is an object with properties
      // move (cell num) & player (X or O)
      this.view.updateCell(data);
    });
    this.model.victoryEvent.addListener(winner => {
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
