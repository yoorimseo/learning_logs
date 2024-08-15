# 리액트의 핵심 - 컴포넌트, JSX, 속성, 상태 등

## 1. 컴포넌트의 모든 것

### 1) 컴포넌트란?

- 잠재적으로 재사용이 가능한 구성 요소
- 리액트 개발자가 생성할 수 있고, 후에 혼합하여 전반적인 UI를 구축할 수 있음
- 리액트 애플리케이션은 컴포넌트를 결합하여 만드는 것
- 컴포넌트는 개발자에 따라 범위가 정해짐
- 컴포넌트는 HTML과 CSS, JS 로직 등을 감싸 이러한 언어와 조각들이 합쳐져 UI의 한 부분을 규정하고 조종
- 복잡한 사용자 인터페이스를 관리하기 쉽도록 작게 분리하여 UI의 다른 위치에서도 사용 가능하게 함

### 2) 컴포넌트의 장점

- 코드를 재사용하여 유지보수에 용이
- 유사한 코드가 대체로 함께 묶여있어 개발 과정이 단순해짐

  → HTML, CSS, JS가 연결된 코드가 함께 저장됨

- 디자인과 개발 원칙을 따름
  - 관심사가 분리됨
  - 프로젝트가 복잡해질수록 이 패턴이 더욱 중요하게 됨
    - 각자 담당하는 부분이 다른 다수의 개발자가 같은 프로젝트를 작업할 때, 과정이 단순해짐

→ Angular, Vue, Svelte와 같은 프론트엔드 프레임워크와 Flutter와 같은 모바일 개발 프레임워크에서도 위와 같은 개념을 찾아볼 수 있음

## 2. 초기 프로젝트 구축하기

### 1) 프로젝트 폴더를 열어서 먼저 해야할 것

```bash
npm install
```

- 프로젝트 폴더에서 위와 같은 명령을 실행
- 프로젝트에 필요한 모든 제 3자 패키지를 다운받도록 함
  - 리액트를 브라우저에서 사용 가능한 코드로 변환시키는 리액트 라이브러리와 빌드 도구가 있음
- 초기에 한 번만 시행하면 됨

### 2) 개발 서버 열기

```bash
npm run dev
```

- 이 개발 서버에서 웹사이트를 미리 확인 가능
- 코드를 수정할 때마다 코드를 관찰하여 미리보기 웹사이트를 새로고침 함
- 미리보기 웹사이트는 해당 코드를 실행한 후 출력되는 주소에서 확인 가능
- `ctrl+c` 를 눌러 개발 서버를 종료할 수 있음

## 3. JSX와 리액트 컴포넌트

### 1) JSX(JavsScript Syntax Extension) 란?

```jsx
<div>
  <h1>Hello World!</h1>
  <p>JSX code is awesome!</p>
</div>
```

- JavaScript 문법 확장자를 의미
- 이 확장자는 개발자가 자바스크립트 파일 내에 HTML 마크업 코드를 작성하여, HTML 요소를 설명하고 생성할 수 있게 함
  - 리액트는 UI의 전제와 부분을 설명하고 생성하기 위한 것이므로, 아주 유용한 기능
- 브라우저에서는 사용 불가하기 때문에, 개발 서버에서 변환됨
- JSX 확장자로 인해 보다 편리하게 UI를 개발할 수 있음

### 2) 리액트 컴포넌트

- 자바스크립트의 함수와 같음
- **리액트에서 컴포넌트로 인식되기 위한 두가지 규칙**

  1. 함수의 이름이 대문자로 시작해야 함
  2. 함수에서 렌더링 가능한 값이 반환되어야 함

     → 대체로 나중에 렌더링 될 HTML 마크업이 반환됨

## 3. 첫 커스텀 컴포넌트 생성 및 활용

```jsx
function Header() {
  return (
    <header>
      <img
        src='src/assets/react-core-concepts.png'
        alt='Stylized atom'
      />
      <h1>React Essentials</h1>
      <p>Fundamental React concepts you will need for almost any app you are going to build!</p>
    </header>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
```

- Header를 분리하여 새로운 함수(컴포넌트)로 정의한 후 App 컴포넌트에서 불러오기

## 4. 컴포넌트와 파일 확장자

- `.jsx` 는 브라우저에서 지원되지 않는 파일 확장자
  - 해당 파일이 작동될 수 있는 이유는 리액트 프로젝트에서 해당 확장자를 지원하기 때문
  - 이 확장자는 개발 서버가 실행될 때, 백그라운드에서 실행되는 빌드 프로세스에세 해당 파일이 JSX 코드를 포함하고 있다는 것을 알려줌
  - 이 확장자를 처리하는 것은 이 빌드 프로세스뿐이라는 것을 이해하는 것이 중요
