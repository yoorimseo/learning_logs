# JavaScript 새로고침

## 1. 자바스크립트를 실행할 수 있는 환경

- 브라우저에서 실행 가능
  - 자바스크립트가 브라우저에서부터 시작되었음
  - 1990년대에 자바스크립트가 만들어졌던 이유
- Node.js와 Deno 덕분에 자바스크립트 코드를 브라우저 밖에서도 실행 가능
- Capacitor 또는 리액트 네이티브와 같은 기술을 사용하여 모바일 앱도 만들 수 있음

⇒ 자바스크립크는 굉장히 유연하고 강력

## 2. 자바스크립트가 웹 사이트에 추가되는 방법

### 1) 자바스크립트 코드를 `<script>` 태그 사이에 작성하는 방법

```jsx
<script>alert('Hello');</script>
```

- 관리하기 어렵고 복잡한 HTML 파일이 만들어지기 때문에 잘 사용하지 않음
- 짧은 스크립트일 경우에만 사용

### 2) `<script>`가 담긴 파일을 import 하는 방법

```jsx
<script src='script.js'></script>
```

- 일반적으로 자바스크립트 코드를 자바스크립트 파일에 저장
- 이 방법을 사용해야 프로젝트를 관리하기 쉬움
- `<script>` 태그에 사용할 수 있는 다양한 속성

  - `defer`

    - 나머지 HTML 문서를 읽어와 파싱한 후에 스크립트가 import 되어 실행되도록 만들 수 있음
    - 다른 HTML 요소를 사용해야 할 때, 코드가 실행되기 시작할 때 HTML 요소가 미리 로드 되도록 보장할 수 있음

      → defer 속성이 없으면 바로 실행됨

      → 어떤 요소를 사용하려고 했을 때 스크립트가 먼저 로드되면 해당 요소가 준비되지 않을 수도 있기 때문

      → 이 경우 defer 속성을 사용

    - `<script>` 태그를 `<body>` 섹션의 끝으로 이동하여 사용 가능

  - `type=”modeule”`
    - 해당 자바스크립트 파일을 자바스크립트 모듈로 취급하게 됨
    - import 문법을 사용하여 export된 다른 자바스크립트 파일을 불러와 사용 가능

### 3) 자바스크립트와 다른 리액트

- 리액트 프로젝트는 대부분 빌드 프로세스를 활용하며 그 과정에서 HTMl 코드에 자동으로`<script>` 태그를 추가

## 3. 리액트 프로젝트 구축 과정

### 1) 리액트 프로젝트는 빌드 프로세스를 사용

- 작성한 코드가 그대로 브라우저에서 실행되는 것이 아님
- 브라우저에 전달되기 전에 내부적으로 코드가 수정됨
- 백그라운드에서 작동되는 툴에 의해 이 과정이 진행됨
  - package.json에서 해당 툴 확인 가능
  - package.json 파일에는 프로젝트에서 사용하는 모든 의존성과 모든 라이브러리의 목록이 존재
- 개발 서버(예. npm run server)가 뒤에서 소스 코드를 확인하고 소스 코드를 변환해, HTML 파일 수정해 `<script>` 요소를 추가한 후 변환된 소스 코드를 로드함

  → 따라서 웹 페이지에서는 변환된 소스 코드가 실행됨

### 2) 이런 빌드 프로세스를 사용하는 이유, 코드를 변환해야 하는 이유

- 처리되지 않은 리액트 코드는 브라우저에서 실행할 수 없음

  - 리액트 코드는 특별한 JSX 기능을 사용하기 때문
  - JSX 코드는 자바스크립트 파일에 작성된 HTML 코드를 의미

    → 표준 자바스크립트 기능이 아니므로 정상적으로 작동하지 않음

  - 이 문법을 활성화 하는 것이 리액트에서 매우 중요하기 때문에 코드를 변환해야 함
  - 자바스크립트가 이해할 수 있도록 변환해야 브라우저에서 실행 가능

