# 리액트 라우터가 있는 SPA 다중 페이지 구축하기

## 1. 모듈 소개

- 싱글페이지의 단점
  - 웹의 가장 큰 장점인 어떤 리소스에 링크할 수 있다는 장점을 잃음
    - 애플리케이션이 복잡해 질수록 웹 사이트나 웹 애플리케이션의 특정 부분에 링크할 것이 많아지기 때문
    - 강제로 사용자가 항상 시작 페이지에서 시작하고 다양한 페이지들을 수동으로 탐색하는 대신, 사용자들이 특정 페이지에 링크될 수 있으면 좋을 것
      → 웹사이트에서 특정 페이지를 방문하면, 그것을 로딩하는 URL을 제공할 수 있으면 좋음

## 2. 라우팅: 싱글 페이지 애플리케이션에서 다수의 페이지 보여주기

### 1) 웹 작동 방식

- 웹 사이트에 방문하면, 일반적으로 도메인 이름 뒤에 경로를 첨부 가능
  예) /welcome
- 그 경로가 해당 웹 사이트의 페이지를 로딩
- 브라우저 주소창에 다른 url을 입력하거나 url을 변경하는 링크를 클릭하게 되면, 다른 페이지가 로딩됨

⇒ 이렇게 웹 사이트에 표시되는 콘텐츠가 변경되는 것

⇒ 이것이 라우팅이 하는 일

### 2) 라우팅

- url 경로가 다르면, 다른 콘텐츠가 화면에 로딩됨

### 3) 멀티 페이지 애플리케이션

- 단순히 다른 경로에 대해 다른 콘텐츠와 다른 HTML을 로딩하는 방식으로 라우팅을 구현한 것
- 다른 경로에 대해 다른 콘텐츠를 로딩하게 되지만, 단점이 존재
- 단점
  - 항상 새 콘텐츠를 가져와야 함
  - 새로운 HTTP 요청을 전송하고 새로운 응답을 받는 과정에서, 사용자의 흐름이 중단될 수 있음
  - 그러면 지연이 발생하고 웹 사이트가 느려질 수 있음
  - 결국 사용자 경험이 저하되는 결과를 낳을 수 있음

### 4) 싱글 페이지 애플리케이션

- 더 복잡한 사용자 인터페이스를 구축할 때, 싱글 페이지 애플리케이션을 사용
- 최초에 HTML 요청을 하나만 전송
  - HTML 파일과 많은 추가적인 자바스크립트가 다운로드됨
  - 그 다음, 클라이언트에서 실행되는 추가 자바스크립트 코드는 사용자가 화면에서 보는 것들을 실제로 조절하게 됨
- 클라이언트 측 리액트 코드 추가 가능
  - 현재 사용 중인 url을 감시하여, url이 변경될 때마다 작동
  - url이 변경되면 화면에 다른 콘텐츠를 표시
  ⇒ 백엔드로부터 새 HTML 파일을 로딩하지 않고, 약간의 클라이언트 측 코드를 추가해서 리액트 컴포넌트를 로딩할 수 있음
  ⇒ 여전히 싱글 페이지 애플리케이션에 있으면서 다양한 url과 라우팅을 지원할 수 있음

## 3. 프로젝트 셋업 & 리액트 라우터 설치하기

```jsx
npm install react-router-dom
```

- 라우트 설치 후, 우리가 지원하려는 라우트를 정의해야 함
  - 우리가 지원하려는 url과 경로
  - 해당 경로에 대해 어떤 컴포넌트가 로딩되어야 하는지 정의
- 라우터를 활성화 하고, 정의한 라우트를 로딩
- 로딩하려는 모든 컴포넌트들이 있는지 확인하고, 그 페이지들 간에 이동할 수단을 제공했는지 확인
  - 그러면 사용자들은 다양한 페이지들 간에 매끄럽게 이동 가능

