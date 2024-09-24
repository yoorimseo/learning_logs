# 리액트 + TypeScript

## 0. TypeScript What & Why?

### 1) TypeScript란?

- 자바스크립트의 superset 언어
  - 자바스크립트를 기반으로 하되, 보다 더 확장된 프로그래밍 언어
- 자바스크립트의 기본적인 문법들과 코드 작성법을 그대로 사용
  - 타입스크립트는 자바스크립트에 몇 가지 기능을 추가한 것
  - 타입스크립트는 리액트와 달리 자바스크립트 라이브러리가 아니기 때문에, 자바스크립트의 기존 기능을 기반으로 새로운 기능을 만들거나 기능을 확장하지 않음
  - 대신 자바스크립트의 주요 문법보다 확장된 문법을 가짐
- 타입스크립트는 statically typed(정적 타입)의 특징을 가짐
  - 타입스크립트라는 이름도 여기에서 유래됨
  - 정적 타입 기능이 추가된 이유
    - 자바스크립트가 원래 dynamically typed(동적 타입) 언어이기 때문

### 2) TypeScript가 필요한 이유

- 자바스크립트에는 자료형(type)이 있음
  - 자바스크립트도 타입의 개념을 알고 있음
- 자바스크립트는 동적 타입 언어이기 때문에, 함수 선언 시점에는 자료형을 특정 짓지 않음
- 타입이 고정되어 있지 않고 사용할 타입을 미리 정해두지도 않은 상태에서, 전달된 매개변수를 받아 코드를 실행해보는 것
- 타입스크립트를 사용함으로써, 코드를 실행하지 않고 의도치 않은 방식의 함수나 객체 사용을 잡아낼 수 있음
  - 런타임 오류의 원인을 찾을 필요 없이, 코드를 작성할 때 바로 오류가 표시되기 때문에 유용

## 1. TypeScript 설치 및 사용하기

