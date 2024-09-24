# 리액트의 컨텍스트 API & useReducer - 상태 관리 심화 단계

## 1. Prop Drilling 이해 & 프로젝트 개요

### 1) Prop Drilling 이해

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c07a89d2-eb34-4064-ae88-37dd3da5bb9e/69c94be3-7553-48c0-8f67-6e5aebb49cc9/image.png)

- 특정 컴포넌트에서 사용 중인 상태가 다른 컴포넌트에서도 필요할 경우, 해당 상태를 끌어올려야 함
  - 트리 안의 특정 컴포넌트에 사용되고 출력되는 와중에, 동일한 컴포넌트 트리 내에 구성되어 있지만 완전히 다른 곳에 위치한 컴포넌트에서 업데이트 될 수도 있기 때문
- 이 때 모든 컴포넌트에 접근할 수 있고 해당 상태를 필요로 하는 컴포넌트를 관리해주어야 하기 때문에, 속성(prop)을 이용한 공유와 업데이트가 이루어져야 함
  - 최종적인 상태 수정을 위해 이 상태를 업데이트 할 수 있는 함수 속성(prop)을 이용해야 함
  - 이러한 경우, 여러 층의 컴포넌트를 거쳐 공유하고자 하는 데이터를 넘겨주어야 함
    → 이것을 Prop Drilling이라고 함
- Prop Drilling이란?
  - 다수의 컴포넌트를 거쳐 속성을 전달하는데, 사실 대부분의 컴포넌트가 이 데이터를 직접적으로 필요로 하지는 않음
  - 그저 자식 컴포넌트에게 전달하는 역할을 맡게 되는 것
  - 문제점
    - 원하는 공유 데이터를 얻기 위해서는 여러 컴포넌트가 필연적으로 사용되어야만 하는데, 이럴 경우, 해당 컴포넌트의 재사용이 다소 힘들어짐
    - 반복될 이 과정을 위해 컴포넌트의 속성을 받아들여 구조를 바꾼 뒤, 그 속성을 또 다시 다른 컴포넌트로 보내주어야 하기 때문에, 추가적인 상용구 코드(Boilerplate)를 아주 많이 써내야 한다는 것을 의미하기도 함

## 2. Prop Drilling: 컴포넌트 합성로 해결하기

- 특정 상황에서는 Prop Drilling을 이 방법으로 해결할 수도 있겠지만, 대부분의 경우는 다른 해결책도 필요할 것

### 1) Component Composition(컴포넌트 합성)

```jsx
// Shop.jsx
export default function Shop({ children }) {
  return (
    <section id='shop'>
      <h2>Elegant Clothing For Everyone</h2>
      <ul id='products'>{children}</ul>
    </section>
  );
}

// App.jsx
import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  ...

  function handleAddItemToCart(id) {
    ...
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    ...
  }

  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product
              {...product}
              onAddToCart={handleAddItemToCart}
            />
          </li>
        ))}
      </Shop>
    </>
  );
}

export default App;
```

- `Shop` 컴포넌트에서 물품 목록을 렌더링하기 위한 `DUMMY_PRODUCTS` 코드를 `App` 컴포넌트로 가져와 수정
- 이렇게 함으로써 우리가 더이상 `handleAddItemCart` 함수의 pointer를 `Shop` 컴포넌트로 전달할 필요가 없다는 뜻
- 대신 `Shop` 컴포넌트에 `children` 속성을 받아 해당 커스텀 컴포넌트가 시작 및 종료 태그를 포함하여 `DUMMY_PRODUCTS` 코드를 감싸게 해주어야 함
- 컴포넌트 합성을 수용해서 `Shop` 컴포넌트를 이용해 물품 목록을 App 컴포넌트에서 실행되도록 함
  - 이렇게 함으로써 컴포넌트 중첩을 한 층 삭제한 것
  - 기능은 여전히 동일하게 작동하게 하면서, prop drilling 문제 중 일부분을 제거

### 2) 이 해결책의 단점

- 모든 컴포넌트의 층에 사용하기에는 적합하지 않음
- 이 방법을 사용한다면, 결국 모든 컴포넌트가 `App` 컴포넌트에 들어가고, 나머지 컴포넌트는 감싸는 용도로만 사용되기 때문
- 이대로도 작업은 가능하지만, `App` 컴포넌트가 꽤나 비대해질 것

