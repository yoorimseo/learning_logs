# Callback 함수 & 배열 Methods

## 1. 배열 메서드 고급

- 함수를 전달해야하는 배열 메서드

### 1) forEach 메서드

- for 문이 나오기 전에 흔하게 사용되던 것
  - 해당 메서드는 현재 자주 사용하지 않음 → for문을 사용할 수 있기 때문
- 어떤 함수를 전달하든, 항목 당 한 번 호출되고 각 항목은 자동으로 그 함수로 전달됨

  ```jsx
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  numbers.forEach(function (el) {
    if (el % 2 === 0) {
      console.log(el);
    }
  });
  ```

### 2) map 메서드

- 배열의 요소당 그 함수를 한 번 실행하고, 결과와 함수의 반환값을 이용해 **새 배열을 생성**
- map 메서드를 이용하여 원본 배열을 직접 복사할 수 있음
- 원본 배열의 모든 요소를 변환하여 새 배열을 만들 때 유용

  ```jsx
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const doubles = numbers.map(function (num) {
    return num * 2;
  });

  // doubles = [2, 4, 6, 8, 10, 12, 15, 16, 18, 20];
  ```

### 3) filter 메서드

- 주어진 조건에 참인 원소들을 필터링하여 하위 집합을 만들 때 사용
- 반환값은 boolean 값이어야 함

  ```jsx
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const new_numbers = numbers.filter((n) => n < 5);

  // new_numbers = [1, 2, 3, 4];

  // 여러 메서드를 같이 사용 가능
  movies.filter((m) => m.score > 80).map((m) => m.title);
  ```

### 4) some & every 메서드

- 배열의 모든 요소가 어떤 조건을 통과하는지에 대한 boolean 값을 반환

  - `.some(콜백함수)` : 어떤 요소라도 조건을 통과했다면(1개 이상) true, 모든 요소가 조건을 통과하지 못했다면 false
  - `.every(콜백함수)` : 모든 요소가 조건을 통과했다면 true, 하나라도 조건을 통과하지 못했다면 false

        ```jsx
        const exams = [80, 98, 92, 78, 77, 90, 89, 84, 81, 77]

        exams.every(score => score >= 75) // true
        exams.some(score => score >= 80) // true
        ```

### 5) reduce 메서드

- `.reduce(콜백함수, 초기값)`
  - 콜백함수 : `accumulator, currentValue) => accumulator + currentValue`
- reduce 메서드의 목적은 배열의 모든 원소를 줄여 단일 값으로 만드는 것

  ```jsx
  // 1) 누적합을 구하는 예시
  [3, 5, 7, 9, 11].reduce((acc, curr) => {
    return acc + curr;
  });
  // 35
  // (3 + 5) -> (8 + 7) -> (15 + 9) -> (24 + 11) -> 35

  // 2) 최소값을 찾는 예시
  const prices = [9.99, 1.5, 19.99, 49.99, 30.5];
  const minPrice = prices.reduce((min, price) => {
    if (price < min) {
      return price;
    }
    return min;
  });
  // minPrice = 1.50

  // 3) 초기값을 사용한 예시
  const evens = [2, 4, 6, 8];
  evens.reduce((sum, num) => sum + num); //20
  evens.reduce((sum, num) => sum + num, 100); //120
  ```

## 2. 화살표 함수

```jsx
// 기본 함수
const add = function(x,y) {
 return x + y;
}

// 화살표 함수
// 1) 인수가 있는 경우
const add = (x, y) => {
 return x + y;
}
// 2) 인수가 없는 경우
const rollDie = () => (
    return Math.floor(Math.random() * 6) + 1
)
```

- 함수를 정의하는 새로운 구문
- function 키워드를 사용하지 않고 함수 작성 가능
- 인수가 하나인 경우만 괄호 생략 가능

### 1) 화살표 함수와 암묵적 반환

- 인수가 없고 하나의 값만 반환하는 단일구문일 경우, `return` 키워드와 중괄호 생략 가능

  ```jsx
  const add = (a, b) => a + b;
  ```

  - 가독성을 해친다면 생략하지 않는 것도 방법!

### 2) 화살표 함수와 this

- 화살표 함수를 사용하고 this를 출력했을 때, 원하는 결과가 아닌 window 함수가 출력됨
  - 함수가 생성된 스코프는 상관이 없고, 함수가 실행되는 방식과 관련이 있음
    - 실행 컨텍스트와 관련이 있음
- 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정
  - 화살표 함수의 this 언제나 상위 스코프의 this를 가리킴 → **lexical this**

## 3. setTimeout 함수와 setInterval 함수

### 1) setTimeout 함수

- `setTimeout(콜백함수, ms 시간)` : 시간 후에 함수를 실행

  ```jsx
  console.log('HELLO!!!...');

  setTimeout(() => {
    console.log('...are you still there?');
  }, 3000);

  console.log('GOODBYE!!');

  // HELLO!!!...
  // GOODBYE!!
  // 3초 후에
  // ...are you still there?
  ```

### 2) setInterval 함수

- `setInterval(콜백함수, ms 시간)` : 시간 간격 마다 함수를 계속 실행
- `clearInterval(value)` : setInterval() 을 호출하여 생성한 타이머에 의해 반복되는 작업을 취소

  ```jsx
  const id = setInterval(() => {
    console.log(Math.random());
  }, 2000);
  ```
