const MissionUtils = require('@woowacourse/mission-utils');

const LotteryDraw = require('./LotteryDraw');
const lottoDraw = new LotteryDraw();

let price = 0;

let lotto = [];

class LottoIssue {
  lottoPurchase() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.\n', (answer) => {
      price = parseInt(answer);
      let lottoQuantity = this.calcLottoQuantity(price);
      this.printLottoQuantity(lottoQuantity);

      lotto = this.createUserNumbers(lottoQuantity);
      this.printLottoNumber(lotto);

      lottoDraw.userInput(lotto, price);
    });
  }

  calcLottoQuantity(price) {
    let lottoQuantity = price / 1000;
    return lottoQuantity;
  }

  printLottoQuantity(lottoQuantity) {
    MissionUtils.Console.print(`\n${lottoQuantity}개를 구매했습니다.`);
  }

  createRandomNumbers() {
    const LOTTO_NUMBER = [];
    while (LOTTO_NUMBER.length < 6) {
      const NUMBER = MissionUtils.Random.pickNumberInRange(1, 45);
      if (!LOTTO_NUMBER.includes(NUMBER)) {
        LOTTO_NUMBER.push(NUMBER);
      }
    }
    return LOTTO_NUMBER;
  }

  createUserNumbers(lottoQuantity) {
    let userNumbers = [];
    for (let i = 0; i < lottoQuantity; i++) {
      userNumbers.push(this.createRandomNumbers());
    }
    return userNumbers;
  }

  printLottoNumber(lotto) {
    lotto.forEach((item) => {
      MissionUtils.Console.print(item);
    });
  }
}

module.exports = LottoIssue;
