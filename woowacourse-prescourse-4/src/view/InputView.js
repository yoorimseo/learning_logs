const { Console } = require('@woowacourse/mission-utils');

/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(question, callback) {
    Console.readLine(question, callback);
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(question, callback) {
    Console.readLine(question, callback);
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(question, callback) {
    Console.readLine(question, callback);
  },
};

module.exports = InputView;