- 작성한 코드가 프로덕션을 위해 최적화되지 않았기 때문
  - 충분히 간소화되지 않음
    - 사용자에게 전달할 수 있을 만큼 변수 또는 함수 이름이 짧게 변환되지 않음
- 코드 샌드박스를 사용하거나 create react app, vite를 사용하면 자동으로 프로젝트에 빌드 프로세스가 들어 있음
  - Node.js를 미리 설치해야 함

## 4. import와 export 문법

- 리액트는 여러 파일에 코드를 분리해 관리하기 쉽게 만드는 것이 중요

  → 이렇게 하기 위해서는 import와 export 문법이 필요

### 1) 자바스크립트에서 import와 export 사용하기

- 해당 문법을 사용하기 위해서는 HTML 파일에서 `<script>` 태그를 작성할 때 `type=”module”` 속성을 추가해주어야 함
- 자바스크립트 파일에서는 확장자(.js)까지 적어주어야 함
- 리액트는 빌드 프로세스가 확장자를 추가해주기 때문에 생략 가능
- 방법 1) 일반적인 방법

  ```jsx
  // util.js
  export let apiKey = 'asdfgkljsdklfj12';

  // app.js
  import { apiKey } from './util.js';
  ```

- 방법 2) default 키워드 사용하기

  ```jsx
  // util.js
  export default 'asdfgkljsdklfj12';

  // app.js
  import apiKey from './util.js';
  // export 할 때 이름이 정해져있지 않으므로, import할 때 원하는 대로 설정 가능
  // 이름은 반드시 설정해야 함
  ```

  - `defualt`
    - 해당 파일에서 export하는 기본값 설정
    - 값을 직접 export 하며 파일 별로 하나의 default export만 존재 가능
  - 하나의 함수 또는 하나의 값만 export 하려고 할 때 사용하기 좋음

- 방법 3) default 키워드로 선언한 것과 그렇지 않은 것을 같이 사용하기

  ```jsx
  // util.js
  export default 'asdfgkljsdklfj12';
  export let apiKey = 'asdadfddsfe';
  export let abc = 'abc';

  // app.js
  import apiKey1 from './util.js';
  import { apiKey, abc } from './util.js';
  ```

- 방법 4) import 하려는 모든 대상의 이름을 자바스크립트 객체로 묶어 한번에 import 하기

  ```jsx
  // util.js
  export default 'asdfgkljsdklfj12';
  export let apiKey = 'asdadfddsfe';
  export let abc = 'abc';

  // app.js
  import * as util from './util.js';

  console.log(util.apiKey);
  ```

  - 점(.) 표기법을 사용하여 해당 객체 안의 대상들에 접근 가능

- 방법 5) as 키워드를 사용하여 별칭 설정하기

  ```jsx
  // util.js
  export default 'asdfgkljsdklfj12';
  export let apiKey = 'asdadfddsfe';
  export let abc = 'abc';

  // app.js
  import apiKey1 from './util.js';
  import { apiKey, abc as content } from './util.js';

  console.log(content); // abc 값
  ```

  - import하는 파일에서 as 키워드를 사용하여 이름 변경 가능

## 5. 변수와 값

### 1) 변수 타입

- `string`
  - 문자열
  - ‘’ 혹은 “”, ``(백틱)으로 감싸진 값
- `number`
  - 숫자
- `boolean`
  - 참 또는 거짓
  - 상태를 표현할 때 주로 사용
- `null` & `undefined`
  - 변수 값이 존재하지 않을 때의 값

### 2) 변수

- 값을 저장해야 할 때 사용
  - 변수는 값을 저장하는 데이터 컨테이너
- 원하는 이름을 할당 가능
- 값을 재사용 가능하게 하고, 코드 가독성이 좋아짐

### 3) 변수 명명 규칙

```jsx
let userMessage = 'Hello World!';

console.log(userMessage);
```

- 보통 카멜케이스 사용
- 소문자로 이름을 시작
- 변수 명이 여러 개의 단어로 구성되는 경우, 각 단어를 대문자로 시작
- 하이픈이나 공백이 있으면 안됨
- 밑줄은 가능하지만 일반적으로 잘 사용하지 않음
- 숫자를 넣을 수 있지만 맨 앞에 올 수는 없음
- 특수문자는 오직 $, \_만 가능

