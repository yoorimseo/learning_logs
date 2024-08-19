# 리액트의 핵심 - 심화 단계

## 1. JSX를 꼭 사용하지 않아도 되는 이유

### 1) JSX의 빌드 과정

- 개발 환경 뒤에서 실행되며, 코드를 변환하고 최적화하여 브라우저에서 사용 가능하도록 함
- 이론 상으로는 JSX의 도움 없이 리액트 앱을 빌드할 수 있음

  → 리액프 프로젝트의 빌드에 JSX는 굳이 필요하지 않지만, JSX는 편의성이 좋음

### 2) JSX 코드를 대체하여 컴포넌트로 반환하기

```jsx
// 원본 코드
<div id="content">
 <p>Hello World!</p>
</div>

// 변환 코드
React.createElement(
 'div',
 {
  id: "content",
  React.createElement(
   'p',
   null,
   "Hello World!"
  )
 }
);
```

- 리액트에서 노출한 `createElement` (요소 생성) 메서드를 사용하여 변환

  - `createElement` 메서드는 컴포넌트 타입을 가장 먼저 생성되어야 하는 첫 인수로 지정
  - 그 다음 props 객체를 지정해, 해당 컴포넌트 혹은 요소에 값을 전달할 수 있게 됨
  - 그러고나서 child 요소를 세 번째 인수로 지정

    ⇒ 어떤 콘텐츠가 컴포넌트의 시작 태그와 종료 태그 사이에 들어갈지 제어가 가능

- 이것이 만드는 구조는 위의 HTML 코드와 동일
- 만약 빌드 과정이 없는 프로젝트를 원한다면, 위와 같이 JSX를 사용하지 않는 접근 방식을 사용할 수 있음
- 그러나 빌드 과정을 포함하는 프로젝트를 만드는 것이 어렵지 않으므로, JSX를 사용하는 접근 방식이 더 사용하기 쉽고 가독성이 훨씬 뛰어남

  → JSX를 사용하지 않으면 상대적으로 장황하고 직관저이지 않기 때문

### 3) JSX를 사용하지 않는 방법으로 index.jsx 파일 수정하기

```jsx
import React from "react"; // 추가한 코드
import ReactDom from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
// ReactDOM.createRoot(entryPoint).render(<App />);
ReactDOM.createRoot(entryPoint).render(React.createElement(App); // 추가한 코드
```

- 이렇게 작성하면 화면 상으로는 이전과 같은 앱이 보이고 에러도 없다고 뜸

  → 위의 코는 JSX 코드의 유효한 대안이기 때문

## 2. Fragments(프래그먼트) 사용법

### 1) 컴포넌트 함수에서 반환되는 값에 대해 알아보기

- JSX 표현식은 하나의 상위 혹은 부모 요소를 가지고 있어야 함

  - return 문은 하나의 요소를 반환해야 함

    → 그렇지 않고 형제 요소들을 반환한다면 에러 발생

- 자바스크립트에서는 값을 두 개 이상 반환하려면, 괄호로 감싸거나 여러 줄로 반환문을 작성한다고 해서 되지 않음

  → 그러므로 이것은 유효하지 않은 자바스크립트 코드

  → 자바스크립트는 두 개 이상의 값이 아닌 하나의 값만 반환할 수 있기 때문

- JSX 코드의 두 조각 또한 결국에는 두 개의 값이라고 볼 수 있음

  ```jsx
  function App() {
    return (
      <Header />
      <main>
        ...
      </main>
    );
  }
  ```

- JSX 코드는 단순화된 요약본(syntactic sugar)에 가까움
- 결국, 하나의 값만을 반환하기 위해 형제 요소들을 감싸는 부모 요소가 존재해야 하는 것

  → 여기서 부모 요소는 모든 형제 요소들의 값을 감싸는 객체 혹은 배열로 생각할 수 있음

- 부모 요소로 감싸야 한다는 한계점으로 인해, DOM 구조에는 div 요소가 두개 생길 수 밖에 없음

  ```jsx
  <div id='root'>
    <div>
      <header> ... </header>
      <main> ... </main>
    </div>
  </div>
  ```

  - 이것 자체로는 큰 문제가 되지 않지만, DOM에 중복되는 요소가 있다는 것은 불필요한 내용
  - 그렇기 때문에 리액트가 제안한 대안이 Fragments(프래그먼트) 컴포넌트를 사용하는 것

