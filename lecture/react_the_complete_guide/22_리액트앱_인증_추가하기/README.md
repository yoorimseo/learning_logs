# 리액트앱 인증 추가하기

## 1. 인증의 원리

### 1) 인증이란?

- 특정 백엔드 라우트들은 보호가 필요하고, 모든 사람이 접근할 수 있으면 안됨
- 리액트 앱과 같은 프론트엔드 앱이 특정 백엔드 리소스에 접근하려 할 때, 접근 권한이 주어지기 전에 반드시 인증을 받아야 함

### 2) 어떻게 client-side 리액트 앱이 서버에서 돌아가는 백엔드 앱에서 인증을 받을 수 있을까?

- 모든 것은 사용자 자격 증명을 가지고 요청을 보내는 것에서 시작
  - 예) 이메일-비밀번호를 백엔드 서버에 보내기
- 그러면 백엔드 서버는 해당 자격 증명의 유효성을 검증하거나, 필요하다면 새 사용자를 생성
- 자격이 유효한 것으로 검증되면, 서버는 우리에게 보호된 리소스에 접근을 허가한다는 응답을 보냄
  - 해당 응답은 접근 허가가 가능한다는 것만으로는 부족함
  - 보호된 리소스에 접근하기 위한 미래의 요청에 접근 허가가 가능한다는 내용만 있다면, 이것은 조작이 가능하기 때문
- server-side session(서버 측 세션)이나 authentication token(인증 토큰)을 사용
- 결국 서버는 우리가 로그인을 하면 토큰을 포함한 응답을 보내는 것
- 그리고 클라이언트 측 리액트 앱에 토큰을 저장하고, 이후에 보낼 요청에 첨부하여 해당 토큰을 사용자의 로그인 여부를 판단하는 인디케이터로 사용해야 함

### 3) server-side session(서버 측 세션)

- 대중적인 솔루션으로, 프론트엔드와 백엔드가 분리되지 않은 풀스택 앱에서 자주 사용
- 리액트는 프론트엔드와 백엔드가 분리되어 있기 때문에 이상적인 방법은 아님
- 사용자가 로그인 하고 인증된 다음, 서버에 고유 식별자를 저장하는 원리
  - 인증을 허가한다는 응답을 서버에 저장하고, id를 이용해 이 응답을 특정 클라이언트와 연결한 다음, 이 id를 다시 클라이언트에게 보내는 것
  - 클라이언트는 이후 요청에서 해당 id를 전송하여 보호된 리소스에 접근 가능
- 서버 측 세션은 인증을 해결하거나 인증을 구현하는 좋은 방법이지만, 백엔드와 프론트엔드 사이에 긴밀한 결합이 필요
  - 백엔드가 클라이언트 관련 정보를 반드시 저장해야 하기 때문
- 리액트는 분리된 백엔드 API를 사용하기 때문에, 클라이언트와 긴밀하게 결합되어 있지 않고 클라이언트 측 정보도 저장하지 않음

### 4) authentication token(인증 토큰)

- 사용자가 유효한 자격 증명을 전송한 뒤, 서버에는 인증 토큰을 저장하지는 않음
- 토큰은 기본적으로 알고리즘에 따라 생성된 문자열로, 몇 가지 정보를 포함
- 백엔드에서 토큰을 생성하고, 다시 클라이언트에게 전송
- 이 토큰이 특별한 점은, 토큰을 생성한 백엔드만이 해당 토큰의 유효성을 확인하고 검증할 수 있음
  - 백엔드만이 알 수 있는 개인키를 활용해 토큰을 생성했기 때문
- 이후 다시 클라이언트가 백엔드에 요청을 보낼 때 해당 토큰을 요청에 첨부하면, 백엔드는 토큰을 살펴보고 검증하고 이 토큰이 이 백엔드에서 만들어진 것인지 확인
- 유효한 토큰이라는 결론이 나면 보호된 리소스에 대한 접근이 승인됨

## 2. 쿼리 매개변수 추가하기

```jsx
// import { useState } from 'react';
import { Form, Link, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      <Form method='post' className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' required />
        </p>
        <p>
          <label htmlFor='image'>Password</label>
          <input id='password' type='password' name='password' required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
```

- 쿼리 매개변수란, url에서 ? 뒤에 붙는 매개변수
- 쿼리 매개변수를 사용하면 원하는 페이지 모드에 직접 연결할 수 있음
- `useSearchParams` 훅을 사용하여, 리액트 라우터는 현재 설정된 쿼리 매개변수에 쉽게 접근할 수 있음
  ```jsx
  import { useSearchParams } from 'react-router-dom';

  const [searchParams, setSearchParams] = useSearchParams();
  ```
  - 배열을 제공
    - 첫 번째 요소 : 현재 설정된 쿼리 매개변수에 접근권을 주는 객체
    - 두 번째 요소 : 현재 설정된 쿼리 매개변수를 업데이트하게 해주는 함수
  - `get` 메서드 : 특정 쿼리 매개변수에 대한 값을 가져옴

## 3. 인증 상태에 따라 UI 업데이트하기

- `useContext` 를 사용하여 앱 전반에 걸쳐 토큰을 관리할 수 있음
- 최상위 라우트에 `loader` 를 추가하여 로컬스토리지에서 토큰을 추출
  - 그러면 이 토큰을 모든 라우트에서 사용 가능
  - 로컬스토리지의 토큰 소유 여부에 따라 해당 루트 라우트의 `loader` 데이터를 사용하는 모든 페이지를 업데이트

## 4. 라우트 보호 추가하기

- `App.js`의 라우트에서 로그인하지 않으면 접근할 수 없어야 하는 페이지에 대해, `loader` 를 활용하여 토큰 유뮤를 확인
  - 토큰이 없으면 리다이렉션 하도록 지정
  - 해당 `loader()`**가 반드시 null 또는 기타 다른 값을 리턴해야 함**
    - 오류를 피하기 위해, 달리 아무것도 리턴하지 않는 모든 if 구문에 return null 구문을 추가해야 함
      ```jsx
      export function checkAuthLoader() {
        const token = getAuthToken();

        if (!token) {
          return redirect('/auth');
        }

        return null; // 이 부분은 다음 강의 비디오에 빠져 있으므로 추가해야 함
      }
      ```
