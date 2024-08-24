# Side Effects 다루기 & useEffect() 훅 활용

## 1. Side Effect가 무엇인지 예시를 통한 소개

### 1) Side Effect란?

- 꼭 실행되어야 하는 작업이지만, 현재 컴포넌트 렌더링 과정에 직접적이고 즉각적인 영향을 미치지 않는 것

### 2) 예시를 통해 알아보자

```jsx
// App.jsx
navigator.geolocation.getCurrentPosition((position) => {
  const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
});
```

- 위의 함수는 브라우저로부터 호출받는 함수
  - 사용자의 위치가 포함된 객체를 주는 것 또한 브라우저
- 이것이 Side Effect의 예시인 이유
  - 이 코드에서 사용자의 위치가 이 앱에 필요하긴 하지만, 이 컴포넌트 함수의 주된 목적과는 직접적인 연관성이 없기 때문
  - 모든 컴포넌트 함수의 주된 목적은 렌더링이 가능한 JSX 코드를 반환하는 것이기 때문
  - 여기서 `navigator` 함수는 이와 컴포넌트 함수의 주된 목적과 직접적으로 연관되어 있지 않기 때문에 Side Effect인 것
- 위의 코드같은 경우, 즉각적으로 완료되지 않음
  - 대신, 콜백 함수는 미래의 언젠가 호출되기는 하겠지만, 그건 아마 해당 `App` 컴포넌트 함수가 모두 실행된 이후일 것

## 2. Side Effect의 잠재적 문제: 무한 루프

```jsx
// App.jsx
...

import { AVAILABLE_PLACES } from './data.js';
import { sortPlacesByDistance } from './loc.js';

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

    setAvaliablePlaces(sortedPlaces);
  });
  ...
  return (
    <>
      ...
      <main>
        ...
        <Places
          title='Available Places'
          places={avaliablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
```

- `sortedPlaces` 를 `Places` 컴포넌트에 `places` 속성에 대한 입력값으로 전달하고자 함
- `sortedPlaces` 는 사용자의 위치를 파악하는 작업에 시간이 필요하기 때문에, 그냥 사용이 가능하지 않음
  - 우리가 위치 데이터를 얻을 때 쯤이면 `App` 컴포넌트의 첫 렌더링 작업이 완료된 이후일 것
  - 그렇기 때문에 상태가 필요
- 사용자의 위치를 파악하는 작업이 완료되면, `setAvaliablePlaces` 함수를 통해 새로운 렌더링 작업을 실행시켜서 상태는 `sortedPlaces` 로 업데이트 될 것
  - 그러며 `Places` 컴포넌트에 `places={avaliablePlaces}` 속성으로 데이터를 전달할 수 있음

### 1) 이것이 좋은 해결책처럼 보이지만, 단점이 있는 방안

- 무한 루프를 야기하기 때문
- 이유
  - `setAvaliablePlaces(sortedPlaces);` 에서 상태를 업데이트 하는데, 이러한 상태 업데이트 함수를 호출한다는 것은, 리액트에게 상태가 포함된 컴포넌트 함수를 재실행하라는 것과 같음
  - 위의 경우 `App` 컴포넌트가 재실행되게 되는데, 그러면 사용자의 위치 파악이 다시 진행되고 다시 상태를 업데이트 하고, `App` 컴포넌트 함수를 다시 실행하는 무한 루프에 빠지게 됨
- 이것이 Side Effect를 사용할 경우 발생할 수 있는 문제

## 3. useEffect를 사용하는 Side Effect

### 1) `useEffect`

```jsx
import { useEffect } from 'react';

useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

    setAvaliablePlaces(sortedPlaces);
  });
}, []);
```

- 다른 훅들과 마찬가지로 컴포넌트 함수 내에서만 사용 가능
- `useState` 나 `useRef` 와는 다르게, 값을 반환하지 않음
- 두 개의 인수를 필요로 함
  - 첫 번째 요소 : Side Effect 코드를 묶어줄 익명 함수
  - 두 번째 요소 : dependency(의존성) 배열
- `useEffect` 를 사용하는 상황
  - 무한 루프를 방지해야 할 때
  - 컴포넌트 함수가 최소 한번은 실행된 이후에 작동해야 하는 코드가 있을 때

