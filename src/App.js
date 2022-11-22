const { Console } = require('@woowacourse/mission-utils');
const InputView = require('./view/InputView');
const BridgeGame = require('./service/BridgeGame');
const bridgeGame = new BridgeGame();
const OutputView = require('./view/OutputView');
const InputValidation = require('./InputValidation');

class App {
  play() {
    OutputView.printGameStart();
    this.inputBridgeLength();
  }

  inputBridgeLength() {
    InputView.readBridgeSize('다리의 길이를 입력해주세요.\n', (answer) => {
      try {
        this.checkBridgeLengthValidation(answer);
        this.makeBridgeAndContinue(answer);
      } catch {
        OutputView.printError('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.\n');
        this.inputBridgeLength();
      }
    });
  }

  makeBridgeAndContinue(answer) {
    bridgeGame.makeBridge(answer);
    this.inputMoveBlock();
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
        this.moveBlockAndContinue(answer);
      } catch {
        OutputView.printError('[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.\n');
        this.inputMoveBlock();
      }
    });
  }

  moveBlockAndContinue(answer) {
    bridgeGame.move(answer);
    const playerBridge = bridgeGame.makeBridgeMap();
    this.printBridgeMap(playerBridge);
    bridgeGame.step++;
    this.checkMovingState(playerBridge);
  }

  checkMoveBlockValidation(answer) {
    if (!InputValidation.isUpOrDown(answer)) {
      throw Error('[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.');
    }
  }

  checkMovingState(playerBridge) {
    const checkPlayerBridge = playerBridge.flat();
    if (checkPlayerBridge.includes(' X ')) {
      return this.inputGameCommand(playerBridge);
    }
    return this.checkArrivalState(bridgeGame.bridgeLength, bridgeGame.step, playerBridge);
  }

  inputGameCommand(playerBridge) {
    InputView.readGameCommand('게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n', (answer) => {
      try {
        this.checkGameCommandValidation(answer);
        this.restartOrQuit(answer, playerBridge);
      } catch {
        OutputView.printError('[ERROR] 게임 재시작/종료 여부는 R(재시작)과 Q(종료) 중 하나의 문자여야 합니다.\n');
        this.inputGameCommand(playerBridge);
      }
    });
  }

  restartOrQuit(answer, playerBridge) {
    if (bridgeGame.retry(answer)) {
      return this.inputMoveBlock();
    }
    this.printFinalResult(playerBridge, '실패');
    return Console.close();
  }

  checkGameCommandValidation(answer) {
    if (!InputValidation.isRestartOrQuit(answer)) {
      throw Error('[ERROR] 게임 재시작/종료 여부는 R(재시작)과 Q(종료) 중 하나의 문자여야 합니다.');
    }
  }

  checkArrivalState(bridgeLength, step, playerBridge) {
    if (bridgeLength === step) {
      this.printFinalResult(playerBridge, '성공');
      return Console.close();
    }
    return this.inputMoveBlock(bridgeGame);
  }

  printBridgeMap(playerBridge) {
    OutputView.printMap(playerBridge);
  }

  printFinalResult(playerBridge, successStatus) {
    const totalAttempts = bridgeGame.count;
    OutputView.printResult(playerBridge, successStatus, totalAttempts);
  }
}

module.exports = App;
