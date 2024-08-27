# Forms 및 사용자 입력 작업

## 1. Forms 소개 및 까다로운 이유

### 1) form이란?

- 입력 필드의 집합
- 주로 `label` 과 함께 사용됨
  - `label` 은 내장된 HTML form 요소

### 2) form의 용도

- 사용자의 form 제출을 관리 & 사용자가 입력한 값을 추출
  - 양방향 바인딩을 설정하여 상태를 통해 데이터를 관리할 수 있기 때문에 쉬운 편
  - 값을 출하기 위해 참조를 사용할 수 있음
  - 브라우저가 제공하는 함수들을 사용하여 사용자가 입력한 데이터를 추출해내고, formData 객체를 통해 form 필드로 옮길 수 있음
- 사용자가 제공한 데이터를 검증 → 부정확한 데이터를 제공했다면, 사용자에게 검증 오류를 제시
  - 좋은 사용자 경험을 제공하고 싶다면 더욱 어려움
    - 키를 누를 때마다 사용자가 입력한 데이터를 검증하고, 올바르지 않은 경우 오류 메시지를 계속 띄우는 방법은 오류가 너무 일찍 나타나는 문제 발생
    - 사용자가 입력창에 입력을 끝내고 넘어가면 그때마다 검증할 수 있는데, 이 경우 오류가 너무 오랫동안 보인다는 문제 발생
    - 양식을 제출할 때 검증하는 방법도 있지만, 앱의 요구사항이나 제공하고 싶은 사용자 경험에 따라 오류가 너무 늦게 나오는 경우도 있음

## 2. Form 제출 다루기

### 1) form의 제출을 관리하는 방법

```jsx
export default function Login() {
  function handleSubmit() {
    // 페이지를 다시 로딩할 때마다 다시 새로고침 하기 때문에 해당 콘솔로그가 빠르게 보여졌다가 사라짐
    console.log('Submitted!');
  }

  return (
    <form>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' />
        </div>
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button' onClick={handleSubmit}>
          Login
        </button>
      </p>
    </form>
  );
}
```

- `label` 의 `htmlFor` 속성은 HTML에서 설정하는 for 속성의 함수의 리액트 버전
- 기본 상태의 브라우저에서 `form` 요소 안에 있는 `button` 은 `form` 을 제출하는 용도로 사용됨
  - 즉, HTTP 요청이 발생하여 웹 사이트의 서버로 전송되는 것
  - 이것이 기본적인 `form` 의 작동 원리
    - 리액트로 만들지 않은 앱에서도 풀스택 앱의 페이지는 서버에 의해서 렌더링 된 후에 클라이언트에게 전송됨
      → 따라서 `form` 제출은 서버로 다시 전송되어야 하기 때문에 서버가 `form` 을 관리하는 것
  - 개발자도구 > Network 탭 > `Login` 버튼을 눌렀을 때 전체 페이지가 새로고침 되고, 새로 발생한 요청이 생김
    - 이 요청은 브라우저가 자동으로 보낸 것
  - 코드의 `Login` 과 `Reset` 과 같은 버튼들은 모두 `form` 요소에서 요청을 발생시키고, 해당 요청을 웹 사이트의 서버로 전송함
  - 리액트에서 작업할 때는 이것이 문제로 발생
    - 리액트 웹 사이트의 주소를 관리하는 서버가 순수 개발 서버이기 때문
    - 즉, 이 서버는 `form` 제출을 위해 이를 관리할 수 있는 코드를 갖추지 않음
      → 실제 사용자를 위한 진짜 서버에 이 리액트 앱을 배포하더라도, 이 서버는 `index.html` 파일과 앱의 자바스크립트 파일들만 관리할 수 있음
      → 새로 들어오는 `form` 요청을 관리할 수는 없음
  ⇒ 따라서 위 코드의 `handleSubmit` 의 `console.log` 가 문제가 되는 것

### 2) 해당 `form` 을 제출하는 버튼의 기본 구성을 막는 방법

- 버튼 요소에 `type=”button”` 을 설정하면 해당 버튼이 `form` 을 제출하지 않게 됨
  ```jsx
  export default function Login() {
    function handleSubmit() {
      console.log('Submitted!');
    }

    return (
      <form>
        ...
        <p className='form-actions'>
          <button className='button button-flat'>Reset</button>
          <button type='button' className='button'>
            Login
          </button>
        </p>
      </form>
    );
  }
  ```
  - `form` 안의 버튼의 기본 type은 `submit` 이기 때문
