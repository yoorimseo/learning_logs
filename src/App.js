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

  printResult(result) {
    if (result.strike === 3) {
      MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
      this.restartGame();
    } else if (0 < result.strike && result.strike < 3) {
      // 1스트라이크 or 2스트라이크
      if (0 < result.ball && result.ball < 3) {
        // 1볼 or 2볼
        MissionUtils.Console.print(`${result.ball}볼 ${result.strike}스트라이크`);
      } else if (result.ball === 0) {
        MissionUtils.Console.print(`${result.strike}스트라이크`);
      }
    } else if (result.strike === 0) {
      if (0 < result.ball && result.ball < 4) {
        MissionUtils.Console.print(`${result.ball}볼`);
      } else if (result.ball === 0) {
        MissionUtils.Console.print('낫싱');
      }
    }
  }
}

module.exports = App;
