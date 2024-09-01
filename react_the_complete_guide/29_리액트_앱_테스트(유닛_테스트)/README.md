# 리액트 앱 테스트(유닛 테스트)

## 1. 다양한 종류의 테스트 이해하기

### 1) 테스팅이란?

- 수동적인 테스팅
  - 개발자로서 코드를 작성해서 특정 속성을 구현하거나 특정 문제를 해결하여 애플리케이션을 브라우저에서 먼저 보고, 시험적으로 테스트 한 것
    → 개발자로서 우리가 항상 하는 것
  - 우리가 보는 것이 사용자가 보게 될 것이기 때문에 잘 작동하도록 확실히 해야 함
  - 이것이 우리가 수행하는 유일한 테스트일 경우, 이런 수동적인 앱 테스팅은 오류 발생이 쉬움
    → 수동으로는 가능한 모든 조합과 시나리오를 테스트하기 어렵기 떄문
- 자동화된 테스팅
  - 이것이 수동적인 테스팅을 대체하는 것은 아님
    - 수동적인 테스팅은 언제나 매우 중요
  - 추가적인 코드를 작성해서 이 코드가 실행되면서 다른 코드(애플리케이션의 메인 코드)를 테스트
  - 장점
    - 전체 애플리케이션을 자동으로 테스트하는 코드를 작성하기 때문에, 항상 모든 것을 테스트할 수 있음
    - 서로 다른 개별 구성요소에 대한 테스트를 진행 가능
    - 모든 것을 상시 테스트 할 수 있음
    - 수동적인 테스팅과 함께 사용한다면 오류들을 훨씬 더 일찍 잡을 수 있고, 더 나은 코드를 작성해서 애플리케이션에 제공 가능

### 2) Unit Tests(단위 테스트)

- 애플리케이션의 가장 작은 단위에 대한 테스트를 작성하는 것
  - 모든 개별 단위를 자체적으로 테스트 하면, 전체 애플리케이션도 작동한다는 개념
- 애플리케이션에서 사용하는 개별 함수들을 테스팅
  - 리액트의 경우, 애플리케이션의 다른 컴포넌트와 독립적으로 일부 컴포넌트를 테스팅하는 것
- 일반적으로 프로젝트에는 많은 단위 테스트가 포함됨
  - 애플리케이션을 구성하는 모든 단위, 모든 함수 및 컴포넌트를 테스트 하기를 원하기 때문
- 단위 테스트는 가장 일반적이고 중요한 종류의 테스트

### 3) Integration Tests(통합 테스트)

- 여러 개의 구성 요소의 조합을 테스트
  - 전체 애플리케이션도 실제로 작동하는지 확인하기 위해서 이 모든 단위를 모아 통합 테스트를 해볼 수 있음
    예) 여러 구성 요소가 함께 작동되는지 테스트
- 프로젝트에는 일반적으로 몇 가지 통합 테스트가 포함됨
  - 하지만 단위 테스트만큼 많지는 않음
    - 단위 테스트와 통합 테스트를 구별하는 것이 쉽지는 않음
    - 흔히 컴포넌트를 테스트할 때, 한 컴포넌트가 다른 컴포넌트들도 사용하기 때문
- 일반적으로 통합 테스트도 매우 중요하지만, 단위 테스트 보다는 통합 테스트의 수가 적음

### 4) End-to-End Tests(e2e, 전 구간 테스트)

- 애플리케이션의 전체 워크 플로우(시나리오)를 테스트하는 것
- 실제로 사람이 웹사이트에서 수행하는 작업을 재현하는 것을 목표로 함
  - 수동적인 테스트로 하는 것을 단지 자동화하는 것
- 단위 테스트나 통합 테스크 만큼 많지 않음
  - 단위 & 통합 테스트가 잘 작동한다면, 전체적으로 앱이 잘 작동한다고 확신할 수 있기 때문
  - 단위 & 통합 테스트가 더 작성하기 쉽고, 더 빠르고 집중적이며 가능한 모든 시나리오를 테스트하기 쉬움

