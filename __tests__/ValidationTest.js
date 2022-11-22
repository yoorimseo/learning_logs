const BridgeGameController = require('../src/controller/BridgeGameController');

describe('사용자 입력 테스트', () => {
  test.each([['abc'], ['~!@'], ['가나다']])('숫자가 아닌 경우에 대한 예외 처리', () => {
    expect((input) => {
      BridgeGameController.checkBridgeLengthValidation(input);
    }).toThrow('[ERROR]');
  });
  test.each([['0'], ['21']])('3 미만 20 초과의 숫자일 경우에 대한 예외 처리', () => {
    expect((input) => {
      BridgeGameController.checkBridgeLengthValidation(input);
    }).toThrow('[ERROR]');
  });
  test.each([['0'], ['A'], ['a'], ['!'], ['ㅁ']])('U와 D / R과 Q가 아닐 경우에 대한 예외 처리', () => {
    expect((input) => {
      BridgeGameController.checkMoveBlockValidation(input);
      BridgeGameController.checkGameCommandValidation(input);
    }).toThrow('[ERROR]');
  });
});
