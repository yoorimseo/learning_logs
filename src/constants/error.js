const { BRIDGE_MIN_LENGTH, BRIDGE_MAX_LENGTH, UP, DOWN, RESTART, QUIT } = require('../constants/consition');

const ERROR_MESSAGE = Object.freeze({
  invalidBridgeLengthRange: `[ERROR] 다리 길이는 ${BRIDGE_MIN_LENGTH}부터 ${BRIDGE_MAX_LENGTH} 사이의 숫자여야 합니다.\n`,
  invalidMovingBlock: `[ERROR] 이동할 칸은 ${UP}(위 칸)와 ${DOWN}(아래 칸) 중 하나의 문자여야 합니다.\n`,
  invalidGameRestartState: `[ERROR] 게임 재시작/종료 여부는 ${RESTART}(재시작)과 ${QUIT}(종료) 중 하나의 문자여야 합니다.\n`,
});

module.exports = ERROR_MESSAGE;