## 4. 라우트 정의하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Home.js
export default function Home() {
  return <h1>My Home Page</h1>;
}
```

- `createBrowserRouter()` 를 사용하여 라우트 정의 객체로 된 배열을 넣어줌
  - 모든 객체들은 각각 하나의 라우트를 나타냄
  - 라우트의 특징을 정의하기 위해 프로퍼티 추가
    - `path` : 작동해야 하는 경로를 정의
    - `element` : 로딩되어야 하는 컴포넌트를 정의

## 5. 라우트를 정의하는 다른 방법들

- 이전 버전에서는 컴포넌트와 JSX 코드를 써서 모든 라우트를 정의했음
  ```jsx
  ...
  function App() {
    return <div>
  	  <Route path="welcome">
  		  <Welcome />
  	  </Route>
  	  <Route path="products">
  		  <Products />
  	  </Route>
    </div>
  }

  export default App;
  ```
- 최신 버전에서도 사용 가능
  ```jsx
  import {
    createRoutesFromElements,
    createBrowserRouter,
  } from 'react-route-dom';

  const routeDefinition = createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<ProductsPage />} />
    </Route>
  );

  const router = createBrowserRouter(routeDefinition);

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
  ```

## 6. Link로 페이지들 간에 이동하기

### 1) a 태그를 사용하여 페이지 이동하기

```jsx
export default function Home() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <a href='/products'> the list of products</a>
      </p>
    </>
  );
}
```

- 위와 같이 a 태그를 사용하여 링크를 제공하면, 웹 사이트를 지원하는 서버에 새로운 요청을 전송하게 됨
  - 이 서버는 해당 싱글 페이지 애플리케이션을 구성하는 싱글 HTML 페이지를 제공
    - 이 배후에는 모든 자바스크립트 코드와 리액트 애플리케이션 전체를 다시 로딩하고, 리액트 애플리케이션을 재시작함
    - 배후에서 이런 많은 불필요한 작업에 일어나, 사이트 성능에도 영향을 미침

### 2) Link를 사용하여 페이지 이동하기

```jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='/products'> the list of products</Link>
      </p>
    </>
  );
}
```

- `to` 속성을 사용하여 이동하려는 경로를 지정
- `Link` 컴포넌트는 배후에서 앵커 요소를 렌더링
  - 기본적으로는 해당 앵커 요소에 대한 클릭을 감시
  - 링크를 클릭했을 때 HTTP 요청을 전송하는 브라우저 기본 설정을 막아줌
  - 라우트 정의를 확인하여, 그에 맞춰 페이지를 업데이트하고 적절한 콘텐츠를 로딩
  ⇒ url을 변경하지만, 새로운 HTTP 요청을 전송하지는 않음

## 7. 레이아웃 및 중첩된 라우트

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/products',
        element: <ProductPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Root.js
import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import classes from './Root.module.css';

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
}

// MainNavigation.js
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- `Link` 는 `RouterProvider` 내부에 있을 때만 제대로 작동
  - `RouterProvider` 를 감싸거나 다른 위치에 있으면 제대로 작동하지 않음
- `createBrowserRouter`에 `children` 속성을 추가하여, 추가 라우트 정의로 이루어진 배열을 정의
  - 부모 요소인 `RootLayout` 에서 child 라우트 컴포넌트와 요소가 어디 있는지 정의해야 함
  - `Outlet` : child 라우트를 렌더링 해야 할 위치를 표시하는 마커
  ⇒ 이렇게 하면 페이지 상단에 `RootLayout` 가 항상 렌더링 되고, 그 하단에 child 라우트 컴포넌트가 렌더링 됨

## 8. errorElement로 오류 페이지 표시하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/products',
        element: <ProductPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// ErrorPage.js
import MainNavigation from '../components/MainNavigation';

export default function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occurred!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
}
```

- 방문자들이 의도치 않게 우리가 잘못 제공한 링크 때문에 방문하지 말아야 할 페이지나 존재하지 않는 페이지를 방문할 수 있음
  - 이런 경우 표시될 기본 오류 페이지를 준비하는 것

## 9. 네비게이션 링크(NavLink) 사용하기

```jsx
// MainNavigation.module.css
.list a:hover,
.list a.active {
  color: var(--color-primary-800);
  text-decoration: underline;
}

// MainNavigation.js
import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
```