## 3. 컨텍스트 API 소개

- 이 방법으로 prop drilling의 문제를 모두 해결 가능

### 1) React’s Context API란?

- 리액트를 구성하는 하나의 특성
- 컴포넌트나 컴포넌트 레이어 간의 데이터 공유를 용이하게 해줌
- 기능
  - context 값을 생성하여 해당 값을 제공하고, 이 context를 묶어줌
    - 다수의 컴포넌트 또는 앱의 모든 컴포넌트를 묶어줌
- 여러 컴포넌트에 제공되는 context 값의 장점
  - state(상태)와 연결이 쉬움
  - 리액트 상태를 해당 컨텍스트 값에 연결하면, 앱 전체에 제공되는 방식으로 사용
    - 이렇게 하여 prop drilling을 위해 사용했던 속성들을 모두 없애는 것이 가능
    - 여러 컴포넌트 레이어를 통해 상태를 전달하거나, 상태 업데이트 함수를 전달할 필요가 없어지는 것
    - 대신 상태에 연결된 컨텍스트 값이 앱의 모든 컴포넌트에 제공됨
      → 그 중 상태에 접근이 필요하거나 상태를 변경하거나 읽어야 하는 컴포넌트의 경우, 직접적으로 해당 컨텍스트 또는 필요한 상태에 접근이 가능하게 됨

## 4. 컨텍스트 소개 및 사용

- `src/store` 폴더를 생성
  - 이 부분은 기숮럭으로 필요한 것은 아니지만, 리액트에서 사용되는 관습
  - 컨텍스트 값을 파일에 저장하고 그 파일들을 모으는 폴더
  - 앱 전체 또는 적어도 여러 컴포넌트에 사용되는 데이터와 상태를 저장해두기 때문
- `shopping-cart-context.jsx` 파일 생성
  ```jsx
  // shopping-cart-context.jsx
  import { createContext } from 'react';

  export const CartContext = createContext({
    items: [],
  });
  ```
  - 파일 이름에 `-context` 를 사용하여, 리액트 컨텍스트 값을 관리한다는 것을 명시
  - `createContext` 로 만들어진 `CartContext` 값은 사실 리액트 컴포넌트가 들어있는 객체
    - 그래서 대문자로 시작하는 이름을 지은 이유
  - 이것을 앱의 일부분, 즉 컴포넌트 트리의 일부분을 묶어주어야 함
    - 그래야 한 곳에 묶인 컴포넌트들이 우리가 제공하는 `CartContext` 값에 접근할 수 있기 때문
- `CartContext` 를 필요로 하는 모든 컴포넌트를 담고 있는 컴포넌트를 찾기
  ```jsx
  // App.jsx
  import { useState } from 'react';

  import Header from './components/Header.jsx';
  import Shop from './components/Shop.jsx';
  import Product from './components/Product.jsx';

  import { DUMMY_PRODUCTS } from './dummy-products.js';
  import { CartContext } from './store/shopping-cart-context.jsx';

  function App() {
    ...

    return (
      <CartContext.Provider>
        <Header
          cart={shoppingCart}
          onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product
                {...product}
                onAddToCart={handleAddItemToCart}
              />
            </li>
          ))}
        </Shop>
      </CartContext.Provider>
    );
  }

  export default App;
  ```
  - 우리의 경우 `App` 컴포넌트
    - `Header` 컴포넌트에 중첩되어 있는 컴포넌트 중 `Cart` 컴포넌트에서 `items`를 읽어 출력하고 업데이트 하는 데에 필요
    - 그렇기 때문데 `App` 컴포넌트는 컨텍스트를 이용해 `Header` 컴포넌트와 `Shop` 컴포넌트를 감싸기 용이한 위치
    - 이러한 컴포넌트 또는 자식 컴포넌트가 해당 컨텍스트를 사용할 수 있기 때문
  - 여기서 `CartContext` 컨텍스트를 컴포넌트로 사용할 것이기 때문에 대문자로 이름을 지은 것
    - 정확히 말하자면, `.Provider` 라고 하는 리액트가 생성한 컨텍스트 객체의 속성을 사용
    - `.Provider`는 리액트가 생성한 컨텍스트 객체의 속성으로, JSX에서 유효한 리액트 컴포넌트로 사용 가능
      → `Provider`는 하위 컴포넌트들에게 컨텍스트 데이터를 전달하기 위해 반드시 사용되어야 하는 컴포넌트

