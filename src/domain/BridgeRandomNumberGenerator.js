// Random 값 추출은 제공된 BridgeRandomNumberGenerator의 generate()를 활용한다.
// BridgeRandomNumberGenerator의 코드는 변경할 수 없다.
// 다리 칸을 생성하기 위한 Random 값은 아래와 같이 추출한다.
// const number = generateRandomNumber();

const MissionUtils = require('@woowacourse/mission-utils');

const BridgeRandomNumberGenerator = {
  RANDOM_LOWER_INCLUSIVE: 0,
  RANDOM_UPPER_INCLUSIVE: 1,
  generate() {
    return MissionUtils.Random.pickNumberInRange(
      BridgeRandomNumberGenerator.RANDOM_LOWER_INCLUSIVE,
      BridgeRandomNumberGenerator.RANDOM_UPPER_INCLUSIVE
    );
  },
};

module.exports = BridgeRandomNumberGenerator;
