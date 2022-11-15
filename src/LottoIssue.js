const MissionUtils = require('@woowacourse/mission-utils');

const LotteryDraw = require('./LotteryDraw');
const lotteryDraw = new LotteryDraw();

const ValidationCheck = require('./ValidationCheck');
const validationCheck = new ValidationCheck();

let price = 0;

let lotto = [];

class LottoIssue {
  lottoPurchase() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.\n', (answer) => {
      price = Number(answer);
      validationCheck.checkPrice(price);

      let lottoQuantity = this.calcLottoQuantity(price);
      this.printLottoQuantity(lottoQuantity);

      this.createUserNumbers(lottoQuantity, lotto);
      this.printLottoNumber(lotto);

      lotteryDraw.userInput(lotto, price);
    });
  }

  calcLottoQuantity(price) {
    let lottoQuantity = price / 1000;
    return lottoQuantity;
  }

  printLottoQuantity(lottoQuantity) {
    MissionUtils.Console.print(`${lottoQuantity}개를 구매했습니다.`);
  }

  createRandomNumbers() {
    const LOTTO_NUMBER = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    return LOTTO_NUMBER.sort((a, b) => a - b);
  }

  createUserNumbers(lottoQuantity, lotto) {
    for (let i = 0; i < lottoQuantity; i++) {
      lotto.push(this.createRandomNumbers());
    }
    return lotto;
  }

  printLottoNumber(lotto) {
    lotto.forEach((item) => {
      MissionUtils.Console.print(item);
    });
  }
}

module.exports = LottoIssue;
