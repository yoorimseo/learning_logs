const OutputView = require('./view/OutputView');

class PickUp {
  notifyPickUp(orderList) {
    OutputView.printPickUp();
    for (const menu in orderList) {
      OutputView.printOrderHistory(menu, orderList[menu]);
    }
  }
}

module.exports = PickUp;
