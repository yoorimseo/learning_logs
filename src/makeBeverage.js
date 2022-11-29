const OutputView = require('./view/OutputView');

class MakeBeverage {
  constructor() {
    this.makingBeverageList = {
      아메리카노: 1,
      카페라떼: 2,
      에이드: 3,
      스무디: 4,
    };
  }

  makingBeverage(bevarage, time) {
    OutputView.printMakingBevarage(bevarage, time);
  }

  calcTime(orderList) {
    let time = 0;

    for (const menu in orderList) {
      time = this.makingBeverageList[menu] * orderList[menu];
      this.makingBeverage(menu, time);
    }
  }
}

module.exports = MakeBeverage;