- `.jsx` 대신 `.js` 만 사용하는 리액트 프로젝트도 찾을 수 있는데, 그 `.js` 파일 안에서도 JSX 코드를 찾을 수 있음
  - 이것은 단순히 파일이 빌드 프로세스에 따라 JSX 구문을 사용할 때, 어떤 확장자가 예상될지 결정하는 것

## 5. 리액트 컴포넌트 처리 과정과 컴포넌트 트리 생성법

### 1) 리액트 컴포넌트 처리 과정

- 컴포넌트의 내용이 어떻게 웹사이트에 구현된 것인지 이해하기
- 개발자 도구를 열어 `index.html` 의 코드를 확인하면, 소스코드에 헤더를 비롯한 웹사이트의 내용이 없다는 것을 확인 가능
- 우리가 집중해야 할 것은 로딩된 `index.jsx` 파일

  ```jsx
  // index.jsx
  import ReactDOM from 'react-dom/client';

  import App from './App.jsx';
  import './index.css';

  const entryPoint = document.getElementById('root');
  ReactDOM.createRoot(entryPoint).render(<App />);
  ```

  - 이 파일에 로드되고 실행된 코드는 우리가 작성한 코드가 변형된 것

    → 우리가 작성한 JSX 코드는 브라우저에서 실행이 되지 않기 때문

  - 이 파일에서는 `App.jsx` 파일에서 import 해오는 것이 있음
    - App 컴포넌트를 가져오는 것
    - `index.jsx` 에 `App.jsx` 의 리액트 컴포넌트는 없고, JSX 코드가 함수로 변환되지 않음
    - 대신 값으로 사용되고 있어 호출된 다른 메소드의 인수로 사용됨
  - 이 파일은 HTML 파일에 가장 먼저 로딩되는 파일로, 리액트 앱의 주요 entry point로 작용하는 아주 중요한 예외적인 경우
  - 이곳에 불러들인 리액트 라이브러리에 속하는 ReactDom 라이브러리가 있으며, 이로 인해 App 컴포넌트가 결과적으로 렌더링 될 수 있는 것
    - 즉, App 컴포넌트의 내용을 화면에 출력하는 것을 담당하는 것
  - `createRoot()` 메서드는 리액트에서 생성된 것이 아니라, `index.html` 파일의 한 부분인 요소를 입력값으로 설정

    ```html
    // index.html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/vite.svg"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>React Essentials</title>
      </head>
      <body>
        <div id="root"></div>
        <script
          type="module"
          src="/src/index.jsx"
        ></script>
      </body>
    </html>
    ```

    - 해당 부분은 `id=”root”` 와 함께 있는 div이며, `index.jsx` 에서 `document.getElementById(”root”)` 로 선택한 부분
    - 이것이 `createRoot()` 메서드에 넘겨짐
    - 리액트 프로젝트의 경로로 이 요소가 사용되면, 리액트가 App 컴포넌트를 div 요소에 삽입

      → App 컴포넌트와 그 안에 중첩된 모든 내용을 div 요소 안으로 렌더링하는 것

      ⇒ 이것이 렌더링 메서드가 하는 일

### 2) 컴포넌트 트리 생성법

- App 컴포넌트는 Header 컴포넌트와 같이 여러 개의 자식 컴포넌트를 가질 수 있음
  - 이런 방식으로 컴포넌트 계층 구조가 생성됨
  - 이것을 컴포넌트 트리라고 하는 컴포넌트 구조물이 리액트를 통해 화면으로 렌더링 됨
  - 커스텀 컴포넌트는 실제로 렌더링된 DOM에 나타나지 않음
    - 컴포넌트 트리는 리액트가 분석만 함
    - 리액트는 모든 컴포넌트에서 나온 모든 JSX코드를 결합하여 전체적인 DOM을 생성
    - 이것이 화면에 보이는 요소
- JSX 코드는 마치 트리(나무) 모양의 코드 구조를 띔
  - 리액트에게 각 컴포넌트들이 어떻게 연관되어 있고 UI는 어떻게 보여야 하는지 알려줌
  - 올바른 명령어를 실행하여 실제 DOM을 제어하며 타겟 구조/코드를 반영
- 왜 컴포넌트 함수 이름을 대문자로 시작해야 하는가?

  - div, image, header와 같은 내장 요소는 소문자로 시작
    - 내장 요소들은 리액트에서 DOM node로써 렌더링 됨
  - 우리가 만드는 커스텀 컴포넌트는 리액트에게 내장된 요소가 아님을 알리기 위해 무조건 대문자로 시작해야 함

    - 이름 충돌의 가능성을 방지할 뿐만 아니라, 커스텀 컴포넌트와 내장 요소가 충돌하는 것을 방지
    - 커스텀 컴포넌트는 단순한 함수이므로, 리액트에서 함수로써 실행됨

      → 이 내용은 훑어보기만 하고 반환된 값인 JSX 코드를 사용해 코드를 분석하고, 특정 시간이 지나면 내장 요소만 남게 되어 이들이 화면에 렌더링되는 것

