import MissionUtils from '@woowacourse/mission-utils';

export default class User {
  getUserNumber() {
    // 사용자 입력 받기
    return new Promise((resolve) => {
      MissionUtils.Console.readLine('숫자를 입력해주세요 : ', (answer) => {
        if (this.checkUserNumbers(answer)) {
          const userNumbers = answer.split('').map(Number);
          resolve(userNumbers);
        }
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

  checkUserNumbers(answer) {
    try {
      // 입력된 문자열이 3자리인지 확인
      if (answer.length !== 3) {
        throw new Error('입력된 문자열의 길이가 3이 아닙니다.');
      }

      // 문자열이 숫자로만 구성되어 있는지 확인
      const userNumbers = answer.split('').map((char) => {
        if (isNaN(char)) {
          throw new Error('입력된 문자열이 숫자가 아닙니다.');
        }
      });

      // 각 숫자가 서로 다른지 확인
      const uniqueNumbers = new Set(answer);
      if (uniqueNumbers.size !== answer.length) {
        throw new Error('입력된 문자열에 중복된 숫자가 있습니다.');
      }

      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}
