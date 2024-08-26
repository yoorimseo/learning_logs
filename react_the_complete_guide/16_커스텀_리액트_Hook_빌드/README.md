# 커스텀 리액트 Hook 빌드

## 1. Hooks(훅)의 규칙 복습 & 커스텀 훅을 사용하는 이유

### 1) Hooks(훅)의 규칙

- 리액트 훅은 리액트 컴포넌트 함수나 다른 커스텀 훅 안에서만 사용 가능
- 리액트 훅은 중첩된 코드 안에서 호출 불가
  예) if 문 안에서 리액트 훅 사용 불가

### 2) 커스텀 훅을 사용하는 이유

- 컴포넌트 함수에 들어가는 코드를 감싸서 재사용하기 위함
  - 비슷한 코드를 두 개 이상의 다른 컴포넌트에서 쓰지 않도록 해줌
  - 재사용이 가능하고 설정을 바꿀 수 있는 하나의 함수를 만들어, 컴포넌트 함수에서 기존 코드 대신 사용
  - 컴포넌트의 개념이 로직과 JSX 구조를 재사용하는 것처럼, 다른 코드도 그렇게 하고자 하는 것
    예) JSX 코드를 반환하지 않는 코드를 재사용하기 위함
- 재사용하고자 하는 코드를 컴포넌트 함수의 밖으로 보내서 따로 분리된 함수에 넣어주는 방식을 사용할 수 있음
  - 여러 곳에서 사용해야 하는 로직이 있으면, 이것을 함수로 만들어서 이 함수를 여러 곳에서 사용 가능
- 커스텀 훅이 필요한 예시

  ```jsx
  function fetchData() {
    useEffect(() => {
      async function fetchPlaces() {
        setIsFetching(true);
        try {
          const places = await fetchUserPlaces();
          setUserPlaces(places);
        } catch (error) {
          setError({ message: error.message || 'Failed to fetch user places.' });
        }

        setIsFetching(false);
      }

      fetchPlaces();
    }, []);
  }

  function App() {
  	...
  }
  ```

  - `fetchData` 함수는 `useEffect` 훅을 사용하고, 상태 업데이트 함수도 가지고 있음
    - 이것들은 컴포넌트 함수 안에서만 사용 가능
  - `fetchData` 함수를 `App` 컴포넌트 뿐만 아니라 다른 곳에서도 사용하려면, 커스텀 훅이 필요
    - 커스텀 훅은 다른 여러 컴포넌트에서도 부를 수 있는 함수이기 때문
    - 커스텀 훅은 유효한 곳에서 사용되기를 보장받아야 하기 때문에, 컴포넌트 내에서 사용도 보장되는 것

## 2. 커스텀 Hooks(훅) 생성하기

### 1) 커스텀 Hooks(훅) 생성하기

- `src` 폴더 안에 `hooks` 폴더를 생성하여 구조를 만들어줌
  - 그 안에 `useFetch.js` 파일을 생성하여 만들고자 하는 커스텀 훅의 이름과 동일하게 설정
- 해당 파일 안에 일반 함수를 만들건데, 이 함수의 이름은 `use` 로 시작해야 함
  - 함수의 이름이 `use` 로 시작하는 것이 컨벤션
    - 리액트의 기존 내장 훅의 이름과 겹치지 않아야 함
  - 리액트 프로젝트의 규칙 상, `use` 로 시작하는 함수는 훅으로 인식됨
    - 리액트가 훅에 적용되는 특정 규칙을 부여함
      → 커스텀 훅의 이름을 `use` 로 시작함으로써 훅이라는 것을 명시해야, 기존의 리액트 훅을 해당 커스텀 훅 안에서 사용 가능
    - 이 규칙이 중요한 이유는, 이 규칙이 없으면 훅을 잘못 썼을 때 앱이 잘못 동작할 수 있음

### 2) 커스텀 훅이 필요한 이유 & 커스텀 훅의 동작 방식

- 컴포넌트 함수에서 사용하는 훅의 긴 코드를 없애고, 대신 커스텀 훅을 사용할 수 있음
  - 그러면 커스텀 훅에 저장된 것들이 내부적으로 잘 동작할 것
- 똑같은 훅을 다른 컴포넌트에서도 사용해 같은 동작을 수행할 수 있음

## 3. 커스텀 Hooks(훅): State(상태) 관리 & 상태 값 반환

- 커스텀 훅에서 상태를 사용하고 있다면, 상태 값을 입력해주는 작업이 필요
  - 나중에 해당 커스텀 훅을 사용하는 모든 컴포넌트에, 이 훅에 입력된 같은 상태값이 필요해지기 때문
    - 값을 새롭게 다시 입력할 필요가 없게끔 하기 위함
    - 커스텀 훅의 재사용성을 높이기 위함

