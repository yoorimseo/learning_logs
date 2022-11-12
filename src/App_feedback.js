const MissionUtils = require('@woowacourse/mission-utils');
const { NumberGenerator } = require('./Domain/NumberGenerator');
const { Referee } = require('./Domain/Referee');

// 객체 지향 프로그래밍
// 1. 기능을 가지고 있는 클래스를 인스턴스화(=객체) 한다.
// 2. 필요한 기능을 (역할에 맞는) 인스턴스가 수행하게 한다. (의인화)
// 3. 각 결과를 종합하여 하나의 프로그램을 동작시킨다.

class App {
  play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    const numberGenerator = new NumberGenerator();
    const computer = numberGenerator.createRandomNumbers();

    const referee = new Referee();

    this.askNumbers();

    let result = '';
    while (result != '0 볼 3 스트라이크') {
      result = referee.compare(computer, this.askNumbers());
      MissionUtils.Console.print(result);
    }
    MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
  }

  askNumbers() {
    MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (input) => {
      return input.split('').forEach((str) => parseInt(str));
    });
  }
}

const app = new App();
app.play();
