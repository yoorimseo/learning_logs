const BridgeMaker = require('../BridgeMaker');
const BridgeRandomNumberGenerator = require('../BridgeRandomNumberGenerator');
const { UP, DOWN, MOVEABLE, UNABLE_TO_MOVE, BLANK, RESTART } = require('../constants/consition');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  constructor(bridge) {
    this.bridge = bridge;
    this.bridgeLength = 0;
    this.path = [];
    this.step = 0;
    this.count = 1;
  }

  makeBridge(bridgeLength) {
    this.bridge = BridgeMaker.makeBridge(bridgeLength, BridgeRandomNumberGenerator.generate);
    this.bridgeLength += this.bridge.length;
    return this.bridge;
  }

  move(movingState) {
    this.path.push(movingState);
  }

  makeBridgeMap() {
    const bridgeMap = [
      this.path.map((state, index) => this.compare(state, index, UP), this.bridge),
      this.path.map((state, index) => this.compare(state, index, DOWN, this.bridge)),
    ];

    return bridgeMap;
  }

  compare(state, index, block) {
    if (state !== block) {
      return BLANK;
    }
    if (state !== this.bridge[index]) {
      return UNABLE_TO_MOVE;
    }
    return MOVEABLE;
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry(answer) {
    if (answer === RESTART) {
      this.step = 0;
      this.path = [];
      this.count++;
      return true;
    }
    return false;
  }
}

module.exports = BridgeGame;
