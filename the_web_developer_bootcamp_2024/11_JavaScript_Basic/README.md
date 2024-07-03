# JavaScript 기초

## 1. Primitive Types

- Number
- String
- Boolean
- Null
- Undefined

## 2. Math Operation

```jsx
+, -, *, /, %, **
```

## 3. NaN

- Not a Number

  ```jsx
  0 / 0; // NaN
  1 + NaN; // NaN
  ```

- 숫자는 아니지만, 숫자 타입으로 여겨짐

## 4. Variables & let

```jsx
let someName = Value;
let yaer = 2024;
```

- 값에 이름을 부여하고 JavaScript를 이용해 저장하는 방법
  - 나중에 재사용하거나 업데이트하거나 다시 불러올 수 있도록 하기 위해

### **1) i++ vs ++i**

- i++
  - Post-increment, postfix 증가 연산자
  - 변수의 현재 값을 반환한 후, 1을 증가
- ++i
  - Pre-increment, prefix 증가 연산자
  - 변수의 값을 1 증가시킨 다음, 증가된 값을 반환

## 5. Const & Var

### 1) const

```jsx
const someName = Value;
```

- 상수, 변하지 않는 값

  ![스크린샷 2024-06-03 21.16.52.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c07a89d2-eb34-4064-ae88-37dd3da5bb9e/c22f13d1-f21f-495d-816b-e9f2a60a1022/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-03_21.16.52.png)

  - 그 값을 업데이트 하거나 변경할 수 없음

### 2) var

```jsx
var someName = Value;
```

- 변수를 만드는 예전 방식

## 6. Boolean

- true or false, 1 or 0
- 참과 거짓을 판단하는 변수

<aside>
📌 JavaScript에서는 타입에 상관없이 변수를 사용 가능

</aside>

## 7. Variable Naming and Conventions

- JavaScript 변수를 만들 때 반드시 지켜야 할 것들
  - 공백 사용 불가
  - 숫자로 시작할 수 없음
- **camelCase**
  - 단어를 표기할 때 첫 문자는 소문자로 시작하고, 띄어쓰기 대신 대문자로 단어를 구분
  - 단어와 단어 사이는 붙여서 씀
- **snake_case**
  - 단어를 표기할 때 모두 소문자로 표기하고, 단어가 합쳐진 부분마다 단어 사이를 띄어쓰기 대신 \_로 표기
- 변수 명명
  - 변수 이름을 잘 짓는 것이 중요
  - 간결한 것보다는 의미 있는 변수 이름을 짓는 것이 더 나음
    - 그렇다고 문장으로 만들지는 말 것
