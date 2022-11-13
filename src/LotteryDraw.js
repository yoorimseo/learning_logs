const MissionUtils = require('@woowacourse/mission-utils');

class LotteryDraw {
  userInput() {
    let winningNumbers = {
      winningNumber: [],
      bonusNumer: 0,
    };
    MissionUtils.Console.readLine('\n당첨 번호를 입력해 주세요.\n', (answer) => {
      winningNumbers['winningNumber'] = answer.split(',').map((str) => parseInt(str));
      MissionUtils.Console.readLine('\n보너스 번호를 입력해 주세요.\n', (answer) => {
        winningNumbers['bonusNumer'] = parseInt(answer);
        MissionUtils.Console.close();
      });
    });
    return winningNumbers;
  }
}

module.exports = LotteryDraw;