## 2. 테스트 대상 및 테스트 방법

### 1) 무엇을 테스트 하는가?

- 앱을 구성하는 서로 다른 기본 구성 요소를 테스트
- 정말 작은 요소들을 테스트 해야 함
- 작고 집중된 테스트로 각각 하나의 주요 사항만 테스트
  - 여러 개의 집중된 테스트를 가짐으로써 실패한 이유를 알 수 있음

### 2) 어떻게 테스트 하는가?

- 사용자가 앱과 상호작용 했을 때 발생할 수 있는 성공 및 오류 사례를 테스트
- 가능한 시나리오 결과도 테스트

## 3. 기술 설정 및 관련 도구 이해하기

- 테스팅 코드를 실행하고 결과를 확인하기 위한 도구가 필요
  ⇒ 보통 리액트에서 인기 있는 Jest를 사용
- 리액트 앱에서는 리액트 앱과 컴포넌트들을 렌더링하는 것을 자동화된 테스트와 상호작용하도록 시뮬레이팅 하는 방법이 필요
  → 즉, 브라우저를 시뮬레이팅 하는 것이 필요
  ⇒ 리액트 테스팅 라이브러리를 주로 사용
- `create-react-app` 으로 리액트 앱을 만들었을 경우, Jest와 리액트 테스팅 라이브러리는 이미 설치가 되어 있음
  ```jsx
  "@testing-library/jest-dom": "^5.11.6",
  "@testing-library/react": "^11.2.2",
  "@testing-library/user-event": "^12.5.0",
  ```

## 4. 첫 번째 테스트 실행하기

### 1) 테스트 파일 살펴보기

- `setupTests.js`
  - 설정하는 작업을 하는 파일이기 때문에, 이 파일 안에서는 아무것도 하지 않아도 됨
- `App.test.js`

  ```jsx
  import { render, screen } from '@testing-library/react';
  import App from './App';

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  ```

  - 이 파일은 테스팅 코드를 포함하는 파일
  - 이 파일이 `App` 컴포넌트를 테스트하기 위해 있는 파일
    - 테스팅 파일의 이름은 컴포넌트 파일과 같이 짓는 것이 관례
    - `.test.js` 를 확장자로 붙임
  - `test()` 함수
    ```jsx
    test('renders learn react link', () => {...});
    ```
    - 첫 번째 인자 : 테스트에 대한 설명
      → 테스트 출력에서 해당 테스트를 식별하는 데 도움
    - 두 번째 인자 : 익명 함수
      → 실제 테스트와 코드를 포함
      → 우리가 테스트를 실행할 때 실행될 코드
  - 마지막에는 `App` 컴포넌트를 테스팅 라이브러리에서 불러온 `render` 함수의 도움을 받아 렌더링 함
    ```jsx
    render(<App />);
    ```
  - 일부 요소를 가상의 screen인 시뮬레이팅 된 브라우저에 뿌려지도록 함
    ```jsx
    const linkElement = screen.getByText(/learn react/i);
    ```
    - 여기에 `App` 컴포넌트가 렌더링되는 것
    - 요소를 식별할 때, `getByText` 에서 렌더링되는 텍스트로 식별
      → 대소문자 구분 없음
      → 위 코드 안에 있는 문자들은 정규 표현식
  - 해당 요소가 실제로 문서에 있는지 확인
    ```jsx
    expect(linkElement).toBeInTheDocument();
    ```
    - `toBeInTheDocument` 테스트는 해당 `linkElement` 요소를 찾지 못할 경우 실패, 찾을 경우 성공

### 2) 테스트 파일 실행하기