[JavaScript With Syntax For Types.](https://www.typescriptlang.org/ko/)

### 1) TypeScript 설치하기

```bash
npm init -y # 빈 package.json 파일 생성, 종속 라이브러리를 설치하는 데 해당 파일이 필요하기 때문

npm install typescript
npm install -g typescript # 시스템 전체에서 사용 가능하도록 설치
```

### 2) TypeScript 사용하기

- 컴파일 단계
  ```bash
  npx tsc # 컴파일러 사용
  npx tsc 파일이름
  ```
  - 타입스크립트는 브라우저에서 실행되지 않기 때문에, 타입스크립트를 자바스크립트 형태로 컴파일 해야 함
    - 컴파일이 진행되는 동안 타입 표기는 모두 삭제됨
      → 자바스크립트는 타입 표기를 이해하지 못하기 때문
    - 컴파일을 진행하면서 오류가 있다면 찾아서 알려줄 것
  - 컴파일 단계에서는 우리가 코드를 작성하면서 미처 발견하지 못했던 문제점을 찾아 알려줌
  - 컴파일된 코드는 브라우저에서 실행됨
  - `npx tsc` 를 실행하려면, 타입스크립트 구성 파일을 프로젝트 폴더에 추가해 타입스크립트에게 컴파일 할 파일을 알려주어야 함
  - 컴파일이 완료되면, 오류를 알려주고 자바스크립트 파일도 제공
    - 해당 자바스크립트 파일은 타입스크립트 파일을 기반으로 함
    - 거의 동일하지만, 타입 표기가 없고 `const`가 `var`로 바뀜
      → 구 버전의 브라우저에서도 동작하는 형태로 코드를 컴파일하는 것이기 때문

## 2. 기본 타입(Primitives) 탐색하기

```tsx
let 변수이름: 타입;
let 변수이름: 타입 = 값;
```

- number, string, boolean, null, undefined
  - 소문자로 작성해야 함
  - 대문자로 작성하면 객체를 가리키게 됨
- 선언한 타입으로만 값 할당 가능
- 타입을 아무것도 설정하지 않으면 `any` 타입으로 간주
  - `any` 타입을 명시적으로도 설정 가능
  - 예비적으로 사용하는 타입이므로, 사용하지 않는 것이 좋음
    → 타입스크립트를 사용하려는 목적과 반대되는 것이기 때문

## 3. 배열 및 객체 타입 작업하기

```tsx
// 배열
let 변수이름: 타입[];

// 객체
let 변수이름: {
  키: 타입;
};

// 여러 개의 객체를 갖는 배열
let 변수: {
  키: 타입;
}[];
```

- 해당 타입으로 된 요소만 배열의 값으로 가질 수 있음
- 해당 타입으로 된 값만 객체의 값으로 가질 수 있음

## 4. 타입 추론(Type Inference) 이해하기

```tsx
let course = 'React - The Complete Guide';

course = 12341; // string이 아닌 다른 타입의 값을 할당하려고 하면 오류 발생
```

- 기본적으로 타입스크립트는 가능한 많은 타입을 유추하려고 함
  - 명시적인 타입 표기가 없어도, 어떤 타입을 어디에 사용해야 할지 알아내려고 함
  - 타입스크립트는 변수에 할당된 값의 자료형을 확인하고, 이 값의 자료형을 해당 변수의 타입으로 여기고 사용

## 5. 유니온 타입 사용하기

```tsx
let course: string | number = 'React - The Complete Guide';

course = 12341;
```

- 유니온 타입은 타입을 정의할 때, 한 개 이상의 타입을 사용할 수 있음
- |(파이프 문자)를 사용하여 여러 개의 타입을 명시적으로 지정 가능
  - `첫 번째 타입 | 두 번째 타입 | ...`
- 유니온 타입은 값과 타입을 좀 더 유연하게 정의할 수 있게 해줌

## 6. Type Aliases(타입 별칭)의 이해

```tsx
type Person = {
  name: string;
  age: number;
};

let person1: Person;
let person2: Person[];

person1 = {
  name: 'Max',
  age: 32,
};
```

- 우리가 직접 기본(Base) 타입을 만들어 복잡한 타입을 정의해두고, 반복해서 타입을 정의하는 대신에 그 타입 별칭을 사용
- `type` 키워드를 사용하여 타입의 형태를 타입 별칭으로 정의할 수 있음
  - `type` 키워드 뒤에 원하는 변수 이름을 붙이면, 이것이 새로운 타입의 이름이 됨
  - =(등호) 뒤에 있는 것은 자바스크립트 값이 아니라, 타입을 정의한 것
    - 이것은 우리가 만든 객체 타입
- 타입 별칭을 사용하여 작성해야 할 코드의 양을 줄일 수 있음
  - 코드가 좀 더 간결해지고, 관리하기도 수월해짐

## 7. 함수 및 함수 유형

### 1) 매개변수에 타입 지정하기

```tsx
function add(a: number, b: number) {
  return a + b;
}
```

- 함수를 사용할 때 타입을 지정하는 위치가 따로 있음
  - 매개변수에 `:` 을 사용하여 타입을 지정할 수 있음

### 2) 함수의 반환 값에 타입 지정하기

- 타입스크립트는 함수의 반환 값이 갖는 타입을 통해 타입 추론을 할 수 있음
  ```tsx
  // 반환 값의 타입에서 추론된 것
  function add(a: number, b: number): number;
  ```
- 함수의 반환 타입을 직접 지정할 수도 있음
  ```tsx
  function add(a: number, b: number): number {
    return a + b;
  }
  ```
  - 매개변수 목록 뒤에 `:` 을 사용하여 반환 타입을 지정
  - 꼭 지정해야 할 이유가 없다면, 지정하지 않는 것이 좋음
    → 타입스크립트가 알아서 타입을 추론하기 때문
- 함수에서 타입을 사용할 때는 매개변수의 타입 뿐만 아니라, 반환 값의 타입도 생각해야 함
  - 함수에는 입력만 있는 것이 아니라, 출력도 있기 때문
    - 그래서 반환 타입이 있는 것

### 3) return 문이 없는 경우 타입 지정하기

```tsx
function printOutput(value: any) {
  console.log(value);
}
```

- `void` 타입은 null 또는 undefined와 비슷하지만, 항상 함수와 결합해서 사용한다는 특징
- `void` 는 함수에 반환 값이 없다는 것을 뜻함
  ```tsx
  function printOutput(): void;
  ```

## 8. Generics(제네릭)으로 뛰어들다

### 1) 제네릭이 필요한 이유

```tsx
function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

updatedArray[0].split(’’); // 에러
```

- 직접 만든 유틸리티 함수나 helper 함수라고 할 수 있음
  - 이 함수가 있으면, 호출하기만 해도 기존 배열은 유지한 채 배열에 새로운 값을 추가할 수 있음
    → 기존 배열을 변경하지 않는다는 장점
- 매개변수에 `any` 타입을 사용하면, 함수를 호출한 다음 타입스크립트로부터 어떤 지원도 받을 수 없게 됨
  - `updatedArray[0].split(’’);` 를 실행하면 오류가 발생
    → 숫자 값에서는 `split` 메서드를 호출할 수 없기 때문
  - 하지만 타입스크립트는 `updatedArray[0]` 값이 숫자라는 것을 알 수 없음

### 2) 제네릭이란?

```tsx
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
```

- 함수 이름과 매개변수 목록 사이에 `<>` 를 추가하여 제네릭을 정의
  - 자바스크립트에서는 지원하지 않는 기능으로, 타입스크립트에서만 사용 가능
  - 보통 Type의 T를 사용
- `<>` 에 정의한 타입을 함수와 매개변수 목록에서 사용 가능
- 이제 함수를 호출하면 타입스크립트는 매개변수에 들어온 인수의 값을 정확히 살펴봐야 한다는 것을 알 수 있음
  - 제네릭 타입을 사용해 타입스크립트에게 `any` 타입이 아니라는 것을 알려줬기 때문
    예) 매개변수의 array와 value 값이 같은 타입을 가져야 한다는 것을 알려준 것
    `insertAtBeginning(demoArray, -1);` 에서 `demoArray` 배열이 숫자 배열이라는 것을 알게 되고, `-1` 의 타입을 확인함
