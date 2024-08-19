# 리액트의 핵심 - 심화 단계

## 1. JSX를 꼭 사용하지 않아도 되는 이유

### 1) JSX의 빌드 과정

- 개발 환경 뒤에서 실행되며, 코드를 변환하고 최적화하여 브라우저에서 사용 가능하도록 함
- 이론 상으로는 JSX의 도움 없이 리액트 앱을 빌드할 수 있음

  → 리액프 프로젝트의 빌드에 JSX는 굳이 필요하지 않지만, JSX는 편의성이 좋음

### 2) JSX 코드를 대체하여 컴포넌트로 반환하기

```jsx
// 원본 코드
<div id="content">
 <p>Hello World!</p>
</div>

// 변환 코드
React.createElement(
 'div',
 {
  id: "content",
  React.createElement(
   'p',
   null,
   "Hello World!"
  )
 }
);
```

- 리액트에서 노출한 `createElement` (요소 생성) 메서드를 사용하여 변환

  - `createElement` 메서드는 컴포넌트 타입을 가장 먼저 생성되어야 하는 첫 인수로 지정
  - 그 다음 props 객체를 지정해, 해당 컴포넌트 혹은 요소에 값을 전달할 수 있게 됨
  - 그러고나서 child 요소를 세 번째 인수로 지정

    ⇒ 어떤 콘텐츠가 컴포넌트의 시작 태그와 종료 태그 사이에 들어갈지 제어가 가능

- 이것이 만드는 구조는 위의 HTML 코드와 동일
- 만약 빌드 과정이 없는 프로젝트를 원한다면, 위와 같이 JSX를 사용하지 않는 접근 방식을 사용할 수 있음
- 그러나 빌드 과정을 포함하는 프로젝트를 만드는 것이 어렵지 않으므로, JSX를 사용하는 접근 방식이 더 사용하기 쉽고 가독성이 훨씬 뛰어남

  → JSX를 사용하지 않으면 상대적으로 장황하고 직관저이지 않기 때문

### 3) JSX를 사용하지 않는 방법으로 index.jsx 파일 수정하기

```jsx
import React from "react"; // 추가한 코드
import ReactDom from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
// ReactDOM.createRoot(entryPoint).render(<App />);
ReactDOM.createRoot(entryPoint).render(React.createElement(App); // 추가한 코드
```

- 이렇게 작성하면 화면 상으로는 이전과 같은 앱이 보이고 에러도 없다고 뜸

  → 위의 코는 JSX 코드의 유효한 대안이기 때문

## 2. Fragments(프래그먼트) 사용법

### 1) 컴포넌트 함수에서 반환되는 값에 대해 알아보기

- JSX 표현식은 하나의 상위 혹은 부모 요소를 가지고 있어야 함

  - return 문은 하나의 요소를 반환해야 함

    → 그렇지 않고 형제 요소들을 반환한다면 에러 발생

- 자바스크립트에서는 값을 두 개 이상 반환하려면, 괄호로 감싸거나 여러 줄로 반환문을 작성한다고 해서 되지 않음

  → 그러므로 이것은 유효하지 않은 자바스크립트 코드

  → 자바스크립트는 두 개 이상의 값이 아닌 하나의 값만 반환할 수 있기 때문

- JSX 코드의 두 조각 또한 결국에는 두 개의 값이라고 볼 수 있음

  ```jsx
  function App() {
    return (
      <Header />
      <main>
        ...
      </main>
    );
  }
  ```

- JSX 코드는 단순화된 요약본(syntactic sugar)에 가까움
- 결국, 하나의 값만을 반환하기 위해 형제 요소들을 감싸는 부모 요소가 존재해야 하는 것

  → 여기서 부모 요소는 모든 형제 요소들의 값을 감싸는 객체 혹은 배열로 생각할 수 있음

- 부모 요소로 감싸야 한다는 한계점으로 인해, DOM 구조에는 div 요소가 두개 생길 수 밖에 없음

  ```jsx
  <div id='root'>
    <div>
      <header> ... </header>
      <main> ... </main>
    </div>
  </div>
  ```

  - 이것 자체로는 큰 문제가 되지 않지만, DOM에 중복되는 요소가 있다는 것은 불필요한 내용
  - 그렇기 때문에 리액트가 제안한 대안이 Fragments(프래그먼트) 컴포넌트를 사용하는 것

### 2) Fragments(프래그먼트)

