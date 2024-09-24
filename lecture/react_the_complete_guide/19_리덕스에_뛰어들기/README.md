# 리덕스에 뛰어들기(컨텍스트 API의 대안)

## 1. 리액트 앱의 State에 대한 또 다른 관점

### 1) 리덕스(Redux)란?

- 크로스 컴포넌트 또는 앱 와이드 상태를 위한 상태 관리 시스템
- 우리가 상태 즉, 애플리케이션을 변경하고 화면에 표시하는 데이터를 관리하도록 도와줌
  - 리덕스는 이런 데이터를 다수의 컴포넌트나 앱 전체에서 관리하도록 도와줌

### 2) State(상태)의 구분

- Local State
  - 데이터가 변경되어서 하나의 컴포넌트에 속하는 UI에 영향을 미치는 상태
  - 예) 세부 정보 필드를 켜고 끄는 토글 버튼
    - 사용자 입력을 리스닝하고 `useState` 를 사용해서 그 입력을 모든 키 입력과 함께 `state` 변수에 저장
    - 버튼을 클릭하면 세부 정보가 표시되고, 다시 클릭하면 감춰짐
  - 보통 우리는 `useState` 를 사용해서 컴포넌트 안에서 로컬 상태를 관리
    - 복잡하다면 `useReducer` 를 사용하기도 함
- Cross-Component State
  - 하나의 컴포넌트가 아니라 다수의 컴포넌트에 영향을 미치는 상태
  - 예) 모달 오버레이를 열거나 닫는 버튼
    - 모달 컴포넌트는 다수의 컴포넌트에 영향을 미칠 수 있음
    - 모달을 여는 트리거는 모달의 바깥에 있음
    - 모달 안쪽에 있는 버튼을 클릭하여 모달을 닫을 수 있음
    - 다수의 컴포넌트가 협력해서 어떤 모달을 표시하고 감추게 됨
  - `useState` 나 `useReducer` 를 이용해서 구현 가능
    - `prop`을 넣어주어야 하고, `prop chain(drilling)`을 구축해야 함
    - 다수의 컴포넌트에 걸쳐 `prop` 을 넣을 때, `prop` 값으로 함수도 넣을 수 있음
    - 다양한 컴포넌트들이 협력하고 상태를 관리할 수 있음
    ⇒ 로컬 상태보다는 약간 복잡함
- App-Wide State
  - 다수의 컴포넌트가 아니라, 애플리케이션의 모든 컴포넌트에 영향을 미치는 상태
  - 예) 사용자 인증
    - 로그인을 하면 navigationBar를 변경해 새로운 옵션을 표시해야 할 수도 있음
    - 다른 많은 컴포넌트에도 영향을 미침
      → 데이터를 더 많이 또는 적게 표시
  - `useState` 나 `useReducer` 를 이용해 상태 값을 넣어주고 컴포넌트 함수들에서 `prop chain(drilling)`을 통해 `props` 를 업데이트 해서 상태 관리

### 3) 리액트 컨텍스트와 리덕스

- Cross-Component State나 App-Wide State에서 리액트 컨텍스트를 사용하여 상태 값을 쉽게 관리 가능
- 리덕스도 역시 컨텍스트와 같이 `prop chain(drilling)` 문제를 해결 가능

## 2. 리덕스 vs 리액트 컨텍스트

- 리덕스는 크로스 컴포넌트 상태 또는 앱 와이드 상태를 위한 상태 관리 시스템
- 리액트 컨텍스트를 쓰면 `prop chain(drilling)` 을 하지 않을 수 있고, `context` 와 `ContextProvider` 컴포넌트를 사용하여 상태 값을 관리 가능

### 1) 리액트 컨텍스트의 잠재적인 단점

