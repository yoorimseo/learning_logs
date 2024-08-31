# React 패턴 및 모범 사례

## 1. Compound Components React Pattern(합성 컴포넌트 패턴) 소개

### 1) Compound Components이란?

- 스스로 동작하지 않는, 즉 독립적이지 않고 같이 동작하게 만들어져 있는 리액트 컴포넌트
- 이 패턴을 이해하려면 기본적으로 내장된 HTML 요소들을 살펴보는 것이 도움이 됨
  - 예) <select> 와 <option> 은 따로 사용하지 않고 같이 사용하여 드롭다운 메뉴를 만들 수 있음
    → 이 요소들을 합성 요소 또는 합성 컴포넌트라고 할 수 있음
- 함께 동작해야 하는 구성성이 높은 컴포넌트를 만들 때 유용한 패턴

### 2) 아코디언 컴포넌트 만들기

- 아코디언 컴포넌트
  - 페이지에 섹션이 있는데 여기에는 다양한 주제가 있고, 해당 주제들을 클릭하면 확장됨
  - 한 가지 요소를 열면, 열려있는 다른 요소들은 닫힌다는 특징
  - 그러므로 이 요소들은 서로에 대해 알아야 제어 가능
  - 그와 동시에 모든 요소들은 독립적이며 원하는 대로 스타일 할 수 있고, 요소에 전달하는 어떤 내용도 받을 수 있음

## 2. 컨텍스트 API로 멀티 컴포넌트 상태 관리하기

- 리액트의 context API의 도움을 받아, 아코디언 컴포넌트에 어떤 항목이 열릴지 제어하는 핵심 로직을 추가 가능
- 아코디언 컴포넌트에 아코디언 컨텍스트를 생성하는 이유
  - 전체 앱 어디에서든 사용할 수 있는 컨텍스트를 만드는 것이 아니라, 아코디언 컴포넌트와 직접적으로 연관된 컨텍스트를 만들 것이기 때문
- `contextValue` 를 모든 연관된 컴포넌트가 받아야 함
  - `contextValue` 와 연관된 컴포넌트는 물론 감싸는 아코디언 컴포넌트와 함께 동작하는 다른 아코디언 컴포넌트가 연관되어 있음을 의미

## 3. 컴파운드 컴포넌트 그룹화

```jsx
// Accordion.jsx
import { createContext, useContext, useState } from 'react';

import AccordionItem from './Accordion/AccordionItem';

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      'Accordion-related components must be wrapped by <Accordion>.'
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId: openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

// App.jsx
import Accordion from './components/Accordion';

function App() {
  return (
    <main>
      <section>
        <h2>Why work with us?</h2>
        <Accordion className='accordion'>
          <Accordion.Item
            id='experience'
            className='accordion-item'
            title='We got 20 years of experience'
          >
            <article>
              <p>You can&apos;t wrong with us.</p>
              <p>
                We are in the business of planning highly individualized
                vacation trips for more than 20 years.
              </p>
            </article>
          </Accordion.Item>
          <Accordion.Item
            id='local-guide'
            className='accordion-item'
            title="We're working with local guides"
          >
            <article>
              <p>We are not doing this along from our office.</p>
              <p>
                Instead, we are working with local guides to ensure a safe and
                pleasant vacation.
              </p>
            </article>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  );
}

export default App;
```

- 합성 컴포넌트를 만들 경우, 일반적으로 모든 컴포넌트 식별자를 하나의 객체에 합칠 수 있음
  - 메인 wrapping 함수 객체에 모든 다른 식별자를 합침
  - JS에서 함수는 객체의 값으로 함수 객체와 메서드를 추가할 수 있기 때문

## 4. Render Props(렌더 프롭) 패턴 소개 및 사용하기

### 1) Render Props 패턴의 핵심 개념

