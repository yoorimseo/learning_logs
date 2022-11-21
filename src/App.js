const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./view/InputView');
const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./domain/BridgeRandomNumberGenerator');
const BridgeGame = require('./service/BridgeGame');
const OutputView = require('./view/OutputView');

class App {
  #bridgeLength;
  #step;
  #count;

  constructor() {
    this.#bridgeLength = 0;
    this.#step = 0;
    this.#count = 0;
  }
  play() {
    // 게임 시작 출력
    OutputView.printGameStart();
    // 길이 입력
    InputView.readBridgeSize('다리의 길이를 입력해주세요.\n', (answer) => {
      // BridgeMaker 생성
      const BRIDGE = BridgeMaker.makeBridge(answer, BridgeRandomNumberGenerator.generate);
      console.log(BRIDGE);
      this.#bridgeLength += BRIDGE.length;
      const bridgeGame = new BridgeGame(BRIDGE);

      // 이동 입력
      this.inputMoveBlock(bridgeGame, BRIDGE);

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
      // 몇 번째 다리를 건너고 있는지 확인하기 위한 step 추가
      this.#step++;
      // 현재까지 건넌 다리의 상태를 확인
      this.checkMovingState(playerBridge, bridgeGame);
    });
  }

  checkMovingState(playerBridge, bridgeGame) {
    // 현재까지 건넌 다리의 상태를 확인한 후, 게임 진행 여부 결정
    const checkPlayerBridge = playerBridge.reduce((acc, cur) => [...acc, ...cur]);
    if (checkPlayerBridge.includes(' X ')) {
      // 게임 실패, 재시작하거나 종료
      return this.inputGameCommand(bridgeGame);
    }
    // 다리를 끝까지 건넜는지 확인
    const arrivalState = this.checkArrivalState(this.#bridgeLength, this.#step);
    // 게임 계속 진행 여부 확인
    return arrivalState ? Console.close() : this.inputMoveBlock(bridgeGame);
  }

  inputGameCommand(bridgeGame) {
    InputView.readGameCommand('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', (answer) => {
      switch (answer) {
        case 'R':
          // step 초기화
          this.#step = 0;
          // 플레이어가 이동한 다리 초기화
          bridgeGame.path = [];
          // 이동할 칸 재입력
          return this.inputMoveBlock(bridgeGame);
        case 'Q':
          // 최종 결과 출력
          return Console.close();
      }
    });
  }

  checkArrivalState(bridgeLength, step) {
    // 다리를 끝까지 건넜는지 확인
    // console.log(`bridgeLength: ${bridgeLength}, step: ${step}`);
    if (bridgeLength === step) {
      // 끝까지 건넜다면 최종 게임 결과 출력
      // 게임 종료
      return true;
    }
    return false;
  }

  printBridgeMap(playerBridge) {
    // 상태 출력
    OutputView.printMap(playerBridge);
  }
}

module.exports = App;

const app = new App();
app.play();
