class ValidationCheck {
  checkPrice(price) {
    if (isNaN(price)) {
      throw Error('[ERROR] 구입금액은 숫자여야 합니다.');
    }
    if (price % 1000 !== 0) {
      throw Error('[ERROR] 구입금액은 1000원 단위여야 합니다.');
    }
  }
}

module.exports = ValidationCheck;
