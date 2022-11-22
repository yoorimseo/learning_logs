const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./view/InputView');
const BridgeGame = require('./service/BridgeGame');
const bridgeGame = new BridgeGame();
const OutputView = require('./view/OutputView');
const InputValidation = require('./InputValidation');

class App {
  #bridgeLength;

  constructor() {
    this.#bridgeLength = 0;
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
        this.checkBridgeLengthValidation(answer);
        const BRIDGE = bridgeGame.makeBridge(answer);
        console.log(BRIDGE);
        this.inputMoveBlock();
      } catch {
        Console.print('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.\n');
        this.inputBridgeLength();
      }
    });
  }

  checkBridgeLengthValidation(answer) {
    if (!InputValidation.isNumber(answer)) {
      throw Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    } else if (!InputValidation.isvalidrange(answer)) {
      throw Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    }
  }

  inputMoveBlock() {
    InputView.readMoving('이동할 칸을 선택해주세요. (위: U, 아래: D)\n', (answer) => {
      try {
        this.checkMoveBlockValidation(answer);
        // 이동
        bridgeGame.move(answer);
        // 상태 저장
        const playerBridge = bridgeGame.makeBridgeMap();
        // 상태 출력
        this.printBridgeMap(playerBridge);
        // 몇 번째 다리를 건너고 있는지 확인하기 위한 step 추가
        bridgeGame.step++;
        // 현재까지 건넌 다리의 상태를 확인
        this.checkMovingState(playerBridge);
      } catch {
        Console.print('[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.\n');
        this.inputMoveBlock();
      }
    });
  }

  checkMoveBlockValidation(answer) {
    if (!InputValidation.isUpOrDown(answer)) {
      throw Error('[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.');
    }
  }

  checkMovingState(playerBridge) {
    // 현재까지 건넌 다리의 상태를 확인한 후, 게임 진행 여부 결정
    const checkPlayerBridge = playerBridge.flat();
    if (checkPlayerBridge.includes(' X ')) {
      // 게임 실패, 재시작하거나 종료
      return this.inputGameCommand(playerBridge);
    }
    return this.checkArrivalState(bridgeGame.bridgeLength, bridgeGame.step, playerBridge);
  }

  inputGameCommand(playerBridge) {
    InputView.readGameCommand('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', (answer) => {
      if (bridgeGame.retry(answer)) {
        return this.inputMoveBlock();
      }
      this.printFinalResult(playerBridge, '실패');
      return Console.close();
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
    const totalAttempts = bridgeGame.count;
    OutputView.printResult(playerBridge, successStatus, totalAttempts);
  }
}

module.exports = App;

const app = new App();
app.play();
