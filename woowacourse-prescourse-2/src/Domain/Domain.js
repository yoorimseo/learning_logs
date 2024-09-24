// 클래스의 이름 답게 행동하는 기능들이 포함되어야 한다.
class Ball {
  constructor() {
    console.log('난 도메인에서 온 볼이다!');
  }

  print(name) {
    console.log(`${name}입니다.`);
  }

  // 기능 == 메서드
}

// 상수는 영어표기법과 관계없이 변수와 구별하기 위해 모든 글자를 대문자로 쓰고, 언더스코어로 연결
// 예) const MY_BIRTHDAY = 1225; > 변하지 않는 값

module.exports = { Ball };
