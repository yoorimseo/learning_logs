const OutputView = require('./view/OutputView');
const BridgeGameController = require('./controller/BridgeGameController');

class App {
  play() {
    OutputView.printGameStart();
    BridgeGameController.inputBridgeLength();
  }
}

module.exports = App;
