// 닉네임을 연속된 두 글자로 나누어 배열로 반환하는 함수
function sliceTwoWords(str) {
  let twoWords = [];

  for (let i = 0; i < str.length - 1; i++) {
    let sliceStr = str.slice(i, i + 2);
    twoWords.push(sliceStr);
  }

  return twoWords;
}

function problem6(forms) {
  let formsObj = Object.fromEntries(forms);
  let emails = Object.keys(formsObj);
  let nicknames = Object.values(formsObj);
  let answer = [];
  return answer;
}

module.exports = problem6;
