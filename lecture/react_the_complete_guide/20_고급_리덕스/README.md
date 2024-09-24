# 고급 리덕스

## 1. 리덕스 및 부작용

### 1) 리덕스에서의 동기식 코드와 부작용(Side Effects)

- **리듀서 함수는 순수 함수여야 하며, 부작용(Side Effects)이 없어야 한다는 규칙이 존재**
  - 리덕스 리듀서의 경우, 이전 상태와 액션을 인풋으로 받아 새로운 상태를 아웃풋으로 반환해야 함
  - 이는 리덕스 리듀서 함수뿐만 아니라, `useReducer` 훅에 전달되는 리듀서 함수에도 동일하게 적용됨
    - **일반적인 리듀서 함수**는 특정 입력값을 받아 그에 따른 출력값을 생성하는 순수 함수여야 하며, 부작용이 없어야 함
    - 같은 입력값이 주어졌을 때 항상 동일한 결과를 반환해야 하며, 함수 내부에 비동기 코드나 부작용이 발생하는 코드를 포함해서는 안됨
- **하지만, 리덕스를 사용할 때 HTTP 요청과 같은 부작용을 동반하는 작업을 어디에 작성해야 하는지에 대한 의문이 생길 수 있음**
  - 부작용이 없는 코드는 어디에 넣어야 할까?
  - 리덕스를 사용할 때 비동기 코드는 어디에 넣어야 할까?
  ⇒ 이러한 코드를 리듀서 함수에 넣는 것은 올바르지 않음
- **이러한 의문에 대한 해답**
  - `useEffect`를 사용하여 컴포넌트에서 직접 비동기 코드의 부작용을 처리 가능
    - 예를 들어, 부작용이 완료된 이후에 리덕스 액션을 디스패치할 수 있음
    - 이 경우, 리덕스는 해당 부작용에 대해 알 필요가 없음
  - 직접 액션 생성 함수를 작성하여 리덕스 툴킷에서 제공하는 자동 생성 액션 크리에이터 대신 사용 가능
    - 이 경우, 액션 생성 함수에서 부작용을 수행하거나 비동기 작업을 처리 가능
    - 이렇게 하면 리듀서 함수에는 부작용이 포함되지 않으므로, 리듀서의 순수성도 유지됨

## 2. 리덕스 및 비동기 코드

- side effect를 생성하는 코드이거나 HTTP 요청과 같은 비동기 코드라면, 이 코드는 리듀서 함수에 들어갈 수 없음
  - 즉, HTTP 요청을 cartSlice의 리듀서에는 보낼 수 없음
    - 특히 상태를 수정한 후에는 불가능
  ⇒ 리듀서 안에서는 side effect를 실행할 수 없음

### 1) side effect를 생성하는 코드이거나 HTTP 요청과 같은 비동기 코드를 사용하는 방법

- 컴포넌트 안에서 실행하기
  - 리덕스를 무시하고 해당 코드를 불러오기
- `action creator` 함수 만들기
  - 비동기 코드를 실행하거나 일부 side effect 코드를 실행할 수 있게 함

## 3. 프론트엔드 코드와 백엔드 코드

- 프론트엔드에 작성해야 하는 코드와 백엔드 코드를 작성하는 위치는 각각 다르다는 점을 인식하는 것이 중요

### 1) 많은 작업을 수행하는 백엔드

- 백엔드 API는 백엔드 서버에서 HTTP 요청과 우리가 보내는 응답을 통해 프론트엔드 애플리케이션과 통신
- 백엔드 API에서 많은 작업을 수행하고 들어오는 데이터를 저장할 뿐만 아니라, 변환할 수도 있음
- 이와 같은 API가 있다면, 프론트엔드 애플리케이션이 더 적은 작업을 수행할 수 있음
  - 예) 장바구니에 추가해야 하는 제품에 대한 데이터
- 데이터를 백엔드로 보내고, 백엔드가 해당 데이터 변환을 수행
- 그 다음 프론트엔드에서 응답을 사용
  - 예) 해당 응답을 저장하기 위해 리듀서에 전달
- 그래서 우리는 리듀서를 줄이고, 백엔드에서 들어오는 변환된 데이터를 사용하고 저장할 수 있음

### 2) 많은 작업을 수행하지 않는 백엔드

- 기본적으로 데이터를 수신하는 형식으로 저장
  - 즉, 프론트엔드에서 더 많은 작업을 수행해야 한다는 것