### 4) 변수와 상수

- 이름을 지을 때, 무엇을 저장하는지를 나타내는 것이 좋음
- `const`

  - 상수는 값을 재할당 불가
  - 새 값을 할당하려고 하면 오류 발생
  - 읽기 전용 변수
  - 다시 할당하지 않아야 할 값에 사용

    → 의도를 명확하게 할 수 있음

- `let`
  - 대입 연산자(=)로 값 재할당 가능

## 6. 연산자

- - - 숫자 타입에 사용하면 덧셈 연산
    - 문자열 타입에 사용하면 문자열 연결
- -, \*, /
- ===
  - 두 피연산자가 값과 타입이 모두 일치하는지 확인
  - 결과값은 boolean
- <, <=, >, >=

## 7. 함수와 매개변수

- 함수는 `function` 키워드나 화살표 함수 `() => {}` 문법으로 생성 가능

### 1) `function`

```jsx
function greet() {
  // 함수 코드 작성
  console.log('Hello!');
}

// 함수 호출
greet();
```

- 함수를 생성했을 때 바로 실행되는 코드가 아니라, 나중에 함수를 호출했을 때 실행되는 코드를 정의하는 것
- 함수 이름도 변수 명명 규칙을 따라야 함
  - 함수 이름을 지을 때, 무슨 작업을 하는지 나타내는 이름을 짓는 것이 좋음
- 같은 함수를 여러 번 실행 가능
- `()` 소괄호를 사용하여 함수를 실행
- 원하는 만큼 많은 매개변수를 추가할 수 있음

  ```jsx
  function greetUser(userName, message) {
    // 함수 코드 작성
    console.log(userName);
    console.log(message);
  }

  greetUser('Max', 'Hello!');
  greetUser('Manuel', "Hello! what's up?");
  ```

  - 매개변수는 `,` 를 사용하여 구분
  - 함수 내에서만 사용할 수 있음
  - 매개변수 명을 지을 때도 변수 명명 규칙을 따라야 함
  - 매개변수가 있는 함수를 호출할 때, 입력 매개변수의 값을 제공해야 함

- `=` 연산자를 사용하여 매개변수의 default 값을 설정 가능

  ```jsx
  function greetUser(userName, message = 'Hello!') {
    // 함수 코드 작성
    console.log(userName);
    console.log(message);
  }

  greetUser('Max'); // Max, Hello!
  greetUser('Manuel', "Hello! what's up?");
  ```

  - 매개변수에 default 값을 할당했을 경우, 해당 매개변수가 제공되지 않았을 때 default 값이 사용됨
  - default 값이 사용된 매개변수의 값을 따로 제공했을 경우, 오버라이딩되어 제공된 값을 사용

- 함수는 입력값을 받을 뿐만 아니라 값을 반환할 수도 있음

  ```jsx
  function createGreeting(userName, message = 'Hello!') {
    return 'Hi, I am ' + userName + '.' + message;
  }

  const greeting1 = constcreateGreeting('Max');
  console.log(greeting1);

  const greeting2 = createGreeting('Manuel', "Hello! what's up?");
  console.log(greeting2);
  ```

  - 매개변수를 사용하지 않아도 `return` 키워드는 사용 가능
  - 반환값이 있는 함수는 함수가 사용할 수 있는 값을 반환하기 때문에 변수나 상수에 저장하여 사용

### 2) 화살표 함수

- 익명 함수를 다룰 때 자주 사용하는 문법

  - 익명 함수 : 이름이 없는 함수

    ```jsx
      // 예시 1
      <button onClick={() => setActiveContentIndex(0)}>
       Why React?
      </button>

      // 예시 2
      export default function() {
       console.log("Hello");
      }

      // 예시 3
      export default (userName, message) => {
       console.log("Hello");
       return userName + message;
      }
    ```

    - 익명 함수를 다룰 때 화살표 함수를 사용한다면, 더 짧게 작성할 수 있음

      → `function` 키워드를 사용하지 않고 매개변수 목록만 작성

