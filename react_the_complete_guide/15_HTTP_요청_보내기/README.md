# HTTP 요청 보내기

## 1. 데이터베이스 연결/해지하는 방법

### 1) 중앙 서버, 중앙 백엔드나 데이터베이스들이 있어야 할 이유

- 리액트 앱의 여러 인스턴스들이 연결되고 유저들 사이에서 데이터를 공유하기 위함

    예) 만약 온라인 스토어를 구축한다고 가정

    → 전 세계의 다른 곳에 있는 사용자가 동일한 데이터에 접속할 수 있어야 하고 데이터를 보내거나 주문을 넣을 수 있어야 함

    → 온라인 스토어의 주인으로써 그 주문에 접속할 수 있어야 함


### 2) 웹 개발자로서 명심할 것

- 대체적으로 브라우저에 실행될 코드를 쓸 때, 즉 리액트로 우리가 하는 작업을 할 때 그 리액트 앱 코드가 방문자들의 브라우저에서 실행된다는 것
    - 이렇게 하면 방문자들이 이 코드에 접속할 수 있고 볼 수도 있음
- 이 코드가 만약에 데이터베이스에 접근할 수 있는 인증 정보를 담고 있다면, 이 데이터베이스는 제대로 작동하지 않을 것
    - 사용자가 그 인증 정보를 받아 해당 데이터베이스에 접근하여 올바르지 않은 데이터를 삽입하는 등의 일을 할 수 있게 되기 때문

### 3) 프론트엔드에서 브라우저에 실행되는 코드를 쓸 때의 특정 제약

- 파일 시스템은 쉽게 접근할 수 없음
    - 특히, 중앙 서버나 컴퓨터 속에 공유되지 않은 시스템 파일의 경우
    - 브라우저는 이런 역량이 없기 때문에, 데이터베이스나 공유된 데이터를 담은 파일 시스템에 직접적으로 접근하는 것보다 백엔드 서버와 소통하는 것이 좋음

        → 중개인 역할을 하는 것


### 4) 리액트 앱과 데이터베이스를 연결하는 방법

- 리액트 앱을 직접적으로 데이터베이스에 연결하는 것은 아님
    - 직접적으로 연결하게 되면 보안 문제를 마주하게 됨
- 우리의 리액트 앱이 브라우저에서 실행되고 이론적으로 사용자들이 전체 코드를 볼 수 있다면, 이 앱은 백엔드에 연결할 수 있음
    - 분리된 서버에서 분리된 프로젝트가 실행되며, 개발자가 소유하고 운영하는 컴퓨터에서 작동
    - 이 백엔드에서 데이터베이스 같은 것들과 소통할 수 있음
- 백엔드 코드는 웹사이트의 유저들에게는 접근이 불가
    - 프론트엔드 개발자만이 백엔드 서버에 있는 코드에 접근 가능
- 프론트엔드와 백엔드를 연결하기 위해서는 HTTP 요청을 사용해야 함
    - 리액트 앱 내에서 HTTP 요청을 백엔드로 보내서 데이터를 요청하거나, 데이터를 바꾸도록 요청할 수 있음
    - 보안과 관련된 중요한 점은 HTTP 요청을 보낼 때 백엔드가 허용하거나 수락한 것만 보낼 수 있다는 것
        - 만약 백엔드가 특정 요청을 거부하면, 요청은 불가능한 것
        - 이렇게 사용자가 할 수 있는 것과 할 수 없는 것을 통제할 수 있음

### 5) 정리

- 리액트 앱에서 데이터베이스와 소통해야 한다면, 리액트로 client-side 웹 앱을 구축해야 함
- 브라우저에서 실행되는 코드는 웹사이트 방문자들이 전부 볼 수 있음
- 그러므로 백엔드와 소통할 떄는 HTTP 요청을 사용
    - 이를 통해 데이터베이스와 소통할 수 있는 것
    - 이 코드는 유저들에게 노출되지 않음
    - 어떤 요청이 가능한지는 프론트엔드 개발자가 통제 가능
        - endpoint라고 불리는 백엔드 API를 사용하면 됨

            → API는 '응용 프로그램 인터페이스'를 의미

            → 'REST API'는 HTTP 요청을 보낼 수 있는 특정 사전 정의된 경로를 노출하는 웹 서버

- 절대 데이터베이스와 내부 리액트 코드를 직접적으로 연결하려 하면 안됨
    - 이렇게 하면 데이터베이스 인증 정보가 노출됨
