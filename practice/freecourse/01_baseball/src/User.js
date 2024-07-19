import MissionUtils from '@woowacourse/mission-utils';

export default class User {
  getUserNumber() {
    // 사용자 입력 받기
    return new Promise((resolve) => {
      MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {
        const userNumbers = answer.split('').map(Number);
        resolve(userNumbers);
      });
    });
  }
}