### 1) 예시를 통해 알아보기

```jsx
// hooks/useFetch.js
import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    error,
  };
}

// App.jsx
...

function App() {
  ...

  const {
    isFetching,
    error,
    fetchedData: userPlaces,
  } = useFetch(fetchUserPlaces, []);

  ...

  return (
    <>
      ...
    </>
  );
}

export default App;
```

- 커스텀 훅은 단순히 요청을 보내는 것이 아니라, 연관된 모든 상태 값을 관리하는 역할
- 이 커스텀 훅을 재사용 할 수 있게 만들기 위해서는, `useState` 를 사용해야 함
  - 커스텀 훅을 만드는 이유가 다양한 상황에서 사용하기 위해서, 다른 유형의 데이터에도 적용할 수 있는 상태 값 이름을 사용
- 커스텀 훅도 일반 함수처럼 파라미터를 사용할 수 있음
  - 매개변수로 `fetchFn` 을 설정하여, 해당 커스텀 훅이 모든 `fetchFn` 를 사용할 수 있게 만듦
- `useEffcet` 의 의존성으로 `fetchFn` 을 설정하는 것은 실행시키려는 목적이 아니라, 값으로서 설정한 것

### 2) 컴포넌트에서 커스텀 훅을 사용할 때의 장점

- 커스텀 훅이 관리하는 모든 상태 값이 커스텀 훅을 사용하고 있는 컴포넌트에 속함
  - 그래서 커스텀 훅에서 상태 값을 업데이트 하면, 예를 들어 `setIsFetching(true);` 가 발생하면, 커스텀 훅이 있는 컴포넌트도 다시 실행되게 됨
    - 컴포넌트 안에서 상태 값을 업데이트 한 것과 같은 효과가 나타남

### 3) 커스텀 훅의 목적

- 재사용 가능한 훅을 만들어, 다른 컴포넌트에서도 사용해 같은 동작을 수행하기 위함
  - `useState` 나 `useEffect` 와 같이 이미 빌트인 되어 있는 훅을 사용하거나 HTTP 요청을 만들 때 적용되는 모든 로직이 커스텀 훅에서도 똑같이 적용되기 때문
  - 컴포넌트에서 커스텀 훅만으로도 모든 작업이 가능하고, 해당 컴포넌트의 기능을 추가 코드 작업 없이도 사용 가능

## 4. 커스텀 Hooks(훅)에서 중첩 함수 노출시키기

```jsx
// useFetch.js
import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}

// App.jsx
...

function App() {
	...

  const {
    isFetching,
    error,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  ...

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces] // 의존성에 setUserPlaces 추가
  );

  ...

  return (
    ...
  );
}

export default App;
```

- 커스텀 훅은 컴포넌트를 사용할 때와 마찬가지로 한 번 사용할 때마다 새로운 복사본이 독립적으로 만들어짐
  - `App` 컴포넌트에서 `useFetch` 를 사용하면, `useFetch` 에서 관리하는 상태 값은 `App` 컴포넌트와만 연결됨
  - 다른 컴포넌트에서 `useFetch` 를 사용하게 되면, 해당 컴포넌트에 해당하는 상태 값이 새로 만들어짐
    ⇒ 이것은 해당 컴포넌트에만 적용되는 독립적인 상태 스냅샷
  - `useState` 를 여러 컴포넌트에서 사용할 때 각각 전부 독립적인 상태 스냅샷으로 사용할 수 있는 것처럼, 똑같은 원리로 상태 값을 가진 커스텀 훅에서도 사용 가능
    ⇒ 즉, 같은 커스텀 훅을 사용하는 상황에서 하나의 컴포넌트에서 상태 값을 바꾼다고 다른 컴포넌트의 상태 값들이 바뀌는 것은 아님

## 5. 다중 컴포넌트에서 커스텀 Hook(훅) 사용하기

```jsx
// AvailablePlaces.jsx
import { useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

import { useFetch } from '../hooks/useFetch.js';

// navigator.geolocation.getCurrentPosition((position) => {
//   const sortedPlaces = sortPlacesByDistance(
//     places,
//     position.coords.latitude,
//     position.coords.longitude
//   );
//   setAvailablePlaces(sortedPlaces);
//   setIsFetching(false);
// });

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    setFetchedData: setAvailablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
```

## 6. 유동성 있는 커스텀 Hooks(훅) 생성하기

```jsx
// AvailablePlaces.jsx
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}
```
