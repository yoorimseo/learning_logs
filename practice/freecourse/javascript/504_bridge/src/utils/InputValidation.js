const { BRIDGE_MIN_LENGTH, BRIDGE_MAX_LENGTH, UP, DOWN, RESTART, QUIT } = require('../constants/consition');

const InputValidation = {
  isNumber(answer) {
    if (isNaN(answer)) {
      return false;
    }
    return true;
  },

  isvalidrange(answer) {
    const bridgeLengthNumber = parseInt(answer);
    if (bridgeLengthNumber < BRIDGE_MIN_LENGTH || BRIDGE_MAX_LENGTH < bridgeLengthNumber) {
      return false;
    }
    return true;
  },

  isUpOrDown(answer) {
    return answer === UP || answer === DOWN;
  },

  isRestartOrQuit(answer) {
    return answer === RESTART || answer === QUIT;
  },

  isZeroOrOne(number) {
    return number === 0 || number === 1;
  },
};

module.exports = InputValidation;
