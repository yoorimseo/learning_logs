# CSS 선택자

## 1. CSS 선택자

### 1) 전체 선택자

```css
* {
  color: black;
}
```

- 문서의 모든 부분을 선택
- 규모가 큰 문서에는 비효율적일 수 있음

### 2) 요소 선택자

```css
img {
  width: 100px;
  height: 200px;
}
```

- 해당 요소에 모든 부분을 선택
- `,`를 사용하여 여러 요소들을 선택하여 같은 스타일 적용 가능

  ```css
  h1,
  h2 {
    color: magenta;
  }
  ```

### 3) id 선택자

```css
#logout {
  color: orange;
  height: 200px;
}
```

- id는 공백을 사용하지 않고, 최대한 짧게 만들되 의미는 살려야 함
- 하나의 페이지에 id 이름은 중복되지 않아야 함
  - 하나의 이름만 존재해야 함

### 4) class 선택자

```css
.complete {
  color: green;
}
```

- 기본적으로 id 선택자와 비슷하지만, 여러 요소에 적용할 수 있다는 점이 다름
- 같은 유형의 요소의 콘텐츠를 그룹화할 수 있음
- id 선택자보다 많이 사용됨

### 5) 후손 선택자

```css
li a {
  color: teal;
}
```

- 공백을 사용하여 첫번째 선택자의 하위에 있는 모든 두번째 선택자에 대해 스타일 적용

### 6) 인접 및 직계 자손 선택자

- 인접 선택자

  ```css
  h1 + p {
    color: red;
  }
  ```

  - 첫번째 선택자 다음에 바로 오는 두번째 선택자에 대해 스타일 적용
  - 해당되는 두번째 선택자가 여러 개일 경우, 여러 개에 적용 가능

- 직계 자손 선택자

  ```css
  div > li {
    color: white;
  }
  ```

  - 첫번째 선택자 하위의 두번째 선택자에 대해서만 스타일 적용

### 7) 속성 선택자

```css
input[type='text'] {
  width: 300px;
  color: yellow;
}
```

- .post를 section[class=”post”]로 쓰는 것도 가능
- =(등호) 대신에 \*=(포함), !=(부정) 등의 기호도 사용 가능

### 8) 의사 클래스

```css
선택자:active /* 마우스로 클릭했을 때 */
선택자:checked /* 체크박스 요소가 선택되었을 때 */
선택자:first
선택자:first-child
선택자:hover /* 마우스를 올렸을 때 */
선택자:not()
선택자:nth-child()
선택자:nth-of-type()
```

- 선택된 요소의 특정 상태를 명시하는 키워드를 선택자 끝에 붙이는 것

### 10) 의사 요소

```css
::after
::before
::first-letter
::first-line
::selection /* 마우스로 드래그 했을 떄 */

```

### 11) CSS Cascade

- 스타일이 선언된 순서가 중요
- 나중에 선언된 것이 최종적으로 적용됨

### 12) Specificity

- 특정 요소에 대해 하나 이상의 스타일이 적용될 때 우선순위
- 주어진 선택자로 사용된 것이 구체적일 수록 우선순위가 높음
  ![스크린샷 2024-05-11 22.59.58.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/c07a89d2-eb34-4064-ae88-37dd3da5bb9e/b563e42e-fbb1-4219-89d2-91e7bd35bbcd/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-05-11_22.59.58.png)
  - id > class > element
    [Specificity Calculator](https://specificity.keegan.st/)

### 13) inline style

```css
<button id="signup" style="color: orange">Sign Up</button>
```

- 가장 높은 우선순위를 가지지만, 사용하는 것은 비추천

### 14) !important

- 사용하는 것을 권장하지는 않지만 알아두는 것이 좋음

### 15) CSS 상속

- CSS 속성은 하위 요소들에 상속되는 특징이 있음
- 특정 요소는 기본적으로 상속되지 않는 것도 있음
  예) button, input 등
  → inherit 속성을 사용하여 부모 스타일 적용 가능