- type을 설정하지 않고(default 상태인 `type=”submit”` 유지), `onClick` 메서드를 지우고, `form` 요소에 `onSubmit={handleSubmit}` 속성을 추가
  ```jsx
  export default function Login() {
    function handleSubmit(event) {
      event.preventDefault();
      console.log('Submitted!');
    }

    return (
      <form onSubmit={handleSubmit}>
        ...
        <p className='form-actions'>
          <button className='button button-flat'>Reset</button>
          <button className='button'>Login</button>
        </p>
      </form>
    );
  }
  ```
  - 조금 더 정교한 방법이면서, 나중에 입력된 값들을 추출할 때도 도움이 됨
  - `form` 요소가 submit 이벤트를 발생시키는데, 어떤 버튼을 눌러서 제출될 때마다 제출을 확인하고 반응할 수 있음
  - `handleSubmit` 함수에 `event` 속성을 추가함으로써 자동적으로 이벤트 객체를 얻을 수 있기 때문
    - 이것은 발생하는 모든 이벤트(`onClick`, `onChange`, `submit` 등)에 대해서 적용됨
  - 이 이벤트 객체는 `event.preventDefault` 라는 새로운 메서드를 사용 가능
    - `event.preventDefault` 는 브라우저의 기본 구성이 일어나지 않게 함
    - 즉, HTTP 요청을 전송하는 기본 구성이 일어나지 않음

### 3) 사용자가 입력한 값을 가지고 값을 검증하기

- 사용자가 입력한 값을 HTTP 요청으로 모을 수 있음
- 그리고 이것을 백엔드로 전송할 수 있음
- 리액트로 제작하는 앱에서 HTTP 요청을 전송하는 작업이 가능하기 때문
  - 일반적으로 HTTP 요청은 개별 코드를 작성하여 백엔드로 독립적으로 전송됨

## 3. State(상태) & 일반 Handler로 사용자 입력 수집 및 관리

### 1) `useState` 사용하여 사용자가 입력한 값에 접근하는 방법

- 각 입력창마다 상태를 설정하기
  ```jsx
  import { useState } from 'react';

  export default function Login() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    function handleSubmit(event) {
      event.preventDefault();

      // console.log('Submitted!');
      console.log('User email: ' + enteredEmail);
    }

    function handleEmailChange(event) {
      setEnteredEmail(event.target.value);
    }

    function handlePassword(event) {
      setEnteredPassword(event.target.value);
    }

    return (
      <form onSubmit={handleSubmit}>
        ...
        <div className='control-row'>
          <div className='control no-margin'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              onChange={handleEmailChange}
              value={enteredEmail}
            />
          </div>
          <div className='control no-margin'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' />
          </div>
        </div>
        ...
      </form>
    );
  }
  ```
  - `onChange` 메서드에 `handleEmail` 함수를 넣어 해당 입력창과 연결되도록 함
    - 해당 입력창에서 값이 변경될 떄마다 `handleEmail` 함수가 작동
      → 예를 들어 키보드를 입력할 때마다 해당 함수가 작동
  - `handleEmail` 함수에서 상태 업데이트 함수를 사용하여 `event.target.value` 값을 넣음
    - `event.target` 은 입력창이고, 이 입력창을 나타내는 객체는 `.value` 로, 해당 값에 접근 가능
  - `input` 요소에 `value={enteredEmail}` 속성을 추가
    - 입력창의 시작에서 보이는 값을 해당 상태의 초기값으로 설정한 것
    - 사용자가 입력값을 추가할 때마다 해당 입력창에 반영됨
  - 하지만, 각 입력 값마다 따로 `handling` 함수를 만든다면, 입력이 많은 복잡한 `form` 을 만드는 경우에 `handling` 함수와 상태 스냅샷이 너무 많아지게 됨
