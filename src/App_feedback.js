const MissionUtils = require('@woowacourse/mission-utils');
const { NumberGenerator } = require('./Domain/NumberGenerator');
const { Judgement } = require('./Domain/Judgement');
const { Referee } = require('./Domain/Referee');

const numberGenerator = new NumberGenerator();
const judgement = new Judgement();
const referee = new Referee();

// const { Ball } = require('./Domain/Domain');
// const ball = new Ball();

// 객체 지향 프로그래밍
// 1. 기능을 가지고 있는 클래스를 인스턴스화(=객체) 한다.
// 2. 필요한 기능을 (역할에 맞는) 인스턴스가 수행하게 한다. (의인화)
// 3. 각 결과를 종합하여 하나의 프로그램을 동작시킨다.

class App {
  constructor() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    // MissionUtils.Console.print(numberGenerator.createRandomNumbers());
    // MissionUtils.Console.print(judgement.correctCount([2, 8, 9], [1, 2, 3]));
    // MissionUtils.Console.print(judgement.hasPlace([7, 8, 9], 1, 7));
    MissionUtils.Console.print(referee.compare([4, 5, 6], [1, 2, 3]));
  }
}

const app = new App();
// app.play();