### 2) `useEffect` 가 무한 루프 문제를 해결할 수 있는 이유

- `useEffect`가 의도하는 것은 `useEffect` 로 전달하는 첫 인수인 익명 함수가 리액트로 인해 실행되는 시점
  → 이 시점이 매우 중요
- 이 시점은 매번 컴포넌트가 실행된 이후인데, 앱이 시작되고 `App` 컴포넌트 함수가 실행되어도 해당 코드는 즉시 실행되지 않음
- `App` 컴포넌트 함수의 실행이 모두 완료된 이후에 실행되기 때문
  → 즉, `App` 컴포넌트 함수의 JSX 코드가 반환된 후의 시점에서야 `useEffect` 에 전달해둔 Side Effect 익명 함수를 리액트가 실행시킨다는 것
- 이론적으로는 `useEffect` 함수도 다시 실행되겠지만, 거기에 의존성 배열이 들어옴
- 이 의존성 배열은 누락되지 않도록 정의해주어야 함
  → 그러면 리액트는 이곳에 명시된 의존성을 살펴봄
- 이 의존성의 값이 변했을 경우에 한해 `useEffect` 함수를 재실행시킬 것
- 이 코드에서는 `useEffect` 함수가 실행될 일이 없음
  - 의존성 값이 빈 배열이기 때문에, 가지고 있는 것이 없으니 변화할 수도 없기 때문
  - 그러므로 리액트는 `useEffect` 함수를 재실행 할 일이 없음
  - 대신 `App` 컴포넌트 함수가 처음으로 실행된 이후에 단 한번 실행하게 됨
    - 그 이후에는 `useEffect` 함수가 실행될 일이 없음
- 의존성 배열을 누락하게 된다면?
  - `App` 컴포넌트의 렌더링 과정이 끝날 때마다 `useEffect` 함수가 재실행될 것이고, 그렇게 되면 다시 무한 루프에 빠지게 됨
  - 그러나 빈 배열의 의존성을 두면 무한 루프에 빠지지 않기 때문에 문제가 해결되는 것

### 3) `useEffect` 사용 예시

```jsx
// App.jsx
...

function App() {
  ...
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
	...

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

      setAvaliablePlaces(sortedPlaces);
    });
  }, []);

  ...

  return (
    <>
      ...
      <main>
        ...
        <Places
          title='Available Places'
          places={avaliablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;

```

- 여기서 `Places` 컴포넌트에 `fallbackText` 속성을 추가
  - 사용자의 위치를 파악하는 동안 `sortedPlaces` 값이 전달되지 않았을 때, 사용자에게 보여줄 대체 텍스트
  - 애초에 아무런 장소가 확보되지 않았기 때문에, 빈 배열로 초기값을 가지는 것
- 웹 페이지를 새로고침 하면, 사용자의 위치 정보 수집에 대한 동의 여부를 물음
  - 승인하게 되면 나의 위치를 찾기 시작하는데, 약간의 시간이 소요됨
  - 그러고 나면 내 위치와 거리를 기준으로 장소들을 정렬해서 보여줌

## 4. 모든 Side Effect가 useEffect를 사용하지 않는 이유

- 모든 Side Effect가 `useEffect`를 사용하지 않으며, `useEffect` 를 과하게 많이 사용하거나 불필요한 곳에 사용하는 것은 좋지 않음
- 이것은 실행과정에서 앱 또는 그 외의 컴포넌트가 실행된 이후 추가적인 실행이 진행되는 방식이라는 것을 잊지 말아야 함
- 그러므로 필요한 곳이 아니라면 `useEffect` 의 사용을 자제하는 것이 좋음

### 1) 필요하지 않은 상황

```jsx
function handleSelectPlace(id) {
  setPickedPlaces((prevPickedPlaces) => {
    if (prevPickedPlaces.some((place) => place.id === id)) {
      return prevPickedPlaces;
    }
    const place = AVAILABLE_PLACES.find((place) => place.id === id);
    return [place, ...prevPickedPlaces];
  });

  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  if (storedIds.indexOf(id) === -1) {
    localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
  }
}
```

