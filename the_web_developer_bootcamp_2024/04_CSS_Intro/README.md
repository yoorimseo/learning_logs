# CSS 기본

## 1. CSS 기본

### 1) CSS란?

- 문서를 시각적으로 묘사할 때 사용하는 언어
- 규칙

  ```css
  selector {
    property: value;
  }
  ```

- 모든 것을 외울 필요 없이, 필요할 때 찾아서 사용하면 됨
- 모든 문장의 끝에 세미콜론을 사용해야 함

### 2) CSS를 사용하는 방법

- HTML 요소들에 직접 스타일을 작성
  1. 좋은 방법이 아님
  2. 동일한 요소들에 대해 스타일화 할 수 없다는 단점
- HTML 문서 안에 스타일 요소를 사용하여 작성
  1. 요소 안에 중첩되거나 내장되지 않음
  2. 동일한 요소들에 대해 스타일화 할 수 없다는 단점
- 별도의 스타일시트를 작성

  1. 가장 좋은 접근법
  2. 파일 확장자 : .css
  3. HTML의 head 태그 안에 link 요소를 사용하여 스타일시트를 연결해줘야 함

     ```html
     <head>
       <link
         ref="stylsheet"
         href="./"
       />
     </head>
     ```

### 3) 색상

[Color Names — HTML Color Codes](https://htmlcolorcodes.com/color-names/)

- RGB(Red Green Blue)

  ```css
  color: rgb(255, 0, 0) /* red */
  color: rgb(0, 0,255) /* blue */
  ```

- Hex

  - 16진수 표기법을 사용하여 표현

    ```css
    color: #5fcffc;
    ```

### 4) 공통 텍스트 속성

- text- align
  - 콘텐츠 범위 안에서의 수평 정렬
- font-weight
  - 글꼴의 두께를 조절
- text-decoration
  - 텍스트의 외관 선을 설정
- line-height
  - 텍스트의 줄 간격을 조절
- letter-spacing
  - 텍스트의 글자 간격을 조절

### 5) 글꼴 크기 단위 - PX

- px

  - 가장 흔하게 사용되는 **절대 단위**
  - 디스플레이의 크기에 따라 달라짐

    → 반응형 웹 사이트에서는 추천하지 않음

### 6) 글꼴

- font-family

  - 기기마다 지원되는 글꼴이 다르다는 것을 주의
  - 콤마를 사용하여 백업 옵션으로 다른 폰트 설정 가능

    ```css
    font-family: Segoe UI, Futura, Arial;
    ```
