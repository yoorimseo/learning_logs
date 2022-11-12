const { Judgement } = require('./Judgement');
const judgement = new Judgement();

class Referee {
  compare(computer, player) {
    // 몇 개의 숫자가 같은지 알아낸 뒤
    // 스트라이크이 갯수를 구해 뺀다.
    // 남은 수는 볼의 갯수이다.
    let correctCount = judgement.correctCount(computer, player);
    let strike = 0;

    for (let placeIndex = 0; placeIndex < player.length; placeIndex++) {
      if (judgement.hasPlace(computer, placeIndex, player[placeIndex])) {
        strike++;
      }
    }

    let ball = correctCount - strike;

    return ball + '볼' + strike + '스트라이크';
  }
}

module.exports = { Referee };