- 이 함수에서 그저 상태가 업데이트 되는 것이 아니라 장소 목록에 장소를 추가하기 위해 클릭했을 때, 선택한 장소와 선택한 장소들의 목록 전체가 브라우저의 저장소에 저장되기를 원한다고 가정
- 우리가 웹을 다시 새로고침 했을 때, 이 장소들이 없어지지 않고 그대로 있는 상태를 원하는 것
  - `localStorage` 라는 브라우저에서 제공하는 객체를 사용
  - 우리가 웹 사이트를 떠나거나 다시 돌아오거나 새로고침을 해도 해당 데이터는 유지됨
  - `setItem` 메서드를 사용해 브라우저의 저장소에 데이터를 저장할 수 있음
    → 첫 번째 인자로 식별자를 전달하고, 두 번째 인자로 저장되어야 할 값을 전달
    → 저장하는 값은 문자열이어야 하기 때문에 객체나 배열은 내장된 `JSON.stringfy` 메서드 등을 이용해 문자열 형태로 변환해야 함
    → `localStorage` 에서 값을 가져올 때도 문자열로 가져오기 떄문에, `JSON.parse` 메서드를 사용
- 위와 같이 브라우저의 저장소에 데이터를 저장하는 이 코드는 `App` 컴포넌트의 JSX 코드 렌더링과 직접적인 연관이 없기 때문에 Side Effect의 예시
- 반면, 상태를 업데이트 하는 `setPickedPlaces` 함수는 새로운 JSX snapshot으로 바로 이어지지만 `localStorage` 코드는 그렇지 않음
  - 하지만, 이 코드가 있어야만 사용자가 만든 장소 목록을 유지할 수 있는 기능 추가가 가능
- `localStorage` 는 `navigator` 코드와 달리 useEffect로 묶어줄 필요가 없음
  - 해당 코드는 `handleSelectPlace` 함수 안에 들어와 있기 때문에, 이 위치에서 `useEffect`를 사용할 수도 없음
    → 훅은 중첩된 함수나 if문 등에서 사용 불가하기 때문
  - `localStorage` 코드의 실행 조건은 `handleSelectPlace` 함수의 실행인데, 이 함수가 실행되기 위해서는 사용자가 장소 아이템 중 하나를 클릭해야 함
  - `localStorage` 코드는 상태를 업데이트 하지 않기 때문에 무한 루프에 들어가지 않음
  - 만약 `localStorage` 코드에서 상태를 업데이트 해야 하는 상황이 생기더라도 무한 루프는 일어나지 않음
    - 그 이유는 `handleSelectPlace` 함수 안에 있는 `localStorage` 코드의 실행이 `App` 컴포넌트 함수가 재실행되는 때가 아니라, 사용자가 장소 아이템을 클릭할 때 실행되기 때문

## 5. useEffect가 필요 없는 경우: 다른 예시

```jsx
...

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

	// useEffect가 필요하지 않은 부분
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

    setPickedPlaces(storedPlaces);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

      setAvaliablePlaces(sortedPlaces);
    });
  }, []);

  ...

  function handleSelectPlace(id) {
    ...
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }

  function handleRemovePlace() {
    ...

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
  }

  return (
    ...
  );
}

export default App;
```

- 사용자의 위치를 찾는 `navigator` 코드와 달리, 해당 위치의 코드는 `localStroage` 를 사용하고 있는 코드는 동시에 작동하고 즉시 완료되기 때문에 `useEffect` 가 필요하지 않음
  - 즉, 한 줄씩 실행되고 해당 라인이 실행을 마치면 모두 완료된 것
  - 최종 결과가 한 줄 실행 후 바로 나오기 때문
- `navigator` 코드는 해당 라인이 실행되었다고 모두 완료된 것이 아님
  - 그 안에 있는 `callback` 함수가 작동해야 함
    - 이것은 브라우저에 의해 실행되어, 사용자 위치를 불러오는 데 시간이 소요되는 작업이기 때문
- `localStroage` 코드는 콜백 함수나 그 외의 어떤 것도 없음
  - 데이터를 즉시 불러오는 것이 가능
  - 그렇기 때문에 `App` 컴포넌트 함수는 `localStroage` 의 데이터를 모두 가져올 때까지 실행을 마칠 수 없음

### 1) 수정된 코드 - 1

