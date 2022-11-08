const MissionUtils = require('@woowacourse/mission-utils');

class App {
  constructor() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
  }

  pickRandomNumber() {
    const COMPUTER = [];
    while (COMPUTER.length < 3) {
      const NUMBER = MissionUtils.Random.pickNumberInRange(0, 9);
      if (!COMPUTER.includes(NUMBER)) {
        COMPUTER.push(NUMBER);
      }
    }
    return COMPUTER;
  }

  play() {
    this.COMPUTER = this.pickRandomNumber();
    this.userInput(this.COMPUTER);
  }

  userInput(computer) {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {
      this.checkUserInput(answer);

      let userAnswer = answer.split('').map((str) => parseInt(str));
      let result = this.compareOfValues(userAnswer, computer);

      this.continueGame(computer, result);
    });
  }

  checkUserInput(string) {
    if (string.length !== 3) {
      throw new Error();
    }
    if (!/[0-9]/.test(string)) {
      throw new Error();
    }
    if (parseInt(string) < 0) {
      throw new Error();
    }
    if (this.checkDuplication(string) < 3) {
      throw new Error();
    }
  }

  checkDuplication(string) {
    let test = [];
    let array = string.split('');
    array.forEach((number) => {
      if (!test.includes(number)) {
        test.push(number);
      }
    });

    return test.length;
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
    while (result.strike < 3) {
      this.printResult(result);
      return this.userInput(computer);
    }

    if (result.strike === 3) {
      this.printResult(result);
    }
  }

  printResult(result) {
    if (result.strike === 3) {
      MissionUtils.Console.print('3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임 종료');
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

  restartGame() {
    MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n', (answer) => {
      if (answer === '1') {
        this.play();
      } else if (answer === '2') {
        return;
      } else {
        throw new Error();
      }
    });
  }
}

module.exports = App;
