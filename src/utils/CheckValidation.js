const InputValidation = require('./InputValidation');
const ERROR_MESSAGE = require('../constants/error');

const CheckValidation = {
  checkBridgeLengthValidation(answer) {
    if (!InputValidation.isNumber(answer)) {
      throw Error(ERROR_MESSAGE.invalidBridgeLengthRange);
    } else if (!InputValidation.isvalidrange(answer)) {
      throw Error(ERROR_MESSAGE.invalidBridgeLengthRange);
    }
  },

  checkMoveBlockValidation(answer) {
    if (!InputValidation.isUpOrDown(answer)) {
      throw Error(ERROR_MESSAGE.invalidMovingBlock);
    }
  },

  checkGameCommandValidation(answer) {
    if (!InputValidation.isRestartOrQuit(answer)) {
      throw Error(ERROR_MESSAGE.invalidGameRestartState);
    }
  },
};

module.exports = CheckValidation;
