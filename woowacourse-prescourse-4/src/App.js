const OutputView = require('./view/OutputView');
const BridgeGameController = require('./controller/BridgeGameController');

class App {
  play() {
    OutputView.printGameStart();
    BridgeGameController.inputBridgeLength();
  }
}

module.exports = App;

// 비동기를 사용하여 사용자 입력값 저장하기
// class App {
//   async play() {
//     // 게임 시작 출력
//     OutputView.printGameStart();
//     // 길이 입력
//     const size = await InputView.readBridgeSize('다리의 길이를 입력해주세요.');

//     console.log(size);
//   }
// }

// let 아래에 = 연산을 쓸때
// const 아래에 = 연산 안쓸때
