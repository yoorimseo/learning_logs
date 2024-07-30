# Introducing React

## 1. 리액트란?

- 프론트엔드 라이브러리
- 사용자 인터페이스를 구축하도록 도와주는 프론트엔드 툴
- 우리가 정의할 수 있는 컴포넌트로부터 사용자 인터페이스를 구축하도록 돕는 라이브러리
- 여러 컴포넌트를 조립해 프론트엔드를 만드는 것을 목표로 함

## 2. 컴포넌트란?

- HTML과 CSS, JS를 하나의 재사용 가능한 함수들로 결합
- 컴포넌트를 정의함으로써 복잡한 프론트엔드를 만듦
  - 각 구성요소는 HTML, CSS와 JS를 결합
- 컴포넌트가 작동하는 방식
  - 기본적으로 HTML로 렌더링하는 방법을 아는 함수들을 많이 쓰는 것

## 3. 리액트 소개

- public/index.html
  - 리액트 응용 프로그램의 주요 진입점
  - 모든 콘텐츠가 여기서 렌더링 됨
- src 폴더
  - 이 안에서 리액트 코드를 작성 → 개별 컴포넌트를 만듦
- package.json
  - 리액트와 함께 작동하는 데 필요한 패키지들이 존재

## 4. JSX 기본

- JSX는 JavaScript 구문 확장을 의미
  - JavsScript를 위한 구문 확장
- JavaScript 파일에 HTML같은 콘텐츠를 직접 쓸 수 있게 해줌
  - babel 패키지가 HTML을 변환하여 JavaScipt 안에서 사용 가능하도록 해줌
  - 우리가 JSX를 쓰면 babel이 개입해서 진짜 JS로 바꿔줌 → 그 JS가 브라우저에 렌더링되어 브라우저로 보게 됨

## 5. 리액트 애플리케이션의 기본 구조

- 기본 규칙

  - App.js

    - App은 일반적으로 가장 높은 레벨 → 전체 App의 가장 높은 레벨 의 컴포넌트
    - App은 함수로 정의되어 있기만 하므로, 어딘가로 불러내야 함

            → 그래서 index.js에서 root.render()를 통해 App 컴포넌트를 렌더링함

  - index.html

    - App 컴포넌트가 문서로 들어감
    - index.js의 `document.getElementById(”root”)`요소가 index.html의 `<div id=”root”></div>` 와 연결되어 있음

            → `<div id=”root”></div>` 는 그냥 빈 콘텐츠이지만, 모든 리액트 콘텐츠가 여기에 들어감

            → 콘텐츠가 렌더링될 장소일 뿐

  - index.js

    - JS로 `document.getElementById(”root”)` 구문을 통해 div를 선택하고, App 컴포넌트의 내부를 렌더링 함

            → App은 미리 정의된 컴포넌트

## 6. 컴포넌트를 작성하는 방법

- 컴포넌트는 기본적으로 JSX를 반환하는 함수
- 리액트 컴포넌트를 작성할 때는 컴포넌트의 이름을 함수에 입력

  ```jsx
  function Header() {
    return <h1>I'm a header component!</h1>;
  }
  ```

  - 첫 글자는 대문자로 시작
  - 해당 함수 안에서 JSX 콘텐츠를 작성

- 해당 컴포넌트를 사용하는 방법

  - 컴포넌트와 구문들을 렌더링 하기 위해 JSX 구문을 사용하여 App에 `<Header />` 를 작성해야 함

    ```jsx
    function Header() {
      return <h1>I'm a header component!</h1>;
    }

    export default function App() {
      return (
        <div className='App'>
          <Header />
        </div>
      );
    }
    ```
