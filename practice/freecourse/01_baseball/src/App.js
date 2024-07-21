import MissionUtils from '@woowacourse/mission-utils';
import Computer from './Compter.js';
import User from './User.js';

class App {
  constructor() {
    this.playAgain = true;
    this.computerNumbers = null;
    this.userNumbers = null;
    this.strikes = 0;
    this.balls = 0;
  }

  async play() {
    // 게임 시작 문구 출력
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

    while (this.playAgain) {
      // 랜덤한 3개의 숫자 생성
      const computer = new Computer();
      this.computerNumbers = computer.generateRandomNumber();
      //  MissionUtils.Console.print(this.computerNumbers);

      const user = new User();

      // 사용자와의 게임 루프
      while (this.strikes < 3) {
        // 사용자로부터 서로 다른 3개의 숫자를 입력받음
        this.userNumbers = await user.getUserNumber();

        const [strikes, balls] = computer.calculateScore(this.computerNumbers, this.userNumbers);
        this.strikes = strikes;
        this.balls = balls;

        computer.printScore(this.strikes, this.balls);

        if (this.strikes === 3) {
          MissionUtils.Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
          break;
        }
      }

      // 게임 재시작 여부 확인
      this.playAgain = await user.askForRestart();
    }
    MissionUtils.Console.print('게임을 종료합니다.');
  }
}

export default App;

const app = new App();
app.play();
