class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    this.duplication(numbers);
  }

  // TODO: 추가 기능 구현
  duplication(numbers) {
    let duplicationCheck = new Set(numbers);
    if (duplicationCheck.size !== 6) {
      throw Error('[ERROR] 로또 번호는 중복되지 않아야 합니다.');
    }
  }
}

module.exports = Lotto;