- 리액트 컨텐스트를 사용하면 설정이 아주 복잡해질 수 있고, 리액트 컨텍스트를 이용한 상태 관리가 상당히 복잡해질 수 있음
  - 여기서 복잡성은 프로젝트를 어떻게 구축하느냐에 따라 달라짐
    - 작거나 중간 정도의 애플리케이션은 대부분 문제가 되지 않을 가능성이 높음
    - 많은 컴포넌트와 내용이 있는 엔터프라이즈 수준의 애플리케이션 같은 대형 프로젝트에서는 리액트 컨텍스트가 아주 많아짐
  - 커져버린 `ContextProvider` 컴포넌트 하나가 다양한 것을 관리하기 때문에 단점이 될 수 있음
    - 아주 심하게 중첩된 JSX 코드와 다양하고 많은 `ContextProvider`, 또는 유지하기 어려운 거대한 `ContextProvider` 를 갖게 될 수 있음
- 성능 문제
  - 테마를 변경하거나 인증 같은 빈도가 적은 업데이트에는 아주 좋지만, 데이터가 자주 변경되는 경우에는 좋지 않음
  - 리액트 컨텍스트를 사용해서 부적절한 상태를 관리한다면, 성능이 나빠질 수 있음

## 3. 리덕스 작동 방식

- 리덕스는 애플리케이션에 있는 **하나의** 중앙 데이터(상태) 저장소
  - 이 저장소에 전체 애플리케이션의 모든 상태를 저장
    - 인증 상태, 테마, 입력 상태 등 무엇이든 저장 가능
  - 이 저장소 전체를 항상 직접 관리할 필요가 없음

### 1) 저장소로부터 데이터를 받는 방법

- 궁극적으로는 이 저장소에 데이터를 저장하고, 컴포넌트 안에서 이 데이터를 사용할 수 있음
  - 예) 사용자의 인증 상태가 변경되는 등 여기 있는 데이터가 변경되면 컴포넌트는 변화를 인지해서 그에 맞춰 대응하고 UI를 업데이트하길 원함
- 이 컴포넌트를 위해 중앙 저장소에 대한 `Subscription` 을 설정
  - 컴포넌트가 저장소를 `Subscription` 하고, 데이터가 변경될 때마다 저장소가 컴포넌트에게 알려줌
  - 그러면 컴포넌트는 필요한 데이터를 받게 됨
    - 예) 현재의 인증 상태
    - 리덕스 저장소의 일부를 받게 되는 것

### 2) 저장된 데이터를 변경하는 방법

- 컴포넌트는 절대로 저장된 데이터를 직접 조작하지 않음
  - 그래서 `Subscription` 을 하는 것이고, 데이터는 절대 `컴포넌트 → 저장소` 방향으로 흐르지 않음
- 리듀서(`Reducer`) 함수를 설정하여 이용
  - 이 함수는 저장소에 있는 데이터를 변경하는 것을 담당
  - `Reducer` 는 일반적인 함수 개념으로, `useReducer` 훅과는 다름
    - `Reducer` 함수는 입력을 변환해서 새로운 결과를 반환함
  - 예) 숫자로 된 리스트를 그 숫자들의 합으로 반환

### 3) 컴포넌트와 리듀서 함수를 연결하는 방법

- 컴포넌트이기 때문에 데이터 변경을 발생시킴
  - 예) 어떤 컴포넌트의 버튼을 클릭하면, 이것이 데이터 변경을 발생함
- 컴포넌트에서 `Action` 을 `Dispatch` 함
  - 컴포넌트가 어떤 `Action` 을 트리거 한다고 말할 수 있음
- `Action`
  - 단순한 자바스크립트 객체
  - 리듀서가 수행해야 할 작업을 설명
  - 리덕스는 이 액션을 리듀서로 전달하고, 원하는 작업에 대한 설명을 읽게 됨
  - 이어서 이 작업을 리듀서가 수행하게 됨

### 4) 동작 과정

1. 컴포넌트가 수행해야 할 작업이 설명되어 있는 액션을 리듀서로 전달
2. 리듀서는 이 액선이 원하는 것을 작업함
3. 리듀서는 새로운 상태를 반환하고, 이것이 실제로 중앙 데이터 저장소의 기존 상태를 대체하게 됨
4. 데이터 저장소의 상태가 업데이트 되면, 구독 중인 컴포넌트가 알림을 받게 됨
5. 컴포넌트는 UI를 업데이트 할 수 있음

## 4. **반드시 읽어야 할 내용:** 리덕스 createStore()는 사용 불가능

