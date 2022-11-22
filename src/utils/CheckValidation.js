const InputValidation = require('./InputValidation');

const CheckValidation = {
  checkBridgeLengthValidation(answer) {
    if (!InputValidation.isNumber(answer)) {
      throw Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    } else if (!InputValidation.isvalidrange(answer)) {
      throw Error('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
    }
  },

  checkMoveBlockValidation(answer) {
    if (!InputValidation.isUpOrDown(answer)) {
      throw Error('[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.');
    }
  },

  checkGameCommandValidation(answer) {
    if (!InputValidation.isRestartOrQuit(answer)) {
      throw Error('[ERROR] 게임 재시작/종료 여부는 R(재시작)과 Q(종료) 중 하나의 문자여야 합니다.');
    }
  },
};

module.exports = CheckValidation;
