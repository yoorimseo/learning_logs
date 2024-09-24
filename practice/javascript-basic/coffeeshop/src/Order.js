const InputView = require('./view/InputView');
const MakeBeverage = require('./MakeBeverage');
const PickUp = require('./PickUp');

class Order {
  constructor() {
    this.orderList = {};
    this.makeBeverage = new MakeBeverage();
    this.pickUp = new PickUp();
  }

  orderInput() {
    InputView.inputOrder('주문할 음료와 갯수를 입력해주세요.\n', (answer) => {
      const list = answer.replace(/,/g, '').split(' ');
      const customerOrderList = [];
      for (let index = 0; index < list.length; index++) {
        if (index % 2 === 0) {
          customerOrderList.push(list.slice(index, index + 2));
        }
      }
      this.orderList = Object.fromEntries(customerOrderList);
      this.makeBeverage.calcTime(this.orderList);
      this.pickUp.notifyPickUp(this.orderList);
    });
  }
}

module.exports = Order;