- 화살표 함수가 하나의 매개변수만 사용하는 경우, 괄호 생략 가능

  ```jsx
  (userName) => { ... } → userName => { ... }
  ```

  - 함수에 매개변수가 없는 경우, 괄호 생략 불가
  - 함수에 둘 이상의 매개변수를 받는 경우에도 괄호 생략 불가

- 화살표 함수에 반환문 외에 다른 로직이 없는 경우, return 키워드와 중괄호 생략 가능

  ```jsx
  number => {
   return number * 3;
  }
  → number => number * 3;
  ```

- 특수한 경우 : 객체만 반환하는 경우

  ```jsx
  (number) => {
    age: number;
  }; // (x)
  (number) => ({ age: number }); // (o)
  ```

  - 자바스크립트는 중괄호를 JS 객체를 생성하는 코드가 아닌, 함수 본문 wrapper로 취급하기 때문에 위의 코드는 유효하지 않음
  - 객체를 생성하고 반환하기 위해서는 추가 괄호로 감싸야 함

    → 객체와 중괄호를 추가 괄호로 감싸면, 자바스크립트는 중괄호가 함수 본문을 정의하는 것이 아니라 객체를 생성하기 위한 것임을 이해하여 객체가 반환됨

## 8. 객체와 클래스

- 자바스크립트에서는 객체를 사용해 여러 개의 값을 그룹으로 묶을 수 있음

  ```jsx
  const userName = 'Max';
  const userAge = 34;

  const user = {
    // 프로퍼티는 키-값 쌍
    name: 'Max',
    age: 34,
    // 메소드
    greet(userName) {
      console.log('Hello!');
      console.log(this.age); // 34
    },
  };

  console.log(user.name); // Max
  user.greet();
  ```

  - Key는 변수 명명 규칙을 사용하여 지어야 함

    → 어떤 값을 저장하는지 잘 나타내는 이름이 좋음

  - 점(.) 표기법을 사용하여 객체의 필드에 접근 가능
  - `this` 키워드를 사용하여, 객체 안에 있는 함수(메서드)에서 객체의 프로퍼티에 접근 가능

- 객체를 생성할 때는 값들을 그룹으로 묶어 변수에 저장하거나, `class` 키워드를 사용해서도 생성 가능

  ```jsx
  class User {
    constructor(name, age) {
      // name과 age라는 프로퍼티를 생성하고, 여기에 매개변수 값을 저장
      this.name = name;
      this.age = age;
    }
    greet() {
      console.log('Hi!');
    }
  }

  const user1 = new User('Manuel', 35);
  console.log(user1);
  user1.greet();
  ```

  - class 이름은 대문자로 시작해야 함
  - `constructor` 키워드를 사용해 생성자 함수 추가 가능
    - 매개변수를 받아서 this 키워드를 사용해, 해당 클래스에서 생성될 객체의 프로퍼티에 값을 저장 가능
  - 클래스를 인스턴스화 하기 위해 `new` 키워드를 사용하여 새 객체를 생성 가능

## 9. 배열 및 배열 메소드

- 객체 외에 중요한 자바스크립트 값 타입 중 하나
- 배열도 객체이지만 특별한 유형의 객체

  ```jsx
  const hobbies = ['sports', 'cooking', 'reading'];
  console.log(hobbies[0]); // sports
  ```

  - 배열 객체를 생성하려면 대괄호를 사용
  - 배열의 개념은 값의 목록을 생성하는 것
  - 값을 순서대로 저장하며, 목록 내 위치(인덱스)에 따라 값에 접근 가능
    - 인덱스는 0부터 시작

- 배열은 모든 유형의 값을 저장할 수 있음

  → 다른 배열, 객체, 숫자, 문자열 등 원하는 모든 값 저장 가능

- 배열을 정의할 때, 배열을 구성하는 개별 값은 쉼표로 구분

### 1) 배열 내장함수, 메소드