- 개발 서버 실행을 위해 스크립트가 있는 것처럼, 테스트를 실행하기 위한 스크립트가 존재
- 자동 테스트를 실행해서 해당 테스트가 작동하는지 확인하기 위해 `package.json` 에 해당 테스트 스크립트가 있음
  ```jsx
  "scripts": {
    ...,
    "test": "react-scripts test",
    ...
  },
  ```
  - 이 테스트 스크립트를 `npm test` 명령을 사용하여 터미널 창에서 실행할 수 있음
    - `npm test` 는 자동화된 테스트를 실행
  - 사실 바로 테스트를 실행하지는 않고, 찾는 모든 테스트를 실행하도록 `a` 키를 눌러주어야 함
    - 그러면 알아서 이름이 `.test.js` 로 끝나는 파일을 찾아서, 그 안에 테스트 함수로 정의되어 있는 모든 테스트를 실행하고, 테스트의 결과를 받을 수 있음
- `App` 컴포넌트를 수정하고 저장하자마자 테스트가 자동으로 재실행됨
  - 기본적으로 해당 파일을 주시하고, 변경사항을 저장할 때마다 테스트를 재실행하기 때문
- 테스트가 실패할 경우, 그 이유와 실패한 코드 라인을 확인할 수 있음
- 테스트 종료는 ctrl+c 를 통해 가능

## 5. 첫 번째 테스트 작성하기

```jsx
// Greeting.test.js
import { render, screen } from '@testing-library/react';

import Greeting from './components/Greeting';

test('renders Hello World as a text', () => {
  // Arrange
  render(<Greeting />);

  // Act
  // ... nothing

  // Assert
  const helloWorldElement = screen.getByText('Hello World', { exact: false });
  expect(helloWorldElement).toBeInTheDocument();
});
```

- `test` 함수의 첫 번째 인자에는 테스트가 하는 일을 간단하게 작성
- 익명 함수에 테스트를 작성할 때 일반적으로 세 가지 과정을 거침

  - 세 가지 A를 사용해 테스트를 작성

    1. `Arrange`(준비) : 테스트 상태나 테스트 환경 등 테스트를 설정

       예) 컴포넌트를 렌더링하려고 한다면, 필요한 경우 추가 설정 작업을 수행 가능

    2. `Act` (행동) : 실제로 테스트하고 싶은 것 로직을 작성

       예) 버튼 클릭을 시뮬레이션 하려는 경우와 같은 행동

    3. `Assert` (주장) : 우리가 기대한 결과와 실행 결과를 비교

       예) 브라우저에서 우리의 기대와 일치하는지 확인

- `screen` 은 가상 DOM에 대한 가상 화면으로 렌더링된 것
  - 이 요소를 사용하여 다양한 기능 사용 가능
    - `get ~` 함수 : 요소를 찾을 수 없는 경우, 오류를 발생시킴
    - `find ~` 함수 : promise를 반환
    - `query` 함수
      ⇒ 이러한 함수들이 어떤 조건이나 상황일 때 오류를 발생시키게 됨
- `getByText`
  - 첫 번째 인자 : 찾고자 하는 문자열
  - 두 번째 인자 : 첫 번째 인자에 대해 어떤 조건으로 찾을 것인지 정의
    - `exact` : 텍스트로 가져와서 정확한 일치를 원하면 true, 대소문자는 중요하지 않으면 false
- `expect` 함수
  - 이 함수로 테스트 결과 값을 전달할 수 있음
  - 해당 함수의 결과에서 우리가 원하는 것이 무엇인지 다양한 메서드를 사용하여 확인 가능
- 해당 테스트는 App 테스트를 지워야 실행 가능
  - `getByText` 의 두번째 인자에 `exact: false` 로 설정하거나, 이 인자를 지우고 찾으려는 문자열에 느낌표를 추가하면 테스트 결과가 성공이 됨

## 6. Test Suite(테스트 스위트)와 함께 테스트 그룹화하기

### 1) Test Suite란?

- 다수의 다른 테스트를 서로 다른 테스트 `suite` 에 넣어서 그룹화 하고 정리 가능
  예) 애플리케이션 내의 하나의 특징 또는 하나의 컴포넌트에 속하는 모든 테스트는, 한 테스트 `suite` 그룹에 들어감
