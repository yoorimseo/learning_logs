# Refs(참조) & Portals(포탈) 활용하기

## 1. Reds(참조) 소개: Refs(참조)로 HTML 요소 연결 및 접근

```jsx
import { useRef } from 'react';

export default function Player() {
	const = useRef();
	return (
		...
	);
}
```

- 상태가 결국 값인 것처럼, 리액트의 참조는 값
  - 리액트가 특별한 방식으로 제어
- 컴포넌트 함수나 커스텀 훅 내에서만 호출 가능
- Ref를 사용하여 JSX 요소들과 연결할 수 있음
  - `ref={ }` 속성을 사용하여 리액트 컴포넌트들에서 사용 가능
- 예)
  ```jsx
  import { useRef, useState } from 'react';

  export default function Player() {
    const playerName = useRef();

    const [enteredPlayerName, setEnteredPlayerName] = useState(null);

    function handleClick() {
      setEnteredPlayerName(playerName.current.value);
    }

    return (
      <section id='player'>
        {/* <h2>Welcome {enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2> */}
        <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
        <p>
          <input
            ref={playerName}
            type='text'
          />
          <button onClick={handleClick}>Set Name</button>
        </p>
      </section>
    );
  }
  ```
  - `handleClick` 함수에 참조 변수를 사용해서 해당 버튼이 클릭되었을 때, 이것과 연결된 요소에 접근
    - 즉, playerName은 참조 속성을 통해 연결되어 있기 떄문에 playerName을 통해 input 요소에 접근할 수 있는 것
  - `handleClick` 내에서 input 요소에 대한 접근을 얻을 수 있음
    - useRef를 통해 생성된 참조 값들은 항상 자바스크립트 객체
    - 이 객체는 항상 current 속성만 가지고 있음
    - 이 current 속성이 실제 참조 값을 갖고 있는 것
      → 위 코드의 경우에는 연결된 input이 저장됨
    - current를 통해 참조된 요소의 속성 값들에 접근 가능
  - `enteredPlayerName ? enteredPlayerName : 'unknown entity'` 의 경우, `enteredPlayerName ?? 'unknown entity'` 로 축약 가능
    - `enteredPlayerName` 값이 true라면 해당 값을 출력하고, false라면 `'unknown entity'` 값을 출력하라는 뜻
  - 참조를 사용하여 상태를 클릭할 때만 업데이트 하고, 값은 input 요소로부터 바로 참조를 통해 받음
- 위 예시를 통해 참조 기능이 존재하는 이유를 알아보자
  - 값을 입력창에서 읽어들이고 싶을 때 코드를 많이 줄여줄 수 있음
  - 더 간결한 컴포넌트들을 만들어줌

## 2. Refs(참조)로 DOM 제어

- Set Name 버튼을 클릭할 때마다 input의 value를 지우고 싶다면?
  - 방법 1)
    ```jsx
    function handleClick() {
      setEnteredPlayerName(playerName.current.value);
      playerName.current.value = '';
    }
    ```
    - 리액트는 선언적인 코드를 쓰는 개념이기 때문에, 위의 방법이 올바른지 생각해봐야 함
    - DOM을 직접 조작하는 것이 아니라, 리액트가 이것을 하게끔 해야 함
    - 위의 코드는 그냥 값을 읽어들이는 것 뿐이지, DOM에서는 아무것도 바꾸지 않음
    - 더이상 선언적 환경에 있지 않고, 브라우저에게 직접 input의 value를 빈 문자열로 설정하라고 명령하고 있는 것
      → DOM 상호작용은 리액트가 해야한다는 규칙 또는 개념에 위반하는 것
  - 그저 input의 value를 지우고 싶은 경우라면 다른 상태같은 것들과 연결되어 있지 않다면 아래와 같은 방법을 사용해 볼 수 있음
    - 주의해야 할 점은 참조를 사용하는 목적이, 페이지의 모든 종류의 값들을 읽고 제어하기 위해서는 아니어야 함
      → 이것은 리액트의 개념이 아님
    - 참조를 사용함으로써 더 편리해질 수 있다면, 참조는 상태와 같이 다른 매커니즘을 대체하는 좋은 방법

## 3. Refs(참조) VS State(상태) 값

- 참조 기능을 유용하게 HTML 요소와 연결하지 않고도 사용하는 법에 대해 다뤄보자

### 1) State(상태)

- 상태 업데이트 함수를 통해 변화가 이루어졌을 때, 상태 값들은 컴포넌트들의 재실행을 야기함
- 상태는 UI에 바로 반영되어야 하는 값들이 있을 때만 사용해야 함
- 시스템 내부에 보이지 않는 쪽에서만 다루는 값들이나, UI에 직접적인 영향을 끼치지 않는 값들을 가지지 않아야 함

### 2) Refs(참조)

