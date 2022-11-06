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
    });
  }
}

module.exports = App;
