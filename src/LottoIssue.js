const MissionUtils = require('@woowacourse/mission-utils');

const LotteryDraw = require('./LotteryDraw');
const lotteryDraw = new LotteryDraw();

const Lotto = require('./Lotto');

const ValidationCheck = require('./ValidationCheck');
const validationCheck = new ValidationCheck();

class LottoIssue {
  constructor() {
    this.price = 0;
    this.lottoQuantity = 0;
    this.lotto = [];
  }

  lottoPurchase() {
    MissionUtils.Console.readLine('구입금액을 입력해 주세요.\n', (answer) => {
      this.price = Number(answer);
      validationCheck.checkPrice(this.price);
      this.lottoQuantity = this.price / 1000;

      this.printLottoQuantity();
      this.createLottoNumbers();
      lotteryDraw.userInput(this.lotto, this.price);
    });
  }

  printLottoQuantity() {
    MissionUtils.Console.print(`${this.lottoQuantity}개를 구매했습니다.`);
  }

  createLottoNumbers() {
    for (let i = 0; i < this.lottoQuantity; i++) {
      let lottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      new Lotto(lottoNumber);
      lottoNumber.sort((a, b) => a - b);
      MissionUtils.Console.print(`[${lottoNumber.join(', ')}]`);
      this.lotto.push(lottoNumber);
    }
  }
}

module.exports = LottoIssue;

// const app = new LottoIssue();
// app.lottoPurchase();
