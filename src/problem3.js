function problem3(number) {
  let answer = [...Array(number)]
    .map((_, i) => i + 1)
    .toString()
    .match(/3|6|9/g).length;

  return answer;
}

module.exports = problem3;