```jsx
...

function App() {
	// 해당 코드
  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

  const modal = useRef();
  const selectedPlace = useRef();
  const [avaliablePlaces, setAvaliablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);

      setAvaliablePlaces(sortedPlaces);
    });
  }, []);
...
}

export default App;

```

- 즉각적으로 사용이 가능한 `stroedPlaces` 를 이용해 선택한 장소의 상태를 초기화하는 `pickedPlaces` 상태에 사용

### 2) 수정한 코드 - 2

```jsx
import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';

import logoImg from './assets/logo.png';

import { AVAILABLE_PLACES } from './data.js';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
	...
}
```

- 해당 코드를 아예 컴포넌트 함수의 밖으로 꺼내서, 해당 코드 파일이 처음으로 분석되고 실행되는 때에 앱의 전체 사이클에서 단 한번의 시점에만 작동하도록 할 수도 있음
  - 해당 코드를 `App` 컴포넌트에 넣어야 할 이유가 없기 때문
  - 결국 `App` 컴포넌트가 실행될 때마다 작동하게 되는 것이므로, `App` 컴포넌트 안에 작성하는 것은 퍼포먼스 낭비
- 앱 전체가 시작할 때 한 번만 작동하는 것으로도 충분
  - 해당 코드가 먼저 실행된 이후에야 그 다음 코드들이 실행되기 때문

## 6. useEffect를 활용하는 다른 적용 사례

```jsx
// Modal.jsx
import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
  const dialog = useRef();

  dialog.current.showModal();

  return createPortal(
    <dialog
      className='modal'
      ref={dialog}
      open={open}
    >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;

// App.jsx
...

function App() {
  ...
  const [modalIsOpen, setModalIsOpen] = useState(false);
  ...

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  ...

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
			...
    </>
  );
}

export default App;
```

- 위와 같이 수정했을 때 모달을 열면 백드롭이 없음
  - 이유
    - 백드롭은 `dialog` 요소로만 추가할 수 있기 때문
    - `dialog` 요소의 showModal() 메서드를 호출하면 문제 해결 가능
- `Modal` 컴포넌트에서 `dialog` 요소로 `open` 속성을 넘기는 것은 별 효과가 없지만, `useEffect`를 사용하여 속성 중심의 작업을 이어갈 예정

## 7. 브라우저 API의 동기화를 위한 useEffect 활용

### 1) `useEffect` 없이 `open` 속성 값에 따라 `dialog` 요소가 보여지거나 닫히게 하기

```jsx
// Modal.jsx
import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
  const dialog = useRef();

  if (open) {
    dialog.current.showModal();
  } else {
    dialog.current.close();
  }

  return createPortal(
    <dialog
      className='modal'
      ref={dialog}
      open={open}
    >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
```

- 이렇게 작성하면 `close` 메서드 호출에 실패했다는 오류 발생
  - 처음부터 `App` 컴포넌트에서 가져온 `open` 속성은 `false` 이기 떄문에, `Modal` 컴포넌트에서는 정의되지 않은 값을 대상으로 `close` 호출을 한 것이 됨
- 여기서의 문제
  - `showModal` 과 `close` 라는 메서드를 `Modal` 컴포넌트 함수 내부에서 호출하고 있다는 것
  - 그리고 `dialog` 참조 값을 사용하여 `dialog` 요소와 상호작용함
  - 하지만 `Modal` 컴포넌트 함수가 처음으로 실행될 때, `dialog` 참조 값은 아직 설정되지 않은 상태
    → JSX 코드가 실행되기 전이기 때문에 아직 연결되지 않았기 때문
  - 그렇기 때문에 `dialog` 참조값이 undefined, 즉 정의되지 않은 상태이기 때문에 `close` 메서드 호출 또한 실패할 수밖에 없는 것
- 이러한 상황에서는 `useEffect` 를 쓰는 것이 좋음
  - `dialog` 의 `showModal` 나 `close` 메서드나와 같은 DOM API와 속성값 또는 상태값이 동기화될 수 있도록 `useEffect` 가 도움을 줄 수 있기 때문
  - 컴포넌트 함수보다 먼저 혹은 함께 실행되는 것이 아니라, 그 이후에 실행되기 때문에 참조 값과 `dialog` 요소 간의 연결은 이 시점에 이미 만들어져 있을 것
  - `open` 속성을 조건으로 사용하는 if문 또한 Side Effect와 비슷한 것으로 여겨질 수 있음
    → 여기서 `showModal` 나 `close` 메서드를 호출하는 것이 UI 영향에 미치는 반면 `Modal` 컴포넌트의 JSX 코드에는 직접적인 영향을 주지 않기 때문

