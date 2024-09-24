# 리액트 앱 배포하기

## 1. 배포 과정

1. 코드를 작성하고 테스트
   1. 애플리케이션을 배포하기 전에 철저하게 테스트 해야 함
   2. 에러를 제대로 처리할 수 있는지 확인
   3. 배포할 애플리케이션이 사용될 준비가 되었는지 확실하게 확인
2. 최적화가 가능한지 살펴보기
   1. 코드에 최적화가 가능한 부분이 있는지 확인
   2. 지연 로딩이 가능한지 살펴보기
   3. 코드를 실제로 어딘가에 보내기 전에 최적화 단계를 거치는 것이 중요
3. 프로덕션용 앱을 빌드
   1. 빌드라는 것은 코드를 더 작성해야 한다는 뜻이 아니라, 이미 작성되어 있는 스크립트를 실행하는 것
   2. 스크립트가 코드를 자동으로 통합하고 최적화해, 가능한 작은 크기의 프로덕션 준비 패키지를 만들어줌
   3. 이렇게 만들어진 패키지를 서버로 옮기면, 자동으로 사용자들에게 가능한 작은 크기로 최적화된 코드 패키지를 제공 가능
      1. 사용자들에게 배포하는 코드는 크기가 작을수록 좋음
      2. 웹사이트가 완전히 로딩되어야 사용자가 웹사이트와 상호작용할 수 있기 때문
      3. 즉, 배포하는 코드의 크기가 작을수록 앱 로딩이 빨라짐
4. 작성한 코드를 바탕으로 생성된 코드 패키지를 서버에 업로드
   1. 여러 호스팅 provider 중에 선택해 사용 가능
5. 서버 또는 호스팅 provider의 offering을 설정

## 2. 지연 로딩 이해하기

### 1) 최적화 단계 살펴보기

- 배포를 위해 철저한 테스트를 완료했다고 가정
- 코드를 최적화한 후, 프로덕션을 위해 앱을 최종 빌드 해 서버에 업로드 할 파일을 생성
- 코드를 최적화하기 위해 `useMemo` 등을 사용할 수 있음
- 우리는 지연 로딩에 대해 알아볼 것

### 2) Lazy Loading(지연 로딩)이란?

- 특정 코드를 필요할 때만 로딩 테크닉
- 지연 로딩 없이 코드가 어떻게 파일들 간에 import 되는지 이해하는 것이 중요
  - import 문은 여러 파일을 연결
  - 그리고 최종 사용자에게 애플리케이션을 전달하려면 화면에 무언가 뜨기 전에 import 문들이 먼저 다 처리되어야 함
    → 여러 코드가 상호 의존 관계에 있기 때문에, 최종 사용자에게 전달되기 전에 모든 코드가 불러와져야 한다는 뜻
  - 이론적 문제점
    - 화면에 무언가를 띄우기 전에 모든 코드 파일이 불러와져야 한다는 것
    - 복잡한 애플리케이션의 경우, 수십 또는 수백 개의 라우트와 컴포넌트가 있어 문제가 될 수 있음
    - 초기에 모든 코드를 불러오려면 첫 페이지의 로딩이 느려짐
    - 사용자가 웹사이트에 처음 방문하면 모든 코드를 다운로드한 후에야 화면에 무언가 뜨는 것을 볼 수 있음
    - 초기 로딩이 아주 느려지고 UX가 나빠짐
    ⇒ 이것이 지연 로딩이 필요한 이유
- 지연 로딩의 핵심 아이디어
  - 특정 컴포넌트를 나중에 불러오는 것
  - 미리 불러오는 대신 필요할 때 불러오는 것

## 3. 지연 로딩 추가하기

### 1) `Blog` 페이지에 지연 로딩을 추가하려면?

