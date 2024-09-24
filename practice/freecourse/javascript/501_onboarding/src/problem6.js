// 닉네임을 연속된 두 글자로 나누어 배열로 반환하는 함수
function sliceTwoWords(str, emails, i) {
  let twoWords = [];
  // 어떤 닉네임이 나눠진건지 확인하기 위해
  twoWords.push(str);
  // 완전히 동일한 닉네임이 있을 경우, 해당 닉네임의 이메일로 구분하기 위해
  twoWords.push(emails[i]);

  for (let i = 0; i < str.length - 1; i++) {
    let sliceStr = str.slice(i, i + 2);
    twoWords.push(sliceStr);
  }

  return twoWords;
}

// 닉네임이 두 글자 이상 중복되는 것을 찾아 email을 answer에 push
function findDup(array, nicknames, emails, answer) {
  for (let i = 0; i < nicknames.length; i++) {
    for (let j = 2; j < array.length; j++) {
      // 본인 닉네임을 제외하고, 닉네임이 2글자 이상 중복되는 경우
      if (nicknames[i] !== array[0] && nicknames[i].includes(array[j])) {
        // email의 중복 제거를 위한 조건문
        if (!answer.includes(emails[i])) {
          answer.push(emails[i]);
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

  for (let i = 0; i < nicknames.length; i++) {
    let arr = sliceTwoWords(nicknames[i], emails, i);
    answer = findDup(arr, nicknames, emails, answer);
  }

  return answer.sort();
}

module.exports = problem6;
