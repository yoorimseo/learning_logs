# 리액트 쿼리 / Tanstack 쿼리 : 간단하게 HTTP 요청 처리

## 1. 리액트 쿼리 : 소개 및 이점

### 1) Tanstack 소개

[TanStack Query](https://tanstack.com/query/latest)

- 이전에는 리액트 쿼리라고 하던 서드파티 리액트 라이브러리
  - 이 라이브러리를 사용하면 리액트 앱 내부에서 HTTP 요청을 간편하게 보낼 수 있음
    - 리액트 프론트엔드를 백엔드에 연결하기가 수월
  - Tanstack 쿼리는 다양한 기능을 가진 매우 강력한 패키지

### 2) Tanstack이란?

- Tanstack 쿼리는 HTTP 요청을 전송하고, 프론트엔드 사용자 인터페이스를 백엔드 데이터와 동기화된 상태로 유지하는 데 이용하는 라이브러리
  - 이러한 작업에 반드시 Tanstack 쿼리가 필요하지 않다는 것
  - `useEffect`나 `fetch` 함수로도 위와 같은 작업을 할 수 있음
- Tanstack 쿼리를 이용하면 코드가 매우 간결해지고, 개발자로서 훨씬 수월하게 작업 가능
  - 여러가지 고급 기능이 기본적으로 내장되어 있기 때문
  - 복잡한 리액트 앱을 빌드하려면 이 기능들이 필요하지만, 직접 빌드하려면 꽤 어렵고 까다로움
- `useEffect`나 `fetch` 함수를 사용했을 때의 단점
  - 많은 양의 코드를 작성해야 함
    - `useEffect` 훅을 작성해서 데이터를 가져오고, 여러가지 상태를 트리거하고 설정해야하며, 이러한 상태를 모두 관리해야 함
    - HTTP 요청을 전송할 모든 컴포넌트에서 위와 같이 작성해야 함
    - useHTTP라는 커스텀 훅을 만들어 빌드하면, 이러한 코드들을 간소화하고 재사용할 수 있지만, 섬세한 작은 기능들을 혼자서 처음부터 구현해야 함

### 3) Tanstack 쿼리의 이점

- 상태 관리를 비롯해 긴 코드를 작성할 필요가 없음
- 캐시 처리, 자체적으로 처리되는 데이터 가져오기 뿐만 아니라 앱을 좀 더 효율적으로 만들어줄 모든 기능을 이용할 수 있음

## 2. Tanstack 쿼리를 설치하고 사용하는 방법과 유용한 이점

### 1) Tanstack 쿼리 설치하기

```jsx
npm install @tanstack/react-query
```

### 2) Tanstack 쿼리 사용하기

```jsx
// http.js
// 데이터 가져오기를 제어하는 모든 코드를 이곳에 담는 것이 목적
export async function fetchEvents() {
  const response = await fetch('http://localhost:3000/events');

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

// NewEventsSection.jsx
...
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    quernFn: fetchEvents, // fetchEvents를 이용하여 데이터를 가져옴
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='new-events-section'>
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
```

- Tanstack 쿼리는 HTTP 요청을 전송하는 로직이 내장되어 있지 않고, 해당 요청을 관리하는 로직을 제공
  - 요청과 관련된 데이터와 발생 가능한 오류를 추적하는 역할 등을 함
  - 요청을 전송하는 코드는 직접 작성해야 함
- `useQuery`
  - HTTP 요청을 전송하고, 필요한 데이터를 가져오고, 로딩 상태에 대한 정보를 제공
  - 요청 전송 중에 발생한 오류를 알 수 있음
  - Promise를 반환하는 함수를 필요로 하기 때문에 객체 안의 값으로 `queryFn` 을 받음
  - `queryFn`
    - 실제 요청을 전송할 때 실행할 실제 코드를 정의하는 함수
  - `queryKey`
    - `useQuery` 를 사용할 때 모든 쿼리와 전송하는 모든 fetch 요청 즉, 전송하는 모든 GET HTTP 요청에는 쿼리 키가 존재
    - Tanstack 쿼리는 내부에서 이 쿼리 키를 이용해 요청으로 생성된 데이터를 캐시 처리 함
      → 나중에 동일한 요청을 전송하면, 이전 요청의 응답을 재사용할 수 있음
      → 리액트 쿼리에서 데이터를 저장하고 재사용하는 기간을 구성할 수 있음
      → 이를 통해 이미 있는 데이터라면 매번 다시 가져올 필요가 없기 때문에, 사용자에게 데이터를 더 빨리 제공할 수 있게 해줌
    - 이 키는 배열로 되어 있고, 리액트 쿼리는 내부적으로 저장
      → 유사한 값으로 이루어진 유사한 배열을 사용할 때마다 리액트 쿼리는 이 배열을 확인하고, 기존 데이터를 재사용
- `useQuery` 가 실행되면 객체를 얻을 수 있는데, 구조분해를 이용해 중요한 요소들을 추출 가능
  - 쿼리 실행이 완료되면 `data` 프로퍼티에 값으로 전달됨 → `data`
  - 요청이 전송되어야 하고 응답이 있을 때까지 기다려야 하므로, 즉각적으로 이루어지지는 않음 → `isPending`
  - 오류가 발생하거나 서버에 문제가 있을 수 있기 때문에, 응답으로 받은 결과가 반드시 데이터인 것은 아님 → `isError`
  - `data` : 커스텀 fetch 함수를 통해 반환된 실제 응답 데이터가 값
  - `isPending` : 요청이 여전히 실행 중인지 응답을 받았는지 알려줌
  - `isError` : 오류로 응답을 받은 경우 true
  - `error` : 발생한 오류에 대한 정보
  - `refetch` : 동일한 쿼리를 다시 전송할 수 있는 함수
  - 이 외에도 다양한 `boolean` 값을 이용해 여러가지 데이터를 해당 객체에서 추출 가능
- 리액트 쿼리와 `useQuery` 훅을 이용하려면, 이러한 기능을 사용할 컴포넌트를 Tanstack 쿼리가 제공하는 provider 컴포넌트로 wrapping 해야 함

  ```jsx
  const queryClient = new QueryClient();

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  }

  export default App;
  ```

## 3. 쿼리 동작 이해 및 구성 - 캐시 및 만료된 데이터

### 1) 캐시 처리

- 리액트 쿼리는 응답 데이터를 캐시 처리 함
- `useEffect` 나 `fetch` 를 사용했을 때 다른 페이지로 갔다가 다시 돌아오면 새 요청을 전송해서 모든 데이터를 다시 가져왔어야 했음
- 리액트 쿼리를 사용하면 데이터가 즉각적으로 제공됨
  - 이 요청이 빠르게 실행되는 이유는 로컬에서 작업 중이기 때문
    → 요청 속도가 느린 경우에도 데이터는 즉시 표시됨
  - 자체적으로 다른 요청이 전송되었지만, 이 요청의 용도가 데이터를 즉시 표시하기 위한 것은 아님
  - 리액트 쿼리는 요청을 통해 얻은 응답 데이터를 캐시 처리하고, 나중에 동일한 쿼리 키를 가진 다른 `useQuery` 가 실행되면 이 데이터를 재사용하는 것
    - 그래서 사용자가 어떤 페이지로 다시 이동해서 해당 컴포넌트 함수가 다시 실행되면, 리액트 쿼리는 이 쿼리 키가 이전에 이미 사용되었고 이 키의 데이터 캐시 처리한 것을 확인하기 때문에 데이터를 즉시 제공할 수 있는 것
    - 이와 동시에 내부적으로 이 요청을 다시 전송해서 업데이트된 데이터가 있는지 확인하고, 업데이트된 데이터가 있다면 이 데이터로 자체적으로 교체
      → 데이터를 가져오는 데 시간이 걸릴 수 있지만, 화면에는 업데이트된 데이터가 표시됨
      ⇒ 즉각적인 결과와 업데이트 된 데이터가 내부적으로 처리되는 요청을 통해 실현됨
- 개발자가 리액트 쿼리를 이용할 때, `staleTime` 을 사용하여 위와 같은 동작의 실행 여부를 제어할 수 있음

  ```jsx

  ```

  - `staleTime` : 캐시에 데이터가 있을 때 업데이트된 데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 기다릴 시간을 설정
    - 기본 값은 0으로, 기본적으로 캐시의 데이터를 사용하지만 업데이트된 데이터를 가져오기 위한 자체적인 요청을 항상 전송
    - 5000으로 설정하면, 5000ms 동안 기다린 후에 추가 요청을 보냄
      → 5초 안에 다시 컴포넌트를 렌더링하고 동일한 요청을 전송해야 할 경우, 리액트 쿼리는 요청을 전송하지 않음
    - `staleTime` 을 설정하면 불필요한 요청 전송을 방지할 수 있음
  - `gcTime`
    - 가비지 수집 시간을 의미
    - 데이터와 캐시를 얼마나 오랫동안 보관할지를 제어
    - 기본 값은 5분
    - 30000으로 설정하면, 30초 동안 보관된 후 폐기됨
      → 해당 시간 후에 컴포넌트를 다시 렌더링하면 캐시된 데이터가 없기 때문에 리액트 쿼리가 데이터를 표시하려면 데이터를 가져오기 위한 새 요청을 전송해야 함

## 4. 동적 쿼리 함수 및 쿼리 키

```jsx
// http.js
// 데이터 가져오기를 제어하는 모든 코드를 이곳에 담는 것이 목적
export async function fetchEvents(searchTerm) { // searchTerm 추가
  let url = 'http://localhost:3000/events';

  if (searchTerm) {
    url += '?serach=' + searchTerm;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

// FindEventSection.jsx
...

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }], // NewEventsSection에서 사용한 쿼리 키와 다른 값을 사용해야 함
    queryFn: () => fetchEvents(searchTerm),
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='all-events-section'>
      <header>
        ...
        </form>
      </header>
      {content}
    </section>
  );
}
```

## 5. 쿼리 구성 객체 및 요청 취소

```jsx
// http.js
// 데이터 가져오기를 제어하는 모든 코드를 이곳에 담는 것이 목적
export async function fetchEvents({ signal, searchTerm }) {
  console.log(searchTerm);
  let url = 'http://localhost:3000/events';

  if (searchTerm) {
    url += '?serach=' + searchTerm;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

// FindEventSection.jsx
...

export default function FindEventSection() {
  ...

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }], // NewEventsSection에서 사용한 쿼리 키와 다른 값을 사용해야 함
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  });

  ...

  return (
    ...
  );
}

```

- 리액트 쿼리는 쿼리 함수에 기본적으로 데이터를 전달함
  - `queryFn` 에 할당된 함수를 전달하게 됨
    - 이때 전달된 데이터는 쿼리에 사용된 쿼리 키와 신호에 대한 정보를 제공하는 `signal` 객체
  - `signal`
    - 요청을 취소할 때 필요
      예) 요청을 완료하기 전에 사용자가 페이지에서 나가는 경우
  - 이러한 `signal`을 제공하고 데이터를 가져오는 함수에 필요한 쿼리 키를 제공하기 위해, 리액트 쿼리는 쿼리 함수로 정의된 함수를 객체에 전달
  - 따라서 `fetch` 함수에서 `signal` 객체를 받아야 함
    - 요청 전송이 취소된다는 것을 파악할 수 있음
      예) 사용자가 페이지에서 벗어나면, 리액트 쿼리는 전송 중인 요청을 취소하려 할 것
      이 경우, `signal` 을 `fetch` 함수에 두 번째 인자로 구성 객체를 추가