- `Blog` 페이지 코드와 `Blog` 페이지에서 참조하는 모든 코드가 필요할 때만 불러와져야 함
- 웹사이트에 방문해 홈페이지를 보고 있을 때는 아직 `Blog` 페이지 코드가 필요하지 않음
  - 나중에 `Blog` 페이지를 방문할 때만 필요
  - `Blog` 페이지를 방문하면 그때 다운로드 되어야 함
  ⇒ 이것이 지연 로딩의 역할

### 2) `App` 페이지에 지연 로딩 추가하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 변경된 부분
// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: <BlogPage />,
            // 변경된 부분
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- 우선 `Blog` 페이지를 import문을 삭제해야 함
  - 그렇지 않으면 해당 코드가 실행될 때 항상 먼저 로딩됨
- 필요할 때만 로딩되도록 해주어야 함
  - import 하고 있던 `Blog` 페이지 뿐만 아니라 `loader` 에도 지연 로딩을 적용해야 함
- `loader` 에 지연 로딩을 사용하려면, `loader` 에 함수를 할당하면 됨
  - 이전에 사용하던 `loader` 를 다른 `loader` 함수로 대체하고, 이 함수는 import 함수를 호출
- `import`
  - `import` 키워드는 파일을 import 할 때 사용하는 키워드이지만, `import` 를 함수로 호출할 수 있고 이 경우 동적으로 필요할 때만 import 하게 됨
  - `import` 함수에는 import 하려는 경로를 입력
  - `import` 함수는 Promise를 반환
    - 비동기 프로세스를 처리하려면 오랜 시간이 소요될 수 있기 때문
    - 필요한 코드를 다운로드 해야 하므로, 시간이 걸릴 수 있음
  - `import` 함수는 Promise를 반환하므로, `then` 함수를 붙일 수 있음
    - 로딩된 모듈(파일)을 받아, 이 모듈에 `loader` 함수를 적용
    - 그러면 `loader` 가 실행되고, `loader` 는 Promise 응답을 반환
- 위와 같이 작성하면 `loader` 함수가 마지막의 `loader` 함수에 의해 Promise를 반환
  - 즉, `Blog` 에 관한 모든 것이 지연되어 로딩됨
- 해당 `import` 함수는 `loader` 가 호출될 때만 실행됨
  - `Blog` 페이지를 방문해만 `Blog` 파일이 import 되고, 해당 파일의 `loader` 함수가 실행되는 것
-

