// 닉네임을 연속된 두 글자로 나누어 배열로 반환하는 함수
function sliceTwoWords(str) {
  let twoWords = [];

  for (let i = 0; i < str.length - 1; i++) {
    let sliceStr = str.slice(i, i + 2);
    twoWords.push(sliceStr);
  }

  return twoWords;
}

// 닉네임이 두 글자 이상 중복되는 것을 찾아 email을 answer에 push
function findDup(array, nicknames, emails) {
  let answer = [];
  for (let i = 0; i < nicknames.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (nicknames[i].includes(array[j])) {
        let emailIdx = emails[nicknames.indexOf(nicknames[i])];
        // email의 중복 제거를 위한 조건문
        if (!answer.includes(emailIdx)) {
          answer.push(emailIdx);
        }
      }
    }
  }

  return answer;
}

function problem6(forms) {
  let formsObj = Object.fromEntries(forms);
  let emails = Object.keys(formsObj);
  let nicknames = Object.values(formsObj);
  let answer = [];
  return answer;
}

module.exports = problem6;
