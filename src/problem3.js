// number가 369를 포함하는지 확인하는 함수
function check369(str) {
  // str이 3, 6, 9를 포함하고 있는지 확인하여 true 또는 false 반환
  return str.includes("3") || str.includes("6") || str.includes("9");
}

function problem3(number) {
  let answer = 0;

  // 1부터 number까지 369를 몇 개 포함하는지 구하는 for문
  for (let i = 1; i <= number; i++) {
    if (i < 30) {
      // 1 <= i <= 29일 때, 369를 한 개씩만 가지므로 다음의 조건문 실행
      let numToStr = i.toString();
      if (check369(numToStr)) {
        console.log(i);
        answer += 1;
      }
    } else {
      // i <= 30일 때, 369를 한개 이상 가질 수 있으므로 다음의 조건문 실행
      let numToArr = i.toString().split("");
      console.log(numToArr);
      // numToArr가 몇 개의 369를 가졌는지 확인
      let include369 = numToArr.filter((num) => check369(num));
      answer += include369.length;
    }
  }

  return answer;
}

module.exports = problem3;