## 5. 컨텍스트와 그 값에 접근하여 사용하기

```jsx
// Cart.jsx
import { useContext } from 'react';

import { CartContext } from '../store/shopping-cart-context';

export default function Cart({ onUpdateItemQuantity }) {
  const cartCtx = useContext(CartContext);

  const totalPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id='cart'>
      {cartCtx.items.length === 0 && <p>No items in cart!</p>}
      {cartCtx.items.length > 0 && (
        <ul id='cart-items'>
          {cartCtx.items.map((item) => {
            ...
            );
          })}
        </ul>
      )}
      ...
    </div>
  );
}
```

- `App` 컴포넌트에서 컨텍스트 기능을 더했기 때문에, 이 컨텍스트를 사용해서 `items` 를 사용 가능
- 컨텍스트를 사용하기 위해서는 react의 훅인 `useContext` 를 import 해야 함
  - `useContext` 는 컴포넌트의 함수에서 컨텍스트 값에 접근해 이를 사용할 수 있도록 함
  - 컨텍스트 사용을 위해 `useContext` 의 값으로 `CartContext` 를 전달
    - 이렇게 하면 컨텍스트 연결구조가 만들어진 것
- `CartContext.Provider` 에 속성 값을 추가해주어야 함
  ```jsx
  // App.jsx
  ...

  function App() {
    ...

    return (
      <CartContext.Provider value={{ items: [] }}>
        <Header
          cart={shoppingCart}
          onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product
                {...product}
                onAddToCart={handleAddItemToCart}
              />
            </li>
          ))}
        </Shop>
      </CartContext.Provider>
    );
  }

  export default App;

  ```
  - `value={{ items: [] }}` 와 같이 값 속성을 설정하여 컨텍스트 값 또한 제공해야 함
- `shopping-cart-context.jsx` 에서 기본 값을 설정하는 이유
  - `Cart` 컴포넌트에서 `cartCtx.` 를 사용할 때, 해당 기능이 `items` 속성에 접근하기를 원하는지 유추하여 추천해주기 때문
    - 이 값은 기본 값으로 설정되어 있기 때문에 유추하여 추천이 가능한 것
  - 그러므로 기본 값을 설정해두는 것이 코드 작성에서 좀 더 수월하게 해줌
  - 컨텍스트 객체를 구조분해할당하여 `items` 를 빼낼 수 있음
    ```jsx
    const { items } = useContext(CartContext);
    ```

## 6. 컨텍스트와 State(상태) 연결하기

- `App` 컴포넌트의 `<CartContext.Provider value={shoppingCart}>` 로 수정하여 컨텍스트를 상태와 연결
  - 컨텍스트 기능을 이용해 wrap 컴포넌트와 자식 컴포넌트에게 `shoppingCart` 상태 값을 제공
- 하지만 이렇게 객체 상태 객체 전체를 값으로 설정하면 읽는 것이 가능하기 때문에 컨텍스트 사용은 가능하지만, 상태를 수정하려면 해당 컨텍스트로는 작동하지 못함
  - 대신, 컴포넌트에게 속성을 전달하는 방식으로 상태를 수정해야 한다는 뜻

### 1) 컨텍스트에서 상태 값을 읽을 뿐만 아니라 해당 상태 값을 업데이트하기

```jsx
// App.jsx
...
function App() {
  ...

  function handleAddItemToCart(id) {
    ...
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    ...
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart
  }

  return (
    <CartContext.Provider value={ctxValue}>
      ...
    </CartContext.Provider>
  );
}

export default App;

// shopping-cart-context.jsx
import { createContext } from 'react';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
});

// Product.jsx
import { useContext } from 'react';

import { CartContext } from '../store/shopping-cart-context';

export default function Product({ id, image, title, price, description }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className='product'>
      ...
      <div className='product-content'>
        ...
        <p className='product-actions'>
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
```