- createStore()라는 함수를 사용하여 리덕스 저장소라는 걸 생성할 때, IDE에서 또는 앱을 실행할 때 **사용 중단 경고**가 나올 수도 있음
- 이 경고는 무시해야 함!
- createStore()는 여전히 문제없이 사용 가능
- 리액트 리덕스 팀은 **리덕스 툴킷**이라는 추가 패키지와 리덕스 스토어를 생성하는 다른 방법을 사용할 것을 권장
  - **리덕스 툴킷**은 **뒷부분에서 조금 더 다룰** 예정
  - 먼저 createStore()를 살펴보고 강의를 들으면서, 리덕스의 작동 방식과 기능을 배우게 될 것

## 5. 핵심 리덕스 개념 탐색하기

### 1) redux 프로젝트 생성하기

```jsx
npm init -y // 빈 폴더에서 실행
npm install redux // redux 패키지 설치
```

### 2) 데이터 저장소

- 데이터 저장소는 데이터를 조작하는 리듀서 함수가 어떤 함수인지 알아야 함

### 3) 리듀서 함수

- 데이터 저장소에서 관리하는 데이터는 결국 리듀서 함수에 의해 결정됨
  - 리듀서 함수가 새로운 상태 스냅샷을 생성할 것이기 때문
- 리듀서는 액션이 도착할 때마다 새로운 상태 스냅샷을 반환해야 함
  - 코드를 처음으로 실행할 때, 리듀서도 실행되고 기본 액션을 통해 초기 상태를 반환하게 됨
- 리듀서 함수는 표준 자바스크립트 함수이지만, 리덕스 라이브러리에 의해 호출될 것
  - 기존의 상태와 발송된 액션, 항상 2개의 파라미터를 받음
  - 리듀서 함수는 항상 새로운 상태 객체를 반환해야 함
- 그래서 리듀서 함수는 순수한 함수가 되어야 함
  - 동일한 입력 값을 넣으면, 항상 정확히 같은 출력이 산출되어야 한다는 의미
  - 리듀서 함수 안에서는 어떠한 Side Effect도 없어야 함
    - 예) HTTP 요청을 전송한다거나 뭔가를 `localStorage`에 기록하거나 가져오지 말아야 함
  - 리듀서는 리덕스가 제공하는 입력을 취하고, 예상된 출력물인 새로운 상태 객체를 생성하는 순수한 함수가 되어야 함

### 4) `Subscriber`

- `getState()`
  - `createStore()` 로 생성된 저장소에서 사용할 수 있는 메서드
  - 업데이트 된 후에 최신 상태 스냅샷을 제공
  - 해당 구독 함수는 상태가 변경될 때마다 트리거 됨
  - 구독 함수가 트리거 되면 `getState()` 메서드로 변경된 후의 최신 상태를 받을 수 있음
- `subscribe()`
  - 리덕스가 구독 함수를 인식하고, 상태가 변경될 때마다 실행하라고 알려주기 위해 사용하는 메서드
  - 인자로 함수를 받음
    - 리덕스는 데이터와 저장소가 변경될 때마다 해당 함수를 실행
- `dispatch()`
  - 액션을 발송하는 메서드
  - 액션은 자바스크립트 객체
    - 식별자 역할을 하는 타입 프로퍼티를 가진 자바스크립트 객체

### 5) 예제 코드

```jsx
const redux = require('redux');

// 2. reducer 함수 생성
// 리듀서 함수가 최초로 실행될 때, 값이 있게 하기 위해 state의 보조 default 값 설정
const counterReducer = (state = { counter: 0 }, action) => {
  return {
    counter: state.counter + 1,
  };
};

// 1. 데이터를 관리하는 저장소 생성
const store = redux.createStore(counterReducer);

// 3. 저장소를 구독할 것
const counterSubscriber = () => {
  const latesState = store.getState();
  console.log(latesState);
};

// 리덕스가 구독 함수를 인식하고, 상태가 변경될 때마다 실행하라고 알려주어야 함
// 우리가 counterSubscriber를 실행하지 않고, 해당 함수의 포인터만 제공
// 리듀서와 구독 함수를 모두 리덕스가 실행하기 때문
store.subscribe(counterSubscriber);

// 4. 액션을 발송할 것
store.dispatch({
  type: 'increment',
});
```

