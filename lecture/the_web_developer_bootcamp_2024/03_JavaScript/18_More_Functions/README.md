# JavaScript 함수 고급

## 1. scope

- 값과 표현식이 표현되거나 참조될 수 있는, 현재 실행되는 컨텍스트를 의미
- 만약 변수 또는 표현식이 해당 스코프 내에 있지 않다면, 사용할 수 없음
- 스코프는 계층적인 구조를 가짐
  - 하위 스코프는 상위 스코프에 접근 가능
  - 상위 스코프는 하위 스코프에 접근 불가

### 1) function scope

- 함수로 생성된 범위

### 2) block scope

- 중괄호({})로 생성된 범위

  > 📌 var 키워드를 사용하면 해당 변수가 함수로 스코프가 좁혀지지만, 블록 스코프는 아님
  > → 중괄호를 벗어나도 해당 변수에 접근 가능

### 3) lexical scope

- 정적 스코프
  - 스코프가 컴파일 타임에 결정되고, 변하지 않기 때문
- 정의된 특정한 구역 내에서 사용하는 스코핑 방식
  - 상위 함수 안에 중첩된 내부 함수는 외부 함수의 스코프에서 찾기 위해 스코프나 변수에 접근 가능
- 렉시컬 스코프와 중첩된 내부 함수는 부모 함수나 조부모 함수 등과 동일한 수준의 접근이 가능

## 2. 함수 표현식

- 함수를 다르게 정의하는 방식

  - 기본

    ```jsx
    function add(x, y) {
      return x + y;
    }
    ```

  - 변수를 만들어 익명 함수(이름 없는 함수)를 만들어 저장

    ```jsx
    const add = function (x, y) {
      return x + y;
    };

    square(1, 2); // 3
    ```

    - JavaScript는 기본적으로 함수를 다른 값과 똑같이 간주 → 배열처럼

## 3. 고차 함수

### 1) 다른 함수와 작동하는 함수

- 다른 함수를 인수로 받아들이고 그것으로 뭔가를 하는 함수

  ```jsx
  function callTwice(func) {
   func();
   func();
  }

  function rollDie() {
   const roll = Math.floor(Math.random() * 6) + 1;
   console.log(roll);
  }

  callTwice(rollDie));
  // callTwice(rollDie())); - X, 함수의 실행 값을 넘기는 것이 아님
  ```

### 2) 반환 함수

- 함수 안에서 함수를 값으로 반환할 수 있는 함수

  ```jsx
  function makeBetweenFunc(min, max) {
    return function (num) {
      return num >= min && num <= max;
    };
  }

  const isChild = makeBetweenFunc(0, 19);
  isChild(30); // false
  ```

## 4. 메소드 정의

- 메서드란 개체의 속성으로 배치된 함수
  - `.` 으로 함수에 접근 가능
  - 모든 메서드는 함수이지만, 모든 함수가 메서드는 아님
- 객체에 메서드를 추가 가능

  ```jsx
  const myMath = {
    PI: 3.14159,
    square(num) {
      return num * num;
    },
    cube(num) {
      return num ** 3;
    },
  };
  ```

  - 속성값으로서의 기능 추가 가능 → 변수에 함수를 저장할 수 있기 때문
  - 인수로 함수를 전달할 수 있고, 함수로부터 함수를 반환할 수도 있음
  - 함수를 개체 속성의 값으로도 사용 가능

## 5. this

- 객체 안에서 주로 사용하는 키워드
- 함수를 어떻게 호출했느냐(호출 컨텍스트)에 따라 this가 가르키는 것이 다름

  - 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정

    ```jsx
    const cat = {
      name: 'Blue Steele',
      color: 'grey',
      breed: 'scottish fold',
      meow() {
        console.log('THIS IS:', this);
        console.log(`${this.name} says MEOWWWW`);
      },
    };

    cat.meow();
    // THIS IS: cat 객체...
    // Blue Steele says MEOWWWW
    const meow2 = cat.meow;
    // THIS IS: window 객체...
    // says MEOWWWW
    ```

- 우리가 사용하는 모든 함수는 window 객체 안에 존재
  - window는 최상위 객체

## 6. try-catch

- 에러를 잡아 처리하여, 코드 실행이 중단되는 것을 방지하는 구문

  ```jsx
  try() {
   // 정상적인 경우, 실행되는 코드
  } catch(error) {
   // 에러가 발생했을 경우, 실행되는 코드
  }

  function yell(msg) {
      try {
          console.log(msg.toUpperCase().repeat(3));
      } catch (e) {
          console.log("Please pass a string next time!")
      }
  }
  ```

- 비동기 함수에서 유용
