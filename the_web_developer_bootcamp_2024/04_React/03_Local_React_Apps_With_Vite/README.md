# Local React Apps With Vite

## 1. Vite로 리액트 애플리케이션 생성하기

```bash
npm create vite@latest
y
{project_name}
React
JavaScript

cd {project_name}
npm install  # 새 프로젝트에 필요한 종속성을 확보하기 위해 npm 설치
npm run dev # 개발자 서버 실행
```

## 2. Create React App을 사용하여 생성하기

- 리액트에 특화됨
- Svelte나 TypeScript, Vue 등과 같은 다른 툴에도 작동
- Create React App을 사용하는 것은 기본 리액트 설치를 빠르게 우리 컴퓨터에 할 수 있음
- 리액트 앱을 만드는 공식적인 방법이었지만, 약간 오래되고 느린 감이 있어서 강의에서는 사용하지 않음

## 3. Vite 앱 미리보기

- .js 나 .jsx 중에 무엇을 사용해도 무방
- index.css
  - 전체 웹 사이트에 적용할 수 있는 스타일
  - 일반적인 앵커 스타일이나 글꼴, h1, 버튼 등 컴포넌트 뿐만 아니라 요소에 스타일 적용 가능
  - 모든 일반적인 스타일을 여기에 작성
- App.css
  - 미리 작성된 앱에 대해 설정된 것