## 6. 더 많은 리덕스 기본 사항

```jsx
const redux = require('redux');

// 2. reducer 함수 생성
// 리듀서 함수가 최초로 실행될 때, 값이 있게 하기 위해 state의 보조 default 값 설정
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

// 1. 데이터를 관리하는 저장소 생성
const store = redux.createStore(counterReducer);

// 3. 저장소를 구독할 것
const counterSubscriber = () => {
  const latesState = store.getState();
  console.log(latesState);
};

// 리덕스가 구독 함수를 인식하고, 상태가 변경될 때마다 실행하라고 알려주어야 함
// 우리가 counterSubscriber를 실행하지 않고, 해당 함수의 포인터만 제공
// 리듀서와 구독 함수를 모두 리덕스가 실행하기 때문
store.subscribe(counterSubscriber);

// 4. 액션을 발송할 것
store.dispatch({
  type: 'increment',
});
store.dispatch({
  type: 'decrement',
});
```

- 일반적으로 리덕스를 사용할 때, 리듀서 내부에서 액션을 통해 다른 일을 하는 것이 목표
  - 현재 상태를 받고 디스패치 된 액션을 받으면, 리듀서 함수가 실행됨

## 7. 새 프로젝트 준비하기

```jsx
// 리덕스와 리액트 앱의 작업을 쉽게 하기 위해 react-redux도 설치
npm install redux react-redux

// 개발 서버 실행
npm start
```

- `react-redux`
  - 리액트 앱에서 리덕스 `store`와 리듀서에 간단하게 접속할 수 있게 함
  - 리덕스 `store`에 컴포넌트를 `subscribe` 함

## 8. 리액트용 리덕스 store 만들기

```jsx
// store/index.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

- `src/store` 폴더 생성
  - 리덕스 관련 코드 파일을 해당 폴더에 저장
- `index.js` 파일 생성
  - 리덕스 로직을 저장
  - 파일 명은 상관없음

## 9. 스토어 제공하기

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- `Provider` 를 사용하여 최상위 컴포넌트를 감싸줌
  - 중첩된 컴포넌트도 `Provider` 로 감쌀 수 있음
  - 만약 컴포넌트 중 대다수가 저장소에 액세스 해야 하거나, 앱 전체가 저장소에 액세스 해야한다면, 최상위 컴포넌트에서 `Provider` 를 제공해야 함
- `Provider` 의 `store` 속성 값으로 `store/index.jsx` 에서 생성한 저장소를 연결해줌
- 이렇게 함으로써 `App` 컴포넌트와 같은 곳에서 저장소를 통해 데이터를 받아 사용할 수 있게 됨

## 10. 리액트 컴포넌트에서 리덕스 데이터 사용하기

```jsx
// Counter.js
import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

- `react-redux` 의 `useStore` 를 통해 저장소에 직접 액세스 할 수 있지만, `useSelector` 가 더 사용하기 편함
  - `useSelector` 는 저장소가 관리하는 상태를 자동으로 선택할 수 있기 때문
  - `useSelector` 를 사용할 때, `react-redux` 는 해당 컴포넌트를 위해 리덕스 저장소에 자동으로 구독을 설정한다는 것이 중요
    - 해당 컴포넌트는 리덕스 저장소에서 데이터가 변경될 때마다 자동으로 업데이트 되고 최신의 카운터를 받게 됨
    - 리덕스 저장소가 변경되면 해당 컴포넌트 함수가 재실행됨
    ⇒ 저장소에서 데이터를 받기 위해 `useSelector` 를 사용하는 이유
- 만약 클래스 기반 컴포넌트를 사용하고 함수형 컴포넌트를 사용하지 않을 경우, `connect` 함수를 import 해야 함
  - `connect` 함수는 클래스 컴포넌트를 감싸는 wrapper로 사용해서, 이 클래스 컴포넌트를 저장소에 연결할 수 있음
