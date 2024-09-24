const BLANK_PATTERN = /[\s]/g;

class ValidationCheck {
  checkPrice(price) {
    if (isNaN(price)) {
      throw Error('[ERROR] 구입금액은 숫자여야 합니다.');
    }
    if (price % 1000 !== 0) {
      throw Error('[ERROR] 구입금액은 1000원 단위여야 합니다.');
    }
  }

  checkWinningNumber(winningNumber) {
    let testNumber = winningNumber.split(',');
    let duplicationCheck = new Set(testNumber);
    if (BLANK_PATTERN.test(winningNumber)) {
      throw Error('[ERROR] 당첨 번호는 띄어쓰기 없이 쉼표(,)로 구분하여 입력해야 합니다.');
    }
    if (duplicationCheck.size < 6) {
      throw Error('[ERROR] 당첨 번호는 중복되지 않는 6개의 숫자여야 합니다.');
    }
    testNumber.forEach((number) => {
      if (1 > number || number > 45) {
        throw Error('[ERROR] 당첨 번호는 1부터 45 사이의 숫자여야 합니다.');
      }
    });
  }

  checkBonusNumber(bonusNumer) {
    let testNumber = bonusNumer.split(',').length;
    if (testNumber !== 1) {
      throw Error('[ERROR] 보너스 번호는 1개의 숫자여야 합니다.');
    }
    if (1 > bonusNumer || bonusNumer > 45) {
      throw Error('[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.');
    }
  }
}

module.exports = ValidationCheck;
