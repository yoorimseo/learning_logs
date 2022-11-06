const MissionUtils = require('@woowacourse/mission-utils');

class App {
  constructor() {
    this.computer = this.pickRandomNumber();
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
  }

  pickRandomNumber() {
    const computer = MissionUtils.Random.pickUniqueNumbersInRange(0, 9, 3);
    return computer;
  }

  play() {}

  userInput(computer) {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {
      let userAnswer = answer.split('').map((str) => parseInt(str));
      let result = this.compareOfValues(userAnswer, computer);

      this.continueGame(computer, result);
    });
  }

  compareOfValues(userAnswer, computer) {
    let result = {
      strike: 0,
      ball: 0,
    };

    userAnswer.forEach((num) => {
      if (computer.includes(num)) {
        if (userAnswer.indexOf(num) === computer.indexOf(num)) {
          result.strike += 1;
        } else {
          result.ball += 1;
        }
      }
    });

    return result;
  }

  continueGame(computer, result) {
    while (result.strike !== 3) {
      this.printResult(result);
      return this.userInput(computer);
    }

    if (result.strike === 3) {
      this.printResult(result);
    }
  }
}

module.exports = App;
