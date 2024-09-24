# 연습 프로젝트: 프로젝트 관리 앱(컴포넌트, 상태, 참조 등 적용)

## 1. 컴포넌트 간 교환을 위한 State(상태) 관리법

- `projectsState` 상태의 초기값의 `selectedProjectId` 에 `undefined` 값을 설정한 이유
  ```jsx
  // App.jsx
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  ```
  - `selectedProjectId` 속성을 사용해서 나중에 프로젝트가 여러 개 있을 때, 그 중 선택된 프로젝트의 ID를 저장하기 위함
    - 추가한 새 프로젝트가 없거나, 아무 프로젝트도 선택하지 않았을 때 사용
  - `undefined` 가 아닌 `null` 값을 사용한다면, 새로운 프로젝트를 추가하고 싶을 때 사용
  - 최소한의 상태를 사용하기 위해 `selectedProjectId` 속성을 재사용
  - 즉, 초기에는 `undefined` 값으로, 새로운 프로젝트를 추가/선택을 하지 않았다는 것을 의미
  - `selectedProjectId` 속성은 ‘+Add Project’ 버튼을 누르면 `null` 값으로 바뀔 것
- 새로운 속성을 하나 더 추가하여 프로젝트에 어떤 내용을 띄울지 선택하게 하기
  ```jsx
  // App.jsx
  const [projectsState, setProjectsState] = useState({
    currentAction: 'selected-project', // 'adding', 'nothing-selected'
    selectedProject: undefined,
    projects: [],
  });
  ```

## 2. 프로젝트 생성 핸들링 & UI 업데이트

- Save 버튼을 클릭했을 때, 초기 화면으로 돌아가게 하는 방법
  - 방법 1) `selectedProjectId: undefined` 추가하기
    ```jsx
    function handleAddProject(projectData) {
      setProjectsState((prevState) => {
        const newProject = {
          ...projectData,
          id: Math.random(),
        };
        return {
          ...prevState,
          selectedProjectId: undefined,
          project: [...prevState.projects, newProject],
        };
      });
    }
    ```
  - 방법 2) 프로젝트 Id로 설정하기
    ```jsx
    function handleAddProject(projectData) {
      setProjectsState((prevState) => {
        const projectId = Math.random();
        const newProject = {
          ...projectData,
          id: projectId,
        };
        return {
          ...prevState,
          selectedProjectId: projectId,
          project: [...prevState.projects, newProject],
        };
      });
    }
    ```

## 3. Props Drilling 이해하기

- props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트를 거치면서 React App 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정
- props 전달이 3~5개 정도 컴포넌트라면 Props Drilling은 문제가 되지 않음
- 하지만 Props 전달이 10개, 15개 같이 더 많은 과정을 거치게 된다면 props를 추적하기가 힘들어짐
- 해결 방법
  - 전역 상태관리 라이브러리 사용
    - redux, Mobx, recoil 등을 사용하여 해당 값이 필요한 컴포넌트에서 직접 불러서 사용
  - Children을 적극적으로 사용
    - props.children의 사용시 태그와 태그 사이의 모든 요소들을 자식 취급하지 않으므로 주의
