function problem5(money) {
  var answer = [];

  if (money >= 50000) {
    answer[0] = Math.floor(money / 50000);
    money -= 50000 * answer[0];
  } else {
    answer[0] = 0;
  }

  if (10000 <= money < 50000) {
    answer[1] = Math.floor(money / 10000);
    money -= 10000 * answer[1];
  } else {
    answer[1] = 0;
  }

  if (5000 <= money < 10000) {
    answer[2] = Math.floor(money / 5000);
    money -= 5000 * answer[2];
  } else {
    answer[2] = 0;
  }

  if (1000 <= money < 5000) {
    answer[3] = Math.floor(money / 1000);
    money -= 1000 * answer[3];
  } else {
    answer[3] = 0;
  }

  if (500 <= money < 1000) {
    answer[4] = Math.floor(money / 500);
    money -= 500 * answer[4];
  } else {
    answer[4] = 0;
  }

  if (100 <= money < 500) {
    answer[5] = Math.floor(money / 100);
    money -= 100 * answer[5];
  } else {
    answer[5] = 0;
  }

  if (50 <= money < 100) {
    answer[6] = Math.floor(money / 50);
    money -= 50 * answer[6];
  } else {
    answer[6] = 0;
  }

  if (10 <= money < 50) {
    answer[7] = Math.floor(money / 10);
    money -= 10 * answer[7];
  } else {
    answer[7] = 0;
  }

  answer[8] = money;
  return answer;
}

module.exports = problem5;
