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

## 12. 조건적 콘텐츠 & State(상태) 업데이트를 위한 차선책

### 1) 방법 1 : 부정 연산자 사용하여 상태값 변경하기

```jsx
function handleEditClick() {
  // setIsEditing(isEditing ? false : true);
  setIsEditing(!isEditing);
}
```

- 현재 isEditing의 값이 어떤 것이냐에 따라 반대가 되도록 하는 코드
- 그러나 최선의 방법은 아님

## 13. 이전의 State(상태)를 기반으로 올바르게 상태 업데이트 하기

### 1) 방법 2: 해당 상태를 업데이트 하는 함수로 새로운 함수를 보내기

- 리액트에서 state(상태)를 변경할 때, 해당 상태의 이전 값을 변경하는 경우 부정 연산자를 사용하여 작업해서는 안됨
  - 만약 상태를 이전 값에 기반하여 변경하는 경우, 해당 상태를 업데이트 하는 함수로 새로운 함수를 보내야 함
    ```jsx
    function handleEditClick() {
      setIsEditing() => { });
    }
    ```
    → 리액트 생태계에서는 이것이 최적의 방식
- 상태를 이전 값에 기반하여 변경하는 경우, 해당 상태를 업데이트 하는 함수로 새로운 함수를 보내야 함

  - 해당 상태를 업데이트 하는 함수로 반환하고자 하는 새로운 상태 값을 보내서는 안됨

    ```jsx
    // 잘못된 방식
    function handleEditClick() {
      setIsEditing(!isEditing);
    }

    // 올바른 방식
    function handleEditClick() {
      setIsEditing() => { });
    }
    ```

  - 이유
    - 여기서 해당 상태를 업데이트 하는 함수로 전달하는 화살표 함수를 리액트가 호출하여, 자동적으로 현재 상태 값을 가지게 되기 때문
      → 즉, 상태 변경 전의 값이 입력됨

### 2) 위의 방법을 코드에 적용하기

```jsx
function handleEditClick() {
  setIsEditing((editing) => !editing);
}
```

- 여기서의 `editing` 은 true 혹은 false인데, isEditing의 값과 동일
- 하지만 이 매개변수는 값으로 인식되어, 리액트가 함수 호출 시 동적으로 설정하여 전달하게 됨
- 이 화살표 함수를 setIsEditing으로 전달할 때, 설정하고자 하는 새로운 상태를 반환하게 됨
- 작동하는 방식은 방법 1로 했을 때와 동일하지만, 코드는 비교적 장황해 보일 수 있음

### 3) 위의 코드 또한 작동하지만 문제점이 존재

- 이 작업을 수행하는 리액트가 상태 변화에 대한 스케줄을 조정한다는 것
- 이 작업은 setIsEditing과 같은 상태 변경 함수를 통해 실행하므로, 두 단계로 이루어짐
  - 즉, 이 상태 변경은 즉각적으로 수행되는 것이 아니라, 리액트가 미래에 수행할 상태 변경 스케줄을 조율하는 것
    → 이 시간은 몇 밀리초밖에 되지 않으므로, 아주 빠른 시간이지만 즉각적이진 않음

### 4) 문제점을 예시를 통해 알아보기

```jsx
function handleEditClick() {
  setIsEditing(!editing); // true 예상
  setIsEditing(!editing); // false 예상
  // 결국 이 함수가 작동하면 isEditing은 false로 변화가 없을 것
}
```

- 그러나 웹 사이트에서의 작동을 확인하면, 버튼 클릭이 정상적으로 작동하는 것을 확인할 수 있음
- 결국, `setIsEditing` 을 한 번만 작성한 것과 동일한 결과
  ⇒ 이것이 함수 형태를 사용해야 하는 이유

### 5) 함수 형태를 사용해야 하는 이유

```jsx
function handleEditClick() {
  setIsEditing(!editing); // true 예상
  setIsEditing(!editing); // false 예상
  // 결국 이 함수가 작동하면 isEditing은 false로 변화가 없을 것
}
```

- 이 코드에서 리액트가 상태 변경 스케줄을 조율하는데, 두 상태 변화 모두 `isEditing`의 현재 상태를 기준으로 삼음
  - 즉 시작점은 `isEditing = false`
  - 해당 함수를 포함하는 컴포넌트 함수가 처음 실행되는 시점에 `isEditing` 의 값이 false이기 때문
  - 내장 함수인 `handleEditClick()` 함수는 생성될 당시 컴포넌트 함수 실행에 포함되어 있기 때문에, `isEditing` 은 시작 시점의 값을 가지고 있는 것
