const InputValidation = {
  isNumber(answer) {
    // 숫자가 아닌 문자일 경우 예외 처리 한다.
    if (isNaN(answer)) {
      return false;
    }
    return true;
  },

  isvalidrange(answer) {
    // 3 미만 20 초과의 숫자일 경우 예외 처리 한다.
    const bridgeLengthNumber = parseInt(answer);
    if (bridgeLengthNumber < 3 || 20 < bridgeLengthNumber) {
      return false;
    }
    return true;
  },

  isUpOrDown(answer) {
    // 플레이어가 이동할 칸이 U와 D가 아닐 경우 예외 처리 한다.
    if (answer === 'U' || answer === 'D') {
      return true;
    }
    return false;
  },

  isRestartOrQuit(answer) {
    // 게임 재시작/종료 여부 입력시, R과 Q가 아닐 경우 예외 처리 한다.
    if (answer === 'R' || answer === 'Q') {
      return true;
    }
    return false;
  },
};

module.exports = InputValidation;