### 2) Fragments(프래그먼트)

- root 컴포넌트가 필요한 경우, 형제 컴포넌트를 감싸는 용도로 사용 가능

  → 하지만 화면 상으로 보이는 실제 요소를 렌더링하면 안됨

- 이전 버전

  ```jsx
  import { Fragment } from 'react';

  function App() {
    return (
      <Fragment>
        <Header />
        <main>...</main>
      </Fragment>
    );
  }
  ```

  - 위와 같이 사용하고 개발자 도구를 열어 확인하면, 불필요한 div가 없다는 것을 확인 가능

- 최신 버전

  ```jsx
  function App() {
    return (
      <>
        <Header />
        <main>...</main>
      </>
    );
  }
  ```

  - 이러한 빈 태그는 대다수의 리액트 프로젝트에서 사용 가능
  - 이 빈 태그는 fragment에 대한 대안으로, 리액트에서 사용 가능

## 3. 컴포넌트를 분리해야 할 때는 언제일까?

### 1) App.jsx의 예시를 통해 알아보자

- App 컴포넌트에서 다양한 책임이 발생하게 되는 이유

  - state를 사용하여 상호작용 가능한 부분을 관리
  - 데이터 파일(data.js)에서 coreConcept 데이터를 가져옴
  - 해당 컴포넌트의 역할이 coreConcept 섹션 및 아이템 모두를 렌더링
  - Examples 컴포넌트의 TabButton 컴포넌트 관리와 화면 하단의 상호작용 가능한 부분 담당

    ⇒ 이 모든 것을 App 컴포넌트가 관리하고 있기 때문!

    ⇒ 단 하나의 컴포넌트를 가지고 위와 같이 다양한 요소를 관리하고 있다면 더 작게 나눠주는 것이 좋음

    → 더 작은 단위의 하위 컴포넌트를 여러 개로 나누는 것이 좋음

- 또한, Examples의 탭 버튼을 클릭할 때마다 상단의 텍스트가 바뀌는 것을 확인할 수 있음

  - 이러한 현상이 생기는 이유는, selectedTopic이라는 state를 제어하고 있기 때문
    - 이 상태가 업데이트 될 때마다 해당 상태를 업데이트 하는 함수 즉, App 컴포넌트 함수가 매번 재실행되기 때문
    - App 컴포넌트 함수가 재실행되면, 리액트가 JSX 코드에 어떤 변화가 생겼는지 확인하고 화면 상으로 보이는 내용을 업데이트 하게 됨
  - 위와 같은 상황 때문에 Header 컴포넌트도 마찬가지로 재실행되어 상단의 텍스트가 바뀌는 것

    → Header 컴포넌트는 App 컴포넌트에 속해 있고, 재실행되는 시점은 App 컴포넌트 함수가 재실행될 때임

  - 상태를 관리하는 데 있어, selectedTopic의 상태 관리가 잘못된 컴포넌트 안에서 이루어지고 있을 가능성이 있다는 뜻

- 추가 컴포넌트가 들어갈 만한 위치를 잘 파악하는 것 뿐만 아니라, 큰 컴포넌트를 더 작은 컴포넌트로 잘게 쪼개게 되면 책임을 나눌 수 있으므로 아주 중요한 부분

## 4. Feature(기능) 및 State(상태)로 컴포넌트 분리하기

### 1) Feature(기능)에 따라 컴포넌트 분리하기

```jsx
// App.jsx
import Header from './components/Header/Header.jsx';
import CoreConcepts from './CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </>
  );
}

export default App;
```

- App.jsx는 section에 따라 기능이 분리되어 있음
- 다양한 기능을 다양한 컴포넌트에 배분하는 것은 모든 리액트 프로젝트에 있어서 아주 좋은 전략
- 우리의 목표는 App 컴포넌트를 간결하게 만드는 것

  - 다양한 기능들을 App 컴포넌트 파일 바깥에서 가져와서 각각의 컴포넌트에 넣으려고 하는 것
  - 규모가 큰 리액트 프로젝트의 경우, 코드를 다양한 컴포넌트로 나누어두면 리액트 개발이 훨씬 쉬워지고 프로젝트 관리가 더 쉬워짐

    ⇒ 이제 Examples의 탭을 클릭했을 때, 상단의 텍스트가 변하지 않음을 확인할 수 있음

    → 그 이유는 selectedTopic 상태가 Examples 컴포넌트에 포함되어 있기 때문

    → 그러므로 selectedTopic 상태가 변할 때마다 App 컴포넌트 함수가 아닌 Examples 컴포넌트 함수가 새로고침이 됨

