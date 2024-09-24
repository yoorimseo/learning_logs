# React Event

## 1. On-Click Event

- button의 onClick 속성

  - 함수를 정의한 후 함수 이름을 참조로 넘김

    ```jsx
    function handleClick() {
      console.log('Clicked the button!');
    }

    export default function Clicker() {
      return (
        <div>
          <p>Click The Button</p>
          <button onClick={handleClick}>Click</button>
        </div>
      );
    }
    ```

    - handleClick()을 참조로 넘기면 바로 실행되기 때문에 이렇게 사용하면 안됨

## 2. Non-Click Event

- onMouseOver : 마우스를 올렸을 때
- 이 외에도 MDN의 DOM Events를 카멜 케이스로 작성하여 사용 가능

## 3. Event Object

```jsx
function handleFormSubmit(e) {
  e.preventDefault();
  console.log('SUBMITTED THE FORM');
}

export default function Form() {
  return (
    <form onSubmit={handleFormSubmit}>
      <button>Submit</button>
    </form>
  );
}
```

- 리액트에서도 바닐라 자바스크립트와 마찬가지로, form 양식을 사용했을 때 내가 어떤 행동을 하지 않아도 페이지가 로드되면 바로 실행되어 버리는 상황이 생김
- 그럴 때 preventDefault 이벤트 함수를 사용하여 먼저 실행되는 것을 방지 가능