### 2) `useEffect` 를 사용하여 `open` 속성 값에 따라 `dialog` 요소가 보여지거나 닫히게 하기

```jsx
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, []);

  return createPortal(
    <dialog
      className='modal'
      ref={dialog}
      open={open}
    >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
```

- 여기서 `useEffect` 를 사용했을 때, 오류 밑줄이 생기는 이유
  - 이 의존성 배열에 `Effect` 함수가 필요로 하는 의존성을 모두 추가하지 않았기 때문
  - `App` 컴포넌트의 경우 의존성을 빈 배열로 두어도 문제가 되지 않았는데, 그 이유는 여기서의 `useEffect` 코드는 결국 추가적인 의존성이 없었기 때문

## 8. Effect Dependencis(의존성) 이해하기

### 1) Effect Dependencis란?

- 속성이나 상태 값으로 이해할 수 있음
- `useEffect` 함수 안에서 사용된 것
  - 컴포넌트 함수를 다시 실행하도록 하는 값, 즉 속성과 상태에 해당하는 경우
  - `useEffect`의 의존성에는 상태나 props를 사용하거나 이에 의존하는 함수나 context 값들도 포함
- 참조와 같은 값들 또는 브라우저 내에 구축된 객체와 메서드와 같은 값들은 의존성으로 분류되지 않음
  - 그 이유는 `useEffect` 는 컴포넌트 함수가 다시 실행되도록 하는 의존성에 대해서만 적용되기 때문
    - 이는 해당 `Effect` 함수는 컴포넌트 함수가 실행될 때마다 작동해야 하기 때문
    - 만약 해당 함수의 의존성이 변경된다면, 빈 배열로는 일어나지 않을 일이기 때문
      → 아무 의존성도 추가하지 않는다면, 값 또한 변경될 수 없음
- 컴포넌트 함수의 속성 또는 그 속성으로부터 받게 되는 값은 변경될 수 있기 때문에, 해당 값을 의존성으로 추가해야 함
  ```jsx
  import { useRef, useEffect } from 'react';
  import { createPortal } from 'react-dom';

  function Modal({ open, children, onClose }) {
    const dialog = useRef();

    useEffect(() => {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }, [open]);

    return createPortal(
      <dialog
        className='modal'
        ref={dialog}
        onClose={onClose}
      >
        {children}
      </dialog>,
      document.getElementById('modal')
    );
  }

  export default Modal;
  ```
  - `Modal` 컴포넌트 함수가 실행될 때마다, `open` 속성의 값이 변경될 때마다 적용됨

## 9. useEffect의 도움으로 고칠 수 있는 다른 문제들

```jsx
// DeleteConfirmation.jsx
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // 3초 뒤에 해당 모달이 자동으로 꺼지면서 장소를 자동으로 삭제하는 기능 추가
  setTimeout(() => {
    onConfirm();
  }, 3000);
  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button
          onClick={onCancel}
          className='button-text'
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className='button'
        >
          Yes
        </button>
      </div>
    </div>
  );
}
```

- 위 코드에서 문제
  - `DeleteConfirmation` 컴포넌트 함수는 항상 렌더링 됨
    - `App` 컴포넌트에 의해 렌더링되는 `DeleteConfirmation` 컴포넌트 함수는 `Modal` 컴포넌트가 감싸고 있으며, DOM에서 항상 보이지 않는 것 뿐이지 이 또한 항상 렌더링 됨
      → `Modal` 컴포넌트는 내부적으로 보이게 하거나 숨겨서 `open` 속성을 통해 UI를 조정하기 때문
  - 기술적인 측면에서 `DeleteConfirmation` 컴포넌트는 언제나 DOM의 한 부분이기 때문에, `App` 컴포넌트가 최초로 렌더링 될 때 해당 타이머도 설정되고 시작됨
    - `Modal` 컴포넌트를 렌더링하는 동안 `DeleteConfirmation` 컴포넌트 또한 렌더링 되기 때문