- 이렇게 하면 상태 값을 업데이트 하고자 할 때, 속성을 전달할 필요가 없음
- prop drilling을 사용하지 않고, 컨텍스트를 사용해 상태 값과 상태 업데이트 함수 기능을 가지게 하여 앱 안의 여러 컴포넌트와 공유 가능
- `App.jsx`
  - 컨텍스트를 통해 `handleAddItemToCart` 함수 자체를 노출시키는 것 또한 가능
    - 이 컨텍스트를 읽을 수 있는 컴포넌트라면, `ctxValue` 컨텍스트 값에 있는 `addItemToCart` 속성을 통해 `handleAddItemToCart` 함수의 기능을 불러올 수 있음
- `shopping-cart-context.jsx`
  - `addItemToCart` 에 비어있는 가짜 함수를 추가하여, 실제로 실행되지 않지만 자동완성의 기능에 도움을 주는 용도

## 7. 컨텍스트를 사용하는 여러가지 방법

### 1) `useContext` 의 역할

- 컴포넌트 함수를 컨텍스트와 연결하고, 다른 컴포넌트 함수 내에서 컨텍스트 값을 사용할 수 있도록 만드는 것
- 즉, 컴포넌트 안의 컨텍스드에 접근할 때 일반적으로 사용하는 방법

### 2) `Context.Provider` 의 대안

- `Context.Consumer`
  ```jsx
  // Cart.jsx
  import { useContext } from 'react';

  import { CartContext } from '../store/shopping-cart-context';

  export default function Cart({ onUpdateItemQuantity }) {
    // const { items } = useContext(CartContext);

    return (
      <CartContext.Consumer>
        {(cartCtx) => {
          const totalPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
          const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

          return (
            <div id='cart'>
              {cartCtx.items.length === 0 && <p>No items in cart!</p>}
              {cartCtx.items.length > 0 && (
                <ul id='cart-items'>
                  {cartCtx.items.map((item) => {
                    const formattedPrice = `$${item.price.toFixed(2)}`;

                    return (
                      <li key={item.id}>
                        <div>
                          <span>{item.name}</span>
                          <span> ({formattedPrice})</span>
                        </div>
                        <div className='cart-item-actions'>
                          <button onClick={() => onUpdateItemQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => onUpdateItemQuantity(item.id, 1)}>+</button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              <p id='cart-total-price'>
                Cart Total: <strong>{formattedTotalPrice}</strong>
              </p>
            </div>
          );
        }}
      </CartContext.Consumer>
    );
  }
  ```
  - 컨텍스트 값에 대한 액세스를 가진 JSX 코드를 묶는 데에 사용 가능
  - 특수한 자식 속성을 필요로 하는데, 시작 및 종료 태그 사이로 전달되는 속성이 바로 함수
    - 이 함수는 백엔드에서 리액트에 의해 실행됨
    - 이 함수는 컨텍스트의 현재 값을 인자로 받아 JSX를 반환
    - 이를 통해, `Consumer`는 컨텍스트의 값을 컴포넌트 내에서 접근하고 처리
    - `Consumer`는 컨텍스트의 값을 읽고 활용할 수 있도록 하는 역할을 하며, 이 값을 통해 렌더링을 제어
  - 이렇게 함으로써 useContext 훅 대신 `Consumer` 를 사용하여 컨텍스트 값을 처리하여 사용 가능
- 이 방식은 다소 길고 복잡한데다 읽는 것 또한 어렵기 때문에 기본 접근법으로는 적절하지 않음

## 8. 컨텍스트 값이 바뀌면 생기는 일

- 컴포넌트의 컨텍스트 값에 접근할 때 해당 컨텍스트 값이 그 값에 접근하는 컴포넌트 함수를 바꾸면 다음과 같은 상황에서 리액트에 의한 재실행이 이루어짐
  - 업데이트된 내부 상태가 사용되었을 때
  - 부모 컴포넌트가 다시 실행되었을 때
  - 컴포넌트 함수가 재실행었을 때
  - 컴포넌트 함수가 `useContext` 훅을 사용해서 관련 컨텍스트 값에 연결되었을 때
