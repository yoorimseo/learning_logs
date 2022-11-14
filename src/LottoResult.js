const MissionUtils = require('@woowacourse/mission-utils');

const RANK = {
  RANK_5: '5000',
  RANK_4: '50,000',
  RANK_3: '1,500,000',
  RANK_2: '30,000,000',
  RANK_1: '2,000,000,000',
};

class LottoResult {
  compare(lotto, winningNumbers, winningHistory) {
    let correctNumbers = [];
    for (let i = 0; i < lotto.length; i++) {
      correctNumbers = lotto[i].filter((number) => {
        return winningNumbers['winningNumber'].includes(number);
      });
      if (correctNumbers.length === 3) winningHistory['3개 일치']++;
      else if (correctNumbers.length === 4) winningHistory['4개 일치']++;
      else if (correctNumbers.length === 5) winningHistory['5개 일치']++;
      else if (correctNumbers.length === 5 && lotto.includes(winningNumbers['bonusNumer'])) {
        winningHistory['5개 일치, 보너스 볼 일치']++;
      } else if (correctNumbers.length === 6) winningHistory['6개 일치']++;
    }
    return winningHistory;
  }

  printCompareResult(winningHistory) {
    MissionUtils.Console.print('\n당첨 통계\n---');
    for (let i = 0; i < Object.keys(winningHistory).length; i++) {
      MissionUtils.Console.print(`${Object.keys(winningHistory)[i]} (${Object.values(RANK)[i]}원) - ${Object.values(winningHistory)[i]}개`);
    }
    MissionUtils.Console.close();
  }

  calcLottoReturn(winningHistory, price) {
    let profit = 0;
    for (let i = 0; i < 5; i++) {
      profit += Object.values(winningHistory)[i] * parseInt(Object.values(RANK)[i]);
    }

    profit = (profit / price) * 100;

    return Math.round(profit * 100) / 100;
  }

  printCalcResult(profit) {
    MissionUtils.Console.print(`총 수익률은 ${profit}%입니다.`);
  }
}

module.exports = LottoResult;