## 6. 쿼리 활성화 및 비활성화

```jsx
const { data, isPending, isError, error } = useQuery({
  queryKey: ['events', { search: searchTerm }], // NewEventsSection에서 사용한 쿼리 키와 다른 값을 사용해야 함
  queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  enabled: searchTerm !== '',
});
```

- 검색어를 입력하지 않은 경우 `FindEventSection` 에 정의한 쿼리를 검색어를 입력할 때까지 이 쿼리를 비활성화 하여, 해당 컴포넌트로 전송하지 않도록 하는 것이 좋음
- 요청이 즉시 전송되지 않도록 하는 것은 일반적으로 사용하는 요구사항
- 쿼리에 `enabled` 속성을 추가하여 false로 설정하면, 쿼리가 비활성화 되고 요청이 전송되지 않음
  - 요청이 전송되는 true 가 기본 설정
- 애초에 입력창이 비어있을 때와 사용자가 검색어를 지워서 비어있을 때의 차이가 있어야 함

  ```jsx
  const [searchTerm, setSearchTerm] = useState();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { search: searchTerm }], // NewEventsSection에서 사용한 쿼리 키와 다른 값을 사용해야 함
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });

  ...

  if (isLoading) {
    content = <LoadingIndicator />;
  }
  ```

  - 사용자가 검색어를 입력했다가 지운 경우 : 모든 이벤트를 표시
    → 사용자가 모든 이벤트를 보려고 한 것이기 때문
  - 처음 : 이벤트가 표시되지 않아야 함
  - `isLoading` : 쿼리가 비활성화 됐다고 해서 true가 되지 않음