- 하나로 결합하는 상태를 설정해서 객체 안에 상태 값 전부를 저장하기
  ```jsx
  import { useState } from 'react';

  export default function Login() {
    const [enteredValues, setEnteredValues] = useState({
      email: '',
      password: '',
    });

    function handleSubmit(event) {
      event.preventDefault();

      console.log(enteredValues);
    }

    function handleInputChange(identifier, value) {
      setEnteredValues((prevValues) => ({
        ...prevValues,
        [identifier]: value,
      }));
    }

    return (
      <form onSubmit={handleSubmit}>
        ...
        <div className='control-row'>
          <div className='control no-margin'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              name='email'
              onChange={(event) =>
                handleInputChange('email', event.target.value)
              }
              value={enteredValues.email}
            />
          </div>

          <div className='control no-margin'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              onChange={(event) =>
                handleInputChange('password', event.target.value)
              }
              value={enteredValues.password}
            />
          </div>
        </div>
        ...
      </form>
    );
  }
  ```
  - `handleInputChange` 에서 인자로 익명 함수를 사용하여, `prevValues` 를 통해 이전 상태 스냅샷을 얻어 새로운 상태 스냅샷을 반환할 수 있음
    - 새로운 객체는 자바스크립트가 알아보기 쉽도록 중괄호 `{ }`로 넣음
      → `({ })` 는 객체를 바로 반환하고 싶다는 의미
      → `{ }` 는 함수의 body가 아닌 객체 값을 만드는 역할
    - 해당 객체에 스프레드 연산자를 사용하여 이전 상태 스냅샷을 넣음
      → 이메일과 패스워드 중 하나의 값만 업데이트 할 것이기 때문에 다른 값이 사라지지 않도록 하기 위함
    - 그리고 사용자가 입력한 `identifier` 에 대한 값을 업데이트 함
      → 자바스크립트 구문인 `[속성이름]: 저장되어야_하는_값` 을 사용해서 객체 속에 있는 속성에 더 자유롭게 접근 가능

## 4. Refs(참조)로 사용자 입력 수집

```jsx
import { useRef } from 'react';

export default function Login() {
  const email = useRef('');
  const password = useRef('');

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      ...
      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' name='email' ref={email} />
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' ref={password} />
        </div>
      </div>
      ...
    </form>
  );
}
```

- `input` 요소에 `ref={참조값}` 참조 속성을 설정함으로써 DOM 요소 간에 연결 관계가 생기게 됨
  → `input` 요소와 참조 간의 연결 관계
- `참조.current` 를 통해 실제로 연결된 DOM 요소에 접근 가능
  - `참조.current.value` 를 통해 해당 요소의 값 속성에 접근 가능
- 장점
  - 상태를 사용하는 것보다 코딩이 적게 필요
  - HTML 요소에 변화 제어 함수나 속성을 추가하지 않을 수 있음
- 단점
  - 값을 깨끗하게 재설정하는 것이 조금 어려움
    - 실제로 DOM을 다룰 때 참조를 사용하기가 까다롭기 때문
    - `event.current.value = ’’;` 와 같이 값을 재설정하는 것이 가능은 하지만 권장하는 방법은 아님
  - 복잡한 `form` 이라면 많은 참조를 만들어야 하고, 해당 참조들을 하나하나 연결해야 함
    - 많은 입력 요소를 다루는 상황이라면 번거로움

## 5. FormData & 네이티브 브라우저 API로 값 채취

```jsx
export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll('acquisition');
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    console.log(data);
    // data {
    //  email: '',
    //  password: '',
    //  confirm-password: '',
    //  first-name: '',
    //  last-name: '',
    //  role: "student"
    // }
  }
  return <form onSubmit={handleSubmit}>...</form>;
}
```

- 브라우저는 `form` 제출 관리와 입력된 값을 얻는 작업을 도와주는 역할을 함
- 브라우저에 내장되어 있는 객체 함수로 `FormData` 객체를 만들 수 있음
- `FormData` 는 `form` 에 입력된 각기 다른 값들을 쉽게 얻을 수 있도록 도와주는 객체
  - `FormData` 에 `event.taret` 이 가리키는 것은 해당 `form`
    → 해당 `form` 이 제출된 것이기 때문
  - 결과적으로 `FormData` 가 해당 `form` 의 `input` 을 통해 추가된 모든 데이터로 접근할 수 있게 해줌
  - 이것이 가능하려면 값을 추출하려는 모든 `input` 에 `name` 속성이 설정되어 있어야 함
- `FormData` 의 내장 메서드
  - `get` : 특정 `name` 에 대한 값을 추출할 수 있음
    → 하지만 입력 요소 하나하나마다 값을 추출해야 하는 번거로움이 존재