### 3) `Blog` 페이지에 지연 로딩 추가하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// 변경된 부분
const BlogPage = lazy(() => import('./pages/Blog'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              // 변경된 부분
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- 컴포넌트 함수를 동적으로 import 한 `Blog` 페이지 컴포넌트 파일을 반환하게 만들 수 있음
- `lazy` 함수
  - 실행될 때 동적으로 import 하는 `import` 함수를 인자로 받아 사용하면, 이것을 컴포넌트로 사용할 수 있음
- `Suspense` 컴포넌트
  - 실제로 콘텐츠를 렌더링하기 전에 콘텐츠의 로딩을 기다리는 데 사용
  - 여기서 `Suspense` 컴포넌트를 사용하여 지연 로딩되는 `Blog` 컴포넌트를 감싸 `fallback` 을 구현할 수 있음
  - `fallback` : 컴포넌트 코드가 로딩될 때까지 보여주는 것
- 이제 `Blog` 컴포넌트를 필요할 때만 로딩하고, 코드를 불러오기 전까지는 `fallback` 을 보여줌
- `loader` 코드도 필요할 때만 불러온 다음 실행하므로, 필요한 데이터를 전부 불러올 수 있음

### 4) 지연 로딩 확인하기

- 개발자 도구 > 네트워크 탭
  - 탭을 비워 모든 요청을 삭제한 뒤 `Blog` 를 클릭하면, 실제로 해당 탭에서 자바스크립트 파일이 다운로드 된 것을 확인할 수 있음
    - 이 자바스크립트 파일은 동적으로 다운로드 된 것
      → 동적으로 다운로드 된 이유는 지연 로딩을 적용했기 때문
  - 지연 로딩된 자바스크립트 파일에는 `loader` 코드와 `Blog` 페이지 컴포넌트 코드가 포함되어 있음

### 5) `Post` 페이지에도 지연 로딩 추가하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

- `params` 를 `loader` 함수에 전달해야 하는데, `meta` 안에 `params` 가 있기 때문에, `loader` 에 `meta` 를 전달하면 됨

## 4. 프로덕션용 코드 빌드하기

### 1) 빌드 과정이 필요한 이유

- 현재 만들고 있는 애플리케이션이 업로드 할 애플리케이션이 아니기 때문
- 우리가 작성한 코드는 개발에 사용하는 코드
  - 가독성이 좋고, 브라우저에서 지원하지 않는 기능도 몇 가지 사용하고 있는 코드
  - JSX 코드는 브라우저에서 지원하지 않음
- 서버에 업로드 하기 전에 최종 사용자가 쓸 수 있는 코드로 변환해야 함
- 우리가 개발하면서 `npm start` 로 보는 페이지는, 해당 명령어로 띄우는 개발 서버가 우리가 작성한 코드를 변환해주고 있는 것
  - 실시간 변환 프로세스를 진행 중인 것

### 2) 개발 코드 최적화 하기

- 코드를 업로드하려면 최적화를 해야 함
- `npm run build` 로 `package.json` 스크립트를 실행할 수 있음
  - 이 과정을 통해 업로드 할 준비가 완료된 아주 최적화된 변환 코드 번들이 생성됨
- `npm run build` 가 완료되면 `build` 폴더가 생성됨
  - 이 `build` 안에 있는 것을 서버에 업로드 하면 됨
  - `static` 폴더
    - 이 파일에는 우리가 작성한 모든 코드와 리액트 라이브러리를 포함해 우리가 사용하는 모든 서드 파티 패키지가 들어있음
      → 최적화된 자바스크립트 파일, 동적으로 지연 로딩되는 많은 코드, 초기에 다운로드되는 main 코드 등

## 5. 배포 예시

- 웹사이트를 배포하는 데 중요한 점은 리액트 SPA가 정적 웹사이트라는 것
  - HTML, CSS, JS 파일과 이미지 파일만으로 구성되고, 서버에서 실행되어야 하는 코드가 없음
  - 모든 코드가 브라우저에서 파싱되고, 방문자의 컴퓨터에서 실행됨
- 따라서 정적 웹사이트 호스트를 사용하면 됨
  - 서버에서 코드를 실행하는 호스팅 제공자를 사용하지 않아도 됨
  - 풀스택 리액트 애플리케이션을 만든다면 서버에서 코드를 실행하는 호스팅 제공자가 필요

### 1) 정적 웹사이트를 배포하는 방법 - Firebase 호스팅 사용하기

- 구글 계정이 필요
- 로그인한 후, 새 프로젝트 생성
- 구글 애널리틱스는 활성화하지 않아도 됨
- Build > Hosting > Get started
  1. Firebase 서버에 코드를 업로드를 도와주는 도구 설치

     ```jsx
     sudo npm install -g firebase-tools
     ```

     - 명령어를 복사해 터미널에서 실행
       → 명령어 앞에 sudo 를 붙여야 할 수도 있음

  2. 방금 설치한 도구에 로그인 하기

     ```jsx
     firebase login
     ```

     - 구글 계정으로 로그인
     - 이 계정의 프로젝트에 코드를 업로드하기 위해, 해당 도구를 사용해 Firebase에 보내는 요청을 인증할 방법이 필요하기 때문

  3. 로그인한 후, `firebase init`을 입력해 로컬 프로젝트를 Firebase 프로젝트에 연결
     - 사용할 수 있는 다양한 기능이 있는데, 스페이스바를 눌러 Hosting 기능만 선택하면 됨
     - 그 다음 Use an existing project 를 선택
       → 이미 Firebase에 프로젝트를 생성했기 때문
     - 방금 Firebase에 생성한 프로젝트를 선택
     - 업로드할 파일이 어디 있는지 입력
       → 우리의 경우 build 를 입력하면 됨
     - SPA로 설정할 것인지 물어보는데, Y 입력
     - 자동 빌드 또는 배포가 필요 없으니 N 입력
     - 기존 build.index.html 파일을 덮어쓰지 않을 것이니 N 입력
  4. 설정을 완료한 후, Firebase에 파일을 업로드 하기 위해 `firebase deploy` 명령어를 실행
     - 해당 명령어 실행 완료 후 주어지는 URL을 통해 웹사이트 방문 가능
     - 배포한 후에는 Firebase 콘솔에서 사용자 지정 도메인 추가 가능
     - 웹사이트의 배포를 중단해 오프라인으로 전환하려면, `firebase hosting:disable` 를 터미널에 입력하면 됨

## 6. 서버 측 라우팅 및 필요한 환경설정

### 1) 배포를 위해 프로젝트를 설정하는 방법

- 웹사이트를 배포할 때 SPA로 설정하기 원하는지에 대한 질문이 있었는데, 이 부분이 중요함
- 우리 웹사이트는 여러 페이지로 즉, 여러 라우트 간의 이동이 가능
  - 이러한 페이지 간의 이동이 리액트 프로젝트에 포함된 패키지인 리액트 라우터에서 제공하는 것임을 이해해야 함
  - url을 확인하고, 해당하는 컴포넌트를 불러오는 과정이 브라우저에서 실행됨
  - react-router-dom은 client-side 패키지로, 서버에서 실행되는 것이 아님
- 우리 프로젝트에서는 서버에서 실행되는 코드가 없다는 것이 왜 중요할까?
  - 페이지를 이동하는 모든 작업들이 서버가 아닌 브라우저에서 진행됨
  - 실제로 애플리케이션을 서버에 배포하고 사용자가 브라우저에 url을 입력하면, 기술적으로 브라우저는 서버에 요청을 보내기 때문
    - 브라우저에 url을 입력하면 언제나 웹사이트에 요청을 보내야 하므로, 항상 일어나는 일
  - 서버는 이 요청에 응답해야 하는데, 리액트 애플리케이션(HTML, CSS, JS)을 전달하게 됨
    - 주 도메인이 아니라 /post 등 기타 웹사이트의 경로를 추가해 요청을 보냈다면, 요청에 따라 해당하는 경로가 서버에 전달됨
    - 기본적으로 서버는 요청한 경로에 해당하는 응답을 찾기 위해 노력함
      예) 폴더 안에서 해당하는 이름의 라우트나 파일을 찾기 위해 노력
      server-side에서 다양한 경로의 요청을 처리하는 로직이 없으므로. 해당 파일을 찾는 데 실패할 것
      서버는 해당 파일을 찾는 대신, 언제나 동일한 HTML 파일과 JS 코드를 반환해 요청한 경로를 client-side에서 요청한 JS 코드인 리액트 앱의 리액트 라우터로 처리하도록 만들어야 함
      하지만 서버는 기본적으로 항상 동일한 파일을 반환하지 않고, 폴더 내에서 요청에 해당하는 파일을 찾으려고 노력
- 웹사이트를 배포할 때 SPA로 설정한다고 하면, Firebase 서버에 어떠한 경로의 요청이 오건 index.html을 반환하도록 환경설정이 됨
  - url 뒤에 어떤 경로가 붙건 Firebase는 언제나 index.html을 반환하고, 결국 언제나 동일한 JS 파일을 요청하게 됨
  - server-side 라우팅 대신 client-side 라우팅을 사용하도록 설정되는 것
- 다른 호스팅 provider를 사용하면 SPA로 설정할지 물어보지 않을 수도 있기 때문에, 이런 경우 모든 요청에 대해 index.html을 반환하도록 직접 리다이렉션 rule을 설정해야 함
