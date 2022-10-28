// 예외처리 1) 펼친 페이지가 연속된 페이지가 아닐 경우
function exception(array) {
  if (array[0] + 1 === array[1]) {
    return true;
  }
}

function problem1(pobi, crong) {
  // 예외처리 1) 펼친 페이지가 연속된 페이지가 아닐 경우
  if (exception(pobi) || exception(crong)) {
    return -1;
  }
}

module.exports = problem1;