- 참조는 바뀔 때마다 컴포넌트 함수가 재실행 되지 않음
  - 컴포넌트들은 참조 값이 바뀌었다는 이유로 재실행 되지 않음
- 참조를 사용할 수 있는 경우는 DOM 요소에 직접적인 접근이 필요할 때임

## 4. DOM 요소 연결 외의 Refs(참조) 활용법

### 1) 리액트에서 setTimeout 함수 사용하기

- 자바스크립트에는 Timeout 함수가 있어서 타이머를 멈추는 데에 사용할 수 있는데, 이 타이머에 포인터가 필요
  예) 타이머의 id를 input으로 설정
  - 이 포인터는 setTimeout을 통해 반환됨

### 2) 참조의 또 다른 활용법

- 참조는 그저 HTML 요소와 연결하는 것 뿐만 아니라, 어떤 종류의 값이든 제어하기 위해 사용할 수 도 있음
  - 예)
    ```jsx
    import { useRef, useState } from 'react';

    // let timer;

    export default function TimerChallenge({ title, targetTime }) {
      const timer = useRef();

      const [timerStarted, setTimerStarted] = useState(false);
      const [timerExpired, setTimerExpired] = useState(fasle);

      function handleStart() {
        timer.current = setTimeout(() => {
          setTimerExpired(true);
        }, targetTime * 1000);

        setTimerStarted(true);
      }

      function handleStop() {
        clearTimer(timer.current);
      }

      return (
        ...
      );
    }

    ```
    - `useRef`로 정의된 `timer`가 컴포넌트 함수 내에 저장되어 있기 때문에, 특정 컴포넌트 인스턴스에만 할당될 것
    - `TimerChallenge` 컴포넌트의 모든 컴포넌트 인스턴스들은 그들만의 timer 참조를 가질 것이고, 그 컴포넌트 내 다른 인스턴스들의 참조들과 독립적으로 동작할 것
    - 동시에, 변수가 컴포넌트 함수에 정의되는 것과는 다르게 `TimerChallenge` 컴포넌트가 재실행될 때, `timer` 참조는 초기화되거나 지워지지 않음
    - 대신 상태 값들처럼 리액트가 이 `timer` 값들을 저장
      → 이것은 시스템 내부에서 이루어지며, 컴포넌트 함수들이 재실행될 때마다 이 값이 유실되지 않도록 함
- 참조 값은 컴포넌트 함수가 재실행되어도 상태 값들처럼 유실되지 않음
  - 참조 값을 변경한다고 해서 해당 컴포넌트 함수를 다시 실행하도록 하지 않음

### 3) 이와 같이 참조를 사용하기 좋은 상황

- 제어해야 하는 값이 있는데 상태로 쓰이기는 힘들 경우
- UI에 (적어도)영향을 주지 않은 값을 제어하고 싶은 경우
- 컴포넌트가 재실행될 때 초기화 되지 않는 값이 필요한 경우
- 예)
  - timer 자체가 UI와 직접적인 영향이 없는 경우
  - 타이머가 시작되었는지에만 신경을 쓰지만, 예를 들어 타이머를 멈췄을 때 UI를 업데이트 하고 싶지 않은 경우
  - `handleStop` 에서 타이머만 지우고 UI는 업데이트 하고 싶지 않은 경우

## 5. 모달 컴포넌트 추가하기

```jsx
export default function ResultModal({ result, targetTime }) {
  return (
    <dialog
      className='result-modal'
      open
    >
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method='dialog'>
        <button>Close</button>
      </form>
    </dialog>
  );
}
```

- 위와 같이 `form` 요소에 `method=’dialog’` 속성을 추가하면 Close 버튼에 추가적인 자바스크립트나 로직이 필요 없이 dialog 창을 닫음
- `dialog` 요소에 open 속성을 넣어 기본적으로 보일 수 있게 설정해야 브라우저에서 확인 가능
- `dialog` 요소는 기본적으로 내장 요소인 `backdrop` 이 함께 사용됨
  - `backdrop` 은 모달이 띄워졌을 때 뒷 배경을 제어할 수 있는 요소
  - `dialog` 요소를 `open` 했을 때는 보이지 않음
  - 대신 `dialog` 를 브라우저에 명령을 보내는 방식으로 내장 `backdrop` 요소를 사용할 수 있음
    → 이 모달이 게임이 끝났을 때 띄워지게 하는 것이 목표이므로, `TimerChallenge` 컴포넌트에서 `dialog` 에 접근할 수 있기만 하면 되기 때문에, 참조의 도움을 받을 수 있는 사례

## 6. 커스텀 컴포넌트로 Refs(참조) 전달

