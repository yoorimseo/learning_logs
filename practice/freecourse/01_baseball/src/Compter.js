import MissionUtils from '@woowacourse/mission-utils';

export default class Computer {
  generateRandomNumber() {
    // 서로 다른 랜덤한 3개의 숫자 생성
    const computerNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    return computerNumbers;
  }

  calculateScore(computerNumbers, userNumbers) {
    let [strikes, balls] = [0, 0];

    userNumbers.forEach((num, index) => {
      if (num === computerNumbers[index]) {
        // 같은 수가 같은 자리에 있으면 스트라이크
        strikes++;
      } else if (computerNumbers.includes(num)) {
        // 같은 수가 다른 자리에 있으면 볼
        balls++;
      }
    });

    return [strikes, balls];
  }
}
