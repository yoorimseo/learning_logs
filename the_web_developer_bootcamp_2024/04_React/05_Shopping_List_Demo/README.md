# Shopping List Demo

## 1. Key prop

- key prop을 설정하지 않으면 고유한 key prop이 있어야 한다는 경고가 뜸
- 리액트에서는 각 요소에 대한 고유 식별자가 필요

  → 그래야 해당 요소를 추적할 수 있기 때문

- 고유한 식별자로 추가할 수 있는 것은 유일해야 함

  - 일반적으로 현실 데이터에서는 고유한 ID가 있기 때문에 해당 값을 사용하면 됨

    예)

    ```jsx
      // App.jsx
      const data = [
       { id: 1, item: 'eggs', quentity: 12, completed: false },
       { id: 2, item: 'milk', quentity: 1, completed: true },
       { id: 3, item: 'chicken breasts', quentity: 4, completed: false },
       { id: 4, item: 'carrots', quentity: 12, completed: true },
      ];

      // ShoppingList.jsx
      function ShoppingList({ item }) {
       return (
        <ul>
         {item.map(i => (
           <li
            key={i.id}
            style={
             color: i.completed ? "grey" : "red",
             textDecoration: i.completed ? "line-though" : "none",
            }
           >
            {i.item} - {i.quentity}
           </li>
          )
         )}
        </ul>
       );
      }

      export default ShoppingList;
    ```

## 2. 리액트 컴포넌트

- 리액트로 작업할 때, 작은 하위 컴포넌트들로 나누는 것이 좋음
- 큰 컴포넌트 한개 보다 작은 컴포넌트 여러 개가 좋음 → 재사용성 때문
- 컴포넌트의 매개변수로 주고자 하는 값들이 많지 않으면 객체를 주는 것보다 구조 분해 할당하여 주는 것이 좋음
- 컴포넌트 반환하는 값이나 식이 너무 길다면 별개의 변수로 선언하여 저장한 후, 그 값을 대입해주는 것이 가독성에 좋음

### 1) 스프레드 연산자

- 하위 컴포넌트에 매개변수로 넘겨주고자 하는 값의 이름이 데이터와 동일할 경우 사용 가능

  예)

  ```jsx
    // 전
    <ShoppingListItem
      key={i,id}
      item={i.item}
      quentity={i.quentity}
      completed={i.completed}
    />

    // 후
    <ShoppingListItem key={i.id} {...i} />
  ```

## 3. 계속 뜨는 key prop 에러 해결하기

- .eslintrc.cjs 파일에서는 기본적으로 eslint가 신경써야 할 것에 대한 규칙을 구성
- key prop에 대한 에러를 끄는 방법

  - eslint 파일에 명령어 추가하기

    ```jsx
      rules: {
       "react/prop-types": "off"
      }
    ```

  - cmd + shift + p로 명령어 팔레트를 열어서 ESLint: Restart ESLint Server를 클릭해 재시작하도록 설정

## 4. PropTypes Library

- 타입스크립트가 등장하면서 사람들이 많이 사용하지 않고 있기 때문에 선택 사항
- vite를 사용한다면 따로 설치가 필요하지 않지만, 직접 설치도 가능

  ```jsx
  npm install --save prop-types
  ```

- 사용 예시

  ```jsx
  import PropTypes from 'prop-types';

  function ShoppingListItem({ item, quantity, completed }) {
    const styles = {
      color: completed ? 'grey' : 'red',
      textDecoration: completed ? 'line-through' : 'none',
    };
    return (
      <li style={styles}>
        {item} - {quantity}
      </li>
    );
  }

  ShoppingListItem.propTypes = {
    item: PropTypes.string,
    quantity: PropTypes.number,
    completed: PropTypes.bool,
  };

  export default ShoppingListItem;
  ```
