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
}

module.exports = App;
