# 리액트의 핵심 - 연습 프로젝트

- `input` 요소의 `onChange()` 속성에서 `event.target.value` 에서 얻어지는 값은 항상 문자열
  ```jsx
  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }
  ```
  - 위와 같이 `newValue` 값에 +를 추가함으로써 문자열 값을 숫자 값으로 변환할 것을 강제할 수 있음
