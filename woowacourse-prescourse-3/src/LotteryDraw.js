const MissionUtils = require('@woowacourse/mission-utils');

const LottoResult = require('./LottoResult');
const lottoResult = new LottoResult();

const ValidationCheck = require('./ValidationCheck');
const validationCheck = new ValidationCheck();

class LotteryDraw {
  constructor() {
    this.winningNumbers = {
      winningNumber: [],
      bonusNumer: 0,
    };
    this.winningHistory = {
      '3개 일치': 0,
      '4개 일치': 0,
      '5개 일치': 0,
      '5개 일치, 보너스 볼 일치': 0,
      '6개 일치': 0,
    };
  }

  userInput(lotto, price) {
    MissionUtils.Console.readLine('당첨 번호를 입력해 주세요.\n', (answer) => {
      validationCheck.checkWinningNumber(answer);
      this.winningNumbers['winningNumber'] = answer.split(',').map((str) => parseInt(str));
      MissionUtils.Console.readLine('보너스 번호를 입력해 주세요.\n', (answer) => {
        validationCheck.checkBonusNumber(answer);
        this.winningNumbers['bonusNumer'] = parseInt(answer);
        this.showResult(this.winningNumbers, this.winningHistory, lotto, price);
      });
    });
  }

  showResult(winningNumbers, winningHistory, lotto, price) {
    lottoResult.compare(lotto, winningNumbers, winningHistory);
    lottoResult.printCompareResult(winningHistory);
    let profit = lottoResult.calcLottoReturn(winningHistory, price);
    lottoResult.printCalcResult(profit);
  }
}

module.exports = LotteryDraw;
