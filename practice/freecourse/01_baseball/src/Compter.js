import MissionUtils from '@woowacourse/mission-utils';

export default class Computer {
  generateRandomNumber() {
    // 서로 다른 랜덤한 3개의 숫자 생성
    const computerNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    return computerNumbers;
  }
}
