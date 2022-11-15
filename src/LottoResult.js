const MissionUtils = require('@woowacourse/mission-utils');

class LottoResult {
  constructor() {
    this.rank = {
      rank_5: '5,000',
      rank_4: '50,000',
      rank_3: '1,500,000',
      rank_2: '30,000,000',
      rank_1: '2,000,000,000',
    };
  }

  compare(lotto, winningNumbers, winningHistory) {
    let correctNumbers = [];
    for (let i = 0; i < lotto.length; i++) {
      correctNumbers = lotto[i].filter((number) => {
        return winningNumbers['winningNumber'].includes(number);
      });
      if (correctNumbers.length === 6) winningHistory['6개 일치']++;
      else if (correctNumbers.length === 5) {
        if (lotto.includes(winningNumbers['bonusNumer'])) {
          winningHistory['5개 일치, 보너스 볼 일치']++;
        }
        winningHistory['5개 일치']++;
      } else if (correctNumbers.length === 4) winningHistory['4개 일치']++;
      else if (correctNumbers.length === 3) winningHistory['3개 일치']++;
    }
    return winningHistory;
  }

  printCompareResult(winningHistory) {
    MissionUtils.Console.print('당첨 통계\n---');
    for (let i = 0; i < Object.keys(winningHistory).length; i++) {
      MissionUtils.Console.print(`${Object.keys(winningHistory)[i]} (${Object.values(this.rank)[i]}원) - ${Object.values(winningHistory)[i]}개`);
    }
    MissionUtils.Console.close();
  }

  calcLottoReturn(winningHistory, price) {
    let profit = 0;
    for (let i = 0; i < 5; i++) {
      let money = Object.values(this.rank)[i].split(',').join('');
      profit += Object.values(winningHistory)[i] * parseInt(money);
    }

    profit = (profit / price) * 100;

    if (profit % 10 === 0) {
      return profit;
    }

    return profit.toFixed(1);
  }

  printCalcResult(profit) {
    MissionUtils.Console.print(`총 수익률은 ${profit}%입니다.`);
  }
}

module.exports = LottoResult;
