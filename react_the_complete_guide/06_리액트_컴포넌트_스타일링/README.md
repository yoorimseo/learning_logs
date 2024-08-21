# 리액트 컴포넌트 스타일링

## 1. CSS 코드를 여러 파일로 나누기

- CSS 코드를 여러 개의 파일로 분리하고, 그 파일을 그들이 속하는 컴포넌트에 import 할 수 있음

  ```jsx
  // Header.css
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  header img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }

  header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: 'Pacifico', cursive;
    margin: 0;
  }

  header p {
    text-align: center;
    color: #a39191;
    margin: 0;
  }

  @media (min-width: 768px) {
    header {
      margin-bottom: 4rem;
    }

    header h1 {
      font-size: 2.25rem;
    }
  }

  // Header.jsx
  import logo from '../assets/logo.png';
  import './Header.css';

  export default function Header() {
    return (
      <header>
        <img
          src={logo}
          alt='A canvas'
        />
        <h1>ReactArt</h1>
        <p>A community of artists and art-lovers.</p>
      </header>
    );
  }
  ```

## 2. 바닐라 CSS로 리액트 앱 스타일링하기 - 장/단점

- css 파일을 import하여 컴포넌트 스타일링 하기
  - 바닐라 css를 사용하여 작업하고 싶거나 혹은 다른 개발자나 디자이너가 css 파일에 작업하고 있다면 좋은 방법
  - 그냥 import 해서 컴포넌트와 JSX 코드에 작업 가능
  - 다른 사람이 css 코드를 작업할 수도 있음
  - 어떠한 컨벤션에 제약받지 않고 코드를 작성할 수 있음
- 장점
  - css 코드가 jsx 코드에서 분리될 수 있음
  - css 코드를 작성하는 것은 우리가 이미 알고 있는 것임
  - 다른 사람들이 이 코드에 작업할 수 있고, 스타일링을 추가하려는 사람에게 방해를 받거나 간섭을 받지 않고 컴포넌트를 작업할 수 있음
- 단점
  - css 코드를 작성할 수 있어야 함
  - 바닐라 css 코드를 작성할 때, 다른 컴포넌트 간에 스타일 충돌이 발생할 수 있음
    - 특히 서로 다른 컴포넌트에 저장된 JSX 코드에 영향을 미칠 수 있는 css 규칙을 사용하는 경우

## 3. 바닐라 css 스타일이 컴포넌트에 스코핑되지 않는 이유

- 바닐라 css를 사용할 때 가장 큰 단점
  - css 규칙과 내 css 코드가 일반적으로 내가 속했으면 하는 컴포넌트로 스코핑되지 않을 수 있다는 것
  - 예)
    - 위에서 Header.jsx에 Header.css 파일을 import 했는데, 이 css 파일이 오직 Header 컴포넌트에 정의된 JSX 코드에만 적용된다고 생각할 수 있음
      → 왜냐면 우리가 Header.jsx에서만 Header.css 파일을 import 했기 때문
    - 그러나 Header.css 에서 아래와 같이 코드를 작성한 후, 다른 컴포넌트 파일에 있는 p 태그의 스타일도 바뀐 것을 확인할 수 있음
      ```css
      p {
        text-align: center;
        color: #a39191;
        margin: 0;
      }
      ```
  - 우리가 css 코드를 여러 개의 파일로 나누더라도, 이 파일 중 몇 개를 특정 컴포넌트 파일로 import 하더라도, 그 파일에 css 규칙들은 그들이 속하는 컴포넌트 파일에 스코핑되지 않는다는 것을 확인할 수 있음
    - 왜냐하면, 이 css 파일이 해당 컴포넌트에만 속하지 않기 때문
    - 개발자 도구를 열어서 확인하면 이 스타일은 vite로 인해 <head> 섹션에 적용되는 것
    - 따라서 해당 웹 페이지에 전체적으로 스타일이 적용되는 것

## 4. inline(인라인) 스타일로 리액트 앱 스타일링 하기

- 컴포넌트에 대하여 스코핑을 지정할 수 있는 한 가지 방법은 인라인 스타일을 적용하는 것
  - css 파일에서 css 스타일을 정의하는 것 대신, JSX 코드로 직접적으로 적용하는 것을 의미
- 코드를 통해 알아보기
  ```css
  <p style={{
  	color: 'red',
  	textAlign: 'center'
  }}>A community of artists and art-lovers.</p>
  ```
  - 여기서의 중괄호는 표준 동적 값 문법으로, 값을 전달하는 것
  - 그 안에 추가 중괄호는 객체를 뜻하는 것으로, 키-값 쌍으로 적용될 스타일을 설정하는 곳
  - color 속성 뿐만 아니라 모든 스타일 적용 가능
  - css에서 속성에서 단어의 구분은 -으로 했지만, 인라인 스타일을 작성할 때엔 camel case를 따라야 함
- 장점
  - 쉽게 추가할 수 있음
  - 인라인 스타일을 추가하는 요소에만 스타일이 적용됨
  - 스타일을 동적으로 추가하고, 조건부적으로 정화하게 하기 위해 설정 가능
