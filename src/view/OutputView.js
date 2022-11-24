const OutputView = {
  printMenu() {
    console.log('[ 메뉴 : 아메리카노, 카페라떼, 에이드, 스무디 ]');
  },

  printMakingBevarage(bevarage, time) {
    console.log(`${bevarage} 제조중...(${time})`);
  },

  printPickUp() {
    console.log('주문하신 음료가 나왔습니다.');
  },

  printOrderHistory(bevarage, cup) {
    console.log(`주문 내역 : ${bevarage} ${cup}잔`);
  },
};

module.exports = OutputView;