- `NavLink`
  - `Link` 와 똑같이 사용
  - `className` 속성을 추가하여 값으로 익명함수를 전달
    - 이 함수는 앵커 태그에 추가되어야 하는 css 클래스 이름을 반환
    - 이 함수는 인자로 `isActive` 객체를 받아 프로퍼티를 할당할 수 있음
    - `isActive` 는 boolean 타입으로, 해당 링크가 현재 활성되어 있으면 true
  - `NavLink` 는 페이지 url에 `to` 에 설정된 경로로 시작하면 활성되어 있는 것으로 간주
    - `end` 속성을 추가하여, 현재 활성되어 있는 라우트의 url의 마지막이 `to` 경로로 끝나야 해당 링크를 활성으로 간주

## 10. 프로그램적으로 네비게이션하기

### 1) 강제 라우팅

```jsx
// Home.js
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('/products');
  }
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='/products'> the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
```

- 예를 들어 어떤 폼이 제출되었거나, 타이머가 만료되었을 경우, 네비게이션에서 특정 동작을 트리거 하고 싶을 때 사용
- `useNavigate` 훅을 사용하여, 네비게이션 동작을 트리거할 수 있음
  - 코드 안에서 다른 라우트로 전환 가능

## 11. 동적 라우트 정의하고 사용하기

```jsx
// App.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/products',
        element: <ProductPage />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// ProductDetailPage.js
import { useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const params = useParams();
  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
    </>
  );
}
```

- `:` 을 사용
  - 해당 페이지는 동적이라는 것을 react-router-dom에게 알려줌
  - 다양한 product에 대해 다양한 데이터를 로딩 가능
- `useParams`
  - 세부 페이지에서 해당 훅을 호출하면 param 객체를 반환
  - param 객체는 라우트 정의에서 프로퍼티로 정의한 모든 동적 경로 세그먼트가 담긴 자바스크립트 객체
    - `:` 뒤에 placeholder가 params 객체에 프로퍼티 이름으로 쓸 수 있는 식별자

## 12. 동적 라우트에 링크 추가하기

```jsx
// ProductPage.js
import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
];

export default function ProductPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
```

## 13. 상대 경로와 절대 경로

```jsx
// App.js
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

// Home.js
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate('products');
  }
  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to='products'> the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

// ProductPage.js
import { Link } from 'react-router-dom';

const PRODUCTS = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
];

export default function ProductPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// ProductDetailPage.js
import { Link, useParams } from 'react-router-dom';

export default function ProductDetailPage() {
  const params = useParams();
  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      <p>
        <Link to='..' relative='path'>
      </p>
    </>
  );
}

```

- 경로가 `/` 로 시작하면 절대 경로
- `path` 에는 라우터에 정의된 경로들이 wrapper 라우트의 경로 뒤에 붙는 것
  - 이것이 상대 경로
  - 상대 경로로 된 child 라우트가 있다면, 리액트 라우터는 부모 라우트의 경로를 살펴보고 child 라우트를 부모 라우트 경로 뒤에 붙이게 됨
- `..` 은 한 단계 앞의 경로로 이동하는 것
  - 위의 라우트의 경우, `ProductDetailPage` 의 한 단계 위는 root이기 때문에 Back 버튼을 클릭했을 때 `Home` 으로 돌아가는 것
  - `relative=’path’` 속성을 사용하여, 현재 활성된 경로를 살펴보고 그 경로해서 한 세그먼트만 제거하게 됨
    - `relative` 의 기본 속성은 `‘route’` 로, 랑트 정의에 대해 상대적인 것

## 14. 인덱스 라우트 사용하기

```jsx
// App.js
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: 'true', path: '', element: <Home /> },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);
```

- 라우트 정의 중 `Home` 에 추가할 수 있는 특수한 프로퍼티
  - `Home` 은 정의된 경로가 없고, 대신 부모 라우터이 있는 경로와 동일한 경로에 로딩되어야 함
- `index=’true’` 속성을 추가하면, 해당 라우트가 index 라우트로 변함
  - 부모 라우트가 현재 활성되어 있다면, 표시되어야 하는 기본 라우트라는 것을 의미

