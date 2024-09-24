# 리액트 앱 디버깅하기

## 1. 리액트 오류 메시지 이해하기

```jsx
Uncaught TypeError: Cannot read properties of undefined (reading 'valueEndOfYear')
    at Results (Results.jsx:21:40)
    at renderWithHooks (react-dom_client.js?v=08fb3793:11566:26)
    at updateFunctionComponent (react-dom_client.js?v=08fb3793:14600:28)
    at beginWork (react-dom_client.js?v=08fb3793:15942:22)
    at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=08fb3793:3672:22)
    at Object.invokeGuardedCallbackDev (react-dom_client.js?v=08fb3793:3697:24)
    at invokeGuardedCallback (react-dom_client.js?v=08fb3793:3731:39)
    at beginWork$1 (react-dom_client.js?v=08fb3793:19791:15)
    at performUnitOfWork (react-dom_client.js?v=08fb3793:19224:20)
    at workLoopSync (react-dom_client.js?v=08fb3793:19163:13)
```

- 실행하려 하는 브라우저가 정의되지 않은 값의 속성들을 읽어 들이는 데 실패했다는 오류
  - `valueEndOfYear` 속성을 읽는 데 실패한 것
- 오류의 원인을 코드의 어느 부분에서 찾아야 할지 알려줌
  - 하단의 at ~ 부분의 stack-trace를 통해 알 수 있음
  - 해당 오류로 이어지는 코드의 실행 목록
    - Results 컴포넌트 함수의 8행 16번째 글자
- 결국 이 에러의 문제는 `results[0]`이 정의되지 않은 값을 가지고 있는 것

  - 그러므로 `results`가 모여있는 곳으로 가야 함 → `investment.js`

    ```jsx
    export function calculateInvestmentResults(
      { initialInvestment, annualInvestment, expectedReturn, duration },
      results
    ) {
      let investmentValue = initialInvestment;

      for (let i = 0; i < duration; i++) {
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        investmentValue += interestEarnedInYear + annualInvestment;
        results.push({
          year: i + 1, // year identifier
          interest: interestEarnedInYear, // the amount of interest earned in this year
          valueEndOfYear: investmentValue, // investment value at end of year
          annualInvestment: annualInvestment, // investment added in this year
        });
      }
    }
    ```

    - `results`는 초기 배열이 비어있기 때문에, 첫 번째 요소에 접근하는 것은 실패할 것
    - for 문에서 `duration`이 i 보다 작을 경우, 해당 반복문은 실행되지 않음
    - `duration` 이 1보다 작은 값이 들어오면 에러가 발생하는 것

- 해결 방법
  ```jsx
  if (results.length === 0) {
    return <p className='center'>Invalid input data provided.</p>;
  }
  ```
  - `Results.jsx` 에 위와 같은 조건문을 추가하여, 첫 요소가 없을 때 아래의 코드가 실행되지 않도록 함

## 2. 코드 흐름 및 경고 분석

- 모든 오류가 콘솔창에 경고 메세지를 보여주지는 않음
  - 가끔 우리가 작성한 코드에 논리적인 오류가 있을 수도 있음
- 논리적인 오류를 찾는 방법
  1. 항상 논리적으로 생각하려고 해야 함
     1. 어떤 코드의 어떤 부분이 오류를 발생했을까?
     2. 언제 어떨 때 오류가 생긴걸까?
  2. 실행 과정에서 사용되는 값들을 사용해, 실행되는 시점을 살펴봐야 함
     1. 리액트 프로젝트의 브라우저에서 할 수 있음
     2. 개발자 도구 > Source 탭으로 가서 [localhost](http://localhost) 안에 우리의 로컬 구조와 비슷한 파일 구조를 확인할 수 있음
        1. 기본적으로 브라우저가 우리의 폴더 구조를 브라우저 상에서 보여주기 위해 사용할 수 있는 코드를 생산하는 중인 것
     3. App.jsx로 가서 줄 번호를 클릭해 break point(중단점)을 추가할 수 있음
        1. 중단점을 추가하면 코드 실행은 이 행에 다다르면 멈추게 됨
        2. 페이지가 회색이 되고, 디버거에서 일시정지된다는 알림을 받음
        3. 그리고 중단점이 있는 해당 행이 하이라이트 됨
        4. 이제 이 매개변수와 같은 코드의 특정 부분을 지나가면서 특정 실행을 통해 받은 실제 값을 볼 수 있음
        5. 아래의 다양한 버튼들을 클릭하여 코드를 차근차근 훑을 수 있음

## 3. 리액트의 Strict Mode(엄격 모드) 이해하기

- 엄격 모드는 index.jsx에서 시작해야 함

  - 하지만 원한다면 앱의 부분적으로만 활성화시킬 수 있음
    - index.jsx 파일 말고도 더 깊숙한 곳도 적용 가능
      예) 컴포넌트 트리 속에 중첩되어 사용 가능
  - 엄격 모드는 간단히 말해 리액트에서 import 하는 컴포넌트이기 때문

    ```jsx
    import { StrictMode } from 'react';
    import ReactDOM from 'react-dom/client';

    import App from './App.jsx';
    import './index.css';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    ```

    - StrictMode는 리액트가 제공하는 컴포넌트로써, 컴포넌트처럼 사용할 수 있음
    - 더 정확히는 다른 컴포넌트들을 감싸는 컴포넌트

  - StrictMode는 시스템 내부에서 앱 내의 문제들을 잡아주는 일들을 몇 가지 함

    - 가장 중요한 일은 모든 컴포넌트 함수를 두 번씩 실행한다는 것
      → 개발 단계에서만 이렇게 진행

      → 애플리케이션을 배포 목적으로 서버에 업로드 한다면, 더이상 두 번씩 컴포넌트들을 실행하지 않음

    - 컴포넌트들을 두 번씩 실행하게 되면 오류를 발견하기가 더 쉽기 때문

      → 이를 통해 입력값을 수정하지 않아도 오류가 있다면 즉각적으로 문제가 있다는 것을 알려줌

## 4. 리액트 DevTools 사용하기

- 크롬 확장자로 React Developer Tools를 사용 가능
- 주로 리액트 애플리케이션 내 성능 문제들을 찾고 고치는 것을 다룸
- Profiler 탭은 리액트 성능을 다루고 개선하는 시간에 살펴볼 것
- Component 탭
  - 여기에는 애플리케이션의 컴포넌트 트리가 있음
  - UI의 어떤 부분이 어떤 컴포넌트를 통해 통제되고, 렌더링되고 있는지 빠르게 확인할 수 있음
  - 더 복잡한 컴포넌트 트리와 복잡한 UI를 분석하고 이해하는 데 유용
  - 각 컴포넌트들이 받는 prop에는 무엇이 있는지, prop이 어떤 타입의 값인지 확인 가능
    - 이런 prop 값을 수정해서 생긴 변화들을 UI에서 확인 가능
  - 컴포넌트가 state를 관리한다면 hooks 에서 확인 가능
    - 어떤 값들을 생성하는지, 그리고 해당 값을 바꿔서 UI에 어떻게 반영되는지 확인 가능
- 톱니바퀴 버튼을 클릭하면
  - 개발자 툴의 외관도 제어 가능
  - 컴포넌트 트리에 대한 설정도 조정 가능
