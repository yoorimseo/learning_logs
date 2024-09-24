const { UP, DOWN, RESTART, QUIT } = require('../constants/consition');

const REQUEST_MESSAGE = Object.freeze({
  gameStart: '다리 건너기 게임을 시작합니다.',
  inputBridgeLength: '다리의 길이를 입력해주세요.\n',
  selectMovingBlock: `이동할 칸을 선택해주세요. (위: ${UP}, 아래: ${DOWN})\n`,
  inputRestartOrQuit: `게임을 다시 시도할지 여부를 입력해주세요. (재시도: ${RESTART}, 종료: ${QUIT})\n`,
  finalGameResult: '최종 게임 결과',
  gameSuccessState: '게임 성공 여부: ',
  totalAttempts: '총 시도한 횟수: ',
});

module.exports = REQUEST_MESSAGE;
