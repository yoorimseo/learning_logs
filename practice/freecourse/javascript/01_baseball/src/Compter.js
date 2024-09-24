import { Console, Random } from '@woowacourse/mission-utils';

export default class Computer {
  generateRandomNumber() {
    // 서로 다른 랜덤한 3개의 숫자 생성
    const computerNumbers = [];
    while (computerNumbers.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computerNumbers.includes(number)) {
        computerNumbers.push(number);
      }
    }
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

  printScore(strikes, balls) {
    if (strikes === 0 && balls === 0) {
      Console.print('낫싱');
    } else if (strikes === 0) {
      Console.print(`${balls}볼`);
    } else if (balls === 0) {
      Console.print(`${strikes}스트라이크`);
    } else {
      Console.print(`${balls}볼 ${strikes}스트라이크`);
    }
  }
}
