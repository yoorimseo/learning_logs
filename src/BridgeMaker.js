const CheckValidation = require('./utils/CheckValidation');
const { ZERO, ONE, UP, DOWN } = require('./constants/consition');

/**
 * 다리의 길이를 입력 받아서 다리를 생성해주는 역할을 한다.
 */
const BridgeMaker = {
  /**
   * @param {number} size 다리의 길이
   * @param {function(): number} generateRandomNumber 무작위 값을 생성해주는 함수
   * @return {string[]} 입력받은 길이에 해당하는 다리 모양. 위 칸이면 U, 아래 칸이면 D로 표현해야 한다.
   */

  makeBridge(size, generateRandomNumber) {
    let bridgeShape = [];
    for (let index = 0; index < size; index++) {
      const BRIDGE_BLOCK = generateRandomNumber();
      CheckValidation.checkRandomNumber(BRIDGE_BLOCK);
      if (BRIDGE_BLOCK === ONE) bridgeShape[index] = UP;
      else if (BRIDGE_BLOCK === ZERO) bridgeShape[index] = DOWN;
    }
    return bridgeShape;

    // 1. 객체와 map 함수를 이용하여 한 줄로 만드는 방법
    // return Array.from({length: size}).map(() => generateRandomNumber() ? 'D' : 'U');

    // 2. 조건문을 switch 문으로 사용하는 방법
    /*
      let bridgeShape = [];

      for (let index = 0; index < size; index++) {
        const bridgeBlock = generateRandomNumber();

        switch (bridgeBlock) {
          case 0: bridgeShape[index] = 'D'; break;
          case 1: bridgeShape[index] = 'U'; break;
        }
      }
      return bridgeShape;
    */
  },
};

module.exports = BridgeMaker;
