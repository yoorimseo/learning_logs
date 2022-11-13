const LottoIssue = require('./LottoIssue');
const lottoIssue = new LottoIssue();

class App {
  play() {
    lottoIssue.lottoPurchase();
  }
}

module.exports = App;

const app = new App();
app.play();