```jsx
const hobbies = ['sports', 'cooking', 'reading'];

// 1. 배열 끝에 새로운 원소를 추가
hobbies.push('working');

// 2. 특정한 값의 인덱스 찾기 - 매개변수로 콜백함수를 받음
// 콜백함수에서 찾고자 하는 원소를 찾은 경우 해당 원소의 인덱스를 가져옴
const index = hobbies.findIndex((item) => {
  return item === 'sports';
});
console.log(index); // 0

// 3. 배열의 모든 원소를 다른 원소로 변환 가능 - 매개변수로 콜백함수를 받음
// 리액트에서 목록의 내용을 출력하거나 데이터를 JSX 요소로 매핑하는 등에 사용됨
// 기존 배열은 변하지 않고 새 배열을 반환
// 어떠한 유형의 원소든 다른 유형의 원소로 변환 가능
const editedHobbies = hobbies.map((item) => item + '!');
console.log(editedHobbies); // ["sports!", "cooking!", "reading!", "working!"]

const editedHobbies2 = hobbies.map((item) => ({ text: item }));
// [ {text: sports!}, {text: cooking!}, {text: reading!}, {text: working!} ]

// 4. 배열에서 특정 조건을 만족하는 첫 번째 원소 찾기
const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);

console.log(found); // 12

// 5. 배열에서 특정 조건을 만족하는 요소들만 얕은 복사본을 생성하여 반환
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter((word) => word.length > 6);

console.log(result); // ["exuberant", "destruction", "present"]

// 6. 배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
// array.reduce(리듀서 함수(누적값, 현재 값), 초기값)
const sumWithInitial = array1.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

console.log(sumWithInitial); // 10

// 7. 두 개 이상의 배열을 병합하여 새로운 배열을 반환
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3); // ["a", "b", "c", "d", "e", "f"]

// 8. 배열의 begin부터 end-1까지 얕은 복사본을 새로운 배열 객체로 반환
// 원본 배열은 바뀌지 않음
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2)); // ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4)); // ["camel", "duck"]
console.log(animals.slice(1, 5)); // ["bison", "camel", "duck", "elephant"]
console.log(animals.slice(-2)); // ["duck", "elephant"]
console.log(animals.slice(2, -1)); // ["camel", "duck"]
console.log(animals.slice()); // ["ant", "bison", "camel", "duck", "elephant"]

// 9. 배열의 기존 요소를 삭제 또는 교체하거나 새로운 요소를 추가하여 배열의 내용을 변경
const months = ['Jan', 'March', 'April', 'June'];

months.splice(1, 0, 'Feb'); // 인덱스 1에 Feb를 추가
console.log(months); // ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May'); // 인덱스 4부터 한 요소만 May로 교체
console.log(months); // ["Jan", "Feb", "March", "April", "May"]
```

- 괄호 내의 함수 본문에서 무언가를 반환하기만 하는 화살표 함수는 길이를 줄일 수 있음

  - `return` 과 중괄호를 삭제

    ```jsx
    const index = hobbies.findIndex((item) => item === 'sports');
    ```

- 자바스크립트의 객체를 반환하는 방법
  - 중괄호를 소괄호로 감싸야 함
  - 이렇게 해야 함수 본문을 정의하는 것이 아니라, 화살표 함수가 반환하는 새 객체를 정의하는 것임을 나타낼 수 있음

## 10. 구조분해할당(Destructuring)

### 1) 배열 구조분해할당

```jsx
// 방법 1: 변수를 선언하여 각각 할당
const userNameData = ['Yurim', 'Seo'];

const firstName = userNameData[0];
const lastName = userNameData[1];

// 방법 2: 구조분해할당
const [firstName, lastName] = ['Yurim', 'Seo'];
```

- 배열의 위치에 따라 값을 가져오므로, 원하는 위치에 원하는 이름 사용 가능

### 2) 객체 구조분해할당