- 많이 쓰이는 방법
    - 프론트엔드와 백엔드 프로젝트를 구분해서 쓰는 것
    - 풀스택 리액트 앱도 가능(Next.js나 Remix)

## 2. 웹 복습

### 1) HTTP

- HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜
- 웹에서 이루어지는 모든 데이터 교환의 기초
- 클라이언트-서버 프로토콜
    - 수신자 측에 의해 요청이 초기화되는 프로토콜을 의미
- requests(요청)
    - 브라우저인 클라이언트에 의해 전송되는 메시지
- responses(응답)
    - 요청에 대해 서버에서 응답으로 전송되는 메시지

[HTTP 기본 - HTTP | MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP)

### 2) RESTfulAPI-

- Respresentational State Transfer의 약자
- 웹 기반의 서비스에서 자원을 효율적으로 관리하고 상호작용하기 위해 설계된 API
- REST(Representational State Transfer) 원칙을 따름
- HTTP 메서드(GET, POST, PUT, DELETE 등)를 사용해 클라이언트가 서버의 자원에 접근하거나 조작할 수 있게 함
- URL을 통해 자원을 식별
- 요청과 응답에서 주로 JSON 형식을 사용해 데이터를 주고받음
- RESTful API는 구조가 단순하고 확장성이 높아 다양한 애플리케이션에서 널리 사용됨