---

## 15. loader()

### 1) loader() 데이터 가져오기

- 리액트 라우터 버전 6 이상을 사용하고 있다면, 데이터를 가져오고 그 다양한 상태를 처리하는 모든 코드를 작성할 필요가 없음
  - 대신 리액트 라우터가 이것을 모두 해줌

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: 'true', element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: 'true',
            element: <Events />,
            loader: async () => {
              const response = await fetch('http://localhost:8080/events');

              if (!response.ok) {
                // ...
              } else {
                const resData = await response.json();
                return resData.events;
              }
            },
          },
          { path: ':eventId', element: <EventDetail /> },
          { path: 'new', element: <NewEvent /> },
          { path: ':eventId/edit', element: <EditEvent /> },
        ],
      },
    ],
  },
]);
```

- 라우터 정의에 `loader` 프로퍼티를 추가할 수 있음
  - `loader`
    - 함수를 값으로 취하는 프로퍼티
    - 해당 컴포넌트 페이지를 방문하기 직전에 리액트 라우터는 항상 해당 함수를 실행
    - JSX 코드가 렌더링 되기 직전에 `loader` 함수가 리액트 라우터에 의해 트리거되고 실행됨
    - 해당 함수 안에서 데이터를 가져올 수 있음
    - `loader` 함수를 정의할 때 리액트 라우터는 값으로 받는 함수에서 반환하는 모든 값을 자동으로 취하고, 이 데이터가 필요한 다른 컴포넌트 뿐만 아니라 렌더링 되고 있는 현재 컴포넌트 페이지에 제공

### 2) loader() 데이터를 라우트 컴포넌트에서 사용하기

```jsx
// Events.js
import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Events() {
  const events = useLoaderData();

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default Events;
```

- `loader` 함수가 반환한 데이터에 접근하기 위해 `useLoaderData` 를 import
  - `useLoaderData` 은 가장 가까운 `loader` 데이터에 접근하기 위해 사용하는 훅

### 3) loader() 데이터의 다양한 활용법

- 데이터를 사용하는 컴포넌트에서 직접 사용 가능
  - 하위 레벨 컴포넌트에서는 가능
    - 예) `Events` 컴포넌트에서 `loader` 데이터에 접근해서 `EventsList` 컴포넌트로 prop을 통해 전달하는 것이 아니라, `EventsList` 컴포넌트에서 `loader` 데이터에 접근
  - 상위 레벨 컴포넌트에서는 불가능
    - 예) `RootLayout` 컴포넌트에서 `loader` 데이터에 접근하면, undefined
      → 그 이유는 하위 레벨 라우트에서 정의된 데이터를 받으려고 하기 때문
  - `loader` 를 추가한 컴포넌트 즉, `loader` 를 추가한 라우트보다 같은 레벨이나 더 낮은 레벨에 있는 컴포넌트에서만 `loader` 데이터에 접근 가능

### 4) loader() 코드를 저장해야 하는 위치

- 더 많은 라우터에 `loader` 를 더 많이 추가할수록 App.js 파일은 거대해질 것
- `loader` 코드를 필요로 하는 컴포넌트 파일에 넣는 것을 권장
  ```jsx
  // App.js
  ...
  import Events, { loader as eventsLoader } from './pages/Events';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { index: 'true', element: <Home /> },
        {
          path: 'events',
          element: <EventsRoot />,
          children: [
            {
              index: 'true',
              element: <Events />,
              loader: eventsLoader,
            },
            { path: ':eventId', element: <EventDetail /> },
            { path: 'new', element: <NewEvent /> },
            { path: ':eventId/edit', element: <EditEvent /> },
          ],
        },
      ],
    },
  ]);

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;

  // Events.js
  import { useLoaderData } from 'react-router-dom';
  import EventsList from '../components/EventsList';

  function Events() {
    const events = useLoaderData();

    return (
      <>
        <EventsList events={events} />
      </>
    );
  }

  export default Events;

  export const loader = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
      // ...
    } else {
      const resData = await response.json();
      return resData.events;
    }
  };
  ```

### 5) loader() 함수가 실행되는 시기

- 어떤 페이지에 대한 `loader` 는 우리가 그 페이지로 이동하는 시작할 때 호출됨
- 라우트 전환을 하자마자 데이터 가져오기가 시작되는 것
- 리액트 라우터는 기본 값으로 데이터를 가져올 때까지 대기
  - 즉, `loader` 가 작업을 완료할 때까지 기다림
  - 그리고 가져온 데이터로 페이지를 렌더링
- 장점
  - 어떤 컴포넌트가 렌더링되고 있을 때, 데이터가 거기 있다는 것을 확신할 수 있음
- 단점
  - 데이터를 가져오기까지 페이지에 지연이 생기게 되고, 사용자는 해당 페이지에서 아무 일도 일어나지 않는 것처럼 느끼게 됨

### 6) 현재의 라우트 전환 상태 확인하기

```jsx
// Root.js
import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