- 만약 해당 컴포넌트를 삭제하거나 어떤 이유에서든 DOM에서 제거되면, `react-redux` 도 자동으로 구독을 해지할 것
  - 이렇게 뒤에서 구독을 관리해주는 것

## 11. 내부 컴포넌트에서 Action을 Dispatch 하기

```jsx
// Counter.js
import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    // 새로운 액션을 보내기 위해 dispatch를 실행
    dispatch({ type: 'increment' });
  };

  const decrementHandler = () => {
    // 새로운 액션을 보내기 위해 dispatch를 실행
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

- `useDispatch`
  - `useDispatch` 함수로 어떤 인자도 전달하지 않고, 대신 실행할 수 있는 `dispatch` 함수를 반환
    - `dispatch` 는 우리가 호출할 수 있는 함수인 것
    - 즉, `dispatch` 함수는 리덕스 저장소에 액션을 보냄

## 12. 클래스 기반 컴포넌트가 있는 리덕스

```jsx
// Counter.js
import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Counter.module.css';

class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

- 요즘에는 함수형 컴포넌트를 사용하지만, 아직도 클래스 기반 컴포넌트를 사용하는 프로젝트가 많음
- 클래스 기반 컴포넌트에서는 `useSelector` 나 `useDispatch` 와 같은 훅을 사용할 수 없음
  - 대신 `connect` 함수가 클래스 기반 컴포넌트를 리덕스에 연결하는 데 도움을 줌
  - `connect` 함수를 함수형 컴포넌트에서도 사용할 수 있지만, 훅들을 사용하는 것이 더 편리
- `connect` 함수에는 두 개의 변수가 있어야 함
  - 첫 번째 인자 : `mapStateToProps`
    - `useSelector` 오와 같이 리덕스 상태를 받는 함수로, 객체를 반환
      → key를 prop으로 사용하고, value는 리덕스 상태로 들어가는 로직
  - 두 번째 인자 : `mapDispatchRoProps`
    - `useDispatch` 와 같이 `dispatch` 함수를 인자로 받아 객체를 반환
      → key는 prop name이고, value는 또 다른 함수로 dispatch를 입력하고 액션을 설정

## 13. 작업에 페이로드 연결하기

```jsx
// store/index.js
import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  // 1씩 증가하는 것이 아닌, 사용자가 원하는 수 만큼 증가하게 하기 위함
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;

// Counter.js
...

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  ..

  const increaseHandler = () => {
    // 새로운 액션을 보내기 위해 dispatch를 실행
    dispatch({ type: 'increase', amount: 5 });
  };

  ...
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

- `action.amount` 는 action payload를 추출
  - action payload 는 `action` 객체에 추가할 수 있는 추가적인 속성

## 14. 여러 State 속성 작업하기

```jsx
// store/index.js
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  // 1씩 증가하는 것이 아닌, 사용자가 원하는 수 만큼 증가하게 하기 위함
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;

// Counter.js
...

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  ...

  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      ...
    </main>
  );
};
```

## 15. 리덕스 State를 올바르게 사용하는 방법

- 리듀서 함수는 리덕스가 기존의 상태 값을 대체하는 데 사용하는 완전히 새로운 객체인 새 스냅샷을 항상 반환해야 함
- 리듀서에서 중요한 것은 기존 상태 값과 병합되지 않고, 기존 상태 값을 덮어쓴다는 것
- 그렇기 때문에 상태 값을 업데이트 할 때는 항상 다른 상태 값을 설정해야 함

### 1) 왜 인자로 얻은 상태 값을 반환하는 대신에 새로운 상태 값을 반환해야 하는걸까?

```jsx
// 인자로 얻은 상태 값 반환하기
if (action.type === 'increment') {
  state.counter++;

  return state;
}