- 단점
  - 모든 요소를 개별적으로 스타일링 해야 함
  - css와 JSX 코드의 구분이 없음

## 5. 동적 및 조건적 inline(인라인) 스타일

```css
<input
  type="email"
  style={{backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'}}
  /* className={emailNotValid ? 'invalid' : undefined} */
  onChange={(event) => handleInputChange('email', event.target.value)}
/>
```

- 인라인 스타일을 사용할 때, 동적 및 조건부 스타일 추가 가능
- 인라인 스타일의 단점은 많은 중복이 발생하고, 모든 css 코드가 JSX 코드에 들어가게 되어 이상적이지 않음

## 6. css 파일과 css 클래스를 사용한 동적 및 조건적 스타일링

```css
<input
  type='email'
  // style={{backgroundColor: emailNotValid ? '#fed2d2' : '#d1d5db'}}
  className={emailNotValid ? 'invalid' : undefined}
  onChange={(event) => handleInputChange('email', event.target.value)}
/>
```

- 조건에 따라 css 클래스를 추가하여 스타일링을 실행할 수 있음
- 조건부 클래스를 적용하지 않으려면, 삼항 연산자를 사용한 후 클래스 이름으로 undefined를 추가해야 함
  - 여기서 && 연산자로 단축 방법을 사용하면 기술적으로 작동할 수도 있지만, 콘솔에 경고가 뜸
    - 해당 조건이 충족되지 않으면, 해당 조건에 있는 변수 명을 클래스 이름으로 설정하게 됨
    - 기본적으로 클래스 이름으로서 유효하지 않는 값이기 때문에 경고가 뜨게 됨
- 항상 필요한 클래스에 특정 클래스를 조건부로 추가하여 병합하기 위해서는, 동적으로 className에 값을 설정하고 백틱을 활용하여 템플릿 리터럴로 설정할 수 있음
  ```css
  <label className={`label ${emailNotValid ? 'invalid' : ''}`}>
  	Email
  </label>
  ```

## 7. css 모듈로 css 규칙 스코핑하기

- 특정 css 파일을 가져온 컴포넌트 이외의 다른 컴포넌트에 영향을 주지 않게 하기 위한 방법
  - css 모듈을 사용하여 달성할 수 있는 동작
  - 이를 통해 바닐라 css 코드와 규칙을 작성하고 스코프를 지정할 수 있음

### 1) css 모듈

- 리액트 프로젝트에서 사용되는 빌드 프로세스에 의해 구현되고, 꼭 적용되어야 하는 접근 방식
- 이것은 기본 브라우저나 자바스크립트 기능이 아님
- css 모듈은 빌드 도구가 css 클래스 이름을 변환하고, 파일당 고유한 것으로 보장되는 클래스 이름만을 사용하는 방식
- 예)

  ```css
  // Header.module.css
  .paragraph {
    text-align: center;
    color: #a39191;
    margin: 0;
  }
  ```

  - `.module` 이라는 패턴은 기본 빌드 프로세스에 대한 시그널로 볼 수 있음
  - 파일의 이름을 바꿔야 할 뿐 아니라, 파일을 import 해서 가져오는 방법도 바꿔야 함

    ```jsx
    import classes from './Header.module.css';

    ...
    <p className={classes.paragraph}>
    	A community of artists and art-lovers.
    </p>
    ```

    - 이 `Header.module.css` 파일에서 빌드 과정에 의해 생성된 자바스크립트 객체를 가져와야 함
    - 일반적으로 classes 또는 styles와 같은 이름을 사용
    - 개발자 도구를 열어 렌더링된 DOM(p 태그)에 적용된 클래스를 확인해보면, 클래스 이름이 이상하다고 느낄 수 있음
      → 이것은 최종적으로 빌드 툴에 의해 자동으로 생성된 것
      → css 파일에서도 해당 클래스 이름이 이상하게 바뀌어져 있음

  - 이 클래스 이름은 이제 이 컴포넌트 파일 및 해당 컴포넌트에 대해 고유함
    - 다른 파일이나 다른 컴포넌트에 이 클래스를 추가하면 스타일이 적용되지 않는 것을 확인할 수 있음
    - 개발자 도구를 열어 확인해보면, 클래스 이름은 추가되었지만 스타일이 적용되지 않음
    - `paragraph` 는 `Header.module.css` 파일에서 정의한 것이 빌드 과정에 의해 변환되기 때문
  - 최종적으로 이 빌드 과정은 클래스 스타일을 가져온 컴포넌트 파일로 스코핑되도록 보장함

⇒ 이것이 바닐라 자바스크립트로 css 규칙 스코핑을 수행하는 방법

- 장점

  - css 코드가 JSX 코드와 독립되어 있음
  - css 클래스 및 이것을 사용하는 규칙이 해당 규칙을 가져온, 즉 css 파일을 포함하는 컴포넌트 파일로 스코프 됨

- 단점
  - 프로젝트에 상대적으로 작고 많은 css 파일을 추가해야 할 수도 있음
    - 많은 컴포넌트가 각각 자체의 css 파일을 가지는 큰 프로젝트가 있다면, 적어도 일부 css 파일에는 그리 많은 css 코드가 들어있지 않을 수 있음

