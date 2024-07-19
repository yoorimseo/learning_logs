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

  askForRestart() {
    return new Promise((resolve) => {
      MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n', (answer) => {
        if (parseInt(answer) === 1) {
          resolve(true);
        } else if (parseInt(answer) === 2) {
          resolve(false);
        }
      });
    });
  }
}