- 하나의 `suite` 에 하나의 테스트가 들어감
- 여러 개의 `suite` 를 가질 수 있으며, `suite` 마다 테스트도 여러 개 가질 수 있음

### 2) Test Suite 예시

```jsx
// Greeting.test.js
import { render, screen } from '@testing-library/react';

import Greeting from './components/Greeting';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});
```

- `describe` 함수를 사용해 테스트 `suite` 를 생성
  - `describe` 함수
    - `test` 함수처럼 전역적으로 사용할 수 있는 함수
    - 첫 번째 인자 : 서로 다른 테스트들이 어디에 속할지에 관한 카테고리 설명
    - 두 번째 인자 : 익명 함수
      → 이 함수에는 자체 테스트 코드를 쓰지 않고, 다른 테스트들을 넣음

## 7. 사용자 상호작용 및 State 테스트하기

```jsx
// Greeting.js
import { useState } from 'react';

export default function Greeting() {
  const [changeText, setChangeText] = useState(false);

  const handleClick = () => {
    setChangeText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      {changeText && <p>It's good to see you!</p>}
      {changeText && <p>Changed!</p>}
      <button onClick={handleClick}>Change Text</button>
    </div>
  );
}

// Greeting.test.js
import { render, screen, userClick } from '@testing-library/react';

import Greeting from './components/Greeting';

describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });
});

// 첫 번째 테스트
test('renders good to see you if the button was NOT clicked', () => {
  render(<Greeting />);

  const outputElement = screen.getByText('good to see you', { exact: false });
  expect(outputElement).toBeInTheDocument();
});

// 두 번째 테스트
test('renders "Changed!" if the button was clicked', () => {
  // Arrange
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole('button');
  userClick.click(buttonElement);

  // Assert
  const outputElement = screen.getByText('Changed!');
  expect(outputElement).toBeInTheDocument();
});

// 세 번째 테스트
test('does not render "good to see you" if the button was clicked', () => {
  // Arrange
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole('button');

  userClick.click(buttonElement);

  // Assert
  const outputElement = screen.queryByText('good to see you', { exact: false });
  expect(outputElement).toBeNull();
});
```

- 우리가 이 텍스트를 볼 수 있는지 테스트
  - 버튼을 클릭하면 p 요소의 텍스트가 보이는지 테스트
- 버튼이 클릭되었을 때 Changed!를 렌더링하는지 테스트
  - 이 테스트에서는 Act도 테스트 해야 함
  - 테스팅 라이브러리의 `userEvent` 를 사용하여 전형적인 이벤트들을 사용할 수 있음
    - `userEvent` : 실제 화면에서 사용자 이벤트를 작동시키도록 돕는 객체
      예) 클릭, 더블 클릭, 호버링 등의 이벤트
- 버튼을 클릭했을 때 good to see you 문단이 보이지 않는지 테스트
  - `queryByText` 는 요소가 찾아지지 않는다면 null을 반환

## 8. 연결된 컴포넌트 테스트하기

- 여러 컴포넌트가 상호작용하는 방식과 이것을 테스트 하는 방법과 props와 테스트를 다루는 법에 대해 알아보자

```jsx
// Greeting.js
import { useState } from 'react';
import Output from './Output';

export default function Greeting() {
  const [changeText, setChangeText] = useState(false);

  const handleClick = () => {
    setChangeText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
			{/* 변경된 부분 */}
      {changeText && <Output>It's good to see you!</Output>}
      {changeText && <p>Changed!</p>}
      <button onClick={handleClick}>Change Text</button>
    </div>
  );
}

// Output.js
export default function Output({ children }) {
  return <p>{children}</p>;
}
```

- 위와 같이 p 요소를 `Output` 로 변경해도 `Greeting.test.js` 는 여전히 작동
  - 테스트 코드의 `render(<Greeting />);` 부분에서 요구되는 컴포넌트 트리 전체를 렌더링하고 있기 때문에 가능한 일
  - 즉, `Greeting` 을 렌더링 하면서 JSX 코드에서 사용된 `Output` 컴포넌트의 내용도 렌더링된 것
    ⇒ 둘 이상의 단위를 테스트 하고 둘 이상의 구성요소가 관련되어 있기 때문에, 이것을 통합 테스트라고 부름
    ⇒ 이러한 wrapper 컴포넌트를 다룰 때 통합 테스트를 하게 됨