- root 컴포넌트가 필요한 경우, 형제 컴포넌트를 감싸는 용도로 사용 가능

  → 하지만 화면 상으로 보이는 실제 요소를 렌더링하면 안됨

- 이전 버전

  ```jsx
  import { Fragment } from 'react';

  function App() {
    return (
      <Fragment>
        <Header />
        <main>...</main>
      </Fragment>
    );
  }
  ```

  - 위와 같이 사용하고 개발자 도구를 열어 확인하면, 불필요한 div가 없다는 것을 확인 가능

- 최신 버전

  ```jsx
  function App() {
    return (
      <>
        <Header />
        <main>...</main>
      </>
    );
  }
  ```

  - 이러한 빈 태그는 대다수의 리액트 프로젝트에서 사용 가능
  - 이 빈 태그는 fragment에 대한 대안으로, 리액트에서 사용 가능

## 3. 컴포넌트를 분리해야 할 때는 언제일까?

### 1) App.jsx의 예시를 통해 알아보자

- App 컴포넌트에서 다양한 책임이 발생하게 되는 이유

  - state를 사용하여 상호작용 가능한 부분을 관리
  - 데이터 파일(data.js)에서 coreConcept 데이터를 가져옴
  - 해당 컴포넌트의 역할이 coreConcept 섹션 및 아이템 모두를 렌더링
  - Examples 컴포넌트의 TabButton 컴포넌트 관리와 화면 하단의 상호작용 가능한 부분 담당

    ⇒ 이 모든 것을 App 컴포넌트가 관리하고 있기 때문!

    ⇒ 단 하나의 컴포넌트를 가지고 위와 같이 다양한 요소를 관리하고 있다면 더 작게 나눠주는 것이 좋음

    → 더 작은 단위의 하위 컴포넌트를 여러 개로 나누는 것이 좋음

- 또한, Examples의 탭 버튼을 클릭할 때마다 상단의 텍스트가 바뀌는 것을 확인할 수 있음

  - 이러한 현상이 생기는 이유는, selectedTopic이라는 state를 제어하고 있기 때문
    - 이 상태가 업데이트 될 때마다 해당 상태를 업데이트 하는 함수 즉, App 컴포넌트 함수가 매번 재실행되기 때문
    - App 컴포넌트 함수가 재실행되면, 리액트가 JSX 코드에 어떤 변화가 생겼는지 확인하고 화면 상으로 보이는 내용을 업데이트 하게 됨
  - 위와 같은 상황 때문에 Header 컴포넌트도 마찬가지로 재실행되어 상단의 텍스트가 바뀌는 것

    → Header 컴포넌트는 App 컴포넌트에 속해 있고, 재실행되는 시점은 App 컴포넌트 함수가 재실행될 때임

  - 상태를 관리하는 데 있어, selectedTopic의 상태 관리가 잘못된 컴포넌트 안에서 이루어지고 있을 가능성이 있다는 뜻

- 추가 컴포넌트가 들어갈 만한 위치를 잘 파악하는 것 뿐만 아니라, 큰 컴포넌트를 더 작은 컴포넌트로 잘게 쪼개게 되면 책임을 나눌 수 있으므로 아주 중요한 부분

## 4. Feature(기능) 및 State(상태)로 컴포넌트 분리하기

### 1) Feature(기능)에 따라 컴포넌트 분리하기

```jsx
// App.jsx
import Header from './components/Header/Header.jsx';
import CoreConcepts from './CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
```

- App.jsx는 section에 따라 기능이 분리되어 있음
- 다양한 기능을 다양한 컴포넌트에 배분하는 것은 모든 리액트 프로젝트에 있어서 아주 좋은 전략
- 우리의 목표는 App 컴포넌트를 간결하게 만드는 것

  - 다양한 기능들을 App 컴포넌트 파일 바깥에서 가져와서 각각의 컴포넌트에 넣으려고 하는 것
  - 규모가 큰 리액트 프로젝트의 경우, 코드를 다양한 컴포넌트로 나누어두면 리액트 개발이 훨씬 쉬워지고 프로젝트 관리가 더 쉬워짐

    ⇒ 이제 Examples의 탭을 클릭했을 때, 상단의 텍스트가 변하지 않음을 확인할 수 있음

    → 그 이유는 selectedTopic 상태가 Examples 컴포넌트에 포함되어 있기 때문

    → 그러므로 selectedTopic 상태가 변할 때마다 App 컴포넌트 함수가 아닌 Examples 컴포넌트 함수가 새로고침이 됨