// 새로운 상태 값을 가진 객체 반환하기
if (action.type === 'increment') {
  return {
    counter: state.counter + 1,
    showCounter: state.showCounter,
  };
}
```

- 인자로 얻은 상태 값 반환해도 작동되지만, 이것은 잘못된 방법
  - 리덕스로 작업할 때 절대 기존의 상태 값을 변경해서는 안됨
  - 항상 새로운 상태 객체를 반환하여 재정의해야 함
  - 객체와 배열은 자바스크립트에서 참조 값이기 때문에, 의도하지 않게 기존의 상태 값을 재정의하거나 변경하기 쉬움
    ```jsx
    // 인자로 얻은 상태 값 반환하기
    if (action.type === 'increment') {
      state.counter++;

      return {
        counter: state.counter,
        showCounter: state.showCounter,
      };
    }
    ```
    - 객체와 배열은 자바스크립트에서 참조 값이기 때문에, 위와 같이 작성하면,기존의 상태 값을 변형시킴
    [Reference vs Primitive Values](https://academind.com/tutorials/reference-vs-primitive-values)
- 리덕스로 작업할 때는 절대 우리가 얻는 원본의 상태 값을 변형해서는 안됨
  - 이로 인해 버그가 생겨 예측 불가능한 동작이 발생할 수 있음
  - 프로그램을 디버깅하는 것도 어려워질 수 있음
  - 버그가 발생하지 않더라도 상태 값이 동기화되지 않는 더 큰 애플리케이션에서 예기치 않은 부작용이 생길 수 있음
  - 갑자기 UI가 더이상 상태 값을 정확히 반영하지 않을 수 있음
- 중첩된 객체를 복사하거나 삭제할 때는 항상 새로운 객체를 반환해야 함
  - 이렇게 상태 값을 업데이트하여 아무것도 변경하지 않은 완전히 새로운 객체를 생성
  - 특히 중첩된 객체와 배열을 가진 상태 값의 경우, 기존의 상태 값을 실수로 변형시킬 수 있음
    - 추가한 객체를 복사하여 변경할 수 없는 방법으로 주의해서 작업해야 함
    - 즉, 항상 새로운 객체나 배열을 만들어야 함
  ⇒ 데이터를 업데이트 해야 할 때마다 기존 객체로 가서 절대 객체 속성이 조작되지 않도록 해야 함

## 16. 리덕스 도전과제 및 리덕스 툴킷 소개

- 프로젝트가 더 복잡해 질수록 리덕스를 올바르게 사용하는 것도 더 복잡해짐

### 1) 리덕스에서 관리해야 할 상태가 더 많아질 때의 문제점

- 액션 타입에서 문제가 생길 수 있음
  - 액션을 발생시킬 때, 해당 식별자를 입력할 때 절대 오타가 나면 안됨
  - 오타가 나면 리듀서가 처리하지 못하기 때문
  - 이것이 작은 프로젝트에서는 문제가 되지 않지만, 애플리케이션이 커지고 여러 개발자가 같이 작업하고 서로 다른 액션이 많을 때, 이런 식별자 중 하나를 오타낼 수 있음
  - 심지어는 식별자 이름이 충돌할 수 있음
  ⇒ 그래서 이런 식별자들을 상수로 한 번 정의해 놓고, 정의한 이름을 사용
- 가지고 있는 데이터와 상태가 많을수록 상태 객체도 점점 커짐
  - 즉, 상태를 업데이트 할 때 많은 상태를 복사해야 함
    - 모든 상태 속성을 유지하려면 계속해서 복사해야 하기 때문
  - 리듀서 함수의 길이가 점점 길어지고, 그러다 유지할 수 없을만큼 리덕스 파일이 거대해질 수 있음
  ⇒ 리듀서를 여러 개의 작은 리듀서로 나눌 수 있음
- 상태의 변경 불가성 때문에 항상 새로운 상태 스냅샷을 반환해야 하고, 이미 존재하는 상태를 함부로 바꿀 수 없음
  - 특히 중첩된 객체 및 배열이 있어서 복잡한 데이터를 가지고 있을 때, 중첩된 데이터를 실수로 바꾸면서 오류를 낼 수 있음
  ⇒ 서드 파트 패키지를 통해 자동으로 상태를 복사해서 실수로 상태를 바꾸지 않도록 할 수 있음

### 2) redux toolkit

- 리덕스 툴킷은 추가적인 패키지로, 리덕스를 더 편리하고 쉽게 작동할 수 있게 해줌
- 꼭 사용할 필요는 없지만, 사용하게 된다면 몇 가지 문제점이 쉬워질 것

## 17. State 슬라이스 추가하기

### 1) 리덕스 툴킷 설치하기

```jsx
npm install @reduxjs/toolkit
```

- 리덕스 툴킷 설치가 끝나면, 리덕스를 삭제해야 함
  - package.json > “dependencies” > “redux” 지우기

### 2) 리덕스 툴킷에서 `createSlice` 를 불러와 사용하기

```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
```

### 3) `createSlice`

- 특징
  - `createReducer` 보다 더 강력함
  - 한 번에 여러 가지를 단순화 함
  - 객체를 인자로서 생성
  - 서로 직접적인 관계가 아닌 상태가 여러 조각으로 나뉘어 있다면, 전역 상태의 슬라이스를 미리 만들어놔야 함
    - 예) 인증 상태와 카운터 상태
    - 여러 개의 조각을 생성해서, 서로 다른 파일에 위치 하겠지만 코드의 유지보수를 쉽게 만들 것
- 모든 슬라이스는 `name` 이 있어야 함
  - 상태마다 식별자가 필요한 것
- 초기 상태를 설정해야 함
  - 초기 상태를 초기값과 같은 값으로 사용해도 되고, 초기값을 가리키는 포인터를 사용해도 됨
- 리듀서를 추가해야 함
  - 리듀서는 객체 혹은 맵이라고 할 수 있음
  - `createSlice` 에 있는 상태 슬라이스는 리듀서를 필요로 함
  - 해당 객체 안에 메서드를 추가하면 됨
    - 아무 이름이나 사용해도 되는데, 이 이름이 나중에 중요한 역할을 함
    - 모든 메서드들은 자동으로 최근이 `state` 값을 받음
    - 이 메서드들은 나중에 리덕스에 의해 호출되고, 현재 상태를 받음
    - 어떤 액션을 했느냐에 따라 메서드가 자동으로 호출됨
      → 서로 다른 리듀서를 구별해놓고, 각각의 리듀서에 해당하는 액션을 발생시킬 것이기 때문
      → 그래서 더 이상 if문을 작성하지 않아도 됨
    - 메서드 안에서 상태를 변경할 수 있음
      → 리덕스를 사용할 땐, ++ 연산자를 사용하면 안됐는데, 이제는 사용 가능
      → 그렇지만 여전히 기존의 상태 값은 절대 변경할 수 없음
      → 리덕스 툴킷과 `createSlice` 를 사용하면 기존 상태를 바꿀 수 없음
    - 메서드에서 액션에 붙어있는 데이터가 필요하다면, `action` 을 매개변수로 받아서 리듀서 함수 및 메서드에 사용 가능

### 4) 리덕스 툴킷과 `createSlice` 를 사용하면 기존 상태를 바꿀 수 없는 이유

- 리덕스 툴킷은 내부적으로 immer라는 다른 패키지를 사용
- `state.counter++` 와 같은 코드를 감지하고, 자동으로 원래 있는 상태를 복제하여 새로운 상태 객체를 생성
- 모든 상태를 변경할 수 없게 유지하고, 우리가 변경한 상태는 변하지 않도록 덮어씀
- 결국 패키지가 내부에서 사용되기 때문에, 겉으로는 보이지 않지만 여전히 변경할 수 없는 코드인 것

### 5) 리덕스 툴킷의 장점

- 리덕스를 더 쉽게 사용할 수 있음
- 직접 코드를 복사할 필요가 없음
- 더이상 불변성을 신경쓸 필요없이 상태를 직접 변경할 수 있게 됨
  - 내부적으로 알아서 변경할 수 없는 코드로 변환하기 때문

## 18. 리덕스 툴킷 State 연결하기

### 1) 슬라이스 사용하기

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.amount;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStores({
  // 상태 슬라이스가 여러 개라면, 리듀서 맵 생성
  // reducer: {
  //   counter: counterSlice.reducer,
  // },
  reducer: counterSlice.reducer,
});

export default store;
```

