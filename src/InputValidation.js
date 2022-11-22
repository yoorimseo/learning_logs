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
};

module.exports = InputValidation;
