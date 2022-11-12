const Referee = require('../src/Domain/Referee');
const MissionUtils = require('@woowacourse/mission-utils');

const ANSWER = [1, 2, 3];

const setUp = () => {
  const referee = new Referee();
};

describe('숫자 야구 게임', () => {
  test('3스트라이크', () => {
    setUp();
    let result = referee.compare(ANSWER, [1, 2, 3]);
    const messages = ['0 볼 3 스트라이크'];

    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
  test('낫싱', () => {
    setUp();
    let result = referee.compare(ANSWER, [7, 8, 9]);
    const messages = ['낫싱'];

    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
  test('3볼', () => {
    setUp();
    let result = referee.compare(ANSWER, [2, 3, 1]);
    const messages = ['3 볼 0 스트라이크'];

    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
  test('2볼 1스트라이크', () => {
    setUp();
    let result = referee.compare(ANSWER, [1, 3, 2]);
    const messages = ['2 볼 1 스트라이크'];

    messages.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });
});