export default function Root() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  );
}
```

- 라우트의 전환이 시작되었는지, 여전히 데이터가 도착하길 기다리고 있는지, 데이터를 가져왔는지 알 수 있음
- `useNavigation` 훅을 사용하여 현재 라우트 전환이 진행 중인지 확인 가능
  - 해당 훅이 반환하는 객체의 프로퍼티 중 `state` 를 사용
    - `idle` : 라우트 전환이 일어나지 않음
    - `loading` : 라우트 전환이 이뤄지고 데이터를 로딩하는 중
    - `submitting` : 데이터를 제출함
- 로딩 인디케이터는 우리가 전환할 목적지인 페이지에 추가되는 것이 아니라, 전환이 시작되었을 때 이미 화면에 표시되어 있는 페이지 컴포넌트에 추가해야 함

### 7) loader()에 응답 리턴하기

```jsx
import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function Events() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default Events;

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json();
    // const res = new Response('any data', { status: 201 });

    return response;
  }
};
```

- `loader` 코드는 서버에서 실행되는 것이 아니라는 점을 기억해야 함
  - 이것은 브라우저에서 실행되는 것으로 클라이언트측 코드
- 브라우저는 생성자와 응답 객체를 지원
  ```jsx
  import { useLoaderData } from 'react-router-dom';
  import EventsList from '../components/EventsList';

  function Events() {
    return (
      <>
        <EventsList events={events} />
      </>
    );
  }

  export default Events;

  export const loader = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
      // ...
    } else {
      const resData = await response.json();
      const res = new Response('any data', { status: 201 });

      return res;
    }
  };
  ```
  - 브라우저에 내장된 `Response()`생성자 함수를 인스턴스화
    - 최신 브라우저의 기능으로, 자신만의 응답을 구축할 수 있음
    - 첫 번째 인자 : 원하는 데이터
    - 두 번째 인자 : 객체를 이용해서 원하는 데이터를 자세히 설정 가능
  - 그러면 `loader` 에서 이런 응답을 반환할 때마다 리액트 라우터 패키지는 `useLoaderData` 를 사용할 때 우리의 응답에서 자동으로 데이터를 추출하게 됨
  - `useLoaderData` 가 반환하는 데이터는 `loader` 에서 반환한 응답의 일부인 응답 데이터가 될 것
- 이 기능이 존재하는 이유
  - `loader` 함수에서 브라우저에 내장된 `fetch` 함수로 백엔드에 도달하는 방식을 상당히 많이 사용
  - `fetch` 함수는 실제 `Response`로 리졸빙되는 `Promise` 를 지원
  - 리액트 라우터는 이런 응답 객체들을 지원하고 자동으로 데이터를 추출하기 떄문에, `fetch` 로부터 응답 객체를 취해서 `loader` 에 반환 가능
    - 즉, `fetch` 로부터 반환되는 응답에서 수작업으로 데이터를 추출할 필요가 없는 것

### 8) loader()로 가는 코드의 종류

- `loader` 는 서버가 아닌 브라우저에서 실행되기 때문에, 브라우저 API를 사용할 수 있음
- 하지만 `loader` 에서는 리액트 훅은 사용할 수 없음
  - 리액트 훅은 리액트 컴포넌트에서만 사용 가능하기 때문

## 16. 커스텀 오류를 이용한 오류 처리

1. `fetch` 응답을 사용하여 오류가 있다는 것을 표시하는 데이터를 반환하고, 이 데이터를 컴포넌트에서 적절히 사용하기
2. `throw` 를 사용

   ```jsx
   // App.js
   const router = createBrowserRouter([
     {
       path: '/',
       element: <Root />,
       errorElement: <Error />,
       children: [
         { index: 'true', element: <Home /> },
         {
           path: 'events',
           element: <EventsRoot />,
           children: [
             {
               index: 'true',
               element: <Events />,
               loader: eventsLoader,
             },
             { path: ':eventId', element: <EventDetail /> },
             { path: 'new', element: <NewEvent /> },
             { path: ':eventId/edit', element: <EditEvent /> },
           ],
         },
       ],
     },
   ]);

   //Events.js
   export const loader = async () => {
     const response = await fetch('http://localhost:8080/events');

     if (!response.ok) {
       throw { message: 'Could not fetch events' };
     } else {
       return response;
     }
   };
   ```

   - 리액트 라우터는 `errorElement` 를 사용하여 가장 근첩한 에러 요소를 렌더링
   - `errorElement` 는 에러 페이지를 표시하기 위해서만 사용하지 않음
   - `errorElement` 는 `loader` 도 포함해서 어떤 라우트 관련 코드에 오류가 생길 때마다 화면에 표시됨

## 17. 오류 데이터를 추출하고 응답 보내기

```jsx
// Events.js
export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
  } else {
    return response;
  }
};

