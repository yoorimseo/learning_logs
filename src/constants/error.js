const INVALID_BRIDGE_LENGTH_RANGE = '[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.';
const INVALID_MOVING_BLOCK = '[ERROR] 이동할 칸은 U(위 칸)와 D(아래 칸) 중 하나의 문자여야 합니다.';
const INVALID_GAME_RESTART_STATUS = '[ERROR] 게임 재시작/종료 여부는 R(재시작)과 Q(종료) 중 하나의 문자여야 합니다.';

const ERROR_MESSAGE = Object.fromEntries({
  INVALID_BRIDGE_LENGTH_RANGE,
  INVALID_MOVING_BLOCK,
  INVALID_GAME_RESTART_STATUS,
});

module.exports = { ERROR_MESSAGE };