- 제네릭은 함수를 작성하는 데에 도움을 줌
  - 함수의 타입 안정성과 유연성을 준 것
  - 어떤 타입이든 사용할 수 있지만, 특정 타입을 사용해 함수를 실행하고 나면 해당 타입으로 고정되어 동작

## 9. 제네릭 자세히 살펴보기

```tsx
let numbers = [1, 2, 3];

// 1) 위의 배열을 명시적으로 할당하여 숫자의 배열임을 정의
let numbers: number[] = [1, 2, 3];

// 2) 타입스크립트에 실제 타입이 "generic type placeholder"에 사용되야 한다고 하는 것
let numbers: Array<number> = [1, 2, 3]; // 제네릭 타입으로 할당

// 3) 자리 표시자에 대한 구체적인 유형을 설정
const stringArray = insertAtBeginning<string>(['a', 'b', 'c'], 'd');
```

- `number[]` 는 TypeScript 표기법으로써 "이것은 숫자의 배열입니다" 라고 정의하는 것
- 하지만 실제 유형은 `Array` 이고, 모든 배열은 `Array` 유형임
- 배열 유형은 배열의 항목 유형도 설명하는 경우에만 의미가 있으므로 `Array` 은 실제로는 제네릭 타입
- 2)와 같이 작성할 수 있지만, 코드가 길기 때문에 더 짧은 대안(문법적 설탕)인 1)이 존재

### 2) `<>` 를 사용하는 장점

- 제네릭 유형을 정의할 수 있음
- 제네릭 유형을 사용해야 하는 자리 표시자 유형을 명시적으로 설정할 수도 있음
- 타입스크립트가 올바른 타입을 추할 수 없는 경우에 필요

## 10. 리액트 + TypeScript 프로젝트 만들기