```jsx
// 방법 1: 일반적인 방법
const user = {
  name: 'Max',
  age: 34,
};

const name = user.name;
const age = user.age;

// 방법 2: 구조분해할당
const { name, age } = {
  name: 'Max',
  age: 34,
};

// 구조분해할당에서 별칭 사용하기
const { name: userName, age } = {
  name: 'Max',
  age: 34,
};

console.log(userName);
console.log(age);
```

- 객체 구조분해할당을 할 때, 무조건 객체에 정의된 필드 이름을 사용해야 함
  - 객체는 프로퍼티의 이름을 기준으로 값을 가져오기 때문
- 콜론(:)을 사용하여 객체에서 가져온 프로퍼티와 거기에 할당할 별칭을 구분할 수 있음

### 3) 함수 매개변수 목록에서 구조분해할당

- 함수가 매개변수로 객체를 받을 경우, 객체 프로퍼티를 꺼내어 **로컬 범위 변수**로 사용할 수 있음

  - 로컬 범위 변수 : 함수 본문 내에서만 사용할 수 있는 변수

    ```jsx
    // 방법 1: 일반적인 방법
    function storeOrder(order) {
      localStorage.setItem('id', order.id);
      localStorage.setItem('currency', order.currency);
    }

    // 방법 2: 구조분해할당
    function storeOrder({ id, currency }) {
      // 디스트럭처링
      localStorage.setItem('id', id);
      localStorage.setItem('currency', currency);
    }

    storeOrder({ id: 5, currency: 'USD', amount: 15.99 }); // 1개의 매개변수 / 값!
    ```

  - 함수 본문 내부의 점 표기법을 통해 order 프로퍼티에 접근하지 않고, 구조분해할당을 이용해 접근 가능
  - id, currency 두개의 매개변수를 받는 것이 아니라, 구조분해할당이 된 객체를 받는다는 점이 중요!

## 11. 스프레드 연산자

- `…배열` 을 사용하면 해당 배열의 모든 원소를 가져옴
- 스프레드 연산자는 각 배열에서 값을 가져와 개별 값을 배열에 추가
  - 배열의 값을 가져와 쉼표로 구분된 개별 값을 새 배열에 추가

### 1) 배열에서 스프레드 연산자 사용하기

```jsx
const hobbies = ['sports', 'cooking'];
const newHobbies = ['reading'];

// const mergedHobbies = [hobbies, newHobbies];
// → [["sports", "cooking"], ["reading"]], 중첩된 배열

const mergedHobbies = [...hobbies, ...newHobbies];
// ["sports", "cooking", "reading"], 병합된 배열
```

### 2) 객체에서 스프레드 연산자 사용하기

```jsx
const user = {
  name: 'Max',
  age: 34,
};

const extendedUser = {
  isAdmin: true,
  ...user,
};

console.log(extendedUser);
// {
//  isAdmin: true,
//   name: "Max",
//   age: 34
// }
```

- 스프레드 연산자가 객체의 모든 키-값 쌍을 가져와 추가

## 12. 제어문

### 1) if문

```jsx
if (10 === 10) {
  // ...
} else if (5 === 5) {
  // ...
} else {
  // ...
}
```

- 값을 비교하고, 이 조건을 충족하는 경우에만 if문의 코드를 실행
- 첫 번째 조건이 충족되지 않았을 때 else if문을 통해 확인할 조건을 추가 가능
  - 여러 개의 else if 문 추가 가능
- 조건을 충족하지 못했을 경우 else문 실행
  - else 문은 하나만 사용 가능
- 보통 if문을 사용하여 사전에 알 수 없는 조건을 확인

  ```jsx
  const password = prompt('Your password');

  if (password === 'Hello') {
    console.log('Hello works');
  } else if (password === 'hello') {
    console.log('hello works');
  } else {
    console.log('Access not granted');
  }
  ```

### 2) for문

```jsx
// 배열을 순회하는 반복문
const hobbies = ['sports', 'cooking'];

// 배열의 모든 원소를 순회
for (const hobby of hobbies) {
  console.log(hobby);
}
// sports
// cooking
```

## 13. 함수를 값으로 사용하기

