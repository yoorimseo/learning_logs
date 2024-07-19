import MissionUtils from '@woowacourse/mission-utils';
import Computer from './Compter.js';

class App {
  constructor() {
    this.computerNumbers = null;
  }

  async play() {
    // 게임 시작 문구 출력
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');

    // 랜덤한 3개의 숫자 생성
    const computer = new Computer();
    this.computerNumbers = computer.generateRandomNumber();
    console.log(this.computerNumbers);
  }
}

export default App;

const app = new App();
app.play();