## 5. 문제: 내부 요소에 Props(속성)이 전달되지 않을 경우

### 1) 같은 구조를 사용할 때, 이것도 컴포넌트화 가능

- 앱의 규모가 커지면 커질수록 더 많은 section을 사용하게 됨

  - 대부분의 경우, 비슷한 구조를 사용하게 됨

    → 이 부분도 컴포넌트를 만들어 사용 가능

    ```jsx
    export default function Section({ title, children }) {
      return (
        <section>
          <h2>{title}</h2>
          {children}
        </section>
      );
    }
    ```

### 2) 구조를 컴포넌트화 했을 때 prop이 적용되지 않는 문제

```jsx
// Section.jsx
export default function Section({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// Examples.jsx
...
import Section from './Section.jsx';

export default function Examples() {
  ...

  return (
    <Section
      title='Examples'
      id='examples'
    >
      ...
    </Section>
  );
}
```

- prop와 attribute(속성)은 같은 의미
  - prop들은 커스텀 컴포넌트를 설정할 때, 자동으로 적용되거나 해당 컴포넌트 속 JSX 코드로 넘어가지 않음
  - 이 경우 id prop을 커스텀 Section 컴포넌트로 설정하여 Examples.jsx에 저장했지만, 자동으로 적용되거나 컴포넌트의 속성으로 여겨지지 않음
    → prop이 자동으로 연동되지 않는 것
- 리액트에서는 요소에 대한 props가 개발자가 설정하는 대로만 적용됨
  → 즉, 따로 작성하지 않았는데 자동으로 적용되는 일은 없다는 것

### 3) prop을 적용할 수 있는 해결 방법

- 매번 속성에 대해 구조분해할당을 사용하여 직접 적용하기
  ```jsx
  export default function Section({ title, id, className, children }) {
    return (
      <section
        id={id}
        className={className}
      >
        <h2>{title}</h2>
        {children}
      </section>
    );
  }
  ```
  - 이 방식은 큰 규모의 프로젝트에 아주 비효율적
- fowarded props(전달 속성) 혹은 proxy props(대리 속성) 패턴 사용하기

## 6. 감싸진 요소에 Props(속성) 전달하기

### 1) 커스텀 Section 컴포넌트에 적용하기

- props를 구조분해할당 할 때, 추가할 수 있는 특별한 내장 자바스크립트 문법이 있음
  ```jsx
  // ...indentifier(식별자), 식별자의 이름은 모두 사용 가능
  ...props
  ```
  - 이 온점 세 개는 자바스크립트의 내장 문법
  - 이것을 사용하면 자바스크립트가 이 구역 컴포넌트에서만 사용할 수 있는 모든 다른 props를 모아와서 props object(속성 객체)로 병합함
    → 즉, 하나의 자바스크립트 객체에 props로 분류되는 모든 것이 모여서 해당 컴포넌트로 들어오게 됨
- 이 속성들을 모두 빌트인 속성으로 가져올 수 있음
  ```jsx
  export default function Section({ title, children, ...props }) {
    return (
      <section {...props}>
        <h2>{title}</h2>
        {children}
      </section>
    );
  }
  ```
  - 이를 위해 **스프레드 연산자**를 사용
    - 위에서 사용한 점 세 개와 모습은 동일하지만, 사용하는 위치가 다름
      → 매개변수에서는 데이터를 객체로 모으기 위해 사용
      → 요소에서는 데이터 즉, 값의 집합을 펼쳐서 다른 요소로 보내기 위해 사용
  - 이 스프레드 연산자를 우리가 props로 명명한 속성 객체에 사용 가능
    → 이 두 개의 props 객체는 서로 연관되어 있음
  - 이제 추가 props 중 해당 커스텀 컴포넌트 구역에 설정된 모든 props는 section 요소의 빌트인 구역으로 넘어가게 됨
    → id나 클래스 등에 대한 속성을 설정할 수 있음