## 7. 변형을 사용하여 데이터 변경

- 리액트 쿼리를 사용하여 새 이벤트 생성과 같이 데이터를 전송하는 것도 가능
- `useQuery` 는 데이터를 가져올 때만 사용

```jsx
// http.js
export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

// NewEvent.jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
});

function handleSubmit(formData) {
  mutate({ event: formData });
}

...
return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            ...
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title='Failed to create event'
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
```

- `useMutation`
  - 데이터를 전송하고 POST 요청을 전송하기 위해 사용
    - 데이터를 변경하는 쿼리에 최적화
    - 해당 컴포넌트가 렌더링될 때 요청이 즉시 전송되지 않고 필요할 때만 전송되도록 할 수 있음
  - 구성 객체를 사용
    - `mutationFn`
    - `mutationKey` : 변형은 응답 데이터를 캐시 처리하지 않기 때문에 반드시 필요하지는 않음
      → 변형의 목적은 주로 백엔드에서 변경을 적용하는 것이지, 프론트엔드에서 데이터를 가져오고 저장하는 것이 아니기 때문
  - 구성 객체로부터 얻는 값
    - `data` : 전송된 요청의 응답으로 반환된 데이터
    - `mutate` : 요청을 언제 실행할 것인지를 지정하는 함수

## 8. 추가 데이터 가져오기 및 변형 테스트하기

