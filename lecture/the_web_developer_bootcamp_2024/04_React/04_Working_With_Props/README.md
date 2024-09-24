# Working With Props

## 1. Props란?

- 컴포넌트에 제공할 수 있는 요소
- 각 컴포넌트에 속성을 전달하는 방법은 HTML 특성 구문과 같은 것을 이용
  ```jsx
  // App.jsx
  function App() {
    return (
      <div>
        <Greeter person='Bill' />
        <Greeter
          person='Ted'
          from='Elton'
        />
      </div>
    );
  }

  // Greeter.jsx
  export default function Greeter({ person, from }) {
    console.log(props.person); // Bill
    return (
      <>
        <h1>Hi there, {props.person}!!!</h1>
        <h2>-from {from}</h2>
      </>
    );
  }
  ```

## 2. 문자열이 아닌 Props

- props로 숫자를 넘기고자 할 때
  ```jsx
  <Die numsides={20} />
  ```

## 3. prop의 default 값 설정하기

- 컴포넌트 정의에서 props가 빠졌을 경우, 등호를 사용하여 기본 값 설정 가능
  ```jsx
  export default function Die({ numSides = 6 }) {
    const roll = Math.floor(Math.random() * numSides) + 1;

    return (
      <p>
        {numSides}-sided die roll: {roll}
      </p>
    );
  }
  ```

## 4. 배열과 객체 전달하기

- 중괄호를 사용하여 전달
  ```jsx
  // App.jsx
  function App() {
    return (
      <div>
        <ListPicker values={[1, 2, 3]} />
        <ListPicker values={['a', 'b', 'c']} />
        <ListPicker values={{ a: 1, b: 2 }} />
      </div>
    );
  }

  // ListPicker.jsx
  export default function ListPicker({ values }) {
    const randIdx = Math.floor(Math.random() * values.length);
    const randElement = values[randIdx];
    return (
      <div>
        <p>The list of values: {values}</p>
        <p>Random element is: {randElement}</p>
      </div>
    );
  }
  ```

## 5. 리액트에서의 조건식

- 삼항연산자를 사용한 결과를 변수에 저장하여 반환
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    const result = num1 === num2 ? 'You Win!' : 'You Lose :(';

    return (
      <div>
        <h2>{result}</h2>
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- 삼항연산자 로직을 return 안에서 사용
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;

    return (
      <div>
        <h2>{num1 === num2 ? 'You Win!' : 'You Lose :('}</h2>
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- 결과에 false일 때 빈 태그가 남지 않게 하는 방법
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;

    return (
      <div>
        <h2>Double Dice</h2>
        {num1 === num2 ? <h3>You win!</h3> : null}
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- and 연사자를 이용하여 위의 방법을 개선
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;

    return (
      <div
        className='DoubleDice'
        style={styles}
      >
        <h2>Double Dice</h2>
        {num1 === num2 && <h3>You win!</h3>}
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```

## 6. React Developer Tools 사용하기

- components 탭
  - 앱의 계층 구조를 보여줌
  - 계층 구조 안의 컴포넌트를 클릭하면 props와 같이 해당 컴포넌트 안에서 어떤 일이 벌어지고 있는지 확인 가능

## 7. 컴포넌트에 동적 스타일링 추가하기

- 스타일 속성은 카멜케이스로 작성
  예) fontSize, justifyContent 등
- style={styles변수}를 사용하여 요소에 추가
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    const isWinner = num1 === num2;
    const styles = { color: 'purple', fontSize: '40px' };

    return (
      <div
        className='DoubleDice'
        style={styles}
      >
        <h2>Double Dice</h2>
        {isWinner && <h3>You win!</h3>}
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- style을 요소 안에 작성하기
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    const isWinner = num1 === num2;

    return (
      <div
        className='DoubleDice'
        style={{ color: 'purple', fontSize: '40px' }}
      >
        <h2>Double Dice</h2>
        {isWinner && <h3>You win!</h3>}
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- 조건에 따라 다른 스타일을 적용하는 방법
  ```jsx
  export default function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1;
    const num2 = Math.floor(Math.random() * 3) + 1;
    const isWinner = num1 === num2;
    const styles = { color: isWinner ? 'green' : 'red' };

    return (
      <div
        className='DoubleDice'
        style={styles}
      >
        <h2>Double Dice</h2>
        {isWinner && <h3>You win!</h3>}
        <p>Num1: {num1}</p>
        <p>Num2: {num2}</p>
      </div>
    );
  }
  ```
- 컴포넌트에서 props로 스타일 속성을 가져와 적용하는 방법
  ```jsx
  // Heading.jsx
  export default function Heading({ color = "olive", text, fontSize }) {
    return (
  	  <h1 style={{ color: color, fontSize: fontSize }}>
  		  {text}
  	  </h1>;
  	 );
  }

  // App.jsx
  function App() {
    return (
      <div>
        <Heading color="magenta" text="welcome!" fontSize="20px" />
        <Heading color="teal" text="blah" fontSize="48px" />
      </div>
    );
  }
  ```

## 8. map을 사용하여 배열 렌더링하기

- map을 사용하여 다양한 요소를 반복해서 렌더링 할 수 있음
- 별도의 배열을 먼저 만들어 변수에 저장한 후 렌더링하기
  ```jsx
  // App.jsx
  function App() {
    return (
      <div>
        <ColorList colors={["red", "pink", "purple", "teal"]} />
  			<ColorList colors={["olive", "orangered", "slategrey"]} />
      </div>
    );
  }

  // ColorList.jsx
  export default function ColorList({ colors }) {
  	const lis = colors.map((color) => <li>{color}</li>

    return (
      <div>
        <p>Color List</p>
        <ul>{lis}</ul>
      </div>
    );
  }
  ```
- return문 안에서 매핑하기
  ```jsx
  // App.jsx
  function App() {
    return (
      <div>
        <ColorList colors={['red', 'pink', 'purple', 'teal']} />
        <ColorList colors={['olive', 'orangered', 'slategrey']} />
      </div>
    );
  }

  // ColorList.jsx
  export default function ColorList({ colors }) {
    return (
      <div>
        <p>Color List</p>
        <ul>
          {colors.map((c) => (
            <li style={{ color: c }}>{c}</li>
          ))}
        </ul>
      </div>
    );
  }
  ```