- 슬라이스를 사용하려면, `createSlice` 를 호출해서 반환 값을 사용해야 함
- 해당 슬라이스를 `store`에 등록
  - `counterSlice.reducer` 를 전달하여, 슬라이스에서 설정한 리듀서에 접근이 가능하도록 함
- `createStore` 에는 하나의 리듀서만 전달해야 하는데, 슬라이스가 여러 개면 문제가 생길 수 있음
  - 리덕스에는 `combineReducers` 가 있지만, 리덕스 툴킷에서 다른 함수를 가져올 수도 있음
- 리덕스 툴킷에서 `configureStore` 를 가져와서 리듀서 함수가 아닌 객체를 전달
  - 여기서 객체는 `configureStore` 에서 요구되는 `configurationObject`
    - `configurationObject` 에서 리듀서 프로퍼티를 정함
      → `configureStore` 에서 요구되는 프로퍼티
  - `configureStore`
    - `createStore` 처럼 데이터 저장소를 만듦
    - 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있음
    - `reducers` 가 아닌 `reducer`
      → 리덕스에는 전역 상태를 담당하는 단 하나의 메인 리듀서 함수만 있어야 하기 때문
      → 하지만 `configureStore` 에서는 리듀서의 값이 단일 리듀서가 될 수 있음
      → 규모가 큰 애플리케이션에서 상태 슬라이스가 여러 개라면, 리듀서 키 값 대신에 객체를 설정해서 그 객체 안에 원하는 대로 키 값을 설정해서 그 프로퍼티의 값이 또 다른 리듀서 함수가 됨
      ⇒ 결국 리듀서 맵을 생성하는 것
      ⇒ 이 맵은 주요 리듀서의 값이 되고, `configureStore` 이 모든 리듀서를 하나의 큰 리듀서로 병합할 것