## 6. 동적 값 출력 및 활용

### 1) 정적 콘텐츠

- 하드코딩된 JSX 코드
- 실시간으로 변하지 않음
- 예)

  ```html
  <h1>Hello World!</h1>
  ```

### 2) 동적 콘텐츠

- JSX 코드에 추가된 동적 값으로 생성된 로직
- 콘텐츠나 값이 실시간으로 변함
  - 페이지를 새로고침할 때마다 콘텐츠나 값이 변함
- 중괄호 { }를 사용하여 괄호 사이에 원하는 자바스크립트 코드를 작성 가능
  - 자바스크립트 표현을 반환문 밖으로 옮기면 JSX 코드가 깔끔해질 수 있어 일반적으로 좋은 관례로 여김
  - 이렇게 하지 않아도 똑같이 작동하지만, JSX 코드를 단정하게 유지하는 것을 선호하기 때문
  - 표현할 결과를 상수에 저장하고, JSX에는 상수를 불러들이는 용도로만 사용하는 것이 좋을 수 있음
- 예)

  ```html
  <h1>{userName}</h1>
  ```

## 7. 동적 HTML Attributes(속성) 설정 및 이미지 파일 로딩

- 이미지를 src의 절대 경로로 표현하여 불러오면 리액트 작업물을 배포할 때 이미지가 사라질 수도 있음
  - 배포 과정에서는 모든 코드가 변환 및 최적화되고 함께 묶여짐
  - 그 과정에서 src의 절대 경로로 표현한 이미지 파일이 무시될 수 있고, 배포 과정에서 유실될 수 있음
  - 여러 추가적인 최적화 단계를 사용할 수 없음
- import를 사용하여 이미지를 불러오기

  ```jsx
  import reactImg from './assets/react-core-concepts.png';

  function Header() {
    let index = genRandomInt(reactDescriptions.length - 1);
    const description = reactDescriptions[index];

    return (
      <header>
        <img
          src={reactImg}
          alt='Stylized atom'
        />
        <h1>React Essentials</h1>
        <p>{description} React concepts you will need for almost any app you are going to build!</p>
      </header>
    );
  }
  ```

  - 자바스크립트에서는 이미지 파일을 import 해서 불러오지 않기 때문에 어색할 수 있음
  - 그러나 리액트에서는 JSX 코드를 작동하게 만드는 빌드 과정으로 인해 가능
    - 빌드 과정에서는 JSX 코드를 변환할 뿐 아니라, import 문들을 `index.jsx` 파일에 불러옴
    - 빌드 과정을 통해 import 하여 불러오는 파일이 최종 페이지 및 배포 패키지에 포함되도록 하기 때문에 설정된 프로젝트에 import문 사용이 가능한 것
  - 결국 위 코드에서 reactImg는 자바스크립트 객체라고 할 수 있음
    - 정확히는 자바스크립트 변수로, 해당 이미지로 이동하는 경로를 포함한 해당 임지ㅣ를 가리킨다고 할 수 있음
  - “” 따옴표를 생략하고 중괄호 { }만 사용해야 값으로 사용할 수 있음

## 8. Props(속성)으로 컴포넌트 재사용

- 컴포넌트의 주요 장점 중 하나는 재사용이 가능하다는 것
- 여러 번 재사용해야 하는 컴포넌트가 있는 경우, 입력 데이터가 다른 특정 리액트 컴포넌트를 구축하고 재사용해야 하는 경우 props를 사용

### 1) props란?

- 컴포넌트를 설정하는 개념을 props라 부름
- 데이터를 컴포넌트로 전달하고, 그 데이터를 그 곳에서 사용할 수 있게 함
- 커스텀 컴포넌트에 커스텀 속성을 추가할 수 있음
- 모든 종류의 값을 props로 전달할 수 있음
  - 문자열, 숫자, 객체나 배열도 전달 가능