- 이 패턴은 위와 같이 자식 요소를 감싸는 Section 컴포넌트처럼, wrapper conponent 작성 시 유용

### 2) 커스텀 TabButton 컴포넌트에 적용하기

```jsx
// TabButton.jsx
export default function TabButton({ children, isSelected, ...props }) {
  console.log('TABBUTTON COMPONENT EXECUTING');
  return (
    <li>
      <button
        className={isSelected ? 'active' : undefined}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

// Examples.jsx
...

export default function Examples() {
  ...

  return (
    <Section
      title='Examples'
      id='examples'
    >
      <menu>
        <TabButton
          isSelected={selectedTopic === 'components'}
          onClick={() => handleSelect('components')}
        >
          Components
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'jsx'}
          onClick={() => handleSelect('jsx')}
        >
          JSX
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'props'}
          onClick={() => handleSelect('props')}
        >
          Props
        </TabButton>
        <TabButton
          isSelected={selectedTopic === 'state'}
          onClick={() => handleSelect('state')}
        >
          State
        </TabButton>
      </menu>
      {tabContent}
    </Section>
  );
}
```

- onClick prop은 TabButton 컴포넌트의 button 요소에 존재하므로, `…props` 를 사용하여 나머지 prop을 모두 button 요소의 `{…props}`로 보냄
  - 그렇기 때문에 모든 `onSelect` prop을 `onClick` prop으로 변경
    → 이렇게 하면 prop을 내보내는 패턴을 TabButton 컴포넌트에서도 사용 가능

⇒ 스프레드 문법을 이용한 패턴을 사용하여 props를 내부 요소로 보내도록 하여 커스텀 컴포넌트를 수정한 것

## 7. 여러 JSX 슬롯 활용법

### 1) 재사용 가능한 Tabs 컴포넌트 만들기

- `{tabContent}` 의 위치
  - tabContent는 Examples 컴포넌트 안에서 제어되고 있는 내용이기 때문에 Tabs 컴포넌트에 두지 않음
    → Tabs 컴포넌트의 목적은 모든 종류의 탭에 적용되어 앱의 다양한 위치에 있는 내용을 제어하는 것이기 때문
- TabButton 컴포넌트 요소에 전달하는 props
  - onClick에 사용되는 `handleSelect()` 함수와 `isSelected` prop의 경우, 현재 사용 중이고 현재 선택되어 있는 컴포넌트에서 제어해야 함
    - 이 부분은 컴포넌트의 데이터에 따라 결정되며, 모든 Tab과 관련된 상태를 제어
  - 하지만 Tabs에는 이 부분이 포함되지 않는 이유
    - 우리가 만들고 있는 Tabs 컴포넌트는 wrapper component
    - 이것은 아주 단순한 형태라 이 안에서 제어되는 내용에 대한 지식이 없기 때문
      ⇒ 그래서 TabButton 컴포넌트를 Tabs 컴포넌트로 옮기는 작업이 복잡해지게 됨
    - 이것을 아래와 같이 props을 여러 개 받게 되면 코드가 복잡해질 뿐만 아니라, Tabs 컴포넌트의 재사용을 어렵게 만듦
      ```jsx
      export default function Tabs({ children, selectedTopic, onSelectTab }) {
        return (
          <>
            <menu>
              <TabButton
                isSelected={selectedTopic === 'components'}
                onClick={() => handleSelect('components')}
              >
                Components
              </TabButton>
              ...
            </menu>
            {children}
          </>
        );
      }
      ```
      → `onSelectTopic` 이 적용되지 않는 곳에는 전혀 사용할 수 없기 때문에, 적절한 해결방식이 아님

### 2) 더 나은 해결 방법

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  );
}

// Exampls.jsx
...