## 19. 리덕스 툴킷으로 모든 것을 마이그레이션

### 1) 액션을 전달하기

```jsx
// store/index.js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter += action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;

export default store;

// Counter.js
import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/index';

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    ...
  );
};

export default Counter;
```

- 액션을 전달하는 것은 `createSlice` 로 할 수 있음
  - `createSlice` 에는 서로 다른 리듀서에 해당하는 고유 액션 식별자를 자동으로 생성
- 액션 식별자 값을 얻으려면 `counterSlice.actions` 로 접근할 수 있음
  - 이것은 `createSlice` 함수의 리듀서 영역에 있는 메서드 이름과 매칭 가능
  - 해당 메서드가 호출되면 액션 객체가 생성될 것
  - 그러므로 이런 메서드는 액션 생성자로 불리고, 액션 객체를 생성해줌
  - 이 객체는 이미 액션마다 다른 고유 식별자와 함께 type 프로퍼티를 가지고 있음
  ⇒ `createSlice` 의 action key 및 객체를 사용하면 됨
  ⇒ 액션 생성자 메서드를 실행해서 리듀서와 이름이 같으면 액션을 전달
- `store` 뿐만 아니라 `counterActions` 도 export 하여, 액션이 필요한 컴포넌트로 가서 사용 가능
- 액션을 전달하려면 `counterActions` 에 접근만 하면 됨
- `payload` 데이터를 전달하기 위해서는 어떤 값이든 가능
  - 예) 한 쌍으로 이루어진 프로퍼티 값을 가지고 있는 객체나 증가하려는 숫자를 넣을 수 있음
  - 중요한 것은 어떻게 그 값을 추출하냐는 것
    ```jsx
    {
    	type: SOME_UNIQUE_INDENTIFIER,
    	payload: 10
    }
    ```
    - 리덕스 툴킷에서는 자동으로 액션 생성자를 생성해서 type을 전달
    - 인자로서 실행하고자 하는 액션 메서드에 전달한 값을 추가 필드명인 payload인 곳에 저장
    - 이 필드명은 우리가 설정할 수 있는 것이 아니라, 리덕스 툴킷에서 기본 값으로 사용하는 필드명
    - 그러므로 payload는 `createSlice` 에서 리듀서 메소드 안에서 `action.payload` 로 접근해야 함
      → 이것이 우리가 전달하고자 하는 추가 데이터를 가지고 있는 프로퍼티 이름이기 때문