```jsx
// http.js
export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

// EventForm.jsx
...

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ['events=images'], // 사용자 입력에 따라 달라지지 않으므로 하드코딩
    queryFn: fetchSelectableImages,
  });

  ...

  return (
    <form id='event-form' onSubmit={handleSubmit}>
      ...

      {isPending && <p>Loading selectable images...</p>}
      {isError && (
        <ErrorBlock
          title='Failed to load selectable images'
          message='Please try again later'
        />
      )}
      {data && (
        <div className='control'>
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      ...
    </form>
  );
}
```

## 9. 변형 성공 시 동작 및 쿼리 무효화

### 1) 변형이 성공할 때까지 페이지에 머무르게 하기

```jsx
// NewEvent.jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
  onSuccess: () => {
    navigate('./events');
  },
});
```

- `handdleSubmit` 에 `navigate()` 를 실행한다면, 변형의 성공 여부와 상관없이 항상 페이지를 나가게 됨
  → 실패한 경우 오류 메시지가 표시되어야 함
- 리액트 쿼리를 사용하여 페이지를 나가기 전에 변형이 완료될 때까지 기다리기도 가능
  - 요청이 완료될 때까지 화면을 닫지 않는 것
  - `useMutation` 에 `onSuccess` 속성을 사용하여 함수를 값으로 넣어줄 수 있음
    - 이 함수는 변형이 성공하면 실행되고, 변형이 성공한 경우에만 해당 함수 코드가 실행됨
    - 변형이 실제로 성공할 때까지 해당 페이지에 있기 때문에 오류를 볼 수 있음

### 2) 쿼리 무효화 하기

- 새 이벤트를 추가하면 다른 페이지에 갔다가 다시 돌아와야 추가된 것을 확인할 수 있음
  - 이전에 가져온 데이터가 만료됐다고 표시하고 다시 가져오도록 트리거 해야 함
  - 리액트 쿼리에서 제공하는 메서드를 이용해 하나 이상의 쿼리르 무효화 하여 해결할 수 있음
    - 그러면 쿼리에 연결된 데이터가 오래 되서 다시 가져와야 한다는 것을 리액트 쿼리에 알려줄 수 있음
- App.js에 `QueryClient`로 얻은 객체를 이용해서 쿼리를 무효화 할 수 있음
  ```jsx
  const navigate = useNavigate();
  ...
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('./events');
    },
  });
  ```
  - `QueryClient` 를 여러 파일에서 import 할 수 있게 하기 위해 http.js에 추가
  - `invalidateQueries`
    - 현재 화면에 표시된 컴포넌트와 관련된 쿼리가 실행된 경우, 특정 쿼리로 가져왔던 데이터가 오래 됐으니 만료로 표시하고 즉시 다시 가져오기를 트리거 해야 한다고 리액트 쿼리에게 알려줌
    - 특정 쿼리를 대상으로 하기 위해 객체를 입력으로 사용
      → 여기에 대상의 쿼리 키를 정의해야 하는데, 모든 쿼리에서 사용 중인 형식(이 코드에서는 배열) 과 동일해야 함
      → 여기에 정의하는 쿼리 키 값이 포함된 쿼리 키는 무효화 함
    - `exact` 속성을 true로 설정하면 해당 키와 정확히 일치하는 쿼리만 무효화 됨
      → 우리 코드에서는 쿼리 키는 가져올 데이터를 설명하는 것이어야 하기 때문에, events를 포함하는 모든 쿼리를 무효화하는 것이 적절

## 10. 무효화 후 자동 다시 가져오기 비활성화

```jsx
const { mutate } = useMutation({
  mutationFn: deleteEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['events'],
      refetchType: 'none',
    });
    navigate('./events');
  },
});
```