// Error.js
import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';

export default function Error() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }
  if (error.status === 400) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
```

- `errorElement` 로 렌더링되는 컴포넌트 안에서 오류로서 내보내지는 데이터를 `useRouteError` 훅을 사용하여 실제로 잡을 수 있음
- `useRouteError` 는 error 객체를 주고, 해당 객체는 response를 throw 하거나 또는 다른 종류의 객체 또는 데이터를 throw 하는지에 달려있음

## 18. json() 유틸리티 함수

```jsx
// Events.js
export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response;
  }
};

// Error.js
...
export default function Error() {
  ...

  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 400) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    ...
  );
}
```

- `Response` 객체를 만들어 반환하는 대신, `json` 함수의 호출 결과를 반환할 수 있음
- `json` 함수
  - json 형식의 데이터가 포함된 `Response` 객체를 생성하는 함수
  - 첫 번째 인자 : `Response` 에 포함되어야 할 데이터를 넣을 수 있음
  - 두 번째 인자 : status와 같은 추가적인 `Response` 메타 데이터 설정 가능
- `json` 함수를 사용하면 코드의 길이를 줄일 수 있을 뿐만 아니라, `Response` 데이터를 쓰는 곳에서 수동으로 JSON.parse()를 할 필요가 없어짐

## 19. 동적 라우트와 loader()

```jsx
// EventDetail.js
import { json, useLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetail() {
  const data = useLoaderData();

  return <EventItem event={data.event} />;
}

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    );
  } else {
    return response;
  }
}

// App.js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: 'true', element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: 'true',
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            element: <EventDetail />,
            loader: eventDetailLoader,
          },
          { path: 'new', element: <NewEvent /> },
          { path: ':eventId/edit', element: <EditEvent /> },
        ],
      },
    ],
  },
]);
```

## 20. useRouteLoaderData 훅과 다른 라우트에서 데이터에 액세스하기

```jsx
const data = useRouteLoaderData('event-detail');

