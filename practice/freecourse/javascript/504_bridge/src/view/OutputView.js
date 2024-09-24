const { Console } = require('@woowacourse/mission-utils');
const REQUEST_MESSAGE = require('../constants/massage');
const { BRIDGE_DIVIDING_LINE } = require('../constants/consition');

/**
 * 사용자에게 게임 진행 상황과 결과를 출력하는 역할을 한다.
 */
const OutputView = {
  printGameStart() {
    Console.print(REQUEST_MESSAGE.gameStart);
  },

  printError(errorMessage) {
    Console.print(errorMessage);
  },

  /**
   * 현재까지 이동한 다리의 상태를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printMap(playerBridge) {
    playerBridge.forEach((map) => Console.print(`[${map.join(BRIDGE_DIVIDING_LINE)}]`));
  },

  /**
   * 게임의 최종 결과를 정해진 형식에 맞춰 출력한다.
   * <p>
   * 출력을 위해 필요한 메서드의 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  printResult(finalBridge, successStatus, totalAttempts) {
    Console.print(REQUEST_MESSAGE.finalGameResult);
    finalBridge.forEach((map) => Console.print(`[${map.join(BRIDGE_DIVIDING_LINE)}]`));
    Console.print(`${REQUEST_MESSAGE.gameSuccessState}${successStatus}`);
    Console.print(`${REQUEST_MESSAGE.totalAttempts}${totalAttempts}`);
  },
};

module.exports = OutputView;