- 입력에 대한 모든 값을 얻고, 그 값들을 객체로 그룹화하기 위해 자주 사용하는 방법
  - `Object.fromEntries(FormData객체.entries)` : `FormData` 객체에서 불러낸 `entries` 메서드의 결과를 `fromEntries` 객체로 보냄
    - `FormData객체.entries` 는 모든 입력창과 그에 속한 값들의 배열을 제공
    - 이 배열에 있는 `Entry` 로부터 `Object` 를 불러내면, 모든 입력창의 핵심 값들을 가지고 있는 객체를 얻을 수 있음
- 체크박스의 경우 같은 `name` 을 갖는데, 이와 같이 다양한 값이 있는 입력은 `Entry` 나 `fromEntries` 를 사용할 때는 빠져있음
  - 이것의 경우는 `getAll` 메서드를 사용하여 직접 추출해야 함
  - `data.acquisition = acquisitionChannel;` 과 같이 작성하여 `data` 에 추가

## 6. Form 초기화하기

### 1) 버튼 `type` 의 `reset` 속성을 이용하여 초기화 하기

- `form` 에서 입력창에 값을 입력하고 `Reset` 버튼을 클릭하면, 입력창의 값이 리셋됨
- 이 기능이 구현되는 것은 해당 리셋 버튼이 `type=”reset”` 으로 설정되어 있기 때문

### 2) 프로그래밍으로 초기화 하기

- 상태 값을 이용해 입력 값을 관리하고 있다면, 해당 상태 값을 초기화 시킬 수 있음
  ```jsx
  function handleSubmit(event) {
    event.preventDefault();

    setEnteredValues({
      email: '',
      password: '',
    });
  }
  ```
- 참조 값을 이용해 입력된 값을 얻고자 하는 경우에는 연결된 입력 요소의 `value` 값을 빈 문자열로 직접 설정함으로써 초기화 할 수 있음
  ```jsx
  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    email.current.value = '';
    password.current.value = '';
  }
  ```
  - 이 방법은 조심해서 사용해야 함
  - DOM의 업데이트는 리액트가 맡아서 하도록 두는 것이 일반적이기 때문
  - 위의 코드와 같이 작은 업데이트 뿐일지라도 DOM을 직접 업데이트 하는 것이기 때문에, 추천하지 않음
- 값의 추출을 위해 외부 데이터 접근법을 사용할 때, `form` 을 초기화 시키기에 더 용이
  ```jsx
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const acquisitionChannel = fd.getAll('acquisition');
    const data = Object.fromEntries(fd.entries());
    data.acquisition = acquisitionChannel;

    event.target.reset();
  }
  ```
  - `event.target` 은 `reset` 메서드를 가지고 있기 때문에 쉽게 초기화 가능
    - 이것은 버튼에 `type=”reset”` 을 설정한 것과 동일
  - 이 또한 강제적인 코드라고 볼 수 있지만, 최소한의 단계별로 참조 값을 하나하나 빈 문자열로 설정하는 것에 비해 작성해야 할 코드가 줄어듦
    → 이것이 참조 값을 직접 초기화 시키는 것보다 `event.target.reset()` 코드 사용을 선호해야 할 이유

## 7. State(상태)로 매 키보드 입력마다 유효성 검사하기

- 사용자의 입력 값이 우리가 필요로 하는 모든 데이터를 갖추고 있는지 확인하기 위한 검증
- 사용자가 입력창에 무언가를 써넣기 위해 타자를 칠 때마다 검증이 진행되도록 하기
- 참조로 입력창의 값을 관리하고 있는 경우엔, `form` 이 제출된 이후에 데이터를 얻게 되기 때문에, 키 입력마다 검증을 진행하기 위해서는 상태 기반의 접근법이 필요

### 1) 상태로 입력창의 값을 관리하고 있는 경우