export default function Examples() {
  ...

  return (
    <Section
      title='Examples'
      id='examples'
    >
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedTopic === 'components'}
              onClick={() => handleSelect('components')}
            >
              Components
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'jsx'}
              onClick={() => handleSelect('jsx')}
            >
              JSX
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'props'}
              onClick={() => handleSelect('props')}
            >
              Props
            </TabButton>
            <TabButton
              isSelected={selectedTopic === 'state'}
              onClick={() => handleSelect('state')}
            >
              State
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>
      <menu></menu>
    </Section>
  );
}
```

- Examples.jsx에 TabButton 요소를 두는 대신, JSX 코드를 prop으로 Tabs 컴포넌트에 전달하는 것
  - `{tabContent}` 를 전달하는 것과 같은 원리
  - 유일한 문제점은 하나뿐은 `children` 속성을 `{tabContent}` 에 이미 사용 중이라는 것
  - JSX 요소는 정규값으로서, 코드를 작성할 때 값처럼 사용됨되기 때문에 이 자체를 prop으로 전달 가능
- 코드가 덜 완성된 것처럼 보일 수 있지만, 꽤 자주 쓰이는 패턴
  - 두 개의 slot(슬롯)을 설정하여 Tabs 컴포넌트(메인 내용 슬롯)를 `children` 요소를 통해 설정 가능
  - buttons 슬롯 또한 커스텀 buttons 속성을 통해 설정 가능
  - 이후에 속성을 더 추가하거나, 컴포넌트 내 필요한 만큼 슬롯을 더 설정할 수도 있음
    → JSX의 내용이 더 늘어났을 경우에 해당
- 이 패턴이 불필요해 보일 수 있지만, 복잡한 작업에서는 꼭 필요한 내용
  - 컴포넌트 내 다양한 슬롯 설정은 리액트에서 아주 중요한 개념

## 8. 컴포넌트 타입 동적으로 설정하기

### 1) Tabs 컴포넌트를 더 유연하게 만들기

```jsx
// Tabs.jsx
export default function Tabs({ children, buttons }) {
  return (
    <>
      <menu>{buttons}</menu>
      {children}
    </>
  );
}
```

- 더 큰 프로젝트에서 Tabs 컴포넌트가 사용될 경우, `menu` 태그가 아닌 더 다양한 wrapper 요소를 사용해서 buttons 요소를 감싸는 것이 필요할 수 있음
- 방법

  1. Tabs.jsx에 `menu` 태그를 지우고 wrapper로 사용하고자 하는 요소를 Examples.jsx의 TabButton 요소를 감싸는 태그에 작성하기

     ```jsx
     // Tabs.jsx
     export default function Tabs({ children, buttons }) {
       return (
         <>
           {buttons}
           {children}
         </>
       );
     }

     // Examples.jsx
     ...

     export default function Examples() {
       ...

       return (
         <Section
           title='Examples'
           id='examples'
         >
           <Tabs
             buttons={
               <menu>
                 <TabButton
                   isSelected={selectedTopic === 'components'}
                   onClick={() => handleSelect('components')}
                 >
                   Components
                 </TabButton>
                 <TabButton
                   isSelected={selectedTopic === 'jsx'}
                   onClick={() => handleSelect('jsx')}
                 >
                   JSX
                 </TabButton>
                 <TabButton
                   isSelected={selectedTopic === 'props'}
                   onClick={() => handleSelect('props')}
                 >
                   Props
                 </TabButton>
                 <TabButton
                   isSelected={selectedTopic === 'state'}
                   onClick={() => handleSelect('state')}
                 >
                   State
                 </TabButton>
               </menu>
             }
           >
             {tabContent}
           </Tabs>
         </Section>
       );
     }
     ```

  2. `menu` 요소를 지우지 않는 방법

     1. 이 wrapper 요소가 포함되어 있어야만 분리된 buttons 및 children의 내용이 실행되기 때문
     2. Tabs에 사용할 요소에 대한 prop을 받기

        ```jsx
        <Tabs buttonContainer="menu">...</Tabs>
        <Tabs buttonContainer={Section}>...</Tabs>
        ```

        - 여기에서 사용되는 identifier(식별자)는 이 prop(속성)의 값이기 때문에, <>를 사용하는 컴포넌트 자체가 아님
        - 또 다른 중요한 차이점은 내장 요소와 커스텀 컴포넌트의 차이
          - 커스텀 컴포넌트는 동적 값이어야 하기 때문에 { } 사용
            → 내장 요소를 { }로 사용하면 변수 값으로 인식하기 때문에 해당 변수를 코드에서 찾아 저장된 값을 가져와서 해당 prop 값으로 삼게 됨
          - 내장 요소는 단순히 “”를 사용하여 문자열로 내보냄

     3. 내장 요소를 prop으로 받아 사용하기

        ```jsx
        <Tabs
          buttonsContainer='menu'
          buttons={...}
         > ...
         </Tabs>
        ```

        - 직접 입력된 데이터인 내장 요소 식별자를 그대로 사용하게 되면, 내장 요소 중 해당 prop으로 받은 이름이 있는지를 찾게 됨
        - 그렇기 때문에 이 속성 안에 있는 “menu” 라는 문자열 값을 검색하여 커스텀 컴포넌트로 식별하도록 해야 함
          - 대문자로 시작하는 상수를 선언하여 해당 prop의 값을 저장하여 사용
            - 이 작업은 상수인 변수를 새로 생성하는 것
            - 이 상수는 커스텀 컴포넌트로서 사용되는데, 변수명이 대문자로 시작하기 때문
              → 그러므로 JSX 코드에서 사용 가능
        - 이제 리액트는 이 프로젝트에서 ButtonsContainer에 포함된 값을 검색하고, 그 값은 prop으로 받은 buttonsContainer의 값과 같음
          - 그리고 이 값이 문자열인지 확인하고, menu는 내장 요소와 이름이 같기 때문에 해당 요소로 렌더링

     4. buttonsContainer라는 wrapper를 동적으로 설정하여 buttons를 감싸게 하고, 이것을 Tabs 컴포넌트에 적용하기

        - `buttonsContainer='menu'`
          - 이 패턴은 컴포넌트 식별자를 prop(속성) 값으로 보낸다는 것
          - 이 식별자가 Tabs 컴포넌트에 속해 있기 때문에 다양한 HTML 요소를 동적으로 렌더링할 수 있다는 것
        - 이 과정을 짧게 하는 방법

          - ButtonsContainer 상수를 새로 설정하는 대신, 처음부터 prop으로 대문자로 시작하는 상수를 받는 것

            ```jsx
              // Tabs.jsx
              export default function Tabs({ children, buttons, ButtonsContainer }) {
                // const ButtonsContainer = buttonsContainer;
                return (
                  <>
                    <ButtonsContainer>{buttons}</ButtonsContainer>
                    {children}
                  </>
                );
              }

              // Examples.jsx
              <Tabs
                ButtonsContainer='menu'
                buttons={...}
              > ...
              </Tabs>
            ```

            → 컴포넌트 식별자를 한 속성의 값으로 받는 것

        - 이 패턴을 사용하며 꼭 기억해야 할 것
          - 이 prop(속성)이 반드시 받는 쪽 컴포넌트에서 커스텀 컴포넌트로서 사용이 가능해야 함
            → 반드시 prop의 이름이 대문자로 시작하거나 상수나 변수로서 재설정된 속성으로서 사용해야 함
        - 식별자에 HTML 내장 요소를 사용할 경우 문자열로 작성하고, 컴포넌트 함수를 사용할 경우 { }를 사용하여 컴포넌트 함수의 이름만 작성해야 함

## 9. 기본 Prop(속성) 값 설정

- Tabs 컴포넌트에서 ButtonContainer 속성의 값에 기본 값 설정하기
  ```jsx
  export default function Tabs({ children, buttons, ButtonsContainer = 'menu' }) {
    // const ButtonsContainer = buttonsContainer;
    return (
      <>
        <ButtonsContainer>{buttons}</ButtonsContainer>
        {children}
      </>
    );
  }
  ```
  - 기본 값으로 커스텀 컴포넌트를 사용하려면, 해당 컴포넌트를 import 해서 가져와야 함
  - 위 코드에서는 기본 값으로 menu라는 내장 요소를 사용했기 때문에, Examples.jsx에서 ButtonContainer 속성을 따로 설정하지 않아도 됨
  - 기본 값을 설정해줌으로써 Tabs 컴포넌트가 좀 더 단순해짐

## 10. 모든 콘텐츠가 컴포넌트에 보관될 필요가 없는 이유

### 1) index.html 에 코드 작성하기

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/game-logo.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Tic-Tac-Toe</title>
</head>

<body>
  <header>
    <img src="game-logo.png" alt="Hand-drawn tic tac toe game board">
    <h1>Tic-Tac-Toe</h1>
  </header>
  <div id="root"></div>
  <script type="module" src="/src/index.jsx"></script>
</body>

</html>
```