- 해결 방법 1)
  - `App` 컴포넌트에서 `modalIsOpen` 상태 값으로 조건부 렌더링을 하면 됨
    ```jsx
    // App.jsx
    ...
    function App() {
      ...

      return (
        <>
          <Modal
            open={modalIsOpen}
            onClose={handleStopRemovePlace}
          >
            {modalIsOpen && <DeleteConfirmation
              onCancel={handleStopRemovePlace}
              onConfirm={handleRemovePlace}
            />}
          </Modal>

          ...
        </>
      );
    }

    export default App;
    ```
    - 이렇게 하면 `modalIsOpen` 이 true 일 때만 `DeleteConfirmation` 컴포넌트가 렌더링 됨
- 해결 방법 2)
  ```jsx
  // Modal.jsx
  import { useRef, useEffect } from 'react';
  import { createPortal } from 'react-dom';

  function Modal({ open, children, onClose }) {
    ...

    return createPortal(
      <dialog
        className='modal'
        ref={dialog}
        onClose={onClose}
      >
        {open ? children : null}
      </dialog>,
      document.getElementById('modal')
    );
  }

  export default Modal;

  ```
  - 더 명쾌한 해결책은 `Modal` 컴포넌트 태그 사이에 렌더링하는 것
    - 이를 위해서는 `Modal` 컴포넌트에서 `children` 속성을 생성하지 않음으로써 `App` 컴포넌트가 `DeleteConfirmation` 컴포넌트를 조건적으로 렌더링하지 않도록 해야 함
    - 대신 `Modal` 컴포넌트가 렌더링 되면 더 명확해짐
- 그러나 여전히 문제가 존재
  - 3초가 지나기 전에 직접 삭제한다면, 타이머를 멈추지 않았으므로 만료됨
  - 이것 자체로 문제가 발생하지는 않았지만, 취소를 클릭하게 되더라도 3초 후에 항목이 사라지게 됨
    - 이유는 타이머가 멈추지 않았기 때문
  - `DeleteConfirmation` 컴포넌트가 더이상 렌더링되지 않으면, 취소나 수락 중 어느 것을 눌렀든 현재 컴포넌트가 현재 보이든 안 보이든 여전히 타이머가 시작이 되고 지속된다면 이것은 문제가 됨
    → 이것은 `useEffect` 로 해결할 수 있음

## 10. useEffect의 Cleanup 함수 소개

### 1) `DeleteConfirmation` 컴포넌트에 `useEffect` 를 사용하여 수정하기

```jsx
import { useEffect } from 'react';

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // 3초 뒤에 해당 모달이 자동으로 꺼지면서 장소를 자동으로 삭제하는 기능 추가
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    ...
  );
}

```

- `setTimeout` 함수는 Side Effect로, JSX 코드를 산출하는 것에 직접적으로 연관되지 않음
- `useEffect` 를 사용하여 이 타이머를 해당 컴포넌트가 사라질 때 멈출 수 있음
  - `useEffect` 의 `cleanup` 함수로 해당 타이머의 내용을 삭제할 수 있음
  - `useEffect` 를 사용할 때 `Effect` 함수 뿐만 아니라, 이 `Effect` 함수가 다시 작동하기 바로 전에 실행해야 하는 `cleanup` 함수도 정의되지 않았었음
  - 이러한 `cleanup` 함수를 `Effect` 함수 안에 반환함으로써 정의할 수 있음
  - `Effect` 함수는 다른 함수를 반환할 수 있는데, 이 함수는 리액트에 의해 실행됨
    - 그 시점이 `Effect` 함수가 다시 작동하기 바로 전이나 해당 컴포넌트가 사라지기 바로 전에 실행됨
      → 즉, DOM에서 삭제되기 전에 실행됨
- `clearTimeout` 함수를 사용하여 타이머를 멈추기 위한 참조를 사용
  - 이것은 `setTimeout` 에 의해 반환되므로 이 함수를 상수에 저장하여, 이 값을 `clearTimeout` 함수에 전달
  - 해당 컴포넌트가 DOM에서 삭제될 때마다 타이머를 멈추게 됨

### 1) cleanup 함수