- Create React App 공식 문서 > Building your App > Adding TypeScript
  [Adding TypeScript | Create React App](https://create-react-app.dev/docs/adding-typescript)
  ```bash
  # 타입스크립트 프로젝트 생성
  npx create-react-app my-app --template typescript

  # 개발 서버 실행
  npm start
  ```
- 설치된 프로젝트/src 안에 있는 파일들의 확장자는 `.tsx`
  - 우리가 타입스크립트를 사요앟고 있음을 나타냄
  - JSX 문법을 사용하기 때문에 `tsx` 확장자
- 우리가 작성한 타입스크립트 코드를 자바스크립트로 컴파일하여 최적화하는 작업을 수행해야 함
  - 리액트와 바닐라 자바스크립트를 사용했을 때, 개발 서버는 자바스크립트 코드를 받아 파일들을 하나로 묶는 작업을 수행하고 최적화 단계를 별도로 제공
  - 타입스크립트를 사용하기 때문에, 위의 과정에 추가적으로 타입스크립트를 자바스크립트로 컴파일하는 단계가 존재
  - 우리가 컴파일러를 직접 호출하거나 타입스크립트 파일을 직접 변환할 필요 없이, `npm run build` 명령어를 통해 밑단에서 자동으로 수행됨
- `package.json` 에서는 대부분 전에 봤던 `dependencies` 와 동일하지만, `typescript` 와 `@type/` 가 추가됨
  - `typescript` 는 타입스크립트용 컴파일러 언어로, 프로젝트에 설치되어 있음
  - `@type/` 패키지는 바닐라 자바스크립트와 타입스크립트 프로젝트 사이에서 번역기 역할을 함

## 11. Props 및 TypeScript 작업하기

### 1) `React.FC` 와 뒤에서 일어나는 일 이해하기

```tsx
import React from 'react';

const Todos: React.FC<{items: string[]}> = (props) => {
  return ...;
};

export default Todos;
```

- 컴포넌트 함수를 화살표 함수 구문을 사용하여 작성
  - 해당 컴포넌트 함수에 `React.FC` 타입을 지정
- `React.FC`
  - @types/react 패키지에 정의된 타입
  - `FC` 는 `FunctionComponent` 라는 타입
  - `React.FC` 로 정의함으로써, 해당 함수가 함수형 컴포넌트로 동작한다는 것을 명시
- `<>` 를 사용하여 내부적으로 사용되는 `React.FC`에 의해 정의된 제네릭 타입 T에 구체적인 값을 설정
  - 제네릭을 사용할 때와 다름
  - `React.FC` 이미 제네릭 타입
- 이렇게 하는 이유는, 타입스크립트가 제네릭 타입을 추론하게 둘 수 없기 때문
  - 매개변수를 넣고 제네릭 함수를 호출해서 해당 값의 타입을 추론하도록 두는 것이 아님
  - 함수를 정의하고 타입스크립트에게 이 함수를 내부적으로 어떻게 처리해여 하는지 알려주고 싶기 때문
  - 우리가 추가한 `props`를 받아서 모든 함수형 컴포넌트가 갖고 있는 `children` 프로퍼티 같은 기본적인 `props` 들과 합칠 수 있도록 하기 위함
- 즉, `React.FC<{}>` 에 넣을 값은 내가 만든 `props` 객체
  - 해당 함수형 컴포넌트에 맞게 `props` 를 정의한 객체인 것
  - 이것이 제네릭인 이유는, 함수형 컴포넌트마다 `props` 에 대한 정의가 다르기 때문

### 2) 리액트와 타입스크립트로 함수형 컴포넌트 만들기

```tsx
// Todos.tsx
import React from 'react';

const Todos: React.FC<{ items: string[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Todos;

// App.tsx
import Todos from './components/Todos';

function App() {
  return (
    <>
      <Todos items={['Learn React', 'Learn TypeScript']} />
    </>
  );
}

export default App;
```

- `React.FC` 타입을 함수형 컴포넌트의 상수 옆에 사용
- `<>` 를 붙인 다음, 이 괄호 사이에 필요한 형태의 `props`(프로퍼티 객체의 타입)를 정의
  - 컴포넌트에 직접 만든 `props`가 필요한 경우 사용
- 이렇게 하면 해당 컴포넌트 안에서 직접 만든 `props` 사용 가능

### 3) 리액트에서 타입스크립트를 사용하는 것의 장점

- 코드에서 많은 것이 설명됨
- 컴포넌트 안에서 작업할 때 자동완성 기능도 사용 가능
- 컴포넌트를 잘못된 방식으로 사용하지 않도록 개발 툴이 오류를 알려줌

## 12. 데이터 모델 추가하기

### 1) 데이터 모델 만들기

```tsx
// models/todo.ts
class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
```

- 타입스크립트에서 `class` 를 사용할 때 `class` 에 추가할 프로퍼티가 있거나 추가할 속성이 있을 경우, `constructor`(생성자)를 통해 추가할 필요가 없음
  → 바로 `class` 를 추가할 수 있음

### 2) 데이터 모델 사용하기

- 정의된 클래스는 호출되었을 때 새로운 객체를 생성하는 생성자 역할 뿐만 아니라, 타입 역할도 할 수 있음
  ```tsx
  // 생성자 역할
  import Todos from './components/Todos';
  import Todo from './models/todo';

  function App() {
    const todos = [new Todo('Learn React'), new Todo('Learn TypeScript')];

    return (
      <>
        <Todos items={todos} />
      </>
    );
  }

  export default App;

  // 타입 역할
  import React from 'react';
  import Todo from '../models/todo';

  const Todos: React.FC<{ items: Todo[] }> = (props) => {
    return (
      <ul>
        {props.items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  };

  export default Todos;
  ```
  - items 객체는 Todo 클래스 정의에 부합하는 객체인 것
    - items 배열의 객체는 id와 text 문자열 타입의 프로퍼티를 가질 것

### 3) 이렇게 작성함으로써 얻는 이점

- 코드에 이상이 없고 구조가 명확하다는 것을 알 수 있음
- 컴포넌트나 데이터를 잘못 사용하는 일도 훨씬 줄어듦
- 앱을 테스트하다가 오류를 발견하기 보다, 개발 과정에서 오류를 미리 수정할 수 있음

## 13. TypeScript 프로젝트의 Form 제출

```tsx
const NewTodo: React.FC = () => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
```

- `React.FormEvent`
  - 이벤트 객체 타입은 폼 제출 이벤트를 수신하면 자동적으로 받게 됨

## 14. refs 및 useRef 작업하기

### 1) 참조 사용하기

```tsx
import { useRef } from 'react';

const NewTodo = () => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    // 사용자가 입력한 값 검증하기
    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
```

- `const todoTextInputRef = useRef();` 와 같이 작성하면, 타입스크립트는 `input`에 연결될 것이라는 사실을 알지 못함
  - 해당 참조에 저장될 데이터가 어떤 타입인지 명확하게 밝혀야 함
- 타입스크립트에서 해당 요소를 참조할 때 사용할 수 있도록, 모든 DOM 요소들은 미리 정의된 타입을 가짐
- 참조에는 시작 값을 직접 넣어주어야 함
  - 처음에 만들 때는 넣어줄 값이 없기 때문에 `null` 로 지정
- 참조값에 타입스크립트를 사용하여 좋은 점은, 해당 참조가 가지고 있는 요소를 명확하게 저장했기 때문에 `HTMLInputElement` 의 자동 완성 기능을 사용할 수 있음
  - input 요소 객체의 프로퍼티를 전부 볼 수 있음
- 자동 완성을 사용했을 때 `todoTextInputRef.current?.value;` 에서 `?` 가 붙은 이유는, 참조에 아직 값이 설정되지 않았을 수도 있기 때문
  - `?` 는 타입스크립트에게 일단 값에 접근해보고 접근이 가능하다면, 그때 입력된 값을 가져와 `enteredText` 에 저장하라고 알리는 것
    - 접근이 불가하다면 아직 연결되지 않은 상태일 것이고, `null` 이 `enteredText` 에 저장됨
  - 그래서 `enteredText` 의 추론된 타입이 `const enteredText: string | undefined` 인 것
  - 즉, 타입스크립트가 실제 `value` 를 가져올 수 있는지 반드시 알아야 할 필요는 없다는 것
- 참조와 `input` 요소가 연결되었다는 것을 알고 있다면 `!` 를 사용할 수 있음
  - `!` 는 타입스크립트에게 이 값이 `null` 이 될 수 있다는 것은 알지만, 이 시점에는 절대 `null` 이 아니라고 알려주는 것
  - `enteredText` 의 추론된 타입이 `const enteredText: string` 이 됨

### 2) `!` , `?` 연산자 알아보기

- `!` 나 `?` 연산자는 참조와 크게 상관이 없음
  - 리액트에만 있는 기능이 아니라 일반적인 연산자로, 타입스크립트에서도 사용할 수 있음
  - `null` 일 수도 있는 값을 다룰 때는 `?` 를 사용해서 먼저 해당 값에 접근
    - `null` 일 경우, 상수 또는 값을 저장할 곳에 `null` 을 저장
  - `!` 를 사용하면 해당 값이 절대 `null` 이 될 수 없으니, 바로 객체의 프로퍼티로 들어가서 `null` 이 아닌 실제 값을 가져오라는 뜻
    - 확실히 연결이 완료된 상태이고, `null` 이 아니라고 100% 확신하는 경우에만 사용해야 함

## 15. Function Props로 작업하기

```tsx
// NewTodo.tsx
import { useRef } from 'react';

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const todoTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    props.onAddTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='text'>Todo text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;

// App.tsx
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const todos = [new Todo('Learn React'), new Todo('Learn TypeScript')];

  const addTodoHandler = (todoText: string) => {
    // ...
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} />
    </div>
  );
}

export default App;
```

- `React.FC<{onAddTodo: (text: string) => void }`
  - 화살표 함수를 사용하여 `onAddTodo` prop이 함수 타입임을 알림
  - prop으로 받는 함수가 가지는 매개변수와 반환 값에 대해서도 타입을 설정해야 함
    - 값을 반환할 필요가 없는 경우 `void` 를 사용

## 16. State 및 TypeScript 관리하기

```tsx
// App.tsx
import { useState } from 'react';

import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} />
    </div>
  );
}

export default App;
```

- `const [todos, setTodos] = useStat([]);` 와 같이 빈 배열을 초기값으로 사용할 경우, 타입스크립트는 `const todos: never[]` 와 같이 타입을 추론함
  - `never` 라는 타입은 어떤 값도 추가될 수 없고 언제나 비어있어야 한다는 뜻
- `useState<Todo[]>([])` 와 같이 작성하여, 처음에는 빈 배열이지만 나중에 배열에 항목을 추가할 때는 반드시 `Todo` 타입이어야 함

## 17. 연습하기 : Todo 제거하기

```tsx
onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
```

- `호출될_함수.bind()`
  - 자바스크립트에서 제공하는 메서드로, 실행할 함수를 미리 설정할 수 있음
  - 첫 번째 인자 : 호출될 함수 안에서 무엇을 가리키는지 지정
  - 두 번째 인자 : 인수에 넣을 값

## 18. tsconfig.json 탐색

```tsx
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5", // 작성한 코드를 어떤 자바스크립트 버전으로 변환할건지 결정
    "lib": [ // default 타입스크립트 라이브러리, 어떤 타입이 타입스크립트에서 기본적으로 지원되는지 결정
	    // 아래의 라이브러리들은 기본적으로 타입스크립트에 내장되어 있으므로, 추가적인 패키지 설치가 필요하지 않음
      // 프로젝트에 사용하려면 이곳에 이름을 추가해야 함
      "dom", // 기본 DOM 타입들을 타입스크립트가 이해할 수 있음(예. NewTodo.tsx의 ref 사용)
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true, // .js 파일 포함 여부를 결정
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true, // 해당 프로젝트에서 가장 엄격한 설정이 적용됨(예. 묵시적인 any 타입 사용 불가)
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx" // JSX 코드를 지원할 것인지 결정
  },
  "include": [
    "src"
  ]
}
```

- 이 파일은 프로젝트에서 타입스크립트를 사용하고, 타입스크립트 코드를 자바스크립트 코드로 컴파일하는 경우, 특정 프로젝트에 추가할 수 있음
- 이 파일로 컴파일과 관련된 사항을 구성
- 리액트 프로젝트의 경우 개발 서버를 구동시키거나 프로젝트를 빌드해 햅을 만들 때, 컴파일러가 자동으로 호출됨
  - 빌드는 설정된 순서대로 백그라운드에서 진행되고, 타입스크립트 컴파일러도 빌드 과정에서 사용됨
- `tsconfig.json` 로 컴파일러를 설정하는데, 다양한 옵션이 있음
- 마우스 호버를 하면 해당 옵션에 대해 간략한 설명을 볼 수 있음