- `dialog` 요소는 `showModal` 메소드를 호출하여 화면에 보이도록 할 수 있음
- 참조의 경우, 한 컴포넌트에서 다른 컴포넌트의 `prop`으로 전달할 수 없음
  - 이것을 가능하게 하기 위해서는 `forwardRef` (참조 전달) 이라는 함수를 사용해야 함

### 1) forwardRef 함수란?

```jsx
import { forwardRef } from 'react';

const ReaultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
  return (
    <dialog
      ref={dialog}
      className='result-modal'
    >
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method='dialog'>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ReaultModal;
```

- 참조를 컴포넌트에서 다른 컴포넌트로 전달하여 참조가 다른 컴포넌트에서 사용될 수 있도록 함
- 컴포넌트를 forwardRef 로 감쌌기 때문에 다음과 같은 매개변수를 사용
  - 첫 번째 매개변수는 `prop` 매개변수이며, 구조분해할당하여 사용
  - 두 번째 매개변수로 `ref` 매개변수를 받음
    - 여기서 `ref`는 컴포넌트의 `ref` 속성으로 설정한 값이 아님
      ```jsx
      // TimerChallenge.jsx
      const dialog = useRef();
      ...

      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result='lost'
      />
      ```
      → 여기서 속성의 이름을 `ref` 로 지어야 리액트가 인식할 수 있음
- 위의 코드에서 모달의 배경이 생긴 이유는 모달을 `showModal()` 을 사용하여 띄우기 때문

## 7. userImperativeHandle 훅으로 컴포넌트 API 노출시

- 위에서 사용한 `forwardRef` 함수는 `ResultModal` 의 `ref` 를 `dialog` 요소로 전달하는 것이었는데, 한 가지 결함이 존재
  - `TimerChallenge` 컴포넌트가 `ResultModal` 컴포넌트를 사용한다는 것인데, 결국 `TimerChallenge` 컴포넌트에서 `dialog` 의 참조 값을 알아야 함
    - 즉, `ResultModal` 의 `dialog` 요소의 속성들
  - 예를 들어, `ResultModal` 의 `dialog` 요소를 `div` 로 바꾼다면 `TimerChallenge` 에서 `showModal()` 이 작동하지 않기 때문에 혼란스러울 것
  - 그러므로 추천하는 방법은 `ResultModal` 컴포넌트를 자신의 함수를 노출하도록 구축하여, 이 컴포넌트 외부에서 `ref`의 도움으로 호출될 수 있도록 하는 것
    - `showModal()` 을 내부 `dialog` 요소에서 호출하는 것 대신, 노출된 함수를 사용하여 `TimerChallenge` 에서 호출
      → 이 함수는 독립적으로, `ResultModal` 컴포넌트의 JSX 코드가 어떻게 바뀌든 영향을 받지 않음
    - 이것이 가능한 이유는 컴포넌트에서 또 다른 특별한 훅을 사용했기 때문
      → 이것의 도움으로 호출될 함수를 노출시키는 것

### 1) useImperativeHandle 훅

- `ResultModal` 컴포넌트 함수에서 호출하여 속성과 메서드를 정의할 수 있으며, 해당 컴포넌트에서 바깥으로 접근할 수 있어야 함
  ```jsx
  // ResultModal.jsx
  import { forwardRef, useImperativeHandle, useRef } from 'react';

  const ReaultModal = forwardRef(function ResultModal({ result, targetTime }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    return (
      <dialog
        ref={dialog}
        className='result-modal'
      >
        ...
      </dialog>
    );
  });

  export default ReaultModal;

  // TimerChallenge.jsx
  ...
  function handleStart() {
      timer.current = setTimeout(() => {
        setTimerExpired(true);
        dialog.current.open();
      }, targetTime * 1000);

      setTimerStarted(true);
    }
  ...
  ```
  - 이 훅을 자주 사용하지는 않을 것
    - 대부분의 상황에서 props로 사용
    - 하지만 `ResultModal` 컴포넌트의 상황에서는 해당 컴포넌트를 더 견고하고 재사용 가능하게 만들어줌
  - 여기서 참조를 하나 더 선언하는 것은, `dialog` 요소에 접근하는 또 다른 참조가 필요하기 때문
    - `ResultModal` 컴포넌트 내에서 사용되고 다른 외부 컴포넌트로부터 분리외어야 하기 때문에, `dialog` 요소를 분리해야 함
  - 이제 `TimerChallenge` 컴포넌트에서 `ResultModal` 에 정의했던 `open` 메서드를 호출하여 사용 가능
    - `TimerChallenge` 컴포넌트에서 `ResultModal` 컴포넌트로 ref의 값으로 `dialog` 를 전달하기 때문
    - `forwardRef` 와 `useImperativeHandle` 에 의해 `useImperativeHandle` 의 두 번째 속성으로부터 생성된 객체와의 연결이 수립되었기 때문에 `open` 메서드를 사용 가능
