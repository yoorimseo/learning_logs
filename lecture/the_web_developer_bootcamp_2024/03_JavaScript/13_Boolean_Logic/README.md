# JavaScript 조건문

## 1. 비교 연산자

### 1) `==` (double equals)

- 같은 형식으로 변환하여 두 변수의 값을 비교
  - 타입에 상관없이 값만을 비교하여 판단

### 2) `===` (triple equals)

- 타입과 값을 모두 비교
  - 값도 같고 타입도 같아야 true
- 타입을 신경쓰는 것이 중요하므로 `===`를 항상 사용하는 것이 좋음

## 2. console, alert과 prompt

### 1) `console.log()`

- 어떤 것을 출력하고 싶다면 `console.log()`를 사용
- console은 object이므로, `.log()` 외에도 다양한 메서드들이 존재

### 2) `alert()`

- 페이지에서 사용자에게 보여주기 위한 팝업 창

### 3) `prompt()`

- 사용자로부터 입력을 받는 팝업 창
- 문자열 타입

<aside>
📌 자바스크립트 파일은 html>body의 제일 하단에 script를 두는 것이 좋음

</aside>

## 3. if 문

```jsx
let a = 3;

if (a <= 3) {
  console.log('small');
} else if (a <= 6) {
  // 3 < a <= 6
  console.log('medium!');
} else {
  // a > 6
  console.log('big');
}
```

## 4. True-False Value

- JavaScript의 모든 값은 true
- false values
  - false
  - 0
  - “”(공백)
  - null
  - undefined
  - NaN

## 5. 논리 연산자

### 1) && (AND)

- 둘 다 참이면 1, 그 외에는 0

### 2) || (OR)

- 둘 중 하나라도 참이면 1, 둘다 거짓일 경우에만 0

### 3) ! (NOT)

- 참이면 0, 거짓이면 1

## 6. Switch 문

```jsx
const vaule = 2;
switch (value) {
 case value1:
  ...
  break;
 ...
 default:
  ...
```

- `case` 마다 `break` 문이 없으면 모두 실행됨
- 매치되는 것이 없을 때 `default` 문 실행
- 여러 변수에 같은 실행 결과를 내고 싶다면

  ```jsx
  case value1:
  case value2:
   ...
  ```

  - `value1`이거나 `value2`일 때 모두 실행됨
