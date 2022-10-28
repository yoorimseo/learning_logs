// 예외처리 1) 펼친 페이지가 연속된 페이지가 아닐 경우
function exception(array) {
  if (array[0] + 1 === array[1]) {
    return true;
  }
}

// 각 자리의 합을 구하는 함수
function sumOfDigits(num) {
  let arr = num
    .toString()
    .split("")
    .map((s) => parseInt(s));
  let result = arr.reduce((acc, cur) => acc + cur, 0);
  return result;
}

// 각 자리의 곱을 구하는 함수
function multiplyOfDigits(num) {
  let arr = num
    .toString()
    .split("")
    .map((s) => parseInt(s));
  let result = arr.reduce((acc, cur) => acc * cur, 1);
  return result;
}

function problem1(pobi, crong) {
  // 예외처리 1) 펼친 페이지가 연속된 페이지가 아닐 경우
  if (exception(pobi) || exception(crong)) {
    return -1;
  }
}

module.exports = problem1;