```jsx
// 함수 선언 방식 1
function handleTimeout() {
  console.log('Time out!');
}

// 함수 선언 방식 2
const handleTimeout2 = () => {
  console.log('Time out ... again!');
};

// setTimeout(handleTimeout()) - (x)
setTimeout(handleTimeout, 2000);
setTimeout(handleTimeout2, 3000);
setTimeout(() => {
  console.log('More timing out ...');
}, 4000);
```

- 함수에 다른 함수를 전달할 때, 그 자리에서 정의하지 않고 미리 정의된 것을 전달할 때는 **이름만** 전달

  - 소괄호를 작성하지 않고, 함수 자체를 값으로 전달해야 함

    → 소괄호를 작성하면 handleTimeout이 타이머가 설정될 때 바로 실행된 다음, handleTimeout 함수의 반환값이 전달됨

    → 즉, handleTimeout에서 반환되는 값이 setTimeout 함수의 첫 번째 매개변수로 전달됨

- 매개변수로 익명 함수를 정의할 때도 바로 실행하는 것이 아님
  - 익명 함수를 정의하기만 하고, 정의한 함수를 setTimeout에 전달할 뿐

```jsx
function greeter(greetFn) {
  greetFn();
}

greeter(() => console.log('Hi')); // Hi
```

- greeter 함수의 greetFn 매개변수에 console.log 함수를 값으로만 전달하고, greeter 함수 안에서 greetFn 매개변수를 실행하므로, console.log 함수가 실행되는 것

## 14. 함수 내부에서 또 다른 함수 정의하기

```jsx
function init() {
  function greet() {
    console.log('Hi!');
  }

  greet();
}

init();
```

- 자바스크립트에서는 자주 사용하지 않지만, 리액트에서 주로 사용하는 것
- init 함수 안에 정의된 greet 함수는 init 함수 안에서만 실행 가능

## 15. 참조형과 기본형 데이터 비교

### 1) 기본형

```jsx
let userMessage = 'Hello';
userMessage = 'Hello there!';
```

- string, number, boolean은 모두 기본형
- 기본형 값의 특징은 변경할 수 없음

  - 해당 변수에 다른 값을 재할당 하여 새로운 값이 생성됨
  - 기존 메모리에 저장된 값은 삭제됨

    → 기존 값이 변경되어 새로운 값이 되는 것이 아님

- 기본형 값을 다룰 때는 기존 값을 수정하는 것이 아니라, 항상 새 값을 생성하게 됨
- 기본형 값의 경우, 주소가 아닌 값 자체가 변수에 저장된다고 생각할 수 있음

### 2) 참조형

```jsx
const hobbies = ['sports', 'cooking'];
hobbies.push('working');
console.log(hobbies); // ["sports", "cooking", "working"]
```

- 객체는 참조형 값이기 때문에, 위의 배열에서 push 메서드가 기존 배열을 수정해 기존 배열이 변경된 것
- 변수에 값을 저장할 때는 값 자체를 저장하는 것이 아니라, 해당 값의 메모리 주소를 저장
  - 배열은 메모리 어딘가에 저장되는 것
  - 컴퓨터의 메모리에 저장되고, 해당 메모리 주소가 변수에 저장되는 것
- push를 호출하면 → 자바스크립트에서 해당 주소를 찾아 → 그 주소의 값을 열어 → 이 배열을 확인한 후 → 메모리에 있는 그 배열에 새로운 원소를 추가
- 따라서 메모리의 배열은 수정되지만, 메모리의 주소는 변하지 않음
- `const` 키워드를 사용하면 값을 수정할 수 없지만, 배열은 수정할 수 있음

  - `const` 는 값을 변경할 수 없다는 뜻이 아니라, 변수를 덮어쓸 수 없다는 뜻이기 때문

    ```jsx
    const hobbies = ['sports', 'cooking'];
    hobbies = []; // 에러 발생
    ```

  - 상수에는 주소를 저장하고, 해당 주소에 저장된 값을 수정하는 것이지 주소는 변경되지 않기 때문에 상수는 덮어쓸 수 없다는 개념을 위반하는 것이 아님
