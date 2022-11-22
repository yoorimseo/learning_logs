const { Console } = require('@woowacourse/mission-utils');
const InputView = require('../view/InputView');
const BridgeGame = require('../model/BridgeGame');
const OutputView = require('../view/OutputView');
const CheckValidation = require('../utils/CheckValidation');
const { UNABLE_TO_MOVE, SUCCESS, FAIL } = require('../constants/consition');
const REQUEST_MESSAGE = require('../constants/massage');
const ERROR_MESSAGE = require('../constants/error');

const bridgeGame = new BridgeGame();

// 사용자의 입력을 받고 처리하는 부분
const BridgeGameController = {
  inputBridgeLength() {
    InputView.readBridgeSize(REQUEST_MESSAGE.inputBridgeLength, (answer) => {
      this.checkValidationBridgeLength(answer);
    });
  },

  checkValidationBridgeLength(answer) {
    try {
      CheckValidation.checkBridgeLengthValidation(answer);
      this.makeBridgeAndContinue(answer);
    } catch {
      OutputView.printError(ERROR_MESSAGE.invalidBridgeLengthRange);
      this.inputBridgeLength();
    }
  },

  makeBridgeAndContinue(answer) {
    bridgeGame.makeBridge(answer);
    this.inputMoveBlock();
  },

  inputMoveBlock() {
    InputView.readMoving(REQUEST_MESSAGE.selectMovingBlock, (answer) => {
      this.checkValidationMoveBlock(answer);
    });
  },

  checkValidationMoveBlock(answer) {
    try {
      CheckValidation.checkMoveBlockValidation(answer);
      this.moveBlockAndContinue(answer);
    } catch {
      OutputView.printError(ERROR_MESSAGE.invalidMovingBlock);
      this.inputMoveBlock();
    }
  },

  moveBlockAndContinue(answer) {
    bridgeGame.move(answer);
    const playerBridge = bridgeGame.makeBridgeMap();
    OutputView.printMap(playerBridge);
    bridgeGame.step++;
    this.checkMoveState(playerBridge);
  },

  checkMoveState(playerBridge) {
    const checkPlayerBridge = playerBridge.flat();
    if (checkPlayerBridge.includes(UNABLE_TO_MOVE)) {
      return this.inputGameCommand(playerBridge);
    }
    return this.checkArrivalState(bridgeGame.bridgeLength, bridgeGame.step, playerBridge);
  },

  inputGameCommand(playerBridge) {
    InputView.readGameCommand(REQUEST_MESSAGE.inputRestartOrQuit, (answer) => {
      this.checkValidationGameCommand(answer, playerBridge);
    });
  },

  checkValidationGameCommand(answer, playerBridge) {
    try {
      CheckValidation.checkGameCommandValidation(answer);
      this.restartOrQuit(answer, playerBridge);
    } catch {
      OutputView.printError(ERROR_MESSAGE.invalidGameRestartState);
      this.inputGameCommand(playerBridge);
    }
  },

  restartOrQuit(answer, playerBridge) {
    if (bridgeGame.retry(answer)) {
      return this.inputMoveBlock();
    }
    OutputView.printResult(playerBridge, FAIL, bridgeGame.count);
    return Console.close();
  },

  checkArrivalState(bridgeLength, step, playerBridge) {
    if (bridgeLength === step) {
      OutputView.printResult(playerBridge, SUCCESS, bridgeGame.count);
      return Console.close();
    }
    return this.inputMoveBlock(bridgeGame);
  },
};

module.exports = BridgeGameController;
