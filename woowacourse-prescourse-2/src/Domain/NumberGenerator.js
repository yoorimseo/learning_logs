const MissionUtils = require('@woowacourse/mission-utils');

class NumberGenerator {
  createRandomNumbers() {
    const COMPUTER = [];
    // 3개의 숫자가 담길 때까지
    // 만약 이미 존재하는 숫자라면 담지 않는다.
    // 만약 존재하지 않는 숫자라면 담는다.
    while (COMPUTER.length < 3) {
      const NUMBER = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!COMPUTER.includes(NUMBER)) {
        COMPUTER.push(NUMBER);
      }
    }
    return COMPUTER;
  }
}

module.exports = { NumberGenerator };