- 연결된 컨텍스트 값이 변경되었을 때, 리액트가 컴포넌트 함수를 재실행하는 이유
  - 해당 컴포넌트 함수에 새로운 UI를 업데이트 하기 위함

## 9. 컨텍스트 아웃소싱 & 분리된 제공자 컴포넌트에 State(상태) 부여

```jsx
// shopping-cart-context.jsx
import { createContext, useState } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.jsx';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ childen }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === id);
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>{childen}</CartContext.Provider>;
}

// App.jsx
import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';

import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
```

- 모든 컨텍스트 관련 데이터를 관리할 수 있도록, `App` 컴포넌트가 아닌 별개의 컨텍스트 컴포넌트를 생성
- `CartContextProvider` 는 컨텍스트 데이터를 관리하고, 그 데이터를 앱에 제공하는 등의 역할을 수행
  - 해당 함수를 정의하는 목적은 `App` 컴포넌트에 있던 모든 상태와 컨텍스트 값을 관리하는 코드를 가져오기 위함
- 컨텍스트와 상태 관리 코드 모두를 별개의 컴포넌트로 외부에서 가져오게 하여, 동일한 앱 내의 여러 개의 컨텍스트와 여러 조각의 독립 데이터가 있더라도 여러 개의 컨텍스트 파일을 생성해 사용함으로써 `App` 컴포넌트를 가볍게 유지할 수 있음

## 10. useReducer 훅 소개

- 복잡한 리액트 앱을 만들 때는 컨텍스트가 매우 중요한 기능이 될 수 있음
  - 여러 컴포넌트 간의 상태 공유를 돕기 때문
- 상태 관리를 할 때, 상태를 업데이트 하는 함수는 다소 복잡함
  - 약간의 로직이 더 포함되어 있기 때문
  - 해당 상태와 상태를 업데이트 하는 함수를 포함하는 컴포넌트 함수를 더 읽기 어려워지게 됨
  - 우리가 사용한 함수 양식은 상태를 업데이트 하는 함수에 인수로 함수를 전달
    - 복잡한 상태 객체나 배열을 관리할 때, 거의 항상 이전 상태 snapshot를 기반으로 상태를 업데이트 해야 하기 때문
      → 비슷한 상황일 때마다 사용하게 될 패턴
- 이와 같이, `useState`와 같은 코드를 사용해 상태를 관리하는 대신, 리액트가 제공하는 또 다른 상태 관리용 훅을 사용할 수 있음

### 1) Reducer란?

- 리액트 앱과 자바스크립트 프로그래밍에서 `reducer`란?
  - 일반적으로 하나 또는 그 이상의 복잡한 값을 더 단순한 형태로 만드는 함수
  - 예) 아래와 같은 값을 모두 더해 하나의 숫자로 만드는 것과 같음
    ```jsx
    [5, 10, 100] -> 115
    ```

### 2) `useReducer`란?

- 상태 관리의 목적을 가지고 하나 또는 그 이상의 값을 보다 단순하게 하나의 값으로 줄이는 것
- `useReducer` 는 두 개의 요소를 가지는 배열을 만듦
  - `useState` 가 항상 두 개의 요소를 가지는 배열을 만드는 것과 동일
  - 첫 번째 요소는 `useReducer` 로 관리되는 상태
  - 두 번째 요소는 `dispatch` 함수
    - 이 함수를 통해 `action` 을 보낼 수 있는데, 보내진 액션은 추후 리듀서 기능에 의해 사용됨
- 값을 보내주는 것을 시작으로 실행되어 새로운 상태를 생성해줄 리듀서 기능이 필요
  - 이것이 리듀서 훅의 목적이며, 곧 추가할 리듀서 기능이기도 함

```jsx
// shopping-cart-context.jsx

import { createContext, useState, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === id);
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === productId);

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
```

- 컴포넌트 밖에 함수를 만드는 이유
  - 컴포넌트 함수가 실행될 때마다 `shoppingCartReducer` 함수가 재생성되지 않도록 하기 위함
  - `shoppingCartReducer` 함수에서 정의하거나 업데이트되는 그 어떤 값에도 직접적인 액세스를 필요로 하지 않기 때문
    → 즉, 속성 등에 접근할 필요가 없다는 뜻