## 8. “Styled Components” 소개(서드 파티 패키지)

### 1) Styled Components란?

- 바닐라 css를 기반으로 하는 하나의 솔루션 중 하나로, 리액트 프로젝트에서 사용할 수 있음
- css 규칙이나 스타일을 별도의 css 파일이나 인라인 스타일로 정의하지 않고, 해당 패키지의 도움을 받아 생성된 특별한 컴포넌트 내에서 정의하는 것
- `npm install styled-components` 로 설치해야 함
  - 설치 후 개발 서버를 재시작해야 함

### 2) styled-components 사용하기

```jsx
import { styled } from 'styled-components';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

...

<ControlContainer>
  ...
</ControlContainer>
```

- 점 표기법을 사용하여 특정 요소를 개별 컴포넌트로 만듦
- 어떤 스타일이든 적용하고 싶은 스타일을 가지는 컴포넌트로 만들 수 있음
- tagged-templates 라는 정규 자바스크립트 기능을 따름
  - tagged-templates는 함수같은 것으로, 템플릿 리터럴을 입력으로 받음
- 이것도 원한다면 별도의 파일로 아웃소싱할 수 있음
  - 다른 파일에도 사용하는 스타일이라면, 별도의 파일로 저장하는 것이 좋음
- 이 styled-components 패키지는 단순히 고유한 css 클래스 이름을 생성
  - 이것이 적용되는 <head> 섹션의 클래스들을 위한 규칙을 정의내림
  - 그런 다음 styled-components는 생성된 클래스를 요소에 추가

## 9. Styled Components로 유동적 컴포넌트 생성

- 점 표기법으로 스타일한 스타일 컴포넌트들은 childred 속성을 그냥 사용하지 않으므로, 콘텐츠를 둘러쌀 수 있음

  ```jsx
  const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b7280;
  `;

  <Label className={`label ${emailNotValid ? 'invalid' : undefined}`}>Password</Label>;
  ```

  - 그러나 추가적으로 styled components에 설정한 모든 속성을 해당 컴포넌트의 기본 JSX 요소로 전달
  - 여기서 `styled.label` 은 시스템 내부에서 `<label></label>` 과 같은 내장 레이블을 생성하고, 여기에 우리가 설정하는 모든 속성과 스타일을 전달함

- 클래스 이름을 설정하는 것에만 유용한 것이 아님
  - 내장 요소에 속성들을 설정하는 것처럼 styled components에도 이러한 속성들을 설정할 수 있음

## 10. Styled Components로 동적 및 조건적 스타일링

- styled component를 사용함으로써 결국 애플리케이션을 사용할 수 있고, 재사용할 수 있는 작은 wrapper를 만들 수 있음

  → 이것이 인라인 스타일과 비교했을 때의 장점

- 이 styled components는 JSX 코드와 비슷함
  - 그러나 이것은 JSX 코드 안에 있지 않고, 우리는 JSX 코드에 복제를 가지고 있지 않음
  - styled components의 도움으로 인해 빌드한 작은 wrapper를 얻는 것

### 1) Styled Components를 동적으로 처리하기

- styled components 안에는 특별한 속성을 추가할 수 있음

  ```jsx
  <Label invalid={emailNotValid}>Email</Label>
  ```

  - `emailNotValid` 는 true 혹은 false가 되며, `invalid` 속성에 true 혹은 false 값으로 설정됨
  - styled components 에서는 이렇게 설정된 속성을 사용하여 스타일을 동적으로 변경할 수 있음

    ```jsx
    const Label = styled.label`
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      /* color: ${(props) => (props.invalid ? '#f87171' : '#6b7280')}; */
      color: ${({ invalid }) => (invalid ? '#f87171' : '#6b7280')};
    `;
    ```

    - 백틱 안에는 `${ }` 문법을 사용하여 동적 문자열을 생성하는 데 사용할 수 있음
    - styled components에 삽입하는 값은 최종적으로 이 패키지에 의해 정의된 Label 함수에서 수집되어 실행되고, 이것은 styled components 패키지에서 처리하기 때문에 함수를 전달해야 함
      → 이것이 tagged templates가 작동하는 방식

      → 동적 값을 넣으면 tagged templates 함수는 들어온 값을 인수로 받음

      ⇒ 결국 styled components 패키지에 의해서 최종적으로 실행되는 함수가 됨

    - styled components 패키지는 이 함수를 실행하여 스타일링 규칙에서 이 위치에 사용해야 할 값을 동적으로 도출해냄
      → 이것을 위해 패키지에서 이 함수에 대한 input으로서 props(속성) 객체를 주고 실행

      → 이 props은 styled 컴포넌트에 설정된 모든 속성을 포함

- styled components로 속성을 삽입할 때 주의해야 할 것
  - 기본적 내장 속성과 충돌하지 않도록 해야 함
    - styled components에서만 사용하고 싶을 때, 일반적으로 달러 기호를 사용하는 것이 규칙