- 리덕스 저장소에 데이터를 저장할 뿐만 아니라, 해당 데이터도 준비해야 함
  - 데이터를 변환해야 함
  - 예) `addItemToCart` 와 `removeItemToCart` 에서 수행하고 있는 작업처럼, `product` 를 가져와 해당 코드에서 장바구니에 추가/삭제하는 방법을 찾아야 함
- 백엔드가 있는 경우, 백엔드가 수행하는 작업의 양에 따라 프론트엔드에서 더 적은 작업을 수행할 수 있음
- 우리는 많은 작업을 수행하는 백엔드를 사용하지 않기 때문에, 프론트엔드에서 작업을 수행하는 동시에 리듀서 내부에 전송하지 않고 변환된 데이터를 백엔드로 보내는 방법을 찾아야 함

## 4. 우리의 논리를 어디에 둘 것인가

### 1) 컴포넌트에 HTTP 요청을 실행하기

```jsx
// ProductItem.js
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  // 전체 장바구에서 내 장바구니를 선택
  // 이 장바구니는 items와 totalQuantity를 가진 객체
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    // 새로운 newTotalQuantity 생성
    // 여기서는 상태 변경을 해서는 안 되기 때문에, 기존 상태에서 변경하지 않는다는 점이 매우 중요
    // 기존 상태를 변경하는 것은 리덕스 툴킷 사용 덕분에 리듀서 메서드 안에서만 가능
    // cart.totalQuantity = cart.totalQuantity + 1; -> 일반 컴포넌트는 이러한 작업이 해당되지 않음(super bad code!)
    const newTotalQuantity = cart.totalQuantity + 1;

    // 기존 객체가 포함된 새로운 배열을 생성
    const updatedItems = cart.items.slice();
    // 복사한 배열에서 기존 항목을 식별하여 확보
    // existingItem은 객체가 자바스크립트의 참조 값이기 때문에, 리덕스 스토어의 일부인 메모리 객체로 봐야 함
    const existingItem = updatedItems.find((item) => item.id === id);
    if (existingItem) {
      // 그래서 existingItem 객체를 복사하여 새로운 객체인 updatedItem에 복사
      const updatedItem = { ...existingItem };
      // updatedItem은 새로운 객체이기 때문에 리덕스 스토어를 조작하지 않고 해당 객체의 속성을 업데이트 할 수 있음
      updatedItem.quantity++;
      updatedItem.totalPrice = updatedItem.totalPrice + price;
      // 기존 항목의 인덱스를 찾고, 장바구니에 있는 현재 항목을 업데이트된 항목으로 교체
      const existingItemIndex = updatedItems.findIndex(
        (item) => item.id === id
      );
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      // 이전의 장바구니의 일부로 항목을 가지고 있지 않은 경우, 업데이트된 항목 배열에 새로운 객체를 push
      updatedItems.push({
        id: id,
        price: price,
        quantity: 1,
        totalPrice: price,
        name: title,
      });
    }

    const newCart = {
      // 새 객체를 만들어 새 장바구니에 총 수량을 새로운 수량으로, 항목도 업데이트된 항목으로 변환
      totalQuantity: newTotalQuantity,
      items: updatedItems,
    };

    // 새로운 작업을 디스패치
    dispatch(cartActions.replaceCart(newCart));

    // and then send Http request
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })

    // dispatch(
    //   cartActions.addItemToCart({
    //     id,
    //     title,
    //     price,
    //   })
    // );
  };

  return (
    ...
  );
};

export default ProductItem;

// cart-slice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    // 추가된 리듀서
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    ...
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
```

- `useSelector` 를 사용하여 업데이트 되기 전의 현재 장바구니를 가져올 수 있음
- 그런 다음 리듀서에서 수행하는 모든 상태 변환을 변경하지 않고, `ProductItem` 에서 HTTP 요청을 보냄
- 위 방법의 문제점
  - 애플리케이션의 모든 부분에서 이 코드를 사용한다면, 장바구니를 업데이트 해야한다는 것
    - `CartItem` 컴포넌트에도 사용하려는 경우, `ProductItem` 컴포넌트에 추가한 모든 논리를 복사해야 함
    - 또는 함수를 내보내는 추가 파일로 아웃소싱 할 수도 있음
    - 따라서 중복 코딩을 할 필요는 없지만, 여전히 또 다른 문제가 존재
  - 일부 helper 함수에서 데이터 변환을 수행하고, 결국 컴포넌트에서 직접 데이터를 변환하게 됨
    - 그렇기 때문에 우리는 리듀서에서 변환을 수행하지 않음
    - 애플리케이션의 모든 위치에서 이 `addItemToCart` 를 사용하면, `replaceCart` 를 제거할 수 있음
    - 우리의 리덕스 리듀서가 많은 일을 하지 않을 것이라는 것을 의미하기도 함
    - 약간의 데이터만 얻고 저장하게 됨
    - 이것은 리덕스를 사용하는 주요 이유라고 볼 수 없음