- 함수를 값으로 children prop에 전달
- 함수를 정의하는 컴포넌트의 함수는 렌더링 가능한 것을 반환해야 하는데, 이 함수가 children prop의 값으로 전달됨
  - 컴포넌트 태그 사이에서 다른 컴포넌트가 전달받은 함수의 호출 결과를 반환

### 2) 검색 가능한 목록 컴포넌트 만들기

- 검색 입력 필드가 나타나는 컴포넌트
  - 해당 목록에 전달된 항목들을 검색하는 로직이 포함되어야 함
  - 다른 종류의 데이터에 사용될 수 있어야 하고, 검색 로직만 포함해야 함

## 5. 렌더 프롭을 사용하여 검색 기능 구현하기

```jsx
// SearchableList.jsx
import { useState } from 'react';

export default function SearchableList({ items, children }) {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className='searchable-list'>
      <input type='search' placeholder='Search' onChange={handleChange} />
      <ul>
        {searchResults.map((item, index) => (
          <li key={index}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}

// App.jsx
import Accordion from './components/Accordion/Accordion';
import SearchableList from './components/SearchableList/SearchableList';
import SearchableList from './components/SearchableList/Place';

import savannaImg from './assets/african-savanna.jpg';
import amazonImg from './assets/amazon-river.jpg';
import caribbeanImg from './assets/caribbean-beach.jpg';
import desertImg from './assets/desert-dunes.jpg';
import forestImg from './assets/forest-waterfall.jpg';

const PLACES = [
  ...
];

function App() {
  return (
    <main>
      <section>
        ...
      </section>
      <section>
        <SearchableList items={PLACES}>
          {(item) => <Place item={item} />}
        </SearchableList>
        <SearchableList items={['item 1', 'item 2']}>
          {(item) => item}
        </SearchableList>
      </section>
    </main>
  );
}

export default App;
```

- children이 함수가 되어 item을 전달하면, 이 함수가 모든 항목에 실행되어 명확한 JSX 코드를 반환하여 특정 항목이 렌더링 됨
- children prop은 함수로 호출되는데, 이것은 JSX 코드 안에서 호출하고 있기 때문에 함수의 결과가 렌더링될 수 있는 것이라면 허용됨
- 즉, 렌더 프롭 패턴은 값으로 함수를 전달하는데, 위의 경우 children prop으로 전달한 것
  - 그러므로 children prop을 받는 컴포넌트는 그 안에서 children prop을 통해 받은 함수를 사용하여 콘텐츠를 렌더링할 수 있음

## 6. 동적으로 키 처리하기

```jsx
<section>
  <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
    {(item) => <Place item={item} />}
  </SearchableList>
  <SearchableList items={['item 1', 'item 2']} itemKeyFn={(item) => item}>
    {(item) => item}
  </SearchableList>
</section>
```

- `itemKeyFn` 함수를 컴포넌트로 전달해서 렌더 프롭 패턴을 사용
- `itemKeyFn` 함수는 JSX 코드를 렌더링 하기 위해 사용되지 않고, 중복되지 않는 키를 얻기 위해 사용

## 7. Debouncing(디바운싱) 작업하기

### 1) 디바운싱이란?

- 키보드를 누를 때마다 상태를 갱신하지 않고, 특정 시간 임계값을 정의해서 사용자가 특정 시간 동안 입력을 멈추면 갱신하게 할 수 있는 기술
  - 즉, 사용자가 전체 단어를 입력한다면 모든 글자마다 검색 결과를 갱신하지 않음

### 2) 디바운싱 사용하기

```jsx
import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleChange(event) {
    // 현재 진행 중인 타이머가 있다면 비우고, 새 타이머를 시작
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null; // 타이머가 만료되면 타이머 id를 수동으로 삭제하여, 저장된 타이머 식별자 비우기
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className='searchable-list'>
      <input type='search' placeholder='Search' onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
```

- 입력창에 계속 입력하기만 하면 아무 일도 일어나지 않고, 입력을 멈추면 filter 가 적용되어 결과 확인 가능
