const UP = 'U';
const DOWN = 'D';
const BRIDGE_DIVIDING_LINE = ' | ';
const MOVEABLE = 'O';
const UNABLE_TO_MOVE = 'X';
const BLANK = ' ';
const RESTART = 'R';
const QUIT = 'Q';

const INPUT_VALUE = Object.fromEntries({
  UP,
  DOWN,
  BRIDGE_DIVIDING_LINE,
  MOVEABLE,
  UNABLE_TO_MOVE,
  BLANK,
  RESTART,
  QUIT,
});

module.exports = { INPUT_VALUE };