- `shoppingCartReducer` 리듀서 함수는 두 개의 파라미터를 받음
  - 각각의 인수는 `state`와 `action`
  - `state`
    - useReducer로 관리되는 상태의 보장된 최신 상태의 snapshot
    - 상태 업데이트를 위해 `setShoppingCart` 의 인수로 사용했던 함수 형태를 사용하여 최신으로 보장된 상태 스냅샷이 생길 때, 이 리듀서 함수를 호출하는 리액트는 첫 번째 인수로 가장 최근의 상태를 받도록 함
  - `action`
    - `action` 이 `dispatch`를 통해 보내진 후에 리액트가 리듀서 함수를 호출할 것이기 때문
    - 디스패치 기능을 이용해 보내는 `action`은 `shoppingCartReducer` 함수의 두 번째 파라미터에서 받게 되는 `action` 과 동일
- `useReducer`
  - 첫 번째 인수는 리듀서 함수의 포인터를 전달
    - 이제 해당 리듀서 기능이 리액트에 등록되었기 때문에, 디스패치를 사용할 때면 언제든지 실행될 것
  - 두 번째 인수는 상태를 위한 초기값 설정을 가능하게 하고 싶을 때 사용
    - 상태가 한 번도 업데이트 되지 않은 상황에서 사용 가능
    - `useState` 의 초기값을 설정하는 것과 동일

## 11. Action 보내기 & useReducer로 State(상태) 수정하기

```jsx
// shopping-cart-context.jsx
import { createContext, useReducer } from 'react';

import { DUMMY_PRODUCTS } from '../dummy-products.js';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      ...state, // 우리는 하나의 값만 필요하기 때문에 사용하지 않지만, 이전 데이터를 잃지 않아야 하는 복잡한 상태의 경우 추가하는 것이 좋음
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex((item) => item.id === action.payload.productId);

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        // 속성의 이름이 값을 가진 변수와 같다면 아래와 같이 축약하여 사용 가능
        productId,
        amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
```

- `action` 의 경우 문자열이나 숫자도 가능하지만, 대부분의 경우 type(유형)이나 식별자와 같은 속성을 가진 객체일 때가 많음
  - 이를 통해 각각의 액션을 구분할 수 있고, 리듀서 내에서 다르게 처리할 수 있음
  - 첫 번째 속성 : `type`
    - 문자열은 대문자에 언더바를 사용했는데, 이것은 리액트에서 사용되는 관습
    - 해당 액션이 실행되기 위해서는 특정 데이터를 필요로 함
      예) 장바구니에 추가할 물건에 대한 정보
  - 두 번째 속성 : `payload`
    - id
- dispatch인 `shoppingCartDispatch` 기능에 전달된 인자는 `shoppingCartReducer` 리듀서 함수의 `action` 매개변수 값으로 전달됨
- return하는 객체 안에서 우리는 하나의 값만 필요하기 때문에 `...state,` 가 필요하지 않지만, 이전 데이터를 잃지 않아야 하는 복잡한 상태의 경우 추가하는 것이 좋음
- `payload` 객체 안에서 속성의 이름이 값을 가진 변수와 같다면 아래와 같이 축약하여 사용 가능
- 이제 모든 것을 `useReducer` 를 통해 관리하기 때문에 `useState` 는 삭제 가능
- 동작 과정
  - `handle~` 함수에서 액션을 보내주면, 해당 액션들이 리듀서 기능을 실행시킴
  - 리듀서 함수 안에 있는 if 로직들은 그에 맞추어 상태를 업데이트 해줌
  - `shoppingCartState` 는 컨텍스트를 통한 공유로 앱에 다시 전달됨
  - `useReducer` 훅은 컨텍스트 기능에 연결되어 있지 않기 때문에, 다른 컴포넌트에서는 사용할 수 없음
    - 컨텍스트와 함께 사용되는 경우는 있지만, 각자 따로 동작하기 때문
    - `useReducer` 는 상태를 필요로 하는 리액트 컴포넌트라면 어디에서나 사용 가능