[What is a RESTful API? | Creating a REST API with Node.js](https://www.youtube.com/watch?v=0oXYLzuucwE)

## 3. 앱의 데이터 Fetching을 위한 준비

### 1) 백엔드 서버 실행

- `npm run dev` 로 리액트 개발 서버를 열어둔 터미널 말고 새로운 터미널 실행
    - 두 개의 프로세스를 실행해야 함
- 해당 터미널에서 backend 폴더로 경로 설정
- `npm install body-parser` 추가 패키지 install
- `node app.js` 를 입력하여 백엔드 서버 실행

### 2) available places를 백엔드 API로부터 fetch로 가져오기

```jsx
import { useState } from 'react';

import Places from './Places.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // available places를 백엔드 API로부터 Fetch
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

- 백엔드와 소통할 때는 HTTP 요청을 보내야 하고, 이것은 인터넷을 통해 백엔드로 전달됨
    - 그 다음 백엔드 서버가 필요한 작업을 해서 응답을 보내줌
    - 이것은 약간의 시간이 소요됨

        → 즉각적인 과정이 아님

- 하지만 여기서 문제는 만약 이 과정에서 약간의 시간이 소요된다면, 해당 컴포넌트는 그 데이터를 기다릴 수 없음
    - 이 컴포넌트는 거의 즉각적으로 실행되기 때문에 그 어떤 데이터도 기다리지 않기 때문
    - `place` 데이터가 준비되어 있지 않다면 해당 컴포넌트를 데이터 없이 렌더링 해야 하고, 데이터가 준비됐을 때 업데이트 해야 함
    - 그렇기 때문에 빈 배열을 `useState` 의 초기값을 설정하고, 해당 상태 값을 `Places` 컴포넌트에 사용
- HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
    - 그러면 UI가 다시 렌더링되어 업데이트 됨

## 4. HTTP 요청을 보내지 않는 방법(잘못된 이유 부가 설명)

### 1) client-side에서 내장 `fetch` 함수를 사용하여 HTTP 요청 보내기

- `fetch` 함수
    - 브라우저가 제공하는 함수
    - HTTP 요청을 다른 서버들로 보내는 데 사용
    - 데이터를 fetch할 때만 사용하지는 않고, 데이터를 보낼 때도 사용함
    - 인자
        - 요청을 보내려는 서버의 URL
    - `fetch` 함수는 `promise` 를 반환
- `promise`
    - 표준 자바스크립트 객체
    - 해당 state에 따라 각 다른 값을 산출해냄
    - `fetch` 로 불러온 결과인 이 값에 접근하기 위해서 메서드를 사용하여 한데 묶을 수 있음
- `then` 메서드
    - 인자로 함수를 정의하면, 이 `promise` 가 해결되고 `Response`를 받고 나서 한 번 실행됨

        → 이 함수에는 자동으로 `Response` 객체를 받음

        → `Response` 를 받고 나서 브라우저를 통해 딱 한번 실행됨

        → 이것이 즉각적인 과정은 아님

- `await`
    - 최신 자바스크립트에서 사용
    - `Response` 들에 접근 가능
    - 구문을 더 가독성 있게 만들어줌
    - `await` 은 `fetch` 함수가 비동기(`async`)로 실행될 때 사용 가능

        → `async` 는 컴포넌트 함수에 사용 불가능 하도록 리액트에서 지정한 제약

- `response` 객체
    - `response` 의 일부인 데이터에 접근할 수 있는 다른 메서드들이 존재
        - `json` 메서드 : JSON 형식의 데이터를 추출하는 데 사용

            → JSON을 반환하면 또 다른 `propmise` 를 반환

            → 해당 `json` 메서드를 반환하게 되면, 첫번째 `then` 다음에 또 다른 `then` 메서드를 추가할 수 있음

            ⇒ `response` 데이터를 돌려받고, 이 데이터로 작업하기 위함

            → JSON은 텍스트 기반 데이터 형식으로, 자바스크립트의 배열이나 객체와 비슷

            ```jsx
            // JSON은 표준 데이터 형식으로, 백엔드와 데이터를 주고 받을 때 사용
            [
            	{
                "id": "p1",
                "title": "Forest Waterfall",
                "image": {
                  "src": "forest-waterfall.jpg",
                  "alt": "A tranquil forest with a cascading waterfall amidst greenery."
                },
                "lat": 44.5588,
                "lon": -80.344
              },
              ...
            ]
            ```

- 잘못된 예시와 그 이유

    ```jsx
    fetch('http://localhost:3000/places').then((response) => {
      return response.json();
    }).then((resData) => {
      setAvailablePlaces(resData.places);
    });
    ```

    - 이런 식으로 `fetch` 를 직접적으로 컴포넌트 함수에 불러오면 무한 루프 발생
        - 문제는 두 번째 `then` 블록에서 상태를 업데이트 하는데, 그러면 해당 컴포넌트 함수를 재실행하게 됨
        - 해당 컴포넌트 함수가 실행될 때마다 `fetch` 함수도 실행되기 때문
        - 새로운 요청이 이 컴포넌트 함수가 실행될 때마다 보내지게 됨

## 5. useEffect로 HTTP 요청(GET 요청) 전송하기

```jsx
useEffect(() => {
  fetch('http://localhost:3000/places').then((response) => {
    return response.json();
  }).then((resData) => {
    setAvailablePlaces(resData.places);
  });
}, []);
```

- 의존성이 빈 배열이기 때문에, 해당 컴포넌트가 처음 실행되고 난 후에 한 번만 실행될 것

## 6. async / await 사용하기

- 대다수의 사람들은 비동기(`async`) `await` 구문을 선호
- `useEffect` 를 사용할 때, 하지 말아야 할 것
    - `async` 키워드를 인자의 익명 함수 앞에 추가하고, `await` 을 `fetch` 함수 앞에 작성하는 것

        ```jsx
        useEffect(async () => {
          await fetch('http://localhost:3000/places').then((response) => {
            return response.json();
          }).then((resData) => {
            setAvailablePlaces(resData.places);
          });
        }, []);
        ```

        - 이것은 리액트가 허용하지 않거나, 지원하지 않음

### 1) async / await 사용하기

```jsx
useEffect(() => {
  async function fetchPlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
    setAvailablePlaces(resData.places);
  }

  fetchPlaces();
}, []);
```

- `Effect` 함수에서 새로운 함수를 생성하여, 이 함수에 비동기를 추가
- 주의해야 할 것은 `fetchPlaces` 함수를 정의하고 바로 불러와야 한다는 것
    - 비동기로 정의하고 사용하면 `await` 키워드 사용이 가능

## 7. 로딩 State(상태) 다루기

### 1) 로딩 State(상태)가 필요한 이유

- 개발자도구 > 네트워크 탭 > throttling을 활성화하고 slow 3G를 켠 후 새로고침을 하면, 페이지가 로딩되는 데에 시간이 걸림
    - 로딩이 다 되고 나면 장소를 가져오는 데에도 시간이 걸림
    - 이것이 사용자에게 좋은 경험을 주지는 않음
        - 데이터를 가져오는 것을 기다리는 동안 대체 항목(대체 텍스트나 로딩 텍스트 등)이 보여진다면 더 좋은 경험을 줄 것

### 2) 로딩 State(상태) 만들기

```jsx
// AvailablePlaces.jsx
import { useEffect, useState } from 'react';

import Places from './Places.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  // available places를 백엔드 API로부터 Fetch
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();

      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