- `useMutation` 구성 객체에 있는 `onSuccess` 의 익명 함수에서 `refetchType` 추가
- `refetchType`
  - `none` 으로 설정하면, `invalidateQueries` 를 호출할 때 기존 쿼리가 즉시 자동으로 다시 트리거되지 않도록 함
    - 대신 기존 쿼리는 무효화되고 다음 번에 요청될 때 다시 실행
      → 하지만 즉시 다시 트리거되지는 않은

## 11. Optimistic Updating(낙관적 업데이트)

### 1) 목적

- 백엔드의 응답을 기다리지 않고 UI가 즉시 업데이트 되도록 하기 위함
- 백엔드가 실패하거나 업데이트다 어떤 이유로든 실패하는 경우, 실행된 낙관적 업데이트를 롤백
- `useMutation` 에 새 프로퍼티를 추가하여 구현 가능

### 2) 구현

```jsx
const { mutate } = useMutation({
  mutationFn: updateEvent,
  onMutate: async (data) => {
    // mutate 함수로 실행된 데이터 가져오기
    const newEvent = data.event;

    // 특정 키의 활성된 모든 쿼리를 취소
    await queryClient.cancelQueries({ queryKey: ['events', params.id] });
    // 데이터를 업데이트하기 전에 롤백하기 위함
    const previousEvent = queryClient.getQueryData(['events', params.id]);

    // 응답을 기다리지 않고 내부적으로 수정하는 방법
    queryClient.setQueryData(['events', params.id], newEvent);

    return { previousEvent };
  },
  onError: (error, data, context) => {
    queryClient.setQueryData(['events', params.id], context.previousEvent);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['events', params.id]);
  },
});
```

- `onMutate`
  - 함수를 값으로 받음
  - `mutate` 를 호출하는 즉시 실행
    - `mutate` 의 프로세스가 완료되고 응답을 받기 전에 실행됨
  - 리액트 쿼리에 의해 캐시된 데이터를 업데이트
  - `queryClient.setQueryData` 를 호출하여, 응답을 기다리지 않고 이미 저장된 데이터를 수정할 수 있음
    - 일반적으로는 캐시되는 새 응답을 받을 때마다 리액트 쿼리에서 수정하는데, 해당 함수를 호출하여 직접 저장된 데이터를 수정할 수 있음
    - 첫 번째 인자 : 편집하려는 쿼리 키
    - 두 번째 인자 : 해당 쿼리 키 아래에 저장하려는 새 데이터
  - `cancelQueries` : 해당 키에 대해 나가는 쿼리가 있는 경우, 해당 쿼리가 취소되도록 할 수 있음
    - 그러면 해당 쿼리의 응답 데이터와 낙관적으로 업데이트 된 쿼리 데이터가 충돌하지 않음
    - cancelQueries는 promise를 반환하기 때문에 aysnc와 await을 추가해야 함
  - `getQueryData` : 현재 저장된 쿼리 데이터를 가져옴
    - 데이터를 가져오려는 쿼리의 키가 필요
- `onError`
  - 업데이트 변형이 실패할 경우에 실행할 함수가 필요
  - 리액트 쿼리에서 자동으로 전달되는 몇 가지 입력을 간단하게 수신
    - `error` , `data` , `context`
      → `context` 객체에 `previousEvent` 가 포함되도록 하려면, `onMutate` 에서 해당 값이 반환되어야 함
- `onSettled`
  - 값으로 함수가 필요
  - 성공 여부와 상관없이 mutation이 완료될 때마다 호출됨
  - 백엔드에 있는 것과 동일한 데이터가 프론트엔드에 있는지 확인하기 위해 `queryClient.invalidateQueries` 를 사용하여 무효화 진행
  - 낙관적 업데이트를 실행하고 오류가 발생하면, 롤백하더라도 해당 mutation이 완료될 떄마다 여전히 백엔드에서 최신 데이터를 가져왔는지 확인 가능
    - 그러면 백엔드에서 다른 작업을 실행하여 데이터가 백엔드와 프론트엔드 간에 동기화되지 않은 경우, 리액트 쿼리에 데이터를 내부적으로 다시 가져오도록 강제하여 다시 동기화 함

## 12. 리액트 쿼리와 리액트 라우터

- `useIsFetching`
  - 리액트 쿼리가 앱 어딘가에서 데이터를 가져오는지 확인할 수 있는 값을 얻을 수 있음
    - 리액트 쿼리가 현재 앱에서 데이터를 가져오지 않으면 0
    - 리액트 쿼리가 현재 앱에서 데이터를 가져오면 더 높은 숫자가 됨
