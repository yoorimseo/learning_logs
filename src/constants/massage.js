const GAME_START = '다리 건너기 게임을 시작합니다.';
const INPUT_BRIDGE_LENGTH = '다리의 길이를 입력해주세요.\n';
const SELECT_MOVING_BLOCK = '이동할 칸을 선택해주세요. (위: U, 아래: D)\n';
const INPUT_GAME_RESTART_STATUS = '게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n';
const FINAL_GAME_RESULT = '최종 게임 결과';
const GAME_SUCCESS__STATUS = '게임 성공 여부: ';
const TOTAL_ATTEMPTS = '총 시도한 횟수: ';

const REQUEST_MESSAGE = Object.freeze({
  GAME_START,
  INPUT_BRIDGE_LENGTH,
  SELECT_MOVING_BLOCK,
  INPUT_GAME_RESTART_STATUS,
  FINAL_GAME_RESULT,
  GAME_SUCCESS__STATUS,
  TOTAL_ATTEMPTS,
});

module.exports = { REQUEST_MESSAGE };
