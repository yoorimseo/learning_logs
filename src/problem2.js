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

// cryptogram의 중복되는 값을 삭제하는 함수 추가
function removeDup(array) {
  let indexArr = findDupIndex(array);

  if (indexArr.length === 1) {
    // 1개의 문자가 연속으로 1번 중복되는 경우
    array.splice(indexArr[0], 2);

    return removeDup(array);
  } else if (indexArr.length > 1) {
    // 2개 이상의 문자가 연속으로 2번 이상 중복되는 경우
    let duplication = array.slice(indexArr[0], indexArr[indexArr.length - 1] + 2);

    array.splice(indexArr[0], duplication.length);

    return removeDup(array);
  }
  // 중복되는 문자가 없을 경우
  return array;
}

function problem2(cryptogram) {
  // cryptogram을 배열로 변환
  let array = cryptogram.split("");
}

module.exports = problem2;