- `useImperativeHandle` 함수는 두 개의 인자를 받음
  - 첫 번째는 `forwardRef`로부터 받은 `ref`
    - 이 함수는 실질적으로 `forwardRef` 와 함께 작업해야 함
  - 두 번째는 속성과 메서드를 모아 객체를 반환하는 함수
    - 여기서 속성과 메서드는 해당 컴포넌트나 다른 컴포넌트에 노출되어야 하는 것들

## 8. Refs(참조)와 State(상태)를 사용해야 하는 경우

```jsx
import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

// let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    // 시간이 다 됐고, 남은 시간이 없다는 것을 알 수 있음
    clearInterval(timer.current);
    setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    // 여기서는 타이머를 수동으로 멈추기 떄문에, 이겼다는 뜻
    dialog.current.open();
  }

  return (
    <>
      {timerExpired && (
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          result='lost'
        />
      )}
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
```

- 시간이 얼마나 남았는지 지속적으로 측정하고 UI로 보여주어야 함
  - 그래야 타이머가 멈췄을 때 시간이 얼마 남았는지 알 수 있음
- `setInterval` 함수는 한 번만 실행하지 않고 시간이 만료될 때마다 실행
- 사용하고 있던 `timerStarted` 와 `timerExpired` 상태를 제거하고, 남은 시간을 추적하는 상태를 통해 제어해야 함

## 9. 컴포넌트 간의 State(상태) 공유

```jsx
// TimerChallenge.jsx
import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    // 시간이 다 됐고, 남은 시간이 없다는 것을 알 수 있음
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    // 여기서는 타이머를 수동으로 멈추기 떄문에, 이겼다는 뜻
    dialog.current.open();
  }

  return (
    <>
      {timerExpired && (
        <ResultModal
          ref={dialog}
          targetTime={targetTime}
          remainingTime={timeRemaining}
          onReset={handleReset}
        />
      )}
      <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}

// ResultModal.jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const ReaultModal = forwardRef(function ResultModal({ targetTime, remainingTime }, ref, onReset) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formatRemainingTime = (remainingTime / 1000).toFixed(2);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog
      ref={dialog}
      className='result-modal'
    >
      {userLost && <h2>You lost</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formatRemainingTime} seconds left.</strong>
      </p>
      <form
        method='dialog'
        onSubmit={onReset}
      >
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ReaultModal;
```

## 10. 모달을 ESC 키로 닫기

```jsx
<dialog ref={dialog} className="result-modal" onClose={onReset}
   ...
</dialog>
```

- `<dialog>`요소를 사용하면 웹사이트 방문자가 키보드의 `ESC`(Escape) 키를 눌러 열린 대화창을 닫을 수 있음
- 이것은 버튼 클릭으로 대화상자를 닫는 것과 달리, `onReset`함수를 트리거하지 않음
- `ESC` 키로 대화창을 닫을 때 `onReset`이 트리거되도록 하려면 `<dialog>` 요소에 내장된 `onClose` 속성을 추가하고 그 값을 `onReset`속성에 바인딩 해야 함

## 11. Portals(포탈) 소개 및 이해하기

- `‘react-dom’` 라이브러리와 `‘react’` 라이브러리는 같은 팀에서 관리되고 있음
  - `‘react’` 라이브러리는 모든 환경에서 작동 가능한 함수와 기능만 노출
  - `‘react-dom’` 라이브러리에 포함된 몇 가지 함수와 기능은 리액트가 DOM과 상호작용 하게 함
    - 즉, 브라우저에 렌더링 된 웹사이트와 상호작용 함
- JSX 코드 렌더링이 현재 앱에서 사용하고 있는 곳이 아니라, 웹 페이지의 다른 곳에 가야하는 모달이나 비슷한 시나리오가 있을 때 자주 사용

### 1) createPortal 사용하기

```jsx
// ResultModal.jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ReaultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
  ...

  return createPortal(
    <dialog
      ref={dialog}
      className='result-modal'
    >
      ...
    </dialog>,
    document.getElementById('modal')
  );
});

export default ReaultModal;

// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    <div id="modal"></div>
    <div id="content">
      <header>
        ...
      </header>
      <div id="root"></div>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

- `createPortal` 은 해당 컴포넌트에 렌더링이 될 HTML 코드를 DOM 내에 다른 곳으로 옮기는 것
- 첫 번째 인수는 JSX 코드
- 두 번째 인수는 HTML 요소
  - 이 곳에 JSX 코드가 옮겨지게 됨
  - 이 요소가 index.html 파일에 있어야 함
- `createPortal` 을 사용함으로써 리액트 앱의 출력 위치를 다르게 설정
  - 개발자 도구를 열어 확인해보면 모달 코드가 `<div id="modal"></div>` 에 들어가 있는 것을 확인할 수 있음
