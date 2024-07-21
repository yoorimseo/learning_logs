import { Console } from '@woowacourse/mission-utils';

export default class User {
  async getUserNumber() {
    try {
      // 사용자 입력을 비동기적으로 받기
      const answer = await Console.readLineAsync('숫자를 입력해주세요 : ');

      // 입력된 숫자가 유효한지 확인
      if (this.checkUserNumbers(answer)) {
        // 문자열을 숫자 배열로 변환
        const userNumbers = answer.split('').map(Number);
        return userNumbers;
      } else {
        // 유효하지 않은 입력 처리 (예: 다시 입력 받기)
        throw new Error('[ERROR]');
      }
    } catch (error) {
      throw error;
    }
  }

  async askForRestart() {
    try {
      const answer = await Console.readLineAsync('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n');

      if (parseInt(answer) === 1) {
        return true;
      } else if (parseInt(answer) === 2) {
        return false;
      } else {
        throw new Error('[ERROR]');
      }
    } catch (error) {
      throw error;
    }
  }

  checkUserNumbers(answer) {
    try {
      // 입력된 문자열이 3자리인지 확인
      if (answer.length !== 3) {
        throw new Error('[ERROR]');
      }

      // 문자열이 숫자로만 구성되어 있는지 확인
      const userNumbers = answer.split('').map((char) => {
        if (isNaN(char)) {
          throw new Error('[ERROR]');
        }
      });

      // 각 숫자가 서로 다른지 확인
      const uniqueNumbers = new Set(answer);
      if (uniqueNumbers.size !== answer.length) {
        throw new Error('[ERROR]');
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