- `handling` 함수에서 매번 키 입력에 반응해서 해당 값을 검증하기 위해서는 입력값이 어떻게 변하는지를 확인해야 함
- 상태로 관리되는 입력 값들이 변경되어 해당 컴포넌트 함수가 재실행될 때마다 새로운 값이 계산되게 함
  ```jsx
  const emailIsInvalid =
      enteredValues.email !== !enteredValues.email.includes('@');

  ...
  <div className='control no-margin'>
    <label htmlFor='email'>Email</label>
    <input
      id='email'
      type='email'
      name='email'
      onChange={(event) => handleInputChange('email', event.target.value)}
      value={enteredValues.email}
    />
    <div className='control-error'>
      {emailIsInvalid && <p>Please enter a valid email address.</p>}
    </div>
  </div>
  ```
  - `emailIsInvalid` 에 `enteredValues.email` 조건을 넣어 입력하지 않았을 때부터 에러 머세지가 뜨는 것을 방지
    - 글자를 처음 입력하는 순간부터 유효한 값이 입력될 때까지 보여지도록 함
  - 위 방법의 문제점
    - 만약 유효한 이메일을 입력한 뒤 해당 내용을 지우게 되었을 경우, 에러 메세지가 보여지지 않음
      → 이메일 입력창이 비어있는 문자열인지 확인하고, 해당되는 경우 `emailIsInvalid` 가 true로 설정되지 않기 때문
    - 에러 메세지가 처음부터 보여지지는 않지만, 사용자가 타이핑을 시작하자마자 보여진다는 것
      → 사용자는 유효한 값을 입력할 기회조차 없었다는 것을 의미

## 8. Blur 상태시 입력 유효성 검사

### 1) 포커스 해제 상태에서 어떻게 입력 값을 검증할 수 있을까?

- 이것을 위해서는 포커스가 해제되는 입력창에 반응해야 함
- 이벤트 리스닝 속성인 `onBlur` 를 추가해 포커싱이 해제되는 입력에 반응하는 것이 가능
- `onBlur`
  - 내장된 기본 브라우저 이벤트
  - 해당 입력이 포커스를 잃을 때마다 이벤트가 발생됨

### 2) 예시를 통해 알아보기

```jsx
const [didEdit, setDidEdit] = useState({
  email: false,
  password: false,
});

const emailIsInvalid = didEdit.email !== !enteredValues.email.includes('@');

function handleInputBlur(identifier) {
  setDidEdit((prevEdit) => ({
    ...prevEdit,
    [identifier]: true,
  }));
}

<input
  id='email'
  type='email'
  name='email'
  onBlur={() => handleInputBlur('email')}
  onChange={(event) => handleInputChange('email', event.target.value)}
  value={enteredValues.email}
/>;
```

- 사용자가 해당 값을 건드렸는지에 대한 여부도 기록하기 위해 새로운 상태를 추가해야 함
- `blur` 이벤트가 발생하고 해당 입력창이 포커스를 잃게 되면, 포커스가 원래 존재했었다는 사실을 알 수 있음
  - 즉, 사용자가 해당 입력을 사용했었다는 것
- 처음부터 오류가 발생하지 않고, 해당 입력창의 포커스를 잃게 되면 에러 메세지가 보여지게 됨

### 3) 이 방법의 단점

- 포커스가 해제된 상태에서 유효성을 검증하게 되면 에러가 너무 오랫동안 보여지게 됨
  - 에러 메세지가 있는 상태에서는 타이핑을 시작하더라도 유효한 값이 입력되어야만 에러 메세지가 사라지기 때문
  - 사용자가 타이핑을 다시 시작하자마자 해당 에러 메세지가 사라져야 한다고 생각할 수 있음
    - 사용자가 다시 타이핑을 한다는 것은 유효한 값을 입력한 또 다른 기회를 가졌다는 것이기 때문에
    - 사용자가 타이핑을 마치고 나서 입력창이 포커스를 잃는 시점에 검증을 다시 진행하여, 유효성이 다시 확인될 때까지 해당 에러 메세지가 보여지지 않아야 한다고 생각할 수 있다는 것

### 4) 예시 코드를 개선하는 방법

- 키가 눌릴 때마다 `didEdit` 이 업데이트 되도록 하는 것
- 사용자가 타이핑을 다시 시작할 때마다 상태 값을 false로 리셋 시키는 것
  ```jsx
  function handleInputChange(identifier, value) {
    setEnteredValue((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    // 추가된 코드
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }
  ```

### 5) 최선의 방법

- 키 입력에 따른 검증과 포커싱 해제에 따른 검증을 결합하고, 사용자가 다시 타이핑을 했을 때 해당 포커스 상태를 리셋함으로써 사용자 입력을 검증하는 것이 좋은 패턴

## 9. Form 제출시 입력 유효성 검사