- `Effect` 함수가 다시 작동하기 바로 직전에 `cleanup` 함수가 실행됨
  - `Effect` 함수가 다시 작동하기 위해서는 의존성이 있어야 함
  - 그렇지 안으면 컴포넌트가 삭제될 때 `cleanup` 함수가 딱 한 번만 실행하게 됨
- `cleanup` 함수는 `Effect` 함수가 최초로 작동되기 바로 전에 작동하지 않음
  - `Effect` 함수의 최초 실행 다음부터 차후 실행 바로 전에만 실행
  - 해당 컴포넌트가 삭제될 때만 실행

## 11. 객체의 문제점 & 함수 의존성

- `Effect` 함수에 속성이나 상태 값을 사용한다면 의존성으로 추가해야 함
- 하지만 추가하려는 의존성이 함수라면?
  - 의존성으로 함수를 추가할 떄는 무한 루프를 생성하게 될 위험이 있음
  - 함수는 상태 값처럼 변하는 값이 아니라고 생각할 수 있지만, 자바스크립트의 함수는 값이기 때문에 객체임
    - 함수 객체는 해당 컴포넌트가 실행될 때마다 새로운 객체가 생성됨
    - 자바스크립트에서는 두 개의 다른 객체를 생성할 때, 이 두 개가 같은 모양 또는 같은 코드를 가졌더라도 이 두 개의 객체는 같지 않음
- 그렇기 때문에 `DeleteConfirmation` 컴포넌트의 `useEffect` 의 `onConfirm` 의존성은 렌더링 중에 다르게 여겨짐
  ```jsx
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);
  ```
  - `App` 컴포넌트가 새로 렌더링 될 때마다 `onConfirm` 값으로 넘겨지는 `handleRemovePlace` 함수가 완전히 새롭게 생성되기 때문
  - 이 함수를 `DeleteConfirmation` 컴포넌트에서 받은 후에는 리액트는 이 새로운 값인 함수를 보고 이전의 값 또는 함수와 비교하게 됨
  - 그리고 이 둘이 다르다고 판단을 내리기 때문에, 리액트는 `DeleteConfirmation` 컴포넌트 함수를 다시 실행하게 됨
    - 해당 의존성이 바뀌지 않았음에도 다시 실행
- 이것은 문제가 될 수 있음
  - 만약 `Effect` 함수 내부에서 실행되는 함수에서 상태를 다시 업데이트 하게 된다면, 무한 루프를 발생시킬 수 있음
  - 우리 프로젝트는 무한 루프에 빠지지 않는 이유
    - `onConfirm` 이 호출될 때 상태 업데이트가 작동되면서 무한 루프가 발생할 수 있지만,
    - 실행되는 `setModalIsOpen` 함수가 `modalIsOpen` 상태를 false로 설정하고,
    - `DeleteConfirmation` 컴포넌트가 DOM으로부터 삭제되게 함으로써 `Modal` 컴포넌트가 DOM으로부터 자식을 삭제하도록 유도
    - 그리고 `Modal` 컴포넌트의 자식 속성은 해당 `DeleteConfirmation` 컴포넌트를 지니게 되어 무한 루프에 빠지지 않는 것
    - 그렇지만 여전히 무한 루프의 위험은 존재
    - `setModalIsOpen(false)` 를 주석처리 하여 `DeleteConfirmation` 컴포넌트가 DOM에서 삭제되지 않도록 한다면 무한 루프가 발생하게 됨
- 무한 루프에 빠지지 않는 더 안전한 방법은 컴포넌트가 DOM에서 삭제되는 것과 관련 없이 또 다른 리액트 훅을 사용하는 것

## 12. useCallback 훅

```jsx
// App.jsx

import { useCallback } from 'react';

const handleRemovePlace = useCallback(function handleRemovePlace() {
  setPickedPlaces((prevPickedPlaces) => prevPickedPlaces.filter((place) => place.id !== selectedPlace.current));
  setModalIsOpen(false);

  const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
}, []);
```

- 리액트에서 함수가 항상 재생성 되지 않도록 하기 위해 사용할 수 있는 `useCallback` 훅이 제공됨
  - 첫 번째 인자 : 재생성되지 않길 바라는 함수
  - 두 번째 인자 : 의존성 배열
