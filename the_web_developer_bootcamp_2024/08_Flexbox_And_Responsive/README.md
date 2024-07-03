# 반응형 CSS 및 Flexbox

## 1. Flexbox란?

- flexbox 인터페이스 내의 아이템 간 공간 배분과 강력한 정렬 기능을 제공하기 위한 1차원 레이아웃 모델 로 설계된 것
  - flexbox를 1차원이라 칭하는 것은, 레이아웃을 다룰 때 한 번에 하나의 차원(행이나 열)만을 다룬다는 뜻
- flexbox의 두 개의 축

  - 주축은 `flex-direction` 속성을 사용하여 지정

    - `row`
    - `row-reverse`

      ⇒ **인라인 방향**으로 행을 따름

    - `column`
    - `column-reverse`

      ⇒ 페이지 상단에서 하단으로 **블록 방향**을 따름

  - 교차축은 이에 수직인 축으로 결정
    - `flex-direction`(주축)이 `row` 나 `row-reverse` 라면 교차축은 열 방향
    - 주축이 `column` 혹은 `column-reverse` 라면 교차축은 행 방향

### 0) `display: flex;`

- 상위 요소에 설정
- 블록 요소 주축에 맞춰 정렬

### 1) Flex-direction

- 컨테이너의 주축 방향을 설정
  - `row` : 기본 값, 좌→우
  - `row-reverse` : 우→좌
  - `column` : 상→하
  - `column-reverse` : 하→상
- 컨테이너 안의 흐름을 결정

### 2) Justify-content

- 실제 요소들이 어떻게 주축에 걸쳐 어떻게 콘텐츠가 분산되는지를 결정
- 주축에 따라 콘텐츠를 정렬
  - `flex-start` : 기본 값, 좌→우
  - `flex-end` : 콘텐츠를 주축 끝으로 이동, 우→좌
  - `center` : 중앙에 배치
  - 항목들을 고르게 정렬
    - `space-between` : 첫 항목은 시작 부분에 밀착, 마지막 항목은 끝 부분에 밀착되어 정렬
    - `space-around` : 각 항목들은 양쪽 여백의 절반만큼 나누어 가짐
    - `space-evenly` : ‘auto’ 크기로 설정된 항목들을 컨테이너에 맞게 늘림

### 3) Flex-wrap

- `flex-item` 요소들이 강제로 한줄에 배치되게 할 것인지, 또는 가능한 영역 내에서 벗어나지 않고 여러행으로 나누어 표현 할 것인지 결정
- 만약 영역 내에서 벗어나지 못하게 설정한다면, 동시에 요소의 방향 축을 결정 가능
  - `nowrap` : 기본 값, `flex-container` 부모요소 영역을 벗어나더라도 `flex-item` 요소들을 **한 줄**에 배치
  - `wrap` : 여러 행에 걸쳐서 배치, 일반적으로 위에서 아래로 쌓이는 순서
  - `wrap-reverse` : 여러 행에 걸쳐서 배치, 요소가 나열되는 시작점과 끝점의 기준이 반대로 배치

### 4) Align-items

- flexbox의 교차축을 따라 아이템을 정렬
  - `flex-start` : 상→하
  - `flex-end` : 하→상
  - `center` : 각 요소의 높이 기준으로 중앙 정렬
  - `baseline` : 글자의 베이스 라인을 기준으로 정렬

### 5) Align-content & Align-self

- **Align-content**

  - 교차축을 따라 콘텐츠 사이의 빈 공간을 통제하거나 분배하는 데 사용
  - 행이나 열 기반 레이아웃에 따라 여러 개의 행이나 열이 있을 때만 사용

        → `flex-wrap` 을 사용했을 경우에만 해당 속성 적용 가능

    - `center`
    - `flex-start`
    - `space-between`
    - `space-around`

- **Align-self**
  - Align-content와 유사하지만, 단일 요소에 추가하는 속성이라는 점이 다름
  - flex container 안에서 한 번에 하나씩 위치를 잡는 방법

### 6) Flex-basis, grow, shrink

- 공간이 충분할 땐 커지고, 공간이 부족할 땐 작아지도록 개별 아이템을 유연하게 만드는 속성들
  - 최소, 최대 너비/높이 설정 가능
  - 빈 공간이 있을 때만 적용 가능
- `flex-basis` : 주축을 기준으로 너비 또는 높이의 기본 크기
- `flex-grow` : 컨테이너에서 다른 요소들과 비교할 때, 특정 요소가 차지하는 공간의 크기를 제어
- `flex-shrink` : 컨테이너에 충분한 공간이 없을 때, 다른 요소들과 비교해서 특정 요소가 줄어드는 크기를 제어

### 7) Flex shorthand

```css
flex: flex-grow | flex-shrink | flex-basis;
```

## 2. 반응형 디자인과 미디어 쿼리

- 다양한 화면 또는 기기에 반응할 수 있는 단일 웹 사이트나 응용 프로그램

### 1) 미디어쿼리

```css
@media (max-width: 768px) {
  h1 {
    font-size: 4em;
  }
  nav,
  nav ul {
    flex-direction: column;
    align-items: center;
  }
}
```

- 반응형 웹 사이트를 만들기 위해 사용할 수 있는 주요 메커니즘
- 단말기의 유형(출력물 vs. 화면)과, 어떤 특성이나 수치(화면 해상도, 뷰포트 너비 등)에 따라 웹 사이트나 앱의 스타일을 수정할 때 유용