- `setIsEditing` 에서 `isEditing` 을 호출할 때 상태 변경 스케줄을 조율하게 되는데, 첫 번째 `setIsEditing` 함수에서 `isEditing` 을 true로 바꾸라는 명령이 즉각적으로 실행되지 않음
  - 그 다음 `setIsEditing` 함수에서도 동일한 상태가 유지됨
    ⇒ 그 이유는 우리가 아직 동일한 컴포넌트 함수 실행의 사이클을 돌고 있기 때문에, 그 다음 `setIsEditing` 함수에서 `isEditing` 의 상태를 false로 바꾸지 않고 true로 동일한 업데이트를 스케줄 하는 것
- 그리고 이 두 상태 변화의 스케줄은 각자의 작업 이후에 실행됨
- 만약 우리가 이 함수 형태를 수정하여 상태를 변경한다면 상황은 달라짐
  ```jsx
  function handleEditClick() {
    setIsEditing((editing) => !editing); // true 예상
    setIsEditing((editing) => !editing); // false 예상
    // 결국 이 함수가 작동하면 isEditing은 false로 변화가 없을 것
  }
  ```
  - 위와 같이 코드를 수정한다면, 버튼을 눌러도 아무 일도 일어나지 않음
    → 우리가 예상한 결과와 동일한 결과가 나오는 것
  - 리액트가 상태를 업데이트할 때, `setIsEditing` 함수 안에서의 상태(`editing`)는 각각의 호출이 독립적으로 작동
  - 첫 번째 호출에서 상태가 `true`로 바뀌기로 예약되었지만, 그 변경이 아직 적용되지 않은 상태에서 두 번째 호출이 실행됨
  - 두 번째 호출에서도 `editing`은 여전히 `false`로 간주되기 때문에 `!editing`은 `true`로 설정
  - 결국 두 번의 호출 모두 상태를 `true`로 바꾸게 되어, 최종적으로 `isEditing`은 `true`가 됨

### 6) 기억해야 할 것

- 이렇게 화살표 함수 형태를 사용해서 리액트가 보장해줄 수 있는 것은 이 상태 값이 언제나 가장 최신이라는 것
- 상태 변경할 때 이전의 상태 값에 기반하여 변경한다면, 상태 변화 함수에 화살표 함수 형태를 사용해야 함
- 가장 최선의 방법
  ```jsx
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  ```

## 14. 사용자 입력 & 양방향 바인딩

### 1) `<input>` 요소의 `value` 속성을 사용하여 사용자 입력값 제어하기

- `<input>` 요소의 `value` 속성은 입력창에 보이는 값을 설정
  - `value` 속성에 값을 설정하면 입력창에서 값을 수정할 수 없음
- `defaultValue` 속성을 사용하면 기본으로 보여주는 값을 지우고 새로운 값을 작성할 수 있음

### 2) `<input>` 요소의 `onChange` 속성을 사용하여 사용자 입력값 제어하기

- `useState`를 동일한 컴포넌트 안에서 여러 번 사용 가능한데, 제어하고자 하는 상태가 많을 때 유용
- `onChange` 메서드는 키보드 입력에 의해 발동되고, 사용자가 작성한 값을 담은 이벤트 객체를 제공

  ```jsx
  export default function Player({ initialName, symbol }) {
  	const [playerName, setPlayerName] = useState(initialName);

  	...

  	function handleChange(event) {
  	  setPlayerName(event.target.value);
  	}

  	...

  	if (isEditing) {
  	  editablePlayerName = (
  	    <input
  	      type='text'
  	      required
  	      value={playerName}
  	      onChange={handleChange}
  	    />
  	  );
  	  btnCaption = 'Save';
  	}
  }
  ```

  - 여기서 `handleChane` 함수로 이벤트 값이 자동으로 넘어오게 됨
  - 포인터를 넘기는 위치가 `handleChange` 함수이고, 이 포인터는 input 요소의 `onChange` 속성으로 넘어옴
  - 리액트가 `handleChange` 함수를 호출하는 것은 이벤트가 생길 때
  - 리액트가 이벤트 객체를 내보낼 때는 `handleChange` 함수를 호출하여 해당 함수의 인수로서 내보냄
    - 그렇기 때문에 이벤트는 자동으로 넘어옴
  - `event.target` 속성을 사용하여 해당 이벤트를 발생시키는 곳인 `input` 요소를 참조할 수 있음
    - `input` 요소는 `value` 속성을 가지고 있는데, 이 속성은 사용자가 작성하려고 한 값을 저장
    - 이 값은 이후 `value={playerName}` 의 값을 덮어씀

