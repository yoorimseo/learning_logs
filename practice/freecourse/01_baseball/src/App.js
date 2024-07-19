import MissionUtils from '@woowacourse/mission-utils';
import Computer from './Compter.js';
import User from './User.js';

class App {
  constructor() {
    this.computerNumbers = null;
    this.userNumbers = null;
    this.strikes = 0;
    this.balls = 0;
  }

  async play() {
    // 게임 시작 문구 출력
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

    // 랜덤한 3개의 숫자 생성
    const computer = new Computer();
    this.computerNumbers = computer.generateRandomNumber();
    console.log(this.computerNumbers);

    // 컴퓨터의 값과 사용자 입력값이 동일할 때까지 비교하여 계산 결과 출력
    while (true) {
      // 사용자로부터 서로 다른 3개의 숫자를 입력받음
      const user = new User();
      this.userNumbers = await user.getUserNumber();

      const [strikes, balls] = computer.calculateScore(this.computerNumbers, this.userNumbers);
      this.strikes = strikes;
      this.balls = balls;

      computer.printScore(this.strikes, this.balls);

      if (this.strikes === 3) {
        console.log('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
        console.log('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.');
        break;
      }
    }
  }
}

export default App;

const app = new App();
app.play();
