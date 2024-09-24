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