// App.js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: 'true', element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: 'true',
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: 'true',
                element: <EventDetail />,
              },
              { path: 'edit', element: <EditEvent /> },
            ],
          },
          { path: 'new', element: <NewEvent /> },
        ],
      },
    ],
  },
]);
```

- `useLoaderData` 는 기본 값으로 가장 가까운 사용 가능한 `loader` 데이터를 검색하고, 이 데이터를 검색하는 가장 높은 레벨이 해당 컴포넌트가 로딩된 라우터의 라우트 정의
- 부모 라우트에서 데이터를 사용하기 위해서는 라우트 정의에 id 속성을 추가해야 함
  - `useRouteLoaderData` 는 `useLoaderData`와 거의 비슷하게 작동
  - `useLoaderData`는 인자로 라우트 id를 넣음
- `useRouteLoaderData` 를 사용하여 `loader`가 없는 라우트에서 더 높은 레벨의 `loader`에 접근 가능

## 21. action() 함수 사용하기

```jsx
// App.js
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: 'true', element: <Home /> },
      {
        path: 'events',
        element: <EventsRoot />,
        children: [
          {
            index: 'true',
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: 'true',
                element: <EventDetail />,
              },
              { path: 'edit', element: <EditEvent /> },
            ],
          },
          { path: 'new', element: <NewEvent /> action: newEventAction},
        ],
      },
    ],
  },
]);

// NewEvent.js
import { json } from 'react-router-dom';
import EventForm from '../components/EventForm';

export default function NewEvent() {
  return <EventForm />;
}

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    header: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save event' }, { status: 500 });
  }

return redirect('/events');
}

// EventForm.js
import { useNavigate, Form } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method='post' className={classes.form}>
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type='button' onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
```

- `action` 은 함수를 받는데, 화살표 함수나 일반 함수를 인자로 받음
- 보통 라우트 정의에 함수를 작성하지 않고, 해당 `action` 이 속한 컴포넌트에 작성
- `Form` 태그
  - 리액트 라우터의 `Form` 태그는 백엔드로 요청을 전송하는 브라우저 기본 값을 생략하게 하고, 대신 전송되었을 그 요청을 받아서 `action`에 전달
  - 이 요청에는 폼의 일부로 제출되었던 모든 데이터가 포함됨
  - `method` 속성으로 POST, GET 등 사용 가능
  - 해당 요청이 자동으로 백엔드로 전송되지 않고, 모든 폼 데이터를 포함하여 `action`에 전송됨
- `redirect`
  - 응답 객체를 생성
  - 사용자를 다른 페이지로 redirect 함
  - 인자로 사용자를 리다이렉션 하려는 목표 경로를 지정

## 22. 프로그램적으로 데이터 제출하기

- `Form` 에 `action` 속성에 경로를 설정하여 다른 라우트로 요청을 전송할 수 있음
  ```jsx
  <Form method='post' action='/any-other-path' className={classes.form}>
  ```
  - 이렇게 한 경우, 다른 라우트 정의 객체의 다른 경로가 트리거 될 것
  - 현재 활성되고 있는 라우트의 액션을 트리거하려면 해당 속성을 사용할 필요가 없음
- `useSubmit` 함수
  ```jsx
  submit(null, { method: 'delete' });
  ```
  - 첫 번째 인자 : 폼 데이터 객체로 감싸진 데이터
  - 두 번째 인자 : 우리가 폼에 설정할 수 있는 것과 기본적으로 같은 값 설정 가능
    - 예) method,

## 23. useFetcher()를 이용한 배후작업

- `useFetcher`
  - 이 훅이 실행되면 객체를 반환
  - 라우트를 전환하지 않은 채로 액션이나 `loader` 와 상호작용 하려는 경우에 사용
    - 즉, 라우트 변경을 트리거하지 않은 채로 배후에서 요청을 전송할 때 사용
  - `loader` 나 액션이 반환한 데이터에 접근 가능
  - `idle`, `loading`, `submitting`과 같은 `state` 값도 받을 수 있음
    - 이것은 `useNavigation` 훅에서도 알 수 있음
      → `useNavigation` 은 실제 라우트 변경이 일어는 경우에 사용해야 함
    - 트리거된 `loader` 나 액션을 배후의 `fetcher` 가 완료했는지 알려줌
- 예)
  ```jsx
  import { useFetcher } from 'react-router-dom';
  import classes from './NewsletterSignup.module.css';
  import { useEffect } from 'react';

  function NewsletterSignup() {
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    useEffect(() => {
      if (state === 'idle' && data.message) {
        window.alert(data.message);
      }
    }, [data, state]);

    return (
      <fetcher.Form method='post' className={classes.newsletter}>
        <input
          type='email'
          placeholder='Sign up for newsletter...'
          aria-label='Sign up for newsletter'
        />
        <button>Sign up</button>
      </fetcher.Form>
    );
  }

  export default NewsletterSignup;
  ```
  - `fetcher.Form` 으로 컴포넌트를 사용하게 되면, 실제로 액션을 트리거하지만 라우트 전환을 하지 않음
    - `fetcher` 는 액션을 트리거 하거나 `loader` 함수의 도움으로 트리거 하지만, 실제로 `loader` 가 속한 페이지 또는 그 액션이 속한 페이지로 이동하지 않을 때 사용해야 함
    - 라우트 전환을 하지 않고 특정 값을 제출할 수 있음
  - `fetcher.Form` 에는 `action` 속성 추가 가능

## 24. defer() 함수로 데이터 가져오기를 연기하는 방법

- 데이터가 도착하기 전에 특정 페이지를 로딩하고 싶거나 데이터가 전부 도착할 때까지 페이지의 일부를 보여주려 할 때 사용
- 로딩을 연기하고, 비록 데이터가 다 도착하지 않았어도 컴포넌트를 미리 렌더링하라고 리액트 라우터에 알릴 수 있음
- `defer` 를 사용하면 페이지 속도가 높아지고, 다른 콘텐츠를 기다리는 동안의 약간의 콘텐츠를 미리 보여줄 수 있게 됨
  - 응답 속도가 다른 다수의 HTTP 요청이 있는 페이지들이 있는 경우에 사용하면 특히 유용

```jsx
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventList from '../components/EventsList';
import { Suspense } from 'react';