### 1) 참조를 사용하는 경우, 사용자가 `form` 을 제출했을 때만 검증 진행하기

- 사용자가 타이핑을 할 때마다 검증하지 않아도 되기 때문에, 인기있는 방법 중 하나

```jsx
// Login.jsx
import { useRef, useState } from 'react';

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  ...

  function handleSubmit(event) {
    ...

    const emailIsValid = enteredEmail.includes('@');

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      // 유효한 값이 아닐 경우, 이후의 코드가 진행되지 않도록 하기 위해 return 추가
      return;
    }

    setEmailIsInvalid(false);

    console.log('Sending HTTP request...');
  }

  return (
    <form onSubmit={handleSubmit}>
			...
      <div className='control-row'>
        <div className='control no-margin'>
          ...
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>
				...
      </div>
			...
    </form>
  );
}
```

- 유효하지 않은 양식이 제출되면 UI 업데이트가 필요하기 때문에, 새로운 상태를 추가
- 입력창에 타이핑을 했을 때 에러 메세지가 따로 뜨지 않지만, 로그인 버튼을 클릭하게 되면 유효하지 않은 값일 때 에러 메세지가 나옴
  - 이 메세지는 유효한 이메일 주소가 입력되고 로그인 버튼을 눌러 해당 `form` 이 다시 제출될 까지 사라지지 않음
  - UI 업데이트를 하고 싶다면, 유효성 검사가 끝난 다음 줄에 `setEmailIsInvalid(false)` 를 작성
    → 이렇게 하면 유효한 `form` 이 제출되었을 때 에러 메세지가 사라짐

### 2) 이 방법의 장/단점

- 키 입력과 입력 요소의 포커스 상태 검증을 결합한 방식에 비해 적은 코드가 사용됨
  - 하지만 키 입력과 입력 요소의 포커스 상태 검증을 결합한 방식이 사용자에게 보다 직접적인 피드백을 제공할 수 있음
  - Form 제출에 따른 검증 방식 또한 문제없이 사용 가능
- 키 입력과 blur 를 이용한 유효성 검사를 하고 있더라도 Form 제출에 따른 검증 방식을 추가해야 하는 경우가 생길 수 있음
  - 키 입력과 입력 요소의 포커스 상태 검증을 결합한 방식을 사용했던 `StateLogin` 컴포넌트의 경우, 유효하지 않은 값을 입력하고 로그인 버튼을 눌렀을 때 `handleSubmit` 에서 유효하지 않은 데이터가 핸들링 됨

## 10. 내장된 검증 Props(속성)으로 입력 유효성 검사

### 1) 브라우저가 제공하는 `required` 내장 속성을 사용하는 방법

```jsx
// Signup.jsx
export default function Signup() {
  ...
  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className='control'>
        <label htmlFor='email'>Email</label>
        <input id='email' type='email' name='email' required />
      </div>

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            minLength={6}
          />
        </div>

        <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            id='confirm-password'
            type='password'
            name='confirm-password'
            required
          />
        </div>
      </div>

      <hr />

      <div className='control-row'>
        <div className='control'>
          <label htmlFor='first-name'>First Name</label>
          <input type='text' id='first-name' name='first-name' required />
        </div>

        <div className='control'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' name='last-name' required />
        </div>
      </div>

      <div className='control'>
        <label htmlFor='phone'>What best describes your role?</label>
        <select id='role' name='role' required>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
          <option value='employee'>Employee</option>
          <option value='founder'>Founder</option>
          <option value='other'>Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className='control'>
          <input
            type='checkbox'
            id='google'
            name='acquisition'
            value='google'
          />
          <label htmlFor='google'>Google</label>
        </div>

        <div className='control'>
          <input
            type='checkbox'
            id='friend'
            name='acquisition'
            value='friend'
          />
          <label htmlFor='friend'>Referred by friend</label>
        </div>

        <div className='control'>
          <input type='checkbox' id='other' name='acquisition' value='other' />
          <label htmlFor='other'>Other</label>
        </div>
      </fieldset>

      <div className='control'>
        <label htmlFor='terms-and-conditions'>
          <input
            type='checkbox'
            id='terms-and-conditions'
            name='terms'
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className='form-actions'>
        <button type='reset' className='button button-flat'>
          Reset
        </button>
        <button type='submit' className='button'>
          Sign up
        </button>
      </p>
    </form>
  );
}

```

