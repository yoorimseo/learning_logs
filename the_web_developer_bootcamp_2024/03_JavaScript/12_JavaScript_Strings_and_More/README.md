# JavaScript 문자열 및 기타

## 1. string

- 문자열
- “” 혹은 ‘’로 감싸진 형태
  - 두개를 섞어 쓰는 경우는 따옴표 안에 따옴표를 써야 할 때

## 2. index

- 0부터 시작
- 문자열의 인덱스로 각 문자 접근 가능

  ```jsx
  str = 'animal';
  str[0]; // 'a'
  ```

## 3. `string.length`

- 모든 문자열은 길이을 가짐

## 4. 문자열 덧셈

- 문자열끼리 더하면 합성어가 됨

  ```jsx
  let a = 'one';
  let b = 'two';
  let res = a + b; // 'onetwo'
  ```

- 숫자와 문자열을 더하면, 결과는 문자열

## 5. 문자열 함수들

- **원본 문자열을 변환시키는 함수도 있고, 그렇지 않은 함수도 존재한다는 것에 주의!**

### 1) 인수가 없는 문자열 함수

```jsx
string.method();
```

- `.toUpperCase()` : 모든 문자를 대문자로 변환
- `.trim()` : 문자열의 앞뒤에 있는 공백을 제거
- 코드 한 줄에 여러 함수를 연달아 작성 가능

### 2) 인수를 받는 문자열 함수

```jsx
string.method(arg);
```

- 인수는 동작 방식을 바꾸기 위해 메서드에 넘길 수 있는 입력
- `.indexOf('s')` : 문자열 인수에 대한 인덱스와 위치 번호를 제공
  - 해당 문자열에 인수가 있으면 인덱스를 반환하고, 없으면 -1을 반환
  - 가장 먼저 찾은 인덱스를 반환
- `.slice(n, m)` : n부터 m-1까지 문자열을 잘라서 반환
  - 음수를 사용하면 문자열의 뒤에서부터 시작
- `.replace(’str’, 'change')` : 원본 문자열에 해당하는 str을 change로 변환
  - 가장 첫 번째로 일치하는 문자에 대해 변환
- `.replaceAll(’str’, 'change')` : 원본 문자열에 해당하는 **모든** str을 change로 변환
  - 모든 브라우저에서 지원하지 않음
- `.repeat(n)` : 문자열을 n번만큼 반복

## 6. Template Literal

```jsx
`I counted ${3 + 4} sheep`; // I counted 7 sheep
```

- 백틱`₩₩` 사용
- `${ }` 를 사용하여 연산 가능

## 7. Undefined

### 1) null

- 의도된 아무것도 없는 값

### 2) undefined

- 정의되지 않은 값
- 우리가 의도해서 변수에 사용하지는 않는 편

## 8. Math Object

- 콘솔에 있어서 따로 참조하지 않아도 됨
- `Math.floor()` : 내림

  `Math.ceil()` : 올림

  `Math.round()` : 반올림

  `Math.abs()` : 절댓값

- `Math.random` : 0.0~0.9 사이의 숫자를 랜덤으로 반환
  - 정수를 얻기 원한다면 → Math.floor(Math.random() \* 10)
- `Math.pow(n, m)` : n의 m승