### 2) Fat 리듀서 vs Fat 컴포넌트 vs Fat 액션

- 코드를 어디에 둘 것인지 고려할 때는, 동기식이면서 side effect가 없는 코드와 비동기식이면서 side effect가 있는 코드를 구별해야 함
  - 예) `ProdictItem` 컴포넌트에 제공한 것은 비동기식이며 side effect가 없는 코드
- 동기식이면서 side effect가 없는 코드를 다루는 경우
  - 기본적으로 약간의 데이터 변환만 있는 경우라면, 리듀서를 사용하는 것이 좋음
  - action creator나 컴포넌트 사용은 피하는 것이 좋음
- 비동기식이면서 side effect가 있는 코드
  - action creator나 컴포넌트를 사용하는 것이 좋음
  - 절대 리듀서를 사용해서는 안됨

## 5. 리덕스와 함께 useEffect 사용하기

- 새로운 상태를 서버에 동기화하려는 경우 즉, 프론트엔드에서 파생된 새로운 상태로 서버를 업데이트 하려면 간단하게 순서만 바꾸면 됨
  - 먼저 프론트엔드에서 작업을 수행하고, 리덕스가 스토어를 업데이트 하도록 함
  - 그 다음 서버에 요청을 보냄
    - 예) `ProductItem` 파일이나 `App` 파일 등 완전히 다른 파일에서 수행 가능
    ```jsx
    // App.js
    import { useEffect } from 'react';
    import { useSelector } from 'react-redux';

    ...

    function App() {
      const showCart = useSelector((state) => state.ui.cartIsVisible);
      const cart = useSelector((state) => state.cart);

      useEffect(() => {
        fetch('firebaseAddress/cart.json', {
          method: 'PUT', // POST와의 차이점은 세 데이터가 데이터 목록에 추가되지 않고, 기존의 데이터를 덮어쓴다는 것
          body: JSON.stringify(cart),
        });
      }, [cart]); // 리덕스 스토어가 변경될 때마다 이 컴포넌트 함수가 다시 실행되고, 최신의 상태가 됨

      return (
        ...
      );
    }

    export default App;
    ```
    - `useEffect` 를 사용하여 side effect를 실행할 수 있기 때문에, 상태의 변경 사항을 관찰할 수 있음
      → 의존성이 변경될 때마다 `useEffect` 를 실행할 수 있음
- 이 방법은 컴포넌트에 우리의 sied effect 논리를 넣을 수 있는 아주 좋은 방법
  - 리덕스로 작업할 때 일반적으로 사람들이 원하는 위치인 리듀서 내부에 모든 데이터 변환 논리를 유지하기에 좋은 방법

## 6. useEffect() 문제

- 위의 방식으로 useEffect를 사용할 때 한 가지 문제에 직면
  - 앱이 시작될 때 그것이 실행된다는 것
- 이것이 왜 문제일까?
  - 초기(즉, 비어 있는) cart를 백엔드로 보내고, 거기에 저장된 모든 데이터를 덮어쓰기 때문

## 7. 리덕스로 HTTP State 및 피드백 처리하기

```jsx
// App.js
...

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!',
        })
      );

      const response = await fetch('firebaseAddress/cart.json', {
        method: 'PUT', // POST와의 차이점은 세 데이터가 데이터 목록에 추가되지 않고, 기존의 데이터를 덮어쓴다는 것
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data successfully!',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      )
    );
  }, [cart, dispatch]); // 리덕스 스토어가 변경될 때마다 이 컴포넌트 함수가 다시 실행되고, 최신의 상태가 됨

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      ...
    </>
  );
}

export default App;
```

## 8. Action Creator Thunk 사용하기

- 이 패턴을 사용하는 이유 → 컴포넌트에 해당 로직을 부여하는 대안
- 컴포넌트 내에 로직을 작성하는 방식을 사용할 수 있지만, 너무 많은 로직을 포함하지 않도록 컴포넌트를 lean 상태로 유지하는 것
  - 아래의 예시 코드는 로직을 `action creator` 함수로 옮김으로써 lean 상태로 만든 것
  - 여러 action이 아닌 하나의 action만 전달
    - 모든 로직은 사용자 지정 `action creator` 함수의 내부에서 발생
    - 이렇게 코드를 분할하는 것은 컴포넌트를 lean 상태로 유지하기 때문에 좋은 것

