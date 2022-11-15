const MissionUtils = require('@woowacourse/mission-utils');

const LottoResult = require('./LottoResult');
const lottoResult = new LottoResult();

const ValidationCheck = require('./ValidationCheck');
const validationCheck = new ValidationCheck();

const WINNING_NUMBERS = {
  winningNumber: [],
  bonusNumer: 0,
};

const WINNING_HISTORY = {
  '3개 일치': 0,
  '4개 일치': 0,
  '5개 일치': 0,
  '5개 일치, 보너스 볼 일치': 0,
  '6개 일치': 0,
};

class LotteryDraw {
  userInput(lotto, price) {
    MissionUtils.Console.readLine('\n당첨 번호를 입력해 주세요.\n', (answer) => {
      validationCheck.checkWinningNumber(answer);
      WINNING_NUMBERS['winningNumber'] = answer.split(',').map((str) => parseInt(str));
      MissionUtils.Console.readLine('\n보너스 번호를 입력해 주세요.\n', (answer) => {
        validationCheck.checkBonusNumber(answer);
        WINNING_NUMBERS['bonusNumer'] = parseInt(answer);
        this.showResult(WINNING_NUMBERS, lotto, price);
      });
    });
  }

  showResult(winningNumbers, lotto, price) {
    lottoResult.compare(lotto, winningNumbers, WINNING_HISTORY);
    lottoResult.printCompareResult(WINNING_HISTORY);
    let profit = lottoResult.calcLottoReturn(WINNING_HISTORY, price);
    lottoResult.printCalcResult(profit);
  }
}

module.exports = LotteryDraw;