⇒ onChange 메서드와 개별의 상태를 제어함으로써 사용자 입력 필드에 작성한 값에 접근 가능

⇒ 이 변경된 값이 입력 필드에 다시 보여짐으로써 변경된 값에도 접근 가능

### 2) 양방향 반인딩이란?

- 입력값의 변화에 반응하고, 변경된 값을 다시 입력값에 전달하는 방식
- `onChange={handleChange}` 에서 값을 빼내어 `value={playerName}` 에 전달하기 때문

## 15. 다차원 리스트 렌더링

```jsx
const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  return (
    <ol id='game-board'>
      {initialGameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
```

- 컴포넌트 함수 밖에 상수를 선언하여 특정 값을 가져오고 저장
  - 밖에 선언하는 이유는 이 상수는 state(상태)가 아니기 때문
- `initialGameBoard` 배열을 `map`으로 전개할 때, `li` 요소의 `key`를 `rowIndex` 로 설정
  - 이 인덱스는 해당 값과 연결되어 있지 않기 때문에, 대부분의 경우 인덱스로 키를 설정하지 않는 것이 좋음
    - 인덱스는 해당 값과 연결되어 있지 않기 때문
    - 행의 위치를 바꾼다면 이전의 인덱스 정보가 변경되기 때문
      → 인덱스는 데이터의 내용이 아닌 데이터의 위치와 연결되어 있음
  - 하지만 `initialGameBoard` 의 경우, 문제가 되지 않음
    → 행의 위치를 바꿀 일이 없기 때문

## 16. 불변의 객체 State(상태)로 업데이트 하기

### 1) 객체나 배열 타입의 State(상태)를 업데이트 할 때는 변경 불가능하게 할 것

```
import { useState } from 'react';

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameboard);

	// 원본 배열을 복제하지 않은 방법 - 비추천(x)
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      prevGameBoard[rowIndex][colIndex] = 'X'
      return prevGameBoard
    });
  }

  // 원본 배열을 복제한 방법 - 추천(o)
  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = 'X';
      return updatedBoard;
    });
  }

  return (
    ...
  );
}

```

- 객체나 배열 타입의 State(상태)를 업데이트 할 때는 원본을 변경 불가능하게 하는 것이 좋음
- 즉, 이전 상태를 하나 복제해서 새 객체 또는 배열로 저장해 놓고, 이 복제된 버전을 수정하는 방식
  → 원본 객체 또는 배열은 변경되지 않도록
- 이 방식을 추천하는 이유
  - 만약 State(상태)가 객체 혹은 배열이라면, 이것은 자바스크립트 내의 참조 값임
  - 그러므로 기존 값을 복제해서 사용하지 않으면, 메모리 속의 기존 값을 바로 변경하게 됨
  - 이 시점은 리액트가 실행하는 예정된 상태 업데이트보다 이전에 일어나게 됨
    → 알 수 없는 버그나 부작용이 생길 수 있음

### 2) 코드에 적용하기

```jsx
import { useState } from 'react';

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameboard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = 'X';
      return updatedBoard;
    });
  }

  return (
    <ol id='game-board'>
      {initialGameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
```

- 위의 코드는 원본 상태에 기반하여 변경하는 방식
  - 작업 중인 `gameBoard`의 상태를 `initialGameBoard` 대신 사용하는 것
  - 초기에만 `initialGameBoard`을 사용하고, 이 상태는 이후에 변경되어 업데이트 된 `gameBoard`로 대체됨

### 3) 참조 값 vs 기본 값

### 1) 원시 값이란?

```jsx
let age = 28;

var name = 'Max';
var isMale = trur;
```

- 변수는 숫자 값을 저장
- 숫자 값은 자바스크립트의 매우 간단한 구성요소이므로, 기본 값이라고 함
  - 문자열, boolean, undefined, null 도 기본 값

### 2) 참조 값이란?

