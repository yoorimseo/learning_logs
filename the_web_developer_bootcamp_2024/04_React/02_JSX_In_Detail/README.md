# JSX In Detail

## 1. 컴포넌트를 import 하고 export 해서 사용하기

- 리액트 애플리케이션을 쓰는 일반적인 방법
  - 하나의 파일에 하나의 컴포넌트를 두는 것
    → 각 컴포넌트가 고유의 파일을 갖도록 함
  - 해당 파일의 이름은 컴포넌트의 이름과 같아야 함
- ES6 모듈 기능을 사용하여 파일 간의 기능을 불러오고 내보내서 사용
  - import하는 방법
    ```jsx
    // index.js
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';

    import App from './App';

    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    ```
    - 파일들 간의 코드를 공유하는 아주 쉬운 방법
    - 웹팩이 뒤에서 작동하고 있기 때문에 사용 가능
  - export 하는 방법
    - export default가 가장 흔하게 사용되는 방법
      ```jsx
      // Greeter.js
      export default function Greeter() {
        return <h1>HELLO!</h1>;
      }
      ```
    - 구성요소를 먼저 정의한 다음 default로 export하는 방법
      ```jsx
      // Greeter.js
      function Greeter() {
        return <h1>HELLO!</h1>;
      }

      export default Greeter;
      ```
    ⇒ export default를 사용하고 import 했을 때, 내가 원하는 이름으로 사용할 수 있음
    - 개별 요소를 이름으로 export 하는 방법
      ```jsx
      // Dog.js
      function Dog() {
        return <p>WOOF!!!</p>;
      }

      export { Dog };

      // App.js
      import { Dog } from './Dog';
      ```

## 2. JSX의 규칙

- <`img />`, `<br />`, `<input />` 태그와 같은 **self closing** 요소를 작업할 경우 반드시 `/>`로 정확히 태그를 닫아야 함
  - 바벨이 JSX 코드를 구문 분석할 때, 항상 닫는 태그를 찾기 때문
- 컴포넌트는 단일 요소(단일 최상위 레벨 요소)만 반환할 수 있음
  - 가장 상위 레벨의 요소 하나만 반환할 수 있다는 의미
    ```jsx
    export default function LoginForm() {
      return (
        <div>
          <input type='password' />
          <input type='text' />
        </div>
      );
    }
    ```

## 3. 리액트 Fragments

```jsx
export default function LoginForm() {
	return (
		<>
			<input type="password" />
			<input type="text" />
			<button>Login</buttonn>
		</>
	);
}
```

- 컴포넌트는 하나의 요소만 반환할 수 있는데, 이것을 위해 `<div>` 와 같은 불필요한 태그를 추가하지 않고 반환하는 방법
- `<> </>` 프래그먼트는 기본적으로 콘텐츠가 없는 빈 HTML이나 JSX 태그의 집합
  → 실제 마크업이 일어나지 않고 JSX의 규칙을 충족시켜 한 요소만 반환하게 함
- 이 태그는 무의미한 것이기 때문에 문서가 렌더링 될 때 프래그먼트 안에 있는 요소들만 추가됨
  → 태그들을 감싸는 프래그먼트가 실제 HTML 요소가 추가되지 않음
- 하위 요소들을 감싸는 태그가 따로 필요하지 않을 경우 사용

## 4. JSX에서의 JS 문법 사용하기

- JSX 콘텐츠에 동적 값을 추가하는 방법(템플릿을 만드는 방법)
  - `{ }` 중괄호를 사용하여 JS 문법을 반환
    ```jsx
    function Dog() {
      const pet = 'Elton';

      return (
        <>
          {1 + 2 + 3 + 4}
          <p>{pet} says WOOF!!!</p>
        </>
      );
    }

    export default Dog;
    ```

## 5. 리액트 컴포넌트 분해

- 리액트에서 컴포넌트의 크기를 작게 만들어 나가는 것
- 콘텐츠를 작은 컴포넌트로 만든 다음 조금 더 큰 컴포넌트로 재결합하는 방법
  → 작은 부품들을 통해 완성품을 만드는 과정과 비슷

## 6. 컴포넌트 스타일링

- 전통적인 스타일링 방식
  ```jsx
  // Die.js
  import "./Die.css";

  export default function Die() {
  	const roll = Math.floor(Math.random() * 6)) + 1;
  	return (
  		<h1 className="Die">Die Roll: {roll}</h2>
  	);
  }

  //Die.css
  .Die {
  	color: purple;
  }
  ```
  - 상위 레벨 컴포넌트에 해당 컴포넌트와 이름이 동일한 클래스를 추가
  - `class` 키워드는 JS에서 예약어이기 때문에 사용 불가
  - 대신 `className` 을 사용하여 스타일링
  - 스타일시트 파일을 import해서 웹팩이 이 파일을 css 번들에 포함하게 함
  - 해당 스타일은 하나의 컴포넌트에 국한되지 않고 사용 가능
    → but, 같은 이름의 컴포넌트에 같은 이름의 스타일만 사용하는 것이 관례
    → 많은 컴포넌트가 있을 경우, 파일의 코드가 길어질 것이고 어디서 스타일을 바꿔야 할지 혼란스러워지기 때문
