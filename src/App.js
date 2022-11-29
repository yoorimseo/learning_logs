const OutputView = require('./view/OutputView');
const Order = require('./Order');

class App {
  constructor() {
    OutputView.printMenu();
    this.order = new Order();
  }

  play() {
    const orderList = this.order.orderInput();
  }
}

module.exports = App;

const app = new App();
app.play();
