const OutputView = require('./view/OutputView');

class makeBeverage {
  constructor() {
    this.makingBeverageList = {
      아메리카노: 1,
      카페라떼: 2,
      에이드: 3,
      스무디: 4,
    };
  }

  make(bevarage, time) {
    OutputView.printMakingBevarage(bevarage, time);
  }
}

module.exports = makeBeverage;
