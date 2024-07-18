# HTML: Forms & Table

## 1. HTML Tables

- 2차원적인 행과 열 구조
- 레이아웃 : 콘텐츠를 이동시키는 것을 뜻함
- 테이블 형식에 맞는 데이터를 보여주고자 할 때 사용해야 함

### 1)Table Elements

- `<table>`
  - 표본 데이터를 나타냄
- `<tr>`
  - 테이블 열
- 테이블의 구조
  - `<thead>`
    - `<th>`
      - 테이블의 헤더
  - `<tbody>`
    - `<td>`
      - 데이터를 담은 테이블의 단일 셀
  - `<tfoot>`
    → 시맨틱 마크업 뿐만 아니라, 접근성 측면에서 테이블을 쉽게 이해할 수 있도록 함
- `<colgroup>`
  - 테이블 내의 열 그룹을 정의
  - `rowspan`
    - 행 병합
  - `colspan`
    - 열 병합
- `<caption>`
  - 테이블에 대한 설명

## 2. HTML Forms

### 1) `<form>` 요소

- `<form>`
  - 정보 제출을 위한 대화형 컨트롤이 포함된 문서 섹션
    - 입력을 그룹화 하고, 배송 라벨을 붙여 특정 목적지로 함께 전송하는 것
  - `action=””`
    - form이 제출되면 데이터를 어디로 보낼지 지정
    - form을 제출하면 HTTP 요청이 발송됨
      → 해당 특성을 통해 요청이 어디로 가는지, 어떤 종류의 HTTP 방법인지 method를 사용하여 제어 가능

### 2) `<input>` 요소

- `<input>`
  - 가장 일반적인 요소
    - 닫는 태그가 없음
    - 입력된 요소와 정확히 일치해야 작동
  - `type=""`
    - 입력 태그의 행동 방식을 결정
    - text
    - checkbox
      - checked 상태로 form을 제출 → name=on
    - radio
      - 여러 개 중 하나 선택
      - value 속성을 사용하여 데이터를 서버에 전달 가능
      - name 속성을 사용하여 요소들을 그룹화
    - select(drop down menu)
      - option을 하위 태그로 가짐
      - option의 `value=””` 로 설정하여 placeholder처럼 사용 가능
      - option에 `selected` 속성을 사용하면 디폴트 선택값 지정 가능
  - `placeholder=””`
    - 입력에 대해 텍스트를 지정하는 특성
    - 사용자가 입력하기 전이나 비어있는 동안 나타나는 텍스트

### 3) `<label>` 요소

- 접근성과 사용하기 쉬운 form을 만드는 데 매우 중요한 요소
  - 스크린리더 기능을 향상시키거나 사용자에게 더 좋은 경험을 제공 가능
- 사용하고자 하는 요소에 `id` 속성을 추가하여 `label`의 `for` 속성과 연결
  → 입력 태그 하나에 label 하나를 사용해야 함
- `label` 태그 안에 `input` 태그를 중첩시키면 `for` 속성과 `id` 속성을 사용하지 않아도 서로 연결이 됨
  - 유효한 접근 방법이지만 각각의 태그를 사용하여 해당 속성들을 이용해 연결하는 것이 스타일링 하기 더 쉽다는 장점

### 4) `<button>` 요소

- 웹 페이지에서 중요한 태그
- form에 버튼이 있으면 기본 동작은 해당 양식을 제출하는 것
  → action에 명시한 곳으로 form을 전송
- `type=””` 속성을 사용하여 버튼의 동작을 설정 가능
  - `type=”button”` : 일반 버튼
  - `type=”submit”` : 기본 속성, 양식을 제출
  - `type=”button”` : 일반 버튼
- `input` 태그의 `type=”submit”` 을 사용하여 버튼처럼 사용 가능
- `form`의 밖에 있는 버튼은 `type`을 지정하지 않았음에도 동작하지 않음
  → 일반 버튼처럼 동작함

### 5) name 속성

- 데이터가 서버로 전송될 때 값을 참조하는 방법
  → 서버로 데이터를 보낼 때 사용될 이름
- file:///tacos?username=seosu1225&password=1234&color=%23e21212&num=76
  - `/tacos` : action
  - & : 서로 다른 쌍을 하나의 URL로 연결하기 위해 사용
  - %23e21212 : #ed7678, 색상 코드
- 사용하는 모든 `input` 태그에 사용해야 함

### 6) 그 외

- `range`
  - min, max step, value 값 지정 가능
- `number`
  - min, max step 값 지정 가능
- `textarea`
  - 텍스트 영역
  - rows, cols로 초기 크기 설정 가능

## 3. HMTL 유효성 검사

- 제약사항을 추가하거나 사용자 입력이나 데이터의 유효성을 확인하는 것
- 내장된 브라우저 유효성 검사
- 서버 측 유효성 검사(server side validation)
  - 데이터를 제출할 때 제출하지 못하게 하는 것

### 1) 기본 제공 유효성 검사(Basics built in validation)

- `required`
  - 필수 작성을 요구하는 속성
  - 브라우저에 따라 다른 오류 메시지가 나올 수 있음
  - 모든 브라우저에서 구현되지 않을 수 있음
- `maxlength`, `minlength`
- `pattern`
  - 정규식을 사용하여 패턴을 정의
