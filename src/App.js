const InputView = require('./view/InputView');
const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./domain/BridgeRandomNumberGenerator');
const BridgeGame = require('./service/BridgeGame');
const OutputView = require('./view/OutputView');

class App {
  play() {
    // 게임 시작 출력
    OutputView.printGameStart();
    // 길이 입력
    InputView.readBridgeSize('다리의 길이를 입력해주세요.\n', (answer) => {
      // BridgeMaker 생성
      const BRIDGE = BridgeMaker.makeBridge(answer, BridgeRandomNumberGenerator.generate);
      console.log(BRIDGE);

      const bridgeGame = new BridgeGame(BRIDGE);

      // 이동 입력
      this.inputMoveBlock(bridgeGame);

      // 게임 결과의 총 시도한 횟수는 첫 시도를 포함해 게임을 종료할 때까지 시도한 횟수를 출력해야 한다.
    });
    //
  }

  inputMoveBlock(bridgeGame) {
    InputView.readMoving('이동할 칸을 선택해주세요. (위: U, 아래: D)\n', (answer) => {
      // 이동
      bridgeGame.move(answer);
      // 상태 저장
      const playerBridge = bridgeGame.makeBridgeMap();
      // 상태 출력
      this.printBridgeMap(playerBridge);
      // 게임 계속 진행 여부 확인
      this.checkMovingState(playerBridge, bridgeGame);
    });
  }

  printBridgeMap(playerBridge) {
    // 상태 출력
    OutputView.printMap(playerBridge);
  }
}

module.exports = App;

const app = new App();
app.play();
