const ValidationCheck = require('../src/ValidationCheck');
const validationCheck = new ValidationCheck();

describe('사용자 입력값 테스트', () => {
  test('사용자 입력값이 1000원 단위가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkPrice('1111');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 숫자가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkPrice('qwer');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 띄어쓰기 없이 쉼표로 구분되어 있지 않으면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkWinningNumber('1, 2, 3, 4, 5, 6');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 1~45 범위가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkWinningNumber('1, 2, 3, 4, 5, 46');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 1개가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkBonusNumber('1, 2');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 1개가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkBonusNumber('1,2');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 1~45 범위가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkBonusNumber('46');
    }).toThrow('[ERROR]');
  });
  test('사용자 입력값이 1~45 범위가 아니면 예외가 발생한다.', () => {
    expect(() => {
      validationCheck.checkBonusNumber('-1');
    }).toThrow('[ERROR]');
  });
});