- index.html 파일은 결국 우리 웹 사이트를 방문하는 사람들이 볼 내용
  - 그러므로 리액트에서 작업할 때, 필요하다면 이 파일에 마크업을 더 할 수 있음
    - props(속성)나 state(상태) 등에 의해 변하지 않는 컴포넌트는 굳이 App 컴포넌트 내부에 있을 필요가 없을 수도 있음
      → 그렇기 때문에 App 컴포넌트에 모든 요소를 다 넣지 않아도 됨
    - 물론 대부분의 마크업은 컴포넌트 속에 들어 있을 것
  - 정적인 마크업 즉, 다른 데이터에 영향을 받지 않고 영향을 받을 필요가 없는 요소라면 index.html에 들어갈 수 있음
    - 어떤 파일이던지 public 폴더 안에 있다면, index.html 파일과 함께 웹 사이트 방문자에게도 공유됨
    - 그래서 따로 경로를 지정하지 않고, 파일 이름으로 참조 가능

### 2) 세부 과정: 이미지 저장소는 `public/` VS `assets/`

- `public/` 폴더
  - 이미지를 `public/` 폴더에 저장하면 index.html 또는 index.css 파일 내에서 직접 참조 가능
  - 그 이유는 `public/` 에 저장된 파일(이미지 등)이 프로젝트 개발 서버 및 빌드 프로세스에 의해 공개적으로 제공되기 때문
  - index.html과 마찬가지로, 이 파일들을 브라우저 내에서 직접 방문할 수 있으며, 다른 파일에 의해 요청될 수도 있음
  - 예)
    - public/some-image.jpg가 있을 경우, [localhost:5173/some-image.jpg를](http://localhost:5173/some-image.jpg를) 불러오면 해당 이미지를 볼 수 있음
- `src/assets/` 폴더
  - 하위 폴더에 저장된 모든 파일은 공개적으로 제공되지 않음
  - 웹 사이트 방문자가 접근할 수 없음
    → [localhost:5173/src/assets/some-image.jpg](http://localhost:5173/some-image.jpg를) 를 불러오려고 하면 오류 발생
  - 하위 폴더에 저장된 파일은 코드 파일에서 사용 가능
    - 코드 파일에 가져온 이미지는 빌드 프로세스에 의해 인식되어 최적화 됨
    - 웹 사이트에 제공하기 직전에 `public/` 폴더에 삽입됨
    - 가져온 이미지는 참조한 위치에서 자동으로 링크가 생성되어 사용됨
- 어떤 폴더를 사용하여 파일을 저장해야 할까?
  - 빌드 프로세스에 의해 처리되지 않는 이미지 → `public/` 폴더를 사용
    - 대체적으로 사용 가능
      예) index.html 파일이나 파비콘과 같은 이미지
  - 컴포넌트 내에서 사용되는 이미지 → `src/assets/` 폴더에 저장

## 11. 컴포넌트 인스턴스의 분리된 동작

```jsx
import Player from './components/Player.jsx';

function App() {
  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <Player
            name='Player 1'
            symbol='X'
          />
          <Player
            name='Player 2'
            symbol='O'
          />
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
```

- 동일한 커스텀 컴포넌트를 사용하고 있지만, 해당 컴포넌트를 한 번 혹은 여러 번 사용할 때마다 리액트는 새로운 instance(인스턴스)를 생성
  - Player 라는 두 개의 동일한 컴포넌트를 사용하지만, 완전히 따로 작동한다는 의미
  - 만약 Palyer 1의 컴포넌트 인스턴스의 상태가 변한다면, Player 2 컴포넌트 인스턴스에 전혀 영향을 주지 않음
- 즉, 이 두 컴포넌트는 동일한 로직을 공유하고 있지만, 컴포넌트를 사용하는 순간 완전히 분리된 인스턴스가 각각 생성되어 동일한 로직을 사용할지라도 사용하는 위치가 따로 분리됨
  - 이렇게 분리된다는 특징을 이용해 아주 복잡한 컴포넌트를 만들어서, 재사용 시 서로에세 영향을 주지 않게 할 수 있음
- 이것이 유용한 이유
  - 예를 들어 Player 1의 정보를 입력할 때, Player 2의 정보가 수정된다면 문제가 심각해질 것
  - 이런 식으로 작동한다면 컴포넌트 자체가 무용지물의 개념이 될 것
