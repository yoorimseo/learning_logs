const OutputView = require('./view/OutputView');

class App {
  play() {
    OutputView.printMenu();
  }
}

module.exports = App;

const app = new App();
app.play();