```jsx
import componentsImg from './assets/components.png';

function CoreConcept(props) {
  return (
    <li>
      <img
        src={props.image}
        alt='...'
      />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept
              title='Components'
              description='The core UI building block.'
              image={componentsImg}
            />
            <CoreConcept />
            <CoreConcept />
            <CoreConcept />
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- 데이터가 컴포넌트 함수로 전달되면 해당 데이터를 받아 사용 가능
  - 일반적으로 자바스크립트에서 함수는 입력 값을 받아들이고 사용하기 위해 하나 이상의 매개변수를 추가할 수 있음
  - 리액트에서도 거의 비슷하지만 props라고 불리는 하나의 매개변수만 사용 가능
  - 일반적으로 리액트에서 props라고 칭하기 때문에, 이 매개변수의 이름도 props라고 지음
- props 매개변수에 대한 값을 전달하고, 리액트에 의해 함수에 전달되는 props 값은 객체가 되어 모든 키-값의 쌍을 보유하게 됨

  - 모든 커스텀 속성은 키로, 속성의 값은 값으로 그룹화 됨

    ```jsx
      props {
       title: 'Components',
       description: 'The core UI building block.',
       image: {componentsImg}
      }
    ```

  - 데이터를 전달할 때 사용한 키 값을 데이터를 받을 때도 그대로 사용해야 함

### 2) props(속성) 대체 문법

- 사용하려는 데이터에 있는 객체의 props 이름과 프로퍼티 이름이 동일할 경우, props 대신 중괄호를 사용하여 **스프레드 연산자**를 통해 객체의 키-값의 쌍을 뽑아낼 수 있음

  ```jsx
  // data.js
  export const CORE_CONCEPTS = [
    {
      image: componentsImg,
      title: 'Components',
      description: 'The core UI building block - compose the user interface by combining multiple components.',
    },
  ];

  // App.jsx
  function App() {
    return (
      <div>
        <Header />
        <main>
          <section id='core-concepts'>
            <h2>Core Concepts</h2>
            <ul>
              <CoreConcept {...CORE_CONCEPTS[0]} />
              /* 위의 코드와 동일하게 작동
              <CoreConcept
                title={CORE_CONCEPTS[0].title}
                description={CORE_CONCEPTS[0].description}
                image={CORE_CONCEPTS[0].image}
              />
              */
            </ul>
          </section>
        </main>
      </div>
    );
  }
  ```

- 컴포넌트 함수 내에서도 짧게 줄일 수 있는 방법

  ```jsx
  // 변경 전
  function CoreConcept(props) {
    return (
      <li>
        <img
          src={props.image}
          alt={props.title}
        />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </li>
    );
  }

  // 변경 후
  function CoreConcept({ title, description, image }) {
    return (
      <li>
        <img
          src={image}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }
  ```

  - 중괄호 { }를 사용하여 **구조분해할당**을 사용
    - 이 중괄호는 JSX에서 사용하는 것과 관련성이 없음
  - 매개변수에서 사용되는 중괄호는 첫 번째 매개변수를 구조분해할 때 사용
  - 데이터로 전달되는 props 객체의 속성 이름과 동일하게 사용해야 함
    - 자바스크립트는 해당 이름의 속성들을 독립된 변수로 제공

### 3) 더 다양한 props(속성) 문법

- 단일 prop 객체 전달

  - 자바스크립트 객체로 이미 구성된 데이터가 있다면, 그 객체를 여러 props로 나누는 대신 하나의 prop 값으로 전달할 수 있음

    ```jsx
      <CoreConcept
        title={CORE_CONCEPTS[0].title}
        description={CORE_CONCEPTS[0].description}
        image={CORE_CONCEPTS[0].image}
      />
      또는 <CoreConcept {...CORE_CONCEPTS[0]} />

      대신, <CoreConcept concept={CORE_CONCEPTS[0]} />
      이렇게 prop 값을 전달했을 경우,
      export default function CoreConcept({ concept }) {
        // concept.title, concept.description 등과 같이 사용하거나
        // const { title, description, image } = concept; 와 같이 구조분해할당하여 사용 가능
      }
    ```

    - concept라는 속성으로 prop을 전달할 수 있음
    - prop 이름은 선택적

- 받은 props를 단일 객체로 그룹화

  - 여러 props들을 컴포넌트에 전달한 다음, 컴포넌트 함수 내에서 자바스크립트의 구조분해할당 문법을 사용하여 단일 객체로 그룹화 할 수 있음

    ```jsx
    <CoreConcept
      title={CORE_CONCEPTS[0].title}
      description={CORE_CONCEPTS[0].description}
      image={CORE_CONCEPTS[0].image}
    />;

    export default function CoreConcept({ ...concept }) {
      // ...concept은 여러 props들을 하나의 객체로 그룹화 함
      // concept.title, concept.description 등과 같이 사용하거나
      // const { title, description, image } = concept; 와 같이 구조분해할당하여 사용 가능
    }
    ```

- 기본 props 값

  - 가끔 선택적 props를 받을 수 있는 컴포넌트를 만들게 될 때가 있음
  - 예) ‘type’ prop을 받을 수 있는 커스텀 Button 컴포넌트가 있을 때, 이 Button 컴포넌트는 ‘type’ 설정 여부와 상관없이 모두 사용할 수 있어야 함

    ```jsx
      // type이 설정된 경우
      <Button type="submit" caption="My Button" />

      // type이 설정되지 않은 경우
      <Button caption="My Button" />
    ```

    - 위와 같은 컴포넌트가 작동되도록 하려면, ‘type’ prop에 대한 기본 값을 설정하면 됨

      ```jsx
      export default function Button({ caption, type = 'submit' }) {
        // caption에는 기본값이 없으며, type에는 "submit"이라는 기본값이 있음
      }
      ```

      → 해당 prop 값이 전달되지 않을 경우를 대비하는 것

      → 자바스크립트는 객체 구조분해할당을 사용할 때, 기본 값을 지원

## 9. 파일에 컴포넌트 저장 및 좋은 프로젝트 구조 활용

### 1) 컴포넌트 파일 분리가 필요한 이유

- 리액트 작업물의 크기가 커지면서 컴포넌트도 계속 추가되어 파일도 함께 커지기 때문에, 한 파일에 모두 저장하는 것은 추천하지 않음
  - 파일에 컴포넌트가 많을수록 다른 컴포넌트를 찾는 것이 어려워짐
  - 이러한 이유로 별도의 컴포넌트는 별도의 파일에 저장하는 것이 좋음
- 예외
  - 두 개의 컴포넌트가 연관성이 매우 높거나 둘이 함께 있어야 작동되는 경우
  - 컴포넌트가 다른 위치에 있다면 제대로 작동하지 않는 경우

### 2) 컴포넌트 파일을 분리해서 저장하는 방법

- src 폴더에 components 폴더를 생성하여 컴포넌트 파일을 저장하는 것이 일반적
- 관례적으로 파일 이름은 컴포넌트의 이름과 동일하게 저장
- `function` 키워드 앞에 `export default` 키워드를 붙여 기본 export를 할 수 있음

  ```jsx
  export default function CoreConcept({ title, description, image }) {
    return (
      <li>
        <img
          src={image}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }
  ```

  → 대부분의 리액트 프로젝트에서는 위와 같은 방법을 사용

- 별도의 파일로 분리한 컴포넌트를 `App.jsx` 에 불러오기 위해 해당 컴포넌트를 import 해야 함

  ```jsx
  import Header from './components/Header.jsx';
  import CoreConcept from './components/CoreConcept.jsx';
  ```

## 10. 컴포넌트 옆에 컴포넌트 스타일 파일 저장하기

```jsx
import './Header.css';
```

- 스타일이 있는 컴포넌트 파일에서 css 파일을 import 하여 스타일 적용 가능
- 단순히 페이지의 다른 곳에서 Header 요소를 사용하는 경우, Header 컴포넌트의 일부가 아니어도 해당 Header 요소에도 스타일이 적용됨

  ```jsx
  function App() {
    return (
      <div>
        <header>
          <h1>Hello World!</h1>
        </header>
      </div>
    );
  }
  ```

  - 위의 header 태그에 Header 컴포넌트의 스타일을 입히지 않았음에도 같은 스타일이 적용되는 것을 확인할 수 있음
  - Header.css 파일에 있는 스타일이 Header 컴포넌트에 범위가 제한된 것이 아니므로, 이 페이지에 있는 모든 header 요소에 스타일이 적용되는 것

    → 이 부분을 주의해야 함!

  - css 파일을 컴포넌트별 css 파일로 구분하면 어떤 스타일이 어떤 컴포넌트에 적용되는지 구분하는 것과 스타일을 수정하는 것이 쉬워짐

    → 그러나, 해당 컴포넌트에만 한정적으로 적용되는 것이 아니라는 점을 주의해야 함

- components 폴더에서 특정 컴포넌트에 소속된 파일들을 바로 찾을 수 있도록, 해당 컴포넌트 이름으로 된 별도의 폴더를 생성하는 것이 좋음

  예) src/components/Header/Header.jsx

  src/components/Header/Header.css

## 11. 컴포넌트 합성: 특별한 children Props(자식 속성)

- 컴포넌트가 다른 컴포넌트나 내용을 감싸서 컴포넌트를 구축하는 것을 **컴포넌트 합성**이라고 함

```jsx
// App.js
import TabButton from './components/TabButton.jsx';

function App() {
  return (
    <div>
      <Header />
      <main>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton>Components</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
```

- `<TabButton>Components</TabButton>` 부분에서 Components를 페이지에 출력하기 위한 방법
  - 모든 커스텀 컴포넌트는 props를 받음
  - 속성을 설정하지 않아도 리액트에서 props 객체를 줌 → 거의 빈 객체
  - 사실 완전 비워진 것은 아니고, 항상 받는 속성이 하나 있음
    - 그것이 바로 내장된 `children prop`
- children prop이란?

  - 리액트에서 설정한 prop으로, 어느 특정한 속성에 의해 설정된 prop이 아님
  - children prop은 커스텀 컴포넌트 태그 사이의 텍스트 내용을 의미

    → `TabButton>Components</TabButton>` 의 Components

  - 위와 같이 단순한 텍스트일 수도 있지만, 필요에 따라 복잡한 JSX 구조가 될 수도 있음
  - children prop을 출력하는 방법

    ```jsx
      // 방법 1: props.children
      export default function TabButton(props) {
        return (
          <li>
            <button>{props.children}</button>
          </li>
        );
      }

      // 방법 2: 구조분해할당을 통해 children 속성을 추출
      export default function TabButton({ children }) {
        return (
          <li>
            <button>{children}</button>
          </li>
        );
      }
    ```

- `button`의 `label` 속성을 사용하여 위와 같은 동작을 하게 할 수 있음

  ```jsx
  // App.jsx
  <TabButton label='Components'></TabButton>;

  // TabButton.jsx
  export default function TabButton({ label }) {
    return (
      <li>
        <button>{label}</button>
      </li>
    );
  }
  ```

- 위의 두 방법 중 개인이 선호하는 것에 따라 사용하면 됨

## 12. 이벤트 처리하기

- 바닐라 자바스크립트에서의 이벤트 사용 방법

  ```jsx
  // 예) onClick 이벤트
  document.querySelector('Button').addEventListener('click', () => {});
  ```

- 리액트에서 이벤트 사용 방법

  - 리액트에서는 이벤트 리스너를 요소에 추가하는 대신, 해당 요소에 특별한 속성인 prop을 추가
  - prop이라고 칭하는 이유는, 내장 요소도 결국 컴포넌트이기 때문

    → 리액트에서만 제공하고 이해하는 컴포넌트라고 할 수 있음

    - 이와 같은 내장 요소는 on으로 시작하는 prop을 많이 지원

      → on을 입력하고 ctrl + space를 눌러 추천 메뉴를 열어 다양한 이벤트 확인 가능

    - button 요소 뿐만 아니라, 모든 요소에 추가 가능
    - onClick prop에 제공해야 하는 것은 함수

      → 해당 이벤트가 발생할 때, 실행해야 할 함수를 가리켜야 하기 때문

  - 컴포넌트 함수 내부에 이벤트 함수에서 실행하고자 하는 함수를 정의할 수 있음

    → 여기서 정의하는 함수는 해당 컴포넌트 함수 내에서만 호출 가능

  - 특정 이벤트가 발생할 때 호출해야 하는 함수의 이름을 지을 때, `handle`실행할함수 같이 짓는 것이 일반적

    → 또는 `실행할함수Handler` 라고 짓기도 함

  - onClick에 실행하고자 하는 함수를 prop으로 줄때 괄호()를 작성하여 실행해서는 안됨

    ```jsx
      <button onClick={handleClick}>{props.children}</button>   // o
      <button onClick={handleClick()}>{props.children}</button> // x
    ```

    - 함수를 값으로 사용하고자 하는 것이기 때문에 함수의 이름을 사용해야 함
    - 괄호를 추가하게 되면 사용자가 이 함수를 실행시키게 되는데, 이는 onClick에 전달될 값이기 때문에 해서는 안됨

      → 해당 버튼이 클릭되면 리액트에서 실행되어야 함. 즉, 나중에 언젠가 실행되는 것

      → 괄호를 추가하면 해당 코드 라인이 실행될 때 함수가 바로 실행됨

## 13. 함수를 Prop(속성) 값으로 전달하기

- 커스텀 컴포넌트에서 값으로서의 함수를 prop에 설정하는 패턴을 통해 JSX 코드에 영향을 미치는 데이터를 업데이트 할 수 있음

```jsx
// App.jsx
function App() {
  function handleSelect() {
    console.log('Hello World - selected!');
  }

  return (
    <div>
      <Header />
      <main>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={handleSelect}>Components</TabButton>
            <TabButton>JSX</TabButton>
            <TabButton>Props</TabButton>
            <TabButton>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;

// TabButton.jsx
export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}
```

- 위의 코드에서 최종적으로 하는 것

  - handleSelect 함수에 포인터를 전달하는 것

    → onSelect의 prop 값으로써 함수를 전달하는 것

  - TabButton 커스텀 컴포넌트에서는 이 함수를 onClick의 prop에 전달하는 것
  - 결과적으로 TabButton을 클릭하면 App 컴포넌트의 handleSelect 함수가 실행됨

- `on~`
  - 위와 같이 이름을 지으면, 궁극적으로 특정 이벤트에 기반해 실행되는 함수에 의해 설정된다는 것을 분명하게 알려줌
  - 리액트 프로젝트에서 이벤트에 의해 실행되는 함수를 받아들이는 prop의 이름을 지을 때 사용하고, 자주 쓰이는 또 다른 규칙 중 하나

## 14. 이벤트 함수에 커스텀 인자 전달하기

- Dynamic Content의 내용을 버튼 클릭에 따라 바꾸기

  → 이것이 동작하기 위해서는 어떤 버튼이 클릭되었는지 알아야 함

- 리액트에서 이벤트에 따라 실행되는 함수를 정의하고 싶은데, 어떻게 불려질지, 어떤 인수를 실행할지 통제하고 싶을 때 사용하는 패턴

  ```jsx
  // App.jsx
  function App() {
    function handleSelect(selectedButton) {
      // selectedButton를 클릭하면 해당 버튼의 문자열이 선택되어야 함
      // selectedButton -> 'components', 'JSX', 'Props', 'State'
      console.log(selectedButton);
    }

    return (
      <div>
        <Header />
        <main>
          <section id='examples'>
            <h2>Examples</h2>
            <menu>
              <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
              <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
              <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
              <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
            </menu>
          </section>
        </main>
      </div>
    );
  }

  export default App;

  // TabButton.jsx
  export default function TabButton({ children, onSelect }) {
    return (
      <li>
        <button onClick={onSelect}>{children}</button>
      </li>
    );
  }
  ```

  - 익명의 화살표 함수를 만들어 App.jsx에서의 onSelect의 값으로 실행되도록 하고 TabButton 컴포넌트에서의 onClick에서도 실행되도록 함
  - 해당 코드가 분석될 때 화살표 함수만 정의되기 때문에, 화살표 함수 안의 함수는 아직 실행되지 않음
  - 그러고 나서 이 onSelect prop에 있는 TabButton의 화살표 함수가 실행됨
  - 그러므로 TabButton의 버튼이 클릭되어 함수가 실행되면 그제서야 화살표 함수 안의 함수가 실행됨
  - 여기서 이제 handleSelect 함수를 수동으로 실행할 수 있고, 어떻게 실행할지 통제할 수 있음

    - handleSelect 함수에 인자를 넘겨주어, 모든 탭 버튼에서 누르는 버튼에 따라 handleSelect에 다른 식별자를 수행할 수 있도록 할 수 있음

    ⇒ 이를 통해 handleSelect 함수에 커스텀 식별자와 커스텀 매개변수를 얻게 됨

## 15. UI가 업데이트 되지 않는 이유 - 리액트의 뒷편 살펴보기

```jsx
function App() {
  let tabContent = 'Please Click a button';

  function handleSelect(selectedButton) {
    // selectedButton를 클릭하면 해당 버튼의 문자열이 선택되어야 함
    // selectedButton -> 'components', 'JSX', 'Props', 'State'
    tabContent = selectedButton;
  }
  return (
    <div>
      <Header />
      <main>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}
```

- 위 코드의 문제점

  - tabContent 변수를 업데이트 하고 있으나, UI가 업데이트 되지 않음
  - handleSelect 함수가 실행되어도, App 컴포넌트 함수가 실행되지 않아 UI가 업데이트 되지 않는 것
  - App 컴포넌트 함수가 한 번만 실행되기 때문에 새로운 내용이 감지되지 않아, 모든 JSX 코드가 재평가 되지 않는 것
  - 리액트는 JSX 코드를 보고 현재 렌더링된 UI와 비교하기 때문에, UI를 업데이트하려면 코드들이 리액트에 의해 재평가 되어야 함

    ⇒ 위와 같은 이유로 tabContent는 초기값을 유지하는 것

    ⇒ 만약 변화를 탐지한다면, 그에 맞춰 UI를 업데이트 하게 됨

- 리액트는 기본적으로 컴포넌트 함수를 코드 내에서 처음 발견했을 때 한 번만 실행한다는 것을 염두해야 함

  - App 컴포넌트 함수는 index.jsx 파일에서 처음 발견되고, 이것이 리액트가 해당 함수를 실행하고 렌더링하는 시점
  - TabButton 컴포넌트 함수의 경우, App 컴포넌트 함수가 실행되고 렌더링될 때 처음 발견됨

    - 그러므로 이때 TabButton 컴포넌트 함수가 실행되고 렌더링 됨

      ⇒ 그러나 이 이후에는 두 컴포넌트 함수 모두 실행되지 않음

- 결과적으로 `tabContent` 와 같은 일반적인 변수로는 UI를 업데이트 할 수 없음

  → 그러므로 컴포넌트 함수가 재실행되어야 한다는 것을 리액트에게 알려줄 방법을 찾아야 함

## 16. State(상태) 관리와 Hooks(훅) 사용법

### 1) state(상태)란?

- 리액트에서 처리되는 변수를 등록하는 것
  - 리액트가 제공하는 함수의 도움을 받아 업데이트됨
  - 리액트에게 데이터가 변한 것을 알려주면 리액트가 UI를 업데이트 함
- 리액트 라이브러리에서 불러와 특별한 함수(useState)의 도움으로 실행됨

### 2) 리액트 훅(Hook)이란?

- 리액트 프로젝트에서 ‘use’로 시작하는 모든 함수
- 일반 함수이지만, 리액트 컴포넌트 함수 또는 다른 리액트 Hook 안에서 호출되어야 함

  → 다른 리액트 Hook에서 호출된다는 것의 예시: 커스텀 리액트 Hook

- 컴포넌트 함수 안에서 바로 호출해야 하며, 다른 코드 안에 중첩되어서는 안됨

  ```jsx
  function App() {
    useState(); // (o)
    function handleSelect() {
      useState(); // (x)
    }
  }
  ```

  → 내부 함수 안에 중첩되어서는 안됨

- 리액트 훅의 2가지 규칙

  1. 컴포넌트 함수 또는 커스텀 훅 안에서 호출되어야 함
  2. 컴포넌트 함수의 최상위에서 호출해야 함

     → 다른 내부 함수에 중첩되거나 if문 혹은 반복문도 안됨

### 3) useState()

- 리액트에서 제공하는 가장 중요한 훅 중 하나
  - 일부 컴포넌트에 연결된 상태를 관리하게 하기 때문
  - 리액트에 의해 저장된 일부 데이터일 뿐이며, 데이터가 변경되면 이 훅이 자신이 속한 컴포넌트 함수를 활성화하여 리액트에 의해 재검토 되게 함

```jsx
import { useState } from 'react';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('Please click a button');
}
```

- useState는 두개의 인수를 받는데, 이것은 기본적으로 컴포넌트가 처음 렌더링될 때 리액트가 저장하고 사용하길 원하는 기본 값이라고 할 수 있음

  → 나중에 변경할 수 있는 값이지만, 초기값을 설정하는 것

- useState에 의해 반환되는 값은 변수 또는 상수에 저장 가능
  - 이 값은 배열
  - 이 배열에 저장되는 두개의 값이 있음
  - 배열 구조분해할당을 사용하여 별도의 상수에 저장할 수 있음
  - 반환된 배열에서 추출하는 두 요소의 이름은 자유롭게 설정 가능
- useState의 요소

  - 첫 번째 요소
    - 이름은 자유롭게 설정 가능
    - 해당 컴포넌트 실행 주기의 현재 데이터 스냅샷이 된다고 볼 수 있음
    - 컴포넌트 함수가 처음 실행될 때, 초기값이 첫 번째 요소에 저장됨
    - 다시 실행될 때는 업데이트 된 값이 저장됨
    - 우리가 실질적으로 관리하는 데이터는 첫 번째 요소
  - 두 번째 요소

    - 이름은 첫 번째 요소의 이름 앞에 set을 붙임
    - 이 요소는 항상 함수

      → 이 함수는 리액트에서 제공됨

    - 상태를 업데이트 하기 위해 실행되어 저장된 값을 업데이트 함
    - 이 함수를 호출하면, 리액트에게 해당 컴포넌트 함수를 다시 실행해야 함을 알려줌

    ⇒ 해당 요소를 const로 선언할 수 있는 이유는 첫 번째 요소가 컴포넌트 함수를 실행할 때마다 다시 생성되기 때문에 변수를 사용할 필요가 없음

    → 그러나 배후에서 리액트가 실제 값을 저장하고 업데이트 한 다음 이 컴포넌트 함수가 다시 실행될 때, 이 상수에 전달됨

```jsx
import { useState } from 'react';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('Please click a button');

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  console.log('APP CONPONENT EXECUTING');
}
```

- 위의 코드로 개발자 도구를 열어 콘솔창을 보면 UI가 업데이트 되면서 실행 로그가 다시 출력되는 것을 확인할 수 있음
- 버튼을 누를 때마다 UI는 올바른 값이 보이지만, 콘솔에는 예전 값이 출력되는 것을 확인할 수 있음

  - 즉, 상태를 업데이트 했어도, 로그를 출력하면 상태를 변경하기 전의 상태값이 나옴

    - 이것을 이해하기 위해서는 리액트가 작동하는 원리를 알아야 함

      → 상태를 업데이트 시키는 함수 setSelectedTopic를 부를 때, 리액트는 이 상태 업데이트의 스케줄을 조정하며 이 컴포넌트 함수를 재실행 함

      → 그래서 App 컴포넌트 함수를 다시 실행하고 나서야 업데이트된 값을 사용할 수 있음

      → 그제서야 새로운 값을 사용할 수 있으므로, 업데이트 스케줄이 조정되자마자 로그를 출력하면 예전 값이 나오는 것

      → 다시 말해, 아직은 예전 App 컴포넌트 함수에 있다는 것

## 17. 데이터 기반 State(상태) 가져오기 및 출력

```jsx
import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';

import { CORE_CONCEPTS, EXAMPLES } from './data.js';

function App() {
  const [selectedTopic, setSelectedTopic] = useState('components');

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  return (
    <div>
      <Header />
      <main>
        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id='examples'>
          <h2>Examples</h2>
          <menu>
            <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={() => handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={() => handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={() => handleSelect('state')}>State</TabButton>
          </menu>
          <div id='tab-content'>
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
              <code>{EXAMPLES[selectedTopic].code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
```
