const InputValidation = {
  isNumber(answer) {
    if (isNaN(answer)) {
      return false;
    }
    return true;
  },

  isvalidrange(answer) {
    const bridgeLengthNumber = parseInt(answer);
    if (bridgeLengthNumber < 3 || 20 < bridgeLengthNumber) {
      return false;
    }
    return true;
  },

  isUpOrDown(answer) {
    if (answer === 'U' || answer === 'D') {
      return true;
    }
    return false;
  },

  isRestartOrQuit(answer) {
    if (answer === 'R' || answer === 'Q') {
      return true;
    }
    return false;
  },
};

module.exports = InputValidation;
