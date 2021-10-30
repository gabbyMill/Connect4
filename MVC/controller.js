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
      this.model.play(move);
    });

    this.model.updateCellEvent.addListener(data => {
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
