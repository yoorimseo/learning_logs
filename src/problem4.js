function problem4(word) {
  var answer = "";

  // 원래의 알파벳 배열
  let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  // 순서를 뒤집은 알파벳 배열
  let reverseAlphabet = ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"];

  for (i of word) {
    // 알파벳인가?
    if (/[a-zA-Z]/g.test(i)) {
      // 소문자인가?
      if (/[a-z]/g.test(i)) {
        let index = alphabet.indexOf(i);
        answer += reverseAlphabet[index];
      } else {
        // 대문자인가?
        let lowercase = i.toLowerCase();
        let index = alphabet.indexOf(lowercase);
        let reverse = reverseAlphabet[index];
        answer += reverse.toUpperCase();
      }
    } else if (i === " ") {
      // 공백문자인가?
    } else {
      // 알파벳 이외의 문자인가(숫자 혹은 한글 등)?
    }
  }

  return answer;
}

module.exports = problem4;
