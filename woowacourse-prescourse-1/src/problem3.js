function problem3(number) {
  // 예외처리 : number가 3 미만일 때
  if (number < 3) {
    return 0;
  }

  let answer = [...Array(number)]
    .map((_, i) => i + 1)
    .toString()
    .match(/3|6|9/g).length;

  return answer;
}

module.exports = problem3;