- `required`
  - 브라우저가 사용자 입력을 검증할 수 있도록 입력 요소에 설정할 수 있는 내장 속성 중 하나
  [Client-side form validation - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
  - `required` 를 추가하면 브라우저는 해당 입력창이 비어있는 상태로 제출되는 것을 허가하지 않고 입력 요소의 `type` 속성을 함께 고려
    예) `<input *id*='email' *type*='email' *name*='email' *required* />`
    → 이 경우, 이메일 주소가 아닌 값을 받아들이지 않음
- `minLength`
  ```jsx
  <input id='password' type='password' name='password' required minLength={6} />
  ```
  - 해당 입력 필드에 입력된 값의 최소 길이를 정의
  - 입력한 값이 최소한 `minLength` 값이 되어야 함을 의미
- `select` 와 같은 모든 `form` 제어 요소 또한 위와 같은 속성을 지원
- `checkbox` 의 경우, 선택이기 때문에 `required` 를 따로 추가하지 않음

## 11. 커스텀과 내장 검증 로직 혼합

- 브라우저의 내장된 유효성 검사 속성을 사용하는 것은 유효성 검사 기능을 추가하는 매우 좋은 방법
  - 주로 추천하는 방법 중 하나
  - 추가적으로 별도의 리액트 또는 자바스크립트 로직이 없기 때문
- 이런 기본 검사 이외에 추가적인 검사를 하고 싶다면 필요한 로직을 추가해주면 됨
  ```jsx
  import { useState } from 'react';

  export default function Signup() {
    const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

    function handleSubmit(event) {
      event.preventDefault();

      const fd = new FormData(event.target);
      const acquisitionChannel = fd.getAll('acquisition');
      const data = Object.fromEntries(fd.entries());
      data.acquisition = acquisitionChannel;

      // -는 유효하지 않은 글자로 인식되기 때문에 대괄호를 사용
      if (data.password !== data['confirm-password']) {
        setPasswordAreNotEqual(true);
        return;
      }

      console.log(data);

      event.target.reset();
    }
    return (
      <form onSubmit={handleSubmit}>
        ...
        <div className='control-row'>
          ...
          <div className='control'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <input
              id='confirm-password'
              type='password'
              name='confirm-password'
              required
            />
            <div className='control-error'>
              {!passwordAreNotEqual && <p>Password must match.</p>}
            </div>
          </div>
        </div>
        ...
      </form>
    );
  }
  ```
  - 비밀번호 입력 후 해당 비밀번호를 재확인하여 두 개가 동일한지 확인하는 로직 추가

## 12. 재사용 가능한 입력 컴포넌트 구축 및 활용

```jsx
// StateLogin.jsx
import { useState } from 'react';

import Input from './Input';

export default function Login() {
  ...

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 6;

  ...

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          onBlur={() => handleInputBlur('email')}
          onChange={(event) => handleInputChange('email', event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email!'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          onBlur={() => handleInputBlur('password')}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please enter a valid password!'}
        />
      </div>

      ...
    </form>
  );
}

// Input.jsx
export default function Input({ label, id, error, ...props }) {
  return (
    <div className='control no-margin'>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className='control-error'>{error && <p>{error}</p>}</div>
    </div>
  );
}
```

## 13. 유효성 검사(검증) 로직 아웃소싱

```jsx
// validation.js
export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

// StateLogin.jsx
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';

const emailIsInvalid =
  didEdit.email &&
  !isEmail(enteredValues.email) &&
  !isNotEmpty(enteredValues.email);
const passwordIsInvalid =
  didEdit.password && !hasMinLength(enteredValues.password, 6);
```

## 14. 커스텀 useInput Hook(훅) 생성

```jsx
// useInput.js
import { useState } from 'react';

export function useInput({ defaultValue, validationFn }) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn;
  enteredValue;

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}

// StateLogin.jsx
import { useState } from 'react';

import Input from './Input';
import { isEmail, isNotEmpty, hasMinLength } from '../util/validation';
import { useInput } from '../hooks/useInput';

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      ...
      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && 'Please enter a valid email!'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'Please enter a valid password!'}
        />
      </div>
      ...
    </form>
  );
}
```

## 15. 서드 파티 Form 라이브러리 사용하기

- react form libraries
  - React Hook Form
  - Formik
