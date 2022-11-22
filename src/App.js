const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./view/InputView');
const BridgeGame = require('./service/BridgeGame');
const bridgeGame = new BridgeGame();
const OutputView = require('./view/OutputView');
const InputValidation = require('./InputValidation');

class App {
  #bridgeLength;
  #step;
  #count;

  constructor() {
    this.#bridgeLength = 0;
    this.#step = 0;
    this.#count = 1;
  }
  play() {
    // 게임 시작 출력
    OutputView.printGameStart();
    // 길이 입력
    this.inputBridgeLength();
    //
  }

  inputBridgeLength() {
    InputView.readBridgeSize('다리의 길이를 입력해주세요.\n', (answer) => {
      // 입력값 확인
      try {
        this.checkInputValidation(answer);
        const BRIDGE = bridgeGame.makeBridge(answer);
        console.log(BRIDGE);
        this.inputMoveBlock();
      } catch {
        Console.print('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.\n');
        this.inputBridgeLength();
      }
    });
  }

  checkInputValidation(answer) {
    if (!InputValidation.isNumber(answer)) {
      throw Error();
    } else if (!InputValidation.isvalidrange(answer)) {
      throw Error();
    }
  }

  inputMoveBlock() {
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
      this.checkMovingState(playerBridge);
    });
  }

  checkMovingState(playerBridge) {
    // 현재까지 건넌 다리의 상태를 확인한 후, 게임 진행 여부 결정
    const checkPlayerBridge = playerBridge.flat();
    if (checkPlayerBridge.includes(' X ')) {
      // 게임 실패, 재시작하거나 종료
      return this.inputGameCommand(playerBridge);
    }
    return this.checkArrivalState(bridgeGame.bridgeLength, this.#step, playerBridge);
  }

  inputGameCommand(playerBridge) {
    InputView.readGameCommand('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', (answer) => {
      switch (answer) {
        case 'R':
          // step 초기화
          this.#step = 0;
          // 플레이어가 이동한 다리 초기화
          bridgeGame.path = [];
          // 시도한 횟수 추가
          this.#count++;
          // 이동할 칸 재입력
          return this.inputMoveBlock(bridgeGame);
        case 'Q':
          // 최종 결과 출력
          this.printFinalResult(playerBridge, '실패');
          return Console.close();
      }
    });
  }

  checkArrivalState(bridgeLength, step, playerBridge) {
    // 다리를 끝까지 건넜는지 확인
    if (bridgeLength === step) {
      // 끝까지 건넜다면 최종 게임 결과 출력
      this.printFinalResult(playerBridge, '성공');
      // 게임 종료
      return Console.close();
    }
    // 재시작
    return this.inputMoveBlock(bridgeGame);
  }

  printBridgeMap(playerBridge) {
    // 상태 출력
    OutputView.printMap(playerBridge);
  }

  printFinalResult(playerBridge, successStatus) {
    const totalAttempts = this.#count;
    OutputView.printResult(playerBridge, successStatus, totalAttempts);
  }
}

module.exports = App;

const app = new App();
app.play();