function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

export default Events;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });

    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
```

- `loader` 안에서 Promise를 기다리기 보다는, `defer` 함수를 사용
- `defer` 는 일반적으로 어떤 작업을 연기하거나 나중에 실행되도록 미루는 것을 의미
  - 나중에 결정되거나 값이 설정될 수 있는 무언가를 연기
- `defer` 에 인자로 객체를 넣어줌
  - 이 객체는 해당 페이지에서 오갈 수 있는 모든 HTTP 요청을 넣어주어야 함
  - 키에 대한 값에는 Promise가 있어야 데이터 가져오기를 연기할 수 있음
    - **Promise**는 `defer` 개념을 구현하는 중요한 객체
    - Promise는 "나중에 어떤 값으로 리졸빙될" 가능성을 가진 객체
- `Await` 컴포넌트는 `resolve` 프로퍼티를 가지는데, 값으로 연기된 값 중 하나를 취함
  - Promise가 리졸빙 되고 데이터가 도착하면 리액트 라우터가 실행할 함수에서 이벤트를 인자로 받아 컴포넌트를 렌더링
- `Suspense` 컴포넌트는 `Await` 컴포넌트를 감싸는데, 다른 데이터가 도착하길 기다리는 동안 `fallback`을 보여주는 특정한 상황에서 사용 가능
- `loader` 와 `useLoaderData` 사이에 `defer` 가 있기 때문에 아래의 코드와 같이 데이터를 수동으로 반환해야 함
  ```jsx
  const resData = await response.json();
  return resData.events;
  ```
- 데이터가 도착하기 전에 `Events` 컴포넌트를 로딩하고 해당 컴포넌트를 렌더링 할 것이고, 데이터가 도착할 때까지 폴백을 표시할 것

## 25. 리액트 라우터 버전5에서 업그레이드 하기

- 이 코스 섹션은 리액트 라우터 버전6을 사용
- 버전5에서 버전6으로 업그레이드하기
  [React Router 6 - What Changed & Upgrading Guide](https://www.youtube.com/watch?v=zEQiNFAwDGo)
- 버전6에서 버전6.4으로 업그레이드하기 (중요 데이터 가져오기 기능들이 추가됨)
  [React Router 6.4 - Getting Started](https://www.youtube.com/watch?v=L2kzUg6IzxM)
