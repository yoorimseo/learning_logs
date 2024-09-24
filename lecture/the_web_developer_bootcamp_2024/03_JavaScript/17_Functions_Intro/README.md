# JavaScript 함수 기본

## 1. 함수란?

- 재사용할 수 있는 코드의 덩어리
- 코드의 중복을 줄일 수 있고, 이해하기 좋다는 장점

### 1) 정의

```jsx
function funcName() {
  // do something
}
```

- 함수를 정의한다고 해서 실행되지는 않음

### 2) 실행

```jsx
funcName(); // 한 번 실행
```

- 함수의 정의와 실행의 순서가 반대로 되도 정상적으로 실행됨
  - **호이스팅** 때문

## 2. Argumants(인수, 인자)

```jsx
function funcName(argument) {
  // parameter
  console.log(argument);
}

funcName(argument); // argument
```

- 함수에 입력값을 받기 위해 사용
- 함수 안에서만 사용 가능
- 인수가 전달되지 않으면 해당 인수는 `undefined`
- 하나 이상의 인수 사용 가능
  - 쉼표를 사용하여 구분
  - 입력 받는 순서대로 인수에 전달

## 3. return

```jsx
function funcName(a, b) {
  return a + b;
}

funcName(1, 2); // 3
```

- 함수의 결과를 변수에 저장하기 위해 사용
- `return` 키워드를 통해 결과값을 함수 밖으로 반환
- `return`을 사용하면 함수 실행이 종료되기 때문에, `return` 이후의 코드는 실행되지 않음
- 단일값만 반환 가능