- `Output` 컴포넌트가 더 복잡해지거나 상태 관리를 할 경우, 별도로 테스트를 분리하는 것이 좋음

## 9. 비동기 코드 테스트하기

```jsx
// Async.test.js
import { render, screen } from '@testing-library/react';

import Async from './Async ';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

- `find` 함수는 Promise를 반환
  - 리액트 테스팅 라이브러리는 이 과정이 성공할 때까지 screen을 여러 차례 재평가
  - 그러므로 `findAllByRole` 은 HTTP 요청이 성공할 때까지 기다림
  - `findAllByRole`
    - 첫 번째 인자 : 찾을 요소
    - 두 번째 인자 : `exact` 등을 설정할 수 있는 객체
    - 세 번째 인자 : `timeout` 기간을 설정할 수 있는 객체
      → 기본 값은 1초

## 10. 모의 작업

- 개발 과정에서 테스트를 실행할 때, 서버에 HTTP 요청을 전송하지 않음
  - 이유
    1. 많은 네트워크 트래픽을 일으켜서 서버가 요청들로 인해 과부하가 될 것이기 때문
    2. 데이터를 가져오지는 않지만 일부 컴포넌트가 서버로 POST 요청을 전송한다면, 테스트로 인해 데이터베이스에 데이터가 삽입되거나 서버의 내용이 변경될 수 있음
       1. 이러한 종류의 HTTP 요청이 전송되는 컴포넌트와 시나리오도 테스트 해야하기 때문
- 비동기 작업을 테스트할 때, 진짜 요청을 전송하지 않거나 일종의 테스팅 서버로 요청을 전송함

### 1) 요청을 전송하지 않는 방법을 사용하여 비동기 작업을 테스트하기

```jsx
import { render, screen } from '@testing-library/react';

import Async from './Async ';

describe('Async component', () => {
  test('renders posts if request succeeds', async () => {
    // jest.fn 함수는 mock 함수를 만듦
    window.fetch = jest.fn();
    // fetch 함수가 호출되었을 때, 결정되어야 하는 값을 설정할 수 있음
    // jest 기능을 사용하여 더미 함수에 promise가 반환해야 하는 실제 값을 설정
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: 'p1', title: 'First post' }],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole('listitem');
    expect(listItemElements).not.toHaveLength(0);
  });
});
```

- 테스트를 작성할 때는 내가 작성하지 않은 코드를 테스트해서는 안됨
  - `fetch` 함수는 내가 작성한 것이 아니라 브라우저 함수이기 때문에, `fetch` 함수가 올바로 작동하며 요청을 보내는지 테스트해서는 안됨
  - 대신 전송된 요청의 서로 다른 결과에 따라서 컴포넌트가 올바르게 작동하는지 테스트해야 함
    - 즉, 응답 데이터를 받았을 때 컴포넌트가 올바르게 작동하는지 테스트
  - 그러므로 브라우저에 내장된 `fetch` 함수를 `mock` 함수로 대체해야 함
    - 내장 함수를 덮어쓰는 더미 함수를 사용하는 것
    - 우리가 원하는 바를 수행하면서도 진짜 요청을 전송하지 않는 더미 함수를 쓰는 것
    - 그러면 테스트 중에 컴포넌트가 실행될 때 `mock` 더미 함수가 사용될 것
- `fetch` 뿐만 아니라 `localStorage` 에 대한 작업 등에서 `mock` 함수를 어떻게 써야 할까?
  - 테스팅 도구인 Jest에 이와 같은 함수를 흉내내는 내장 지원책이 존재

## 12. 요약 및 추가 자료

[Jest](https://jestjs.io/)

[React Testing Library | Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

[React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