### 1) Action Creator 사용하기

- 리덕스 툴킷을 통해 자동으로 `action creator`를 확보
  - 이것을 불러와서 디스패치 할 action 객체를 생성
    - 예) `uiActions.showNotification({...})`
- 우리만의 `action creator` 를 만들 수 있고, `thunks` 를 생성할 수 있음

### 2) `thunks` 란?

- 다른 작업이 완료될 때까지 작업을 지연시키는 단순한 함수
- action 객체를 즉시 반환하지 않는 `action creator` 를 만들기 위해, `thunks` 로 `action creator` 를 만들 수 있음
- 대신 action을 반환하는 다른 함수를 반환하여 우리가 만들고자 했던 실제 action 객체를 디스패치 하기 전에 다른 코드를 실행할 수 있음
- 이것은 일반적인 패턴이며, 구현하기도 쉬움

### 3) 예시 코드

```jsx
// cart-slice.js
...
// 슬라이스 객체 외부에서 새 함수를 생성
export const sendCartData = (cart) => {
  // 아직 리듀서에 도달하지 않았기 때문에, 디스패치를 실행하기 전에 비동기 코드와 side effect를 수행할 수 있음
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('firebaseAddress/cart.json', {
        method: 'PUT', // POST와의 차이점은 세 데이터가 데이터 목록에 추가되지 않고, 기존의 데이터를 덮어쓴다는 것
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

// App.js
...

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // 디스패치에서 action 객체 대신 cart-slice에서 다른 함수를 반환하는 함수로 대신 전달하는 것
    dispatch(sendCartData(cart));
  }, [cart, dispatch]); // 리덕스 스토어가 변경될 때마다 이 컴포넌트 함수가 다시 실행되고, 최신의 상태가 됨

  return (
    ...
  );
}

export default App;
```

## 9. 데이터 가져오기

```jsx
// cart-actions.js
import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('firebaseAddress/cart.json');

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};
// 슬라이스 객체 외부에서 새 함수를 생성
export const sendCartData = (cart) => {
  // 아직 리듀서에 도달하지 않았기 때문에, 디스패치를 실행하기 전에 비동기 코드와 side effect를 수행할 수 있음
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch('firebaseAddress/cart.json', {
        method: 'PUT', // POST와의 차이점은 세 데이터가 데이터 목록에 추가되지 않고, 기존의 데이터를 덮어쓴다는 것
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};

// App.js
...

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // 장바구니가 변경될 때만
    if (cart.changed) {
      // 디스패치에서 action 객체 대신 cart-slice에서 다른 함수를 반환하는 함수로 대신 전달하는 것
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]); // 리덕스 스토어가 변경될 때마다 이 컴포넌트 함수가 다시 실행되고, 최신의 상태가 됨

  return (
    ...
  );
}

export default App;
```

## 10. 리덕스 DevTools 탐색하기

- 리덕스와 리덕스 상태를 좀 더 쉽게 디버깅 할 수 있음
  - 많은 리덕스 상태가 여러 다른 슬라이스로 처리되고, 다양한 작업이 진행되는 복잡한 애플리케이션에서는 작업 등의 디버그 상태에서 오류를 찾기가 어려울 수 있음
  - 모든 것이 올바르게 작동하는지 확인하기 위해 전체 리덕스 스토어의 현재 상태를 살펴보는 것
- 개발자도구 > Redux > Action 탭
  - 리덕스 스토어에 대한 인사이트 작업 등 여러가지를 확인 가능
  - 왼쪽에는 전달된 작업이 표시됨
    - 해당 action을 클릭하면, 해당 action에 의해 전송된 데이터와 이로 인해 상태가 어떻게 변경되었는지에 관한 인사이트를 얻을 수 있음
- 개발자도구 > Redux > State 탭
  - 해당 action이 수행된 후, 상태가 어떻게 보이는지 확인 가능
- 개발자도구 > Redux > Diff 탭
  - 해당 action이 수행된 후, 상태가 업데이트 되었는지 이전과 이후를 확인 가능
- 왼쪽의 action에 마우스를 두면 뜨는 Jump를 클릭하여 이전 상태로 이동할 수 있음
