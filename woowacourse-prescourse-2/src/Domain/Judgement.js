class Judgement {
  correctCount(computer, player) {
    let result = 0;
    for (let i = 0; i < player.length; i++) {
      let playerNumber = player[i];
      if (computer.includes(playerNumber)) {
        result++;
      }
    }
    return result;
  }
  hasPlace(computer, placeIndex, number) {
    return computer[placeIndex] == number;
  }
}

module.exports = { Judgement };
