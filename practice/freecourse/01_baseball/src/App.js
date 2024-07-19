import MissionUtils from '@woowacourse/mission-utils';
import Computer from './Compter.js';
import User from './User.js';

class App {
  constructor() {
    this.computerNumbers = null;
    this.userNumbers = null;
  }

  async play() {
    // 게임 시작 문구 출력
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

    // 랜덤한 3개의 숫자 생성
    const computer = new Computer();
    this.computerNumbers = computer.generateRandomNumber();
    console.log(this.computerNumbers);

    // 사용자로부터 서로 다른 3개의 숫자를 입력받음
    const user = new User();
    this.userNumbers = await user.getUserNumber();
    console.log(this.userNumbers);
  }
}

export default App;

const app = new App();
app.play();
