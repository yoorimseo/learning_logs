const MissionUtils = require('@woowacourse/mission-utils');

const LotteryDraw = require('./LotteryDraw');
const lotteryDraw = new LotteryDraw();

const ValidationCheck = require('./ValidationCheck');
const validationCheck = new ValidationCheck();

class LottoIssue {
  constructor() {
    this.price = 0;
    this.lotto = [];
  }

  lottoPurchase() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.\n', (answer) => {
      this.price = Number(answer);
      validationCheck.checkPrice(this.price);

      let lottoQuantity = this.calcLottoQuantity(this.price);
      this.printLottoQuantity(lottoQuantity);

      this.createUserNumbers(lottoQuantity, this.lotto);
      this.printLottoNumber(this.lotto);

      lotteryDraw.userInput(this.lotto, this.price);
    });
  }

  calcLottoQuantity() {
    let lottoQuantity = this.price / 1000;
    return lottoQuantity;
  }

  printLottoQuantity(lottoQuantity) {
    MissionUtils.Console.print(`${lottoQuantity}개를 구매했습니다.`);
  }

  createRandomNumbers() {
    const LOTTO_NUMBER = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
    return LOTTO_NUMBER.sort((a, b) => a - b);
  }

  createUserNumbers(lottoQuantity) {
    for (let i = 0; i < lottoQuantity; i++) {
      this.lotto.push(this.createRandomNumbers());
    }
    return this.lotto;
  }

  printLottoNumber() {
    this.lotto.forEach((item) => {
      MissionUtils.Console.print(item);
    });
  }
}

module.exports = LottoIssue;