```jsx
var person = {
  name: 'Max',
  age: 28,
};

var hobbies = ['sports', 'cooking'];
```

- 여기서 person은 객체이므로 참조 유형
  - 차례로 원시 값을 갖는 속성을 가지고 있음
  - 이것은 참조 형식이 되는 개체에는 영향을 주지 않음
  - person 객체 내부에 중첩 된 객체 또는 배열을 가질 수도 있음
- hobbies 배열은 참조 유형
  - 이 경우 문자열 목록을 보유
  - 문자열은 배운 대로 기본 값/유형이지만 배열에는 영향을 미치지 않음
  - 배열은 항상 참조 형식

### 3) 두 값의 차이점은?

- 자바스크립트는 내부적으로 속성이나 변수에 지정한 값을 메모리에 저장해야 함

  - 자바스크립트는 Stack과 Heap 두 가지 유형의 메모리를 가지고 있음

    [Confused about Stack and Heap?](https://medium.com/fhinkel/confused-about-stack-and-heap-2cf3e6adb771)

- 짧게 요약하자면,
  - Stack
    - 스택은 본질적으로 항목을 스택으로 관리하는 접근하기 쉬운 메모리
      → 숫자, 문자열, boolean의 경우
  - Heap
    - 정확한 크기와 구조를 미리 확인할 수 없는 항목에 대한 메모리
    - 객체와 배열은 런타임에 변경되고 변경될 수 있으므로 힙으로 이동해야 함
    - 각 힙 항목에 대해 정확한 주소는 힙의 항목을 가리키는 포인터에 저장
    - 이 포인터는 차례로 스택에 저장

### 4) 참조 유형의 이상항 동작

- 참조 유형의 경우, 스택에 포인터만 저장된다는 사실이 매우 중요
- 실제 person 이라는 변수에 저장되어 있는 것은 객체의 포인터
  - 배열의 경우에도 마찬가지로, hobbies 변수에 저장된 것은 배열의 포인터
- 그렇기 때문에 원본 객체나 배열을 새로운 변수에 저장한 후, 새로운 변수에서 객체의 어떤 값을 변경하면 원본 값도 변경됨

  ```jsx
  // 객체의 예시
  var person = { name: 'Max' };
  var newPerson = 사람;
  newPerson.name = 'Anna';
  console.log(person.name); // Anna

  // 배열의 예시
  var hobbies = ['Sports', 'Cooking'];
  var copiedHobbies = hobbies;
  copiedHobbies.push('Music');
  console.log(hobbies[2]); // Music
  ```

### 5) 실제로 값을 복사하는 방법

- 위의 예시를 통해 우리가 복사하는 것은 값이 아닌 포인터라는 것을 알게 됨
- 이 포인터가 가리키는 실제 값을 변경하기 위해서는, 기본적으로 새로운 객체나 배열을 구성한 후 기존 객체나 배열의 속성이나 요소로 채워야 함
- 새로운 배열에 원본 배열을 복제하는 방법

  1. `slice()`

     ```jsx
     var hobbies = ['Sports', 'Cooking'];
     var copiedHobbies = hobbies.slice();
     ```

     - `slice()` 는 기본적으로 전달한 시작 인덱스에서 시작하여(그리고 정의한 요소의 최대 개수까지) 이전 요소의 모든 요소를 포함하는 새 배열을 반환
     - 인수 없이 호출하면 이전 배열의 모든 요소가 포함된 새 배열을 얻음

  2. `…` (스프레드 연산자)

     ```jsx
     var hobbies = ['Sports', 'Cooking'];
     var copiedHobbies = [...hobbies];
     ```

     - 새 배열을 수동으로 만들고 ( 를 사용하여 `[]`) 스프레드 연산자( `...`)를 사용하여 "이전 배열의 모든 요소를 끌어내어" 새 배열에 추가

- 새로운 객체에 원본 객체를 복제하는 방법

  1. `Object.assign()`

     ```jsx
     var person = { name: 'Max' };
     var copiedPerson = Object.assign({}, person);
     ```

     - 이 구문은 새 객체( `{}`part)를 생성하고 이전 객체(두 번째 인수)의 모든 속성을 새로 생성된 객체에 할당

  2. `…` (스프레드 연산자)

     ```jsx
     var person = { name: 'Max' };
     var copiedPerson = { ...person };
     ```

     - 이렇게 하면 새 객체가 생성되고( 를 사용했기 때문에 `{ }`) 해당 객체의 모든 속성이 `person`새 객체로 추출됨

### 6) 깊은 복사

- 위의 어느 방법을 사용하더라도 깊은 복제본을 만들지 않는다는 것
- 복제된 배열에 중첩된 배열이나 객체가 요소로 포함되어 있거나, 객체에 배열이나 다른 객체를 보유하는 속성이 포함되어 있는 경우, 이러한 중첩된 배열과 객체는 복제되지 않음
  - 작업할 모든 레이어를 수동으로 복제해야 함

[Reference vs Primitive Values](https://academind.com/tutorials/reference-vs-primitive-values)

## 17. State(상태) 끌어올리기

- 서로 다른 컴포넌트에서 각자의 상태를 필요로 하는 상황에서 이 상태를 제어할 때, 가장 가까운 부모 컴포넌트에서 작업해야 함
  - 그 이유는 해당 컴포넌트가 정보를 필요로 하는 두 컴포넌트 모두에 대해 접근이 가능하기 때문
- 우리 코드의 경으는 App 컴포넌트에서 어떤 Player가 진행 중인지, 해당 정보를 Player와 GameBoard 두 컴포넌트 모두에게 속성(prop)을 통해 보낼 수 있음

```jsx
// App.jsx
...

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <main>
      <div id='game-container'>
        <ol
          id='players'
          className='hilight-player'
        >
          <Player
            initialName='Player 1'
            symbol='X'
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName='Player 2'
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      LOG
    </main>
  );
}

export default App;

// Player.jsx
...

export default function Player({ initialName, symbol, isActive }) {
  ...

  return (
    <li className={isActive ? 'active' : undefined}>
      ...
    </li>
  );
}

// GameBoard.jsx
...

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameboard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
      updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });

    onSelectSquare();
  }

  return (
    ...
  );
}
```

## 18. 교차 State(상태) 방지하기

- 승리 조건을 만들고, 같은 버튼을 여러 번 클릭할 수 없게 하기
- 상태를 하나 더 만들어서 이전에 만들었던 상태와 크게 다를 것 없는 정보를 또 저장하는 것은 가능하면 피하는 것이 좋음
  - 이 작업은 쉽지 않으며 연습이 필요
  - 물론, 여러 상태에서 같은 정보를 제어하고 있다고 큰 일이 일어나지는 않음
  - 하지만 일반적으로 피하는 것이 좋음
- GameBoard 컴포넌트에서 gameBoard 상태를 제어하는 것이 아니라, App 컴포넌트의 gameTurns로 상태를 제어할 것
  - 버튼을 클릭하는 것에 대한 정보를 목록으로서 제어할 수 있음
  - Log 컴포넌트에 필요한 정보와 GameBoard 컴포넌트에 필요한 정보 또한 gameTurns 배열에서 가져올 수 있기 때문

## 19. 계산된 값 권장 및 불필요한 State(상태) 관리 방지

```jsx
...

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [{ squre: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id='game-container'>
        ...
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
```

- `setGameTurns` 함수에서 `activePlayer` 상태를 사용하지 않고 `currentPlayer` 변수를 만든 이유
  - 두 종류의 상태를 병합하는 것과 같기 때문
  - 상태 변경 함수 안에서 함수 형태로 `gameTurns` 의 상태를 업데이트 하고 있는데, 실행 시점의 조율에 대한 상태 업데이트가 실행되도록 하기 위함
  - 여기에서는 가장 최신의 상태를 사용하지만, `activePlayer` 는 또 다른 상태이기 때문
- `setGameTurns` 함수는 우리가 상태를 불변한 방식으로 업데이트 하고, 다른 상태를 병합하지 않도록 해줌
- 이 작업으로 인해 gameTurns 상태를 Log 컴포넌트와 GameBoard 컴포넌트 모두에 사용 가능

## 20. Props(속성)에서 State(상태) 파생하기

```jsx
// App.jsx
...

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id='game-container'>
        ...
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;

// GameBoard.jsx
const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameboard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState(initialGameboard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare();
  // }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
```

- App 컴포넌트에서 제어되는 gameTurns 상태로부터 GameBoard 컴포넌트의 gameBoard 변수로 이 상태를 파생시켜 오는 것
  → 이것이 리액트 내에서 사고하고 작업하는 방식
- 제어하는 상태의 수는 최소화하되, 각 상태에서 가능한 많은 정보와 많은 값을 파생시키는 것

## 21. 컴포넌트 간의 State(상태) 공유

```jsx
// App.jsx
...
function App() {
  ...
  return (
    <main>
      ...
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

// Log.jsx
export default function Log({ turns }) {
  return (
    <ol id='log'>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
```

## 22. State(상태) 관리 및 간소화 및 불필요한 State(상태) 분별

- UI 업데이트가 필요하니 이를 위해 `activePlayer` 상태를 제어하는 것은 타당하지 않음
  - 상태가 UI 업데이트를 실행하는 것은 맞지만, 버튼을 클릭할 때마다 이미 `gameTurns` 상태가 변하고 있음
    → 버튼을 클릭할 때마다 실행됨
  - 그러므로 `activePlayer` 상태를 추가해서 UI 업데이트를 실행할 필요가 없음
  - 현재 어떤 플레이어가 진행 중인지에 대한 정보는 `gameTurns` 상태에서도 가져올 수 있음

```jsx
...

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    });
  }
  return (
    ...
  );
}

export default App;
```

- `setGameTurns` 함수 안의 `currentPlayer` 와 if문을 삭제할 수 없음
  - `setGameTurns` 함수는 `gameTurns`의 상태를 이전의 `gameTurns` 상태로부터 파생시켜야 함
  - 반대로 App 컴포넌트의 `currentPlayer` 는 현재 `gameTurns` 상태에서 파생시킴
    ⇒ 이전 상태에 기반하여 상태를 변경할 때는 위와 같이 해야 함
- 위의 코드에서 중복되는 코드를 정리해보자

  ```jsx
  ...

  function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }

    return currentPlayer;
  }

  function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState('X');

    const activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex) {
      // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
      setGameTurns((prevTurns) => {
        let currentPlayer = deriveActivePlayer(prevTurns);

        const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

        return updatedTurns;
      });
    }
    return (
      ...
    );
  }

  export default App;
  ```

  - 추가 상태를 제어하지 않아도 되고, 중복되는 코드를 외부에 별도 함수를 만들어 정리
  - 리액트에서 상태는 최대한 적게 사용하고, 최대한 많은 값을 파생 및 연산하도록 하는 것이 좋음

## 23. 조건적 버튼 활성화

```jsx
...
export default function GameBoard({ onSelectSquare, turns }) {
  ...

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

```

- 같은 버튼을 여러 번 클릭할 수 없도록 제어하기
  - 한 번 선택된 버튼을 비활성화 시키기

## 24. 분리된 파일로 데이터 아웃소싱

- 게임 승리 조건 확인하기
  - 가장 간단한 방법은 가능한 모든 우승 조건의 조합을 한 곳에 모은 후, 그 중에 일치하는 것이 있는지 확인
  - 이 작업은 매번 이루어져야 함
    - 매 차례마다 게임이 끝날 수 있는 가능성이 있기 때문
- 게임이 승리하는 모든 조건의 배열을 담은 별도의 js 파일을 생성
  ```jsx
  export const WINNING_COMBINATIONS = [
    [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
    ],
    [
      { row: 1, column: 0 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ],
    [
      { row: 2, column: 0 },
      { row: 2, column: 1 },
      { row: 2, column: 2 },
    ],
    [
      { row: 0, column: 0 },
      { row: 1, column: 0 },
      { row: 2, column: 0 },
    ],
    [
      { row: 0, column: 1 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
    ],
    [
      { row: 0, column: 2 },
      { row: 1, column: 2 },
      { row: 2, column: 2 },
    ],
    [
      { row: 0, column: 0 },
      { row: 1, column: 1 },
      { row: 2, column: 2 },
    ],
    [
      { row: 0, column: 2 },
      { row: 1, column: 1 },
      { row: 2, column: 0 },
    ],
  ];
  ```

## 25. 계산된 값 끌어올리기

- 매 차례마다 동적으로 승리하는 조건이 있는지 확인하기 위해 `handleSelectSquare` 에 로직을 추가
  - 이 함수가 실행되는 시점이 버튼이 클릭됐을 때이기 때문
  - `const [hasWinner, setHasWinner] = useState(false);` 와 같이 새로운 상태를 추가해도 되지만 굳이 필요하지 않음
    - 동일한 내용을 반복하기 때문
    - 우승자가 있는지 여부를 확인하는 정보는 `gameTruns`에서 이미 파생되었으므로, `handleSelectSquare` 에서도 우승자 여부를 확인할 필요가 없음
      → 이미 App 컴포넌트 함수에서 매 차례마다 실행하고 있기 때문
      → 버튼을 클릭할 때마다 `gameTurns` 배열을 업데이트 하고 있기 때문

```jsx
// App.jsx
...
import { WINNINT_CONBINATION } from './winning-combinations.js';

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

...

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameboard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNINT_CONBINATION) {
    // gameBoard의 특정 위치에서 나온 기호를 저장
    const firstSquareSymbol
    const secondSquareSymbol
    const thirdSquareSymbol
  }

  ...
  return (
    <main>
      <div id='game-container'>
        ...
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

// GameBoard.jsx
export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

```

- 위와 같이 작업하는 것의 장점
  - `gameBoard` 가 App 컴포넌트에 있기 때문에, `gameBoard` 에 저장되어 있던 다양한 기호를 추출해올 수 있음
  - 특히 우승 조건에 부합하는 특정 위치에 있는 기호를 알 수 있음

## 26. 계산된 값에서 새로운 계산된 값 파생하기

```jsx
// App.jsx
...

function App() {
  ...

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    // gameBoard의 특정 위치에서 나온 기호를 저장
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  ...
  return (
    <main>
      <div id='game-container'>
        ...
        {winner && <p>You won, {winner}!</p>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
```

## 27. 불변성이 어떤 경우에서든 중요한 이유

- 게임을 재시작한다는 것은 `gameTurns` 를 빈 배열로 재설정하고, 로그를 지우는 것이라고 할 수 있음
  - 나머지는 모두 이 `gameTurns` 상태에서 파생되기 때문에 자동적으로 조정될 것

```jsx
// App.jsx
...

function App() {
  ...

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id='game-container'>
        ...
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            onRestart={handleRestart}
          />
        )}
        ...
      </div>
      ...
    </main>
  );
}

export default App;

// GameOver.jsx
export default function GameOver({ winner, onRestart }) {
  return (
    <div id='game-over'>
      ...
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
```

- 위와 같이 수정하면, 게임을 재시작한 후 `initialGameBoard` 배열은 초기화되지 않고 여전히 이전 배열로 존재
- App 컴포넌트에서 아래와 같이 깊은 복사를 하여, `gameBoard`를 도출할 때 메모리에서 기존의 배열이 아닌 새로운 배열을 추가하도록 하여 문제 해결
  ```jsx
  let gameBoard = [...initialGameboard.map((array) => [...array])];
  ```

## 28. State(상태)를 끌어올리면 안되는 경우

- 게임이 종료된 후, 우승자를 보여줄 때 기호 대신 플레이어의 이름을 보여주고자 함
  - 플레이어 이름에 대한 정보는 Player 컴포넌트에 존재
  - Player 컴포넌트로부터 App 컴포넌트로 플레이어의 이름을 가져와야 함
  - 여기서 플레이어 이름이 저장된 상태를 App 컴포넌트로 끌어올리고 싶을 수 있음
    - 하지만 이것은 잘못된 방법
    - 이 플레이어 이름 상태는 타이핑을 할 때마다 입력 필드를 업데이트 하는 것에 사용되기 때문
    - 즉, 이 상태를 App 컴포넌트로 끌어올린다면, 입력 필드에 값을 입력할 때마다 App 컴포넌트가 재평가된다는 것을 의미
- 해결 방법
  ```jsx
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  ...
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  ```
  - 이름과 기호를 유지하면서 단지 변경된 플레이어의 기호에 대한 이름을 덮어쓰는 것

## 29. State(상태) 끌어올리기 대안

```jsx
// App.jsx
...
function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  ...

  for (const combination of WINNING_COMBINATIONS) {
    // gameBoard의 특정 위치에서 나온 기호를 저장
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  ...
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol
          id='players'
          className='hilight-player'
        >
          <Player
            initialName='Player 1'
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName='Player 2'
            symbol='O'
            isActive={activePlayer === 'O'}
          />
        </ol>
        ...
      </div>
      ...
    </main>
  );
}

export default App;

// Player.jsx
...

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  ...

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  ...

  return (
    ...
  );
}
```