- `useCallback` 은 주변 컴포넌트 함수가 다시 실행되는 경우마다 재생성되지 않는 방식으로 둘러싸둔 함수를 값을 반환
  - `useCallback` 을 사용하면 안쪽에 있는 함수가 재생성되지 않게 해줌
  - 대신 메모리로서 내부에 저장
  - 해당 컴포넌트 함수가 다시 실행될 때마다 메모리로서 저장된 이 함수를 재사용
  ⇒ `useEffect` 로 함수를 의존성으로 넘기는 경우에 `useCallback` 을 사용해야 하는 이유
- `useCallback` 에서도 의존성 배열을 하나 가지는데, 이것도 `useEffect` 의 의존성 배열처럼 작동하게 됨
  - 이 의존성에는 `useCallback` 에 들어가 있는 함수 안에 사용되는 prop 또는 state 값이 뭐든 추가해주면 됨
    - 위 코드의 경우, 업데이트 될 필요가 없는 상태 업데이트 함수나 `localStroage`를 사용하기 때문에 필요하지는 않음
      → 이것들은 컴포넌트를 재렌더링하는 것과 같은 작용을 하지 않기 때문
- `useCallback` 도 `useEffect` 와 같이, 리액트는 의존성이 바꼈을 경우에 `useCallback` 내의 함수를 재생성하게 됨
  - 그러나 빈 의존성 배열을 가졌다면 변경될 일이 없기 때문에, 해당 함수는 재생성 되지 않음

## 13. useEffect의 Cleanup 함수: 다른 예시

```jsx
// DeleteConfirmation.jsx
import { useEffect, useState } from 'react';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // 사용자에게 타이머가 설정되어 있다는 것과 타이머가 만료되면 항목이 삭제될 예정이라고 알려주는 기능 추가
  const [remaininngTime, setRemaininngTime] = useState(TIMER);

  // 무한루프 방지를 위해 useEffect 사용
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaininngTime((prevTime) => prevTime - 10);
    }, 10);

    // 해당 컴포넌트가 사라져도 setInterval 함수가 끝나지 않는 것을 방지하기 위해 추가
    // 이것은 해당 앱의 성능에 영향을 주지 않기 위함
    return () => {
      clearInterval(interval);
    };
  }, []);

  // 3초 뒤에 해당 모달이 자동으로 꺼지면서 장소를 자동으로 삭제하는 기능 추가
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button
          onClick={onCancel}
          className='button-text'
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className='button'
        >
          Yes
        </button>
        <progress
          value={remaininngTime}
          max={TIMER}
        />
      </div>
    </div>
  );
}
```

## 14. State(상태) 업데이트 최적화

```jsx
// DeleteConfirmation.jsx
import { useEffect } from 'react';
import ProgressBar from './ProgressBar';

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // 3초 뒤에 해당 모달이 자동으로 꺼지면서 장소를 자동으로 삭제하는 기능 추가
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id='delete-confirmation'>
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id='confirmation-actions'>
        <button
          onClick={onCancel}
          className='button-text'
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className='button'
        >
          Yes
        </button>
        <ProgressBar timer={TIMER} />
      </div>
    </div>
  );
}

// ProgressBar.jsx
import { useEffect, useState } from 'react';

export default function ProgressBar({ timer }) {
  // 사용자에게 타이머가 설정되어 있다는 것과 타이머가 만료되면 항목이 삭제될 예정이라고 알려주는 기능 추가
  const [remaininngTime, setRemaininngTime] = useState(timer);

  // 무한루프 방지를 위해 useEffect 사용
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaininngTime((prevTime) => prevTime - 10);
    }, 10);

    // 해당 컴포넌트가 사라져도 setInterval 함수가 끝나지 않는 것을 방지하기 위해 추가
    // 이것은 해당 앱의 성능에 영향을 주지 않기 위함
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      value={remaininngTime}
      max={timer}
    />
  );
}
```

- interval을 해당 컴포넌트에서 관리하고 있는데, 이 interval 상태를 매 10ms 마다 업데이트 중
  - 이것은 해당 컴포넌트가 10ms 마다 작동한다는 것
  - 즉, 10ms 마다 리액트가 `onConfirm` 값을 비교하여 `Effect` 함수의 재실행 여부를 알아봐야 한다는 것이고, 리액트는 JSX 코드 전체를 확인해야 함
  ⇒ 이 부분이 최적화 할 수 있는 부분
