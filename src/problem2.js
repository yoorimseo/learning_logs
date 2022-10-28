// cryptogram의 중복되는 index를 찾는 함수 추가
function findDupIndex(array) {
  let indexArr = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i - 1] === array[i]) {
      // 문자의 중복이 시작되는 인덱스를 저장
      indexArr.push(i - 1);
    }
  }
  return indexArr;
}

function problem2(cryptogram) {
  // cryptogram을 배열로 변환
  let array = cryptogram.split("");
}

module.exports = problem2;