// Places.jsx
export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) {
  console.log(places);
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className='fallback-text'>{loadingText}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

```

- 데이터를 가져오는 상태에 따라 로딩 상태를 표시하는 방법

## 8. HTTP 에러 다루기

- HTTP 요청을 보낼 때 실패하는 요인
    - 사용자의 네트워크 연결이 원활하지 않아서
    - 백엔드에 문제가 생겨서
    - 서버가 일시적으로 오프라인이어서
    - 코드에 버그가 있어서 …
- 프론트엔드 코드에서 에러가 발생할 때를 대비해두어야 함

### 1) fetching에 실패하는 가장 큰 두 가지 경우

- 애초에 요청을 보내는 것에 실패
    - 네트워크 연결이 충돌
    - 네트워크 연결이 없을 때 처음부터 요청을 보내는 것에 실패하게 됨
- 요청을 보낼 때 백엔드에는 성공적으로 전달되었지만, 거기서부터 문제가 발생해 백엔드가 에러 응답을 보내는 경우

### 2) 해결 방법

```jsx
// AvailablePlaces.jsx
import { useEffect, useState } from 'react';

import Error from './Error.jsx';
import Places from './Places.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // fetch를 할 때는 아래의 3가지 상태를 기본으로 가짐
  const [isFetching, setIsFetching] = useState(false); // loading state
  // available places를 백엔드 API로부터 Fetch
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state
  const [error, setError] = useState(); // error state

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Faild to fetch places');
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

- `fetch` 함수를 사용해서 HTTP 요청을 보낼 때, 응답이 에러인지 확인할 수 있음
    - `response.ok` 가 true라면 성공적인 응답을 받았다는 것
        - true라면 200~300번 대의 상태 코드를 받음
        - false라면 400~500번 대의 상태 코드를 받음
    - 비동기 함수에 try-catch문을 사용하여 에러 핸들링
        - try 문에는 실패할 수도 있는 코드를 넣음
        - catch 문에는 에러가 발생했을 때 실행되어야 하는 코드를 정의
- 리액트 앱에서 에러를 다룬다는 것은 UI를 업데이트 하고 싶다는 뜻
    - 사용자에게 에러 메시지를 보여주고 싶다는 것
    - 에러를 위한 새로운 상태가 필요

## 9. Fetch된 데이터 반환

```jsx
// AvailablePlaces.jsx
import { useEffect, useState } from 'react';

import Error from './Error.jsx';
import Places from './Places.jsx';

import { sortPlacesByDistance } from '../loc.js';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  // fetch를 할 때는 아래의 3가지 상태를 기본으로 가짐
  const [isFetching, setIsFetching] = useState(false); // loading state
  // available places를 백엔드 API로부터 Fetch
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state
  const [error, setError] = useState(); // error state

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Faild to fetch places');
        }

        // 사용자 위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude)

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
```

- `fetch` 로 부터 받은 `resDate` 를 원하는 대로 사용 가능
    - 시간이 걸리는 `navigator` 와 같은 동작들도 수행 가능
- 주의해야 할 점
    - `navigator` 함수에서 `async await`을 사용하지 않고 콜백함수를 사용하기 때문에, `setIsFetcing` 을 부르는 위치를 바꾸고 false로 설정해야 함
    - 자바스크립트는 `setIsFetcing` 을 실행하는 데 `navigator` 함수의 콜백 함수가 올 때까지 기다리지 않음
    - 그러므로 `setIsFetcing` 를 불러오는 시점은 `position` 을 불러오는 함수를 실행하는 즉시가 됨
    - 결국 `setIsFetcing` 을 콜백함수 내부로 이동하고, 에러가 있다면 에러 핸들링 후 불러와야 함

## 10. 코드 추출 및 코드 구조 개선

```jsx
// http.js
export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Faild to fetch places');
  }

  return resData.places;
}

// AvailablePlaces.jsx
...
import { sortPlacesByDistance } from '../loc.js';

...

export default function AvailablePlaces({ onSelectPlace }) {
  ...

  // HTTP 요청을 보내 데이터가 준비되면 해당 상태를 업데이트
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        // 사용자 위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          ...
        });

      } catch (error) {
        ...
      }
    }

    fetchPlaces();
  }, []);

  ...

  return (
    ...
  );
}

```

## 11. POST 요청으로 데이터 전송

```jsx
// http.js
export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resData = await response.json();

  if(!response.ok) {
    throw new Error('Failed to update user data.');
  }

  return resData.message;
}

// App.jsx
...

import { updateUserPlaces } from './http.js';

function App() {
  ...
  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // 상태를 업데이트 한 후 HTTP 요청 보내기
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch(error) {
      // ...
    }
  }

  ...

  return (
    <>
      ...
    </>
  );
}

export default App;
```

- `fetch` 함수에서 기본적으로 HTTP 메서드는 `GET` 으로 설정되어 있기 때문에, 다른 메서드를 사용하기 위해서는 HTTP 메서드를 바꿔야 함
- `fetch` 함수의 두 번째 인수를 사용하여 HTTP 메서드 변경 가능
    - 두 번째 인수는 요청을 설정하는 함수
        - `method` 속성에 사용하고자 한 HTTP 메서드를 정의
        - `body` 속성을 꼭 추가하여 어떤 데이터가 요청 `body` 에 첨부되어야 하는지 정의

            → 이 데이터는 첨부될 수 있는 형식이어야 하는데, JSON 형식으로 변환되어야 함

            → `JSON.stringify()` 함수를 사용

        - `header` 속성을 추가하여 요청에 첨부될 추가 메타 데이터를 설정

            → Content-Type 헤더 추가하고 application/json 값을 주어, 백엔드에 이 요청에 첨부될 데이터가 JSON 형식이라고 알려줘야 함

            → 이 과정이 있어야 데이터가 성공적으로 백엔드로부터 추출되기 때문

- 백엔드는 특정 종류의 요청과 정확히 원하는 데이터만 받기 때문에, 잘 확인해야 함

    → `body: JSON.stringify({places})`


## 12. 최적의 업데이트 방법

```jsx
// App.jsx
import { useCallback, useRef, useState } from 'react';

import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import Error from './components/Error.jsx';
import Modal from './components/Modal.jsx';
import Places from './components/Places.jsx';

import { updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  // 에러가 발생하여 UI를 복구할 때 사용자에게 알려주기 위한 상태
  // 장소에 문제가 생겼을 때만 업데이트
  const [errorUpdationgPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // 아래와 같은 낙관적인 업데이트는 사용자들에게 더 나은 경험을 제공하기도 함
  // 로딩 문구나 스피너를 띄우는 것보다 더 좋을 수 있음
  async function handleSelectPlace(selectedPlace) {
    // 아래의 코드를 상태 업데이트 함수의 앞으로 옮겨서 장소를 업데이트 해도 됨
    // 그러면 이 상태 업데이트 함수는 해당 요청이 끝날 때까지 기다림
    // 이와 같이 사용하려면 로딩 문구나 스피너를 띄워야 함
    // 그렇지 않으면 사용자에게는 앱이 멈춘 것처럼 보일 것이기 때문
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // 상태를 업데이트 한 후 HTTP 요청 보내기
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch(error) {
      // 이전 setUserPlaces를 사용하여 새로 선택한 장소는 포함하지 않고, 에러가 발생했을 때 변동사항을 복구시키고 UI를 다시 업데이트 하게 함
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || 'Failed to update places.'});
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdationgPlaces} onClose={handleError}>
        {errorUpdationgPlaces && <Error title='An error occurred!' message={errorUpdationgPlaces.message} onConfirm={handleError} />}
      </Modal>
      ...
    </>
  );
}

export default App;

```

## 13. 데이터 삭제(DELETE HTTP 요청)

```jsx
// App.jsx
const handleRemovePlace = useCallback(async function handleRemovePlace() {
  setUserPlaces((prevPickedPlaces) =>
    prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
  );

  try {
    await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id));
  } catch (error) {
    setUserPlaces(userPlaces);
    setErrorUpdatingPlaces({message: error.message || 'Failed to delete places.'});
  }

  setModalIsOpen(false);
}, [userPlaces]);
```

## 14. 데이터 가져오기
```jsx
// http.jsx
export async function fetchUserPlaces() {
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to user places');
  }

  return resData.places;
}

// App.jsx
...

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  // 사용자가 저장한 장소를 불러오는 데에 사용할 3가지의 상태들
  const [isFetching, setIsFetching] = useState(false); // loading state
  const [error, setError] = useState(); // error state

  // 에러가 발생하여 UI를 복구할 때 사용자에게 알려주기 위한 상태
  // 장소에 문제가 생겼을 때만 업데이트
  const [errorUpdationgPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 사용자가 저장한 장소 불러오기
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({message: error.message || 'Failed to fetch user places.'});
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  ...

  ...

  return (
    <>
      ...
      <main>
        {error && <Error title='An error occurred!' message={error.message} />}
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText='Fetching your places...'
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}
        ...
      </main>
    </>
  );
}

export default App;
```
